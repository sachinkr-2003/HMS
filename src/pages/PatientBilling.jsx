import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, DollarSign, FileText, CheckCircle, Clock, Download, ExternalLink, CreditCard, Smartphone, ShieldCheck, Loader2 } from 'lucide-react';

const PatientBilling = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/billing`);
        setBills(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch bills");
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  const handleDownload = async (id) => {
    try {
      const BASE = import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api');
      window.open(`${BASE}/billing-download/${id}`, '_blank');
    } catch (err) {
      console.error("Download failed");
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  const totalUnpaid = (Array.isArray(bills) ? bills : []).filter(b => b?.status !== 'Paid').reduce((acc, curr) => acc + ((curr?.totalAmount || 0) - (curr?.paidAmount || 0)), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-100 pb-4 mb-3 px-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Billing & Invoices</h1>
            <p className="text-xs text-gray-500 font-medium mt-1">Official financial records and unified payment processing terminal.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
           <CreditCard size={16} /> Settlement Center
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Billing History */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <h2 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Unified Transaction History</h2>
              <button className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">Download Statement</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Ref ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(!Array.isArray(bills) || bills.length === 0) ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic">No billing records found.</td>
                    </tr>
                  ) : bills.map((bill) => (
                    <tr key={bill._id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4 text-[11px] font-bold text-blue-600 uppercase tracking-tighter">#{bill._id.slice(-6).toUpperCase()}</td>
                      <td className="px-6 py-4 text-[11px] text-gray-500 font-bold uppercase tracking-tighter">{new Date(bill.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-900 text-right">₹{bill.totalAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                         <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                           bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                         }`}>
                            {bill.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button 
                          onClick={() => handleDownload(bill._id)}
                          className="p-2 text-gray-300 hover:text-blue-600 transition-all"
                         >
                            <FileText size={16} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Methods & Summary */}
        <div className="space-y-4">
           {/* Classic Payment Terminal */}
           <div className="bg-gray-900 px-7 py-8 rounded-lg shadow-xl text-white border border-gray-800">
              <div className="flex items-center gap-2 mb-8">
                 <ShieldCheck className="text-blue-500" size={18} />
                 <h3 className="text-xs font-bold uppercase tracking-widest">Clinical Checkout</h3>
              </div>
              <div className="space-y-8">
                 <div className="flex justify-between items-end border-b border-white/5 pb-8">
                    <div>
                       <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mb-2 font-mono">Total Outstanding</p>
                       <h2 className="text-4xl font-bold tracking-tight">₹{totalUnpaid.toLocaleString()}</h2>
                    </div>
                    {totalUnpaid > 0 && (
                      <span className="bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest mb-1">Due</span>
                    )}
                 </div>
                 
                 <div className="space-y-3">
                    <button className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/40">
                       <Smartphone size={16} /> Instant UPI Pay
                    </button>
                    <button className="w-full py-3.5 bg-white/5 border border-white/10 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                       <CreditCard size={16} className="text-blue-400" /> Card / Netbanking
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-[10px] font-bold text-gray-800 mb-3 flex items-center gap-2 uppercase tracking-widest">
                 <CheckCircle size={14} className="text-emerald-500" /> Compliance & Security
              </h3>
              <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                 Verified clinical payment gateway. All transactions are logged and encrypted using institutional-grade 256-bit SSL protocols.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientBilling;
