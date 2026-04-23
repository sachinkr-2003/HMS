import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Search, Plus, Trash2, Printer, DollarSign, User, FileText, ShoppingCart, ShieldCheck, Loader2 } from 'lucide-react';

const PharmacyBilling = () => {
  const [medicines, setMedicines] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualItem, setManualItem] = useState({ name: '', price: '', qty: 1 });

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medRes, patRes] = await Promise.all([
          axios.get(`${API_BASE}/pharmacy`),
          axios.get(`${API_BASE}/patients`)
        ]);
        setMedicines(medRes.data);
        setPatients(patRes.data);
      } catch (err) {
        console.error("Fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) && m.stock > 0
  );

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) || 
    p._id.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const addToBill = (med) => {
    const exists = billItems.find(item => item._id === med._id);
    if (exists) {
      if (exists.qty >= med.stock && !med._id.toString().startsWith('manual')) {
        Swal.fire('Stock Limit', 'Cannot add more than available stock', 'warning');
        return;
      }
      setBillItems(billItems.map(item => 
        item._id === med._id ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price } : item
      ));
    } else {
      setBillItems([...billItems, { ...med, qty: 1, total: med.price }]);
    }
    setSearchTerm('');
  };

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (!manualItem.name || !manualItem.price) return;
    const newItem = {
      _id: 'manual-' + Date.now(),
      name: manualItem.name,
      price: parseFloat(manualItem.price),
      qty: parseInt(manualItem.qty),
      total: parseFloat(manualItem.price) * parseInt(manualItem.qty)
    };
    setBillItems([...billItems, newItem]);
    setManualItem({ name: '', price: '', qty: 1 });
    setShowManualForm(false);
  };

  const updateQty = (id, delta) => {
    setBillItems(billItems.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.qty + delta);
        if (delta > 0 && item.stock && newQty > item.stock && !id.toString().startsWith('manual')) {
           Swal.fire('Stock Limit', 'Insufficient stock available', 'warning');
           return item;
        }
        return { ...item, qty: newQty, total: newQty * item.price };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setBillItems(billItems.filter(item => item._id !== id));
  };

  const subtotal = billItems.reduce((acc, item) => acc + item.total, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleFinalize = async () => {
    if (billItems.length === 0) return Swal.fire('Error', 'Bill is empty', 'error');
    if (!selectedPatient) return Swal.fire('Error', 'Please select a patient', 'error');

    setIsSubmitting(true);
    try {
      const billData = {
        patient: selectedPatient._id,
        items: billItems.map(item => ({
          description: item.name,
          amount: item.price,
          quantity: item.qty
        })),
        totalAmount: total,
        paidAmount: total, // Assuming cash/full payment for pharmacy
        status: 'Paid',
        paymentMethod: 'Cash'
      };

      const res = await axios.post(`${API_BASE}/billing`, billData);
      
      Swal.fire({
        icon: 'success',
        title: 'Transaction Complete',
        text: 'Inventory updated and bill generated. Opening invoice...',
        timer: 2000,
        showConfirmButton: false
      });

      // Automated Print/Download Trigger
      if (res.data && res.data._id) {
        window.open(`${API_BASE}/billing-download/${res.data._id}`, '_blank');
      }
      
      setBillItems([]);
      setSelectedPatient(null);
      // Refresh inventory
      const medRes = await axios.get(`${API_BASE}/pharmacy`);
      setMedicines(medRes.data);
    } catch (err) {
      Swal.fire('Error', 'Failed to process transaction', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Pharmacy Billing Terminal</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Authorized invoice generation and stock dispensing.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleFinalize}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100 disabled:bg-gray-400"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <><Printer size={16} /> Finalize & Print</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Patient Selection */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xs font-bold flex items-center gap-2 text-gray-800 uppercase tracking-widest mb-4">
              <User size={16} className="text-blue-600" /> Patient Selection
            </h2>
            {selectedPatient ? (
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div>
                  <p className="text-sm font-bold text-blue-900">{selectedPatient.name}</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">ID: {selectedPatient._id.slice(-6).toUpperCase()}</p>
                </div>
                <button onClick={() => setSelectedPatient(null)} className="text-xs font-bold text-red-600 hover:underline uppercase">Change</button>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search patient by name or ID..." 
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg outline-none text-xs font-bold text-gray-700 focus:border-blue-400 transition-all"
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                />
                {patientSearch && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                    {filteredPatients.map(p => (
                      <button 
                        key={p._id}
                        onClick={() => { setSelectedPatient(p); setPatientSearch(''); }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-xs font-bold border-b border-gray-50 last:border-none"
                      >
                        {p.name} <span className="text-gray-400 font-normal ml-2">({p._id.slice(-6).toUpperCase()})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Medicine Search & Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Consumables Ledger</h2>
              <div className="flex items-center gap-3">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                    type="text" 
                    placeholder="Search Medicine..." 
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none text-[10px] font-bold text-gray-700 focus:border-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                        {filteredMedicines.map(m => (
                        <button 
                            key={m._id}
                            onClick={() => addToBill(m)}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-50 last:border-none flex justify-between items-center group"
                        >
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-800 group-hover:text-blue-700">{m.name}</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">Stock: {m.stock}</span>
                                    <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">Rate: ₹{m.price}</span>
                                </div>
                            </div>
                            <Plus size={14} className="text-gray-300 group-hover:text-blue-600" />
                        </button>
                        ))}
                    </div>
                    )}
                </div>
                <button 
                    onClick={() => setShowManualForm(!showManualForm)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all border border-blue-100 shadow-sm"
                    title="Manual Add"
                >
                    <Plus size={18} />
                </button>
              </div>
            </div>

            {showManualForm && (
                <form onSubmit={handleManualAdd} className="p-4 bg-blue-50/50 border-b border-blue-100 grid grid-cols-1 md:grid-cols-4 gap-3 animate-in slide-in-from-top-2 duration-200">
                    <input required type="text" placeholder="Medicine Name" className="p-2 border border-blue-200 rounded-lg text-xs font-bold outline-none" value={manualItem.name} onChange={e => setManualItem({...manualItem, name: e.target.value})} />
                    <input required type="number" placeholder="Price" className="p-2 border border-blue-200 rounded-lg text-xs font-bold outline-none" value={manualItem.price} onChange={e => setManualItem({...manualItem, price: e.target.value})} />
                    <input required type="number" placeholder="Qty" className="p-2 border border-blue-200 rounded-lg text-xs font-bold outline-none" value={manualItem.qty} onChange={e => setManualItem({...manualItem, qty: e.target.value})} />
                    <button type="submit" className="bg-blue-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest py-2">Add to Bill</button>
                </form>
            )}

            <div className="overflow-x-auto min-h-[200px]">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {billItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic text-sm">Add items to generate bill</td>
                    </tr>
                  ) : billItems.map((item) => (
                    <tr key={item._id} className="hover:bg-blue-50/20 transition-all">
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-800 uppercase">{item.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => updateQty(item._id, -1)} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-200">-</button>
                          <span className="text-[11px] font-bold text-gray-700 w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item._id, 1)} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-200">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[11px] text-gray-500 font-bold">₹{item.price}</td>
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-900">₹{item.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => removeItem(item._id)} className="p-2 text-gray-300 hover:text-rose-600 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-gray-900 p-7 rounded-lg shadow-xl text-white border border-gray-800">
            <h2 className="text-xs font-bold mb-8 flex items-center gap-2 uppercase tracking-wide">
              <DollarSign size={18} className="text-blue-500" /> Payment Summary
            </h2>
            <div className="space-y-4 border-b border-white/5 pb-8 mb-8">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500 font-bold uppercase">Subtotal</span>
                <span className="font-bold text-gray-300">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500 font-bold uppercase">GST (18%)</span>
                <span className="font-bold text-gray-300">₹{gst.toFixed(2)}</span>
              </div>
              <div className="pt-4 flex justify-between items-end">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Total Amount</span>
                <span className="text-3xl font-bold tracking-tight text-white">₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleFinalize}
              disabled={isSubmitting || billItems.length === 0}
              className="w-full py-4 bg-white text-gray-900 rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all shadow-2xl disabled:bg-gray-600 disabled:text-gray-400"
            >
              PROCESS CLEARANCE
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-[11px] font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-gray-800">
              <Printer className="text-blue-600" size={16} /> Print Control
            </h2>
            <p className="text-[10px] text-gray-400 mb-4 leading-relaxed font-medium uppercase tracking-tighter">
              Verify all items before printing. Popups must be enabled.
            </p>
            <button 
                onClick={() => billItems.length > 0 && handleFinalize()}
                className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all"
            >
                Generate & Print PDF
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-[11px] font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-gray-800">
              <ShieldCheck className="text-blue-600" size={16} /> Compliance Note
            </h2>
            <p className="text-[10px] text-gray-400 leading-relaxed font-medium uppercase tracking-tighter">
              All transactions are recorded and inventory levels updated in real-time. Please verify stock levels before finalizing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyBilling;
