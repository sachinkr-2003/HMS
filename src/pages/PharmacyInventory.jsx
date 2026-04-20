import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, Edit, Trash2, Package, Calendar, Download, X, Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

const PharmacyInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    category: 'General',
    stock: '',
    expiryDate: '',
    price: ''
  });

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/pharmacy');
      setInventory(res.data);
      setLoading(false);
    } catch (err) {
      console.error("API Failure:", err);
      setInventory([]); // Institutional fallback: Empty state
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        batch: item.batch,
        category: item.category,
        stock: item.stock,
        expiryDate: item.expiryDate ? item.expiryDate.split('T')[0] : '',
        price: item.price
      });
    } else {
      setEditingItem(null);
      setFormData({ name: '', batch: '', category: 'General', stock: '', expiryDate: '', price: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await axios.put(`http://localhost:5000/api/pharmacy/${editingItem._id}/stock`, { stock: formData.stock });
      } else {
        await axios.post('http://localhost:5000/api/pharmacy', formData);
      }
      await fetchInventory();
      setShowModal(false);
    } catch (err) {
      alert("Institutional Request Failed. Service is syncing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Authorize SKU Deletion?")) {
      try {
        await axios.delete(`http://localhost:5000/api/pharmacy/${id}`);
        await fetchInventory();
      } catch (err) {
        alert("Deletion Authorization Denied.");
      }
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Medicine Inventory</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Official master stock register, batch monitoring & pricing controller.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
        >
          <Plus size={16} /> New SKU Entry
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Unified Search & Control Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={16} />
            <input 
              type="text" 
              placeholder="Query SKU by name, batch identity..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md outline-none text-xs font-bold text-gray-700 focus:border-blue-400 transition-all" 
            />
          </div>
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 rounded border border-gray-200 transition-colors">
              <Filter size={14} /> Refine View
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 rounded border border-gray-200 transition-colors">
              <Download size={14} /> Export XLS
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Clinical ID</th>
                <th className="px-6 py-4">Drug Specification</th>
                <th className="px-6 py-4">Batch Identity</th>
                <th className="px-6 py-4">Stock Ledger</th>
                <th className="px-6 py-4">Expiry Data</th>
                <th className="px-6 py-4">Unit Price</th>
                <th className="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((item) => (
                <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter uppercase">{item._id.slice(-6)}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">{item.name}</p>
                      <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">{item.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">{item.batch}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold ${item.stock < 50 ? 'text-rose-600 underline' : 'text-gray-800'}`}>
                        {item.stock} UNT
                      </span>
                      {item.stock < 50 && <span className="bg-rose-50 text-rose-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-rose-100 uppercase animate-pulse">Critical</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      <Calendar size={12} className="text-gray-300" /> {formatDate(item.expiryDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-900">{formatCurrency(item.price)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-gray-300 hover:text-blue-600 transition-all"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-gray-300 hover:text-rose-600 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
                <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">{editingItem ? 'Adjust Inventory' : 'Institutional SKU Entry'}</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pharmacy Command Terminal • ID: {editingItem?._id?.slice(-6) || 'NEW'}</p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Drug Designation</label>
                            <input 
                                type="text" 
                                required
                                readOnly={!!editingItem}
                                className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700 ${editingItem ? 'opacity-60 cursor-not-allowed' : ''}`}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="e.g. Paracetamol"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Operational Batch</label>
                            <input 
                                type="text" 
                                required
                                readOnly={!!editingItem}
                                className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700 ${editingItem ? 'opacity-60 cursor-not-allowed' : ''}`}
                                value={formData.batch}
                                onChange={(e) => setFormData({...formData, batch: e.target.value})}
                                placeholder="BT-XXXX"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Stock Vol.</label>
                            <input 
                                type="number" 
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                            />
                        </div>
                        {!editingItem && (
                          <>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Expiry Lock</label>
                                <input 
                                    type="date" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                    value={formData.expiryDate}
                                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Unit Value</label>
                                <input 
                                    type="number" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                />
                            </div>
                          </>
                        )}
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 mt-4 bg-gray-900 text-white rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-600 shadow-xl transition-all active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (editingItem ? "Update Institutional Stock" : "Authorize SKU Entry")}
                    </button>
                </form>
           </div>
        </div>
      )}
      
      {/* Stock Summary Briefing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-5 rounded-lg text-white border border-gray-800">
               <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1">Total SKU Value</p>
               <h3 className="text-xl font-bold italic text-gray-100">{formatCurrency(inventory.reduce((acc, curr) => acc + (curr.price * curr.stock), 0))}</h3>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Items Below Threshold</p>
               <h3 className="text-xl font-bold text-rose-600">{inventory.filter(i => i.stock < 50).length.toString().padStart(2, '0')} Batches</h3>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Operational Stock Health</p>
               <h3 className="text-xl font-bold text-emerald-600">92.4% Optimal</h3>
          </div>
      </div>
    </div>
  );
};

export default PharmacyInventory;
