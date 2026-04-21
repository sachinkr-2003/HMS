import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Trash2, FileText, Printer, Save, Calculator, Loader2, CheckCircle, User, X } from 'lucide-react';

const BillingCreate = () => {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    
    const [items, setItems] = useState([
        { id: Date.now(), desc: 'General Consultation', qty: 1, price: 500 },
    ]);

    const [isSaving, setIsSaving] = useState(false);
    const [billSuccess, setBillSuccess] = useState(null);

    const total = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const gstCount = total * 0.12; 
    const finalTotal = total + gstCount;

    useEffect(() => {
        if (searchQuery.length > 2) {
            const delayDebounceFn = setTimeout(() => {
                searchPatients();
            }, 500);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchQuery]);

    const searchPatients = async () => {
        setIsSearching(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/patients?search=${searchQuery}`);
            setPatients(res.data);
        } catch (err) {
            console.error("Search failed");
        } finally {
            setIsSearching(false);
        }
    };

    const addItem = () => {
        setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0 }]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id, field, value) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSubmitBill = async () => {
        if (!selectedPatient) return alert("Please specify patient identity.");
        setIsSaving(true);
        try {
            const billData = {
                patient: selectedPatient._id,
                items: items.map(i => ({ description: i.desc, amount: i.price * i.qty })),
                totalAmount: finalTotal,
                status: 'Unpaid'
            };
            const res = await axios.post('http://localhost:5000/api/billing', billData);
            setBillSuccess(res.data);
            setIsSaving(false);
        } catch (err) {
            alert("Voucher generation failed.");
            setIsSaving(false);
        }
    };

    const printInvoice = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Invoice - ${selectedPatient?.name}</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; padding: 50px; color: #1e293b; line-height: 1.5; }
                        .header { display: flex; justify-content: space-between; border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 40px; }
                        .hospital-info h1 { margin: 0; color: #1e3a8a; font-size: 26px; font-weight: 900; letter-spacing: -0.02em; }
                        .invoice-details { text-align: right; }
                        .patient-section { margin-bottom: 40px; padding: 25px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                        th { text-align: left; padding: 15px; border-bottom: 2px solid #e2e8f0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 0.1em; }
                        td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 500; }
                        .totals { margin-left: auto; width: 350px; }
                        .total-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
                        .grand-total { border-top: 3px solid #1e3a8a; margin-top: 15px; padding-top: 15px; font-weight: 900; font-size: 20px; color: #1e3a8a; border-bottom: none; }
                        .footer { margin-top: 100px; text-align: center; font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="hospital-info">
                            <h1>HEALTHREKHA MULTISPECIALITY</h1>
                            <p style="font-size: 13px; color: #64748b; font-weight: 600;">Authorized Clinical Care Facility & Diagnostic Center</p>
                            <p style="font-size: 11px; color: #94a3b8; margin-top: 5px;">Plot 42, Healthcare City, Cyberabad, HYD</p>
                        </div>
                        <div class="invoice-details">
                            <h2 style="margin:0; font-weight: 900; color: #1e3a8a;">OFFICIAL VOUCHER</h2>
                            <p style="font-size: 13px; color: #64748b; font-weight: 700; margin-top: 10px;">DATE: ${new Date().toLocaleDateString().toUpperCase()}</p>
                        </div>
                    </div>
                    <div class="patient-section">
                        <p style="margin:0; font-size:10px; font-weight:900; color:#64748b; text-transform:uppercase; letter-spacing: 0.2em;">RECIPIENT IDENTITY</p>
                        <h3 style="margin:10px 0 0 0; font-size: 20px; font-weight: 800;">${selectedPatient?.name.toUpperCase()}</h3>
                        <p style="margin:5px 0 0 0; font-size:13px; color:#475569; font-weight: 600;">PHONE: ${selectedPatient?.phone || 'N/A'}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 50%;">SPECIFICATION / SERVICE DESCRIPTION</th>
                                <th>UNIT QTY</th>
                                <th>FINANCIAL RATE</th>
                                <th style="text-align: right;">TOTAL AGGREGATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map(item => `
                                <tr>
                                    <td style="font-weight: 700;">${item.desc.toUpperCase()}</td>
                                    <td>${item.qty} UNITS</td>
                                    <td>₹${item.price.toLocaleString()}</td>
                                    <td style="text-align: right; font-weight: 800;">₹${(item.qty * item.price).toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="totals">
                        <div class="total-row"><span style="color: #64748b; font-weight: 700;">NET SERVICE AMOUNT:</span> <span style="font-weight: 700;">₹${total.toLocaleString()}</span></div>
                        <div class="total-row"><span style="color: #64748b; font-weight: 700;">GOVT. SERVICE TAX (12%):</span> <span style="font-weight: 700;">₹${gstCount.toLocaleString()}</span></div>
                        <div class="total-row grand-total"><span>GRAND SETTLEMENT TOTAL:</span> <span>₹${finalTotal.toLocaleString()}</span></div>
                    </div>
                    <div class="footer">
                        Institutional Grade Financial Ledger - Managed by HealthRekha ERP System
                    </div>
                    <script>window.print();</script>
                </body>
            </html>
        `);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Voucher Generation Terminal</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Official platform for clinical service quantification, taxation & fiscal authorization.</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={printInvoice}
                        disabled={!selectedPatient}
                        className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                        <Printer size={16} /> Quick Vector Print
                    </button>
                    <button 
                        onClick={handleSubmitBill}
                        className="flex items-center gap-2 px-8 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                    >
                        <Save size={16} /> {isSaving ? "Synchronizing..." : "Authorize & Commit"}
                    </button>
                </div>
            </div>

            {billSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-lg flex items-center justify-between animate-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-600 text-white rounded shadow-lg shadow-emerald-100">
                           <CheckCircle size={20} />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-widest">Financial Records Synchronized Successfully</h4>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter mt-1 font-mono">AUTHORIZED VOUCHER ID: {billSuccess._id.slice(-12).toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={printInvoice} className="px-6 py-2 bg-emerald-600 text-white rounded font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all">Generate Physical Copy</button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Recipient Verification */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><User size={14} className="text-blue-600"/> Recipient Identity Verification</h3>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={16} />
                            <input 
                                type="text" 
                                placeholder="Query Subject by MRN, Primary Contact or Registered Name..." 
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-blue-500 transition-all text-xs font-bold text-gray-700 font-mono tracking-tighter placeholder:tracking-normal placeholder:font-sans"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {isSearching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-blue-600" size={16} />}
                        </div>

                        {patients.length > 0 && !selectedPatient && (
                            <div className="mt-2 bg-white border border-gray-200 rounded shadow-xl max-h-60 overflow-y-auto z-50">
                                {patients.map(p => (
                                    <div 
                                        key={p._id} 
                                        onClick={() => { setSelectedPatient(p); setPatients([]); setSearchQuery(''); }}
                                        className="p-4 hover:bg-blue-50 cursor-pointer flex items-center justify-between transition-colors border-b last:border-0 border-gray-100"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                                                {p.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-[11px] uppercase tracking-tighter">{p.name}</p>
                                                <p className="text-[9px] text-gray-400 font-bold tracking-widest">{p.phone} | {p.email}</p>
                                            </div>
                                        </div>
                                        <Plus size={14} className="text-blue-600" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedPatient && (
                            <div className="space-y-4">
                                <div className="mt-4 flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-lg animate-in slide-in-from-top-2 duration-300 shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded border border-blue-500/30 bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                            {selectedPatient.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-[11px] uppercase tracking-[0.1em]">{selectedPatient.name}</p>
                                            <p className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.2em] mt-0.5">{selectedPatient.phone} | VERIFIED</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedPatient(null)} className="p-2 text-gray-500 hover:text-rose-500 transition-colors"><X size={18}/></button>
                                </div>
                                <button 
                                    onClick={async () => {
                                        try {
                                            const res = await axios.get(`http://localhost:5000/api/medical-records/patient/${selectedPatient._id}`);
                                            const latestRecord = res.data[0];
                                            if (latestRecord && latestRecord.prescriptions.length > 0) {
                                                const prescribedItems = latestRecord.prescriptions.map(p => ({
                                                    id: Date.now() + Math.random(),
                                                    desc: p.medicine,
                                                    qty: p.quantity || 1,
                                                    price: p.price || 0
                                                }));
                                                setItems(prescribedItems);
                                                alert("Smart Sync: Prescribed medicines pulled into voucher.");
                                            } else {
                                                alert("No pending prescriptions found for this patient.");
                                            }
                                        } catch (err) {
                                            alert("Failed to pull prescriptions.");
                                        }
                                    }}
                                    className="w-full py-2 bg-blue-600/10 text-blue-600 border border-blue-200 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                >
                                    ⚡ Pull from Doctor's Prescription
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Specification Ledger Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4">Service Specification</th>
                                        <th className="px-6 py-4">Unit Qty</th>
                                        <th className="px-6 py-4">Unit Cost</th>
                                        <th className="px-6 py-4">Aggregate</th>
                                        <th className="px-6 py-4 text-right">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {items.map((item) => (
                                        <tr key={item.id} className="hover:bg-blue-50/20 transition-all">
                                            <td className="px-6 py-4">
                                                <input 
                                                    type="text" 
                                                    placeholder="Specify Service Component..."
                                                    className="w-full bg-transparent border-none outline-none font-bold text-gray-800 text-[11px] uppercase tracking-tighter placeholder:tracking-normal placeholder:font-sans placeholder:font-medium" 
                                                    value={item.desc}
                                                    onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input 
                                                    type="number" 
                                                    className="w-16 bg-transparent border-none outline-none font-bold text-blue-600 text-[11px] font-mono" 
                                                    value={item.qty}
                                                    onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 font-bold text-gray-500 text-[11px] font-mono">
                                                    ₹<input 
                                                        type="number" 
                                                        className="w-20 bg-transparent border-none outline-none text-gray-700" 
                                                        value={item.price}
                                                        onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[11px] font-bold text-gray-800 font-mono italic">₹{(item.qty * item.price).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => removeItem(item.id)} className="p-2 text-gray-300 hover:text-rose-600 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-gray-50/50 flex justify-center border-t border-gray-100">
                            <button 
                                onClick={addItem}
                                className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded text-blue-600 text-[9px] font-bold uppercase tracking-[0.2em] hover:border-blue-600 transition-all shadow-sm"
                            >
                                <Plus size={14} /> Append New Specification
                            </button>
                        </div>
                    </div>
                </div>

                {/* Fiscal Allocation Summary */}
                <div className="space-y-4">
                    <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200 sticky top-4">
                        <h2 className="text-[10px] font-bold mb-10 flex items-center gap-2 text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4">
                            <Calculator size={18} className="text-blue-600" /> Fiscal Settlement Matrix
                        </h2>
                        <div className="space-y-4 border-b border-gray-100 pb-8 mb-8 font-inter">
                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                                <span className="text-gray-400">Net Service Vector</span>
                                <span className="text-gray-800 font-mono">₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                                <span className="text-gray-400">Institutional GST (12%)</span>
                                <span className="text-gray-500 font-mono">₹{gstCount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center bg-blue-50/50 p-3 rounded border border-blue-100 text-blue-600 mt-6">
                                <span className="font-bold text-[9px] uppercase tracking-widest">Applied Discount Ledger</span>
                                <span className="font-bold text-[10px] font-mono">-₹0.00</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-10">
                            <span className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">Grand Settlement Total</span>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-blue-600 font-mono italic">₹{finalTotal.toLocaleString()}</span>
                                <p className="text-[8px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Institutional Inclusive Ledger</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Authorization Status Control</p>
                            <div className="grid grid-cols-1 gap-2">
                                <button className="py-3 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                    <CheckCircle size={14} /> Commit as Settled (PAID)
                                </button>
                                <button className="py-3 bg-gray-900 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all">
                                    Commit as Receivable (UNPAID)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingCreate;
