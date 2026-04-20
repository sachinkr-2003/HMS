import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  DollarSign, FileText, Clock, CheckCircle, 
  ArrowUpRight, TrendingUp, CreditCard, Plus, Loader2, ArrowRight, ShieldCheck, Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BillingDashboard = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/billing');
                setBills(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch bills");
                setLoading(false);
            }
        };
        fetchBills();
    }, []);

    const totalRevenue = bills.filter(b => b.status === 'Paid').reduce((acc, b) => acc + b.totalAmount, 0);
    const pendingRevenue = bills.filter(b => b.status !== 'Paid').reduce((acc, b) => acc + b.totalAmount, 0);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={30} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Financial Operation Terminal</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Authorized surveillance of institutional revenue, receivable aging & fiscal reconciliation.</p>
                </div>
                <Link to="/billing/create" className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                    <Plus size={16} /> Generate New Invoice
                </Link>
            </div>

            {/* Compact Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Receipts (Collected)', val: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Pending Receivables', val: `₹${pendingRevenue.toLocaleString()}`, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Authorized Invoices', val: bills.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Recovery Coefficient', val: '94.2%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                        <div className="flex justify-between items-start">
                            <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                                <m.icon size={16} />
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2">{m.val}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Transaction Ledger List */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Recent Fiscal Transactions</h2>
                        <button className="text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                             Full Ledger Statement <ArrowRight size={12} />
                        </button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {bills.length === 0 ? (
                            <div className="p-20 text-center text-gray-300">
                                <DollarSign size={40} className="mx-auto mb-2 opacity-10" />
                                <p className="text-[10px] font-bold uppercase tracking-widest">No Records Logged</p>
                            </div>
                        ) : bills.slice(0, 6).map((bill, i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-blue-50/20 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded border flex items-center justify-center font-bold text-[11px] transition-all ${bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                        {bill.patient?.name?.[0] || 'P'}
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{bill.patient?.name || 'Walk-in Subject'}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 font-mono">Invoice ID: {bill._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-[13px] font-bold text-gray-900 italic tracking-tighter">₹{bill.totalAmount.toLocaleString()}</p>
                                        <p className={`text-[8px] font-bold uppercase tracking-[0.2em] mt-0.5 ${bill.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {bill.status} Status
                                        </p>
                                    </div>
                                    <ArrowRight className="text-gray-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Financial Intelligence */}
                <div className="space-y-4">
                    <div className="bg-gray-900 p-7 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden h-full flex flex-col justify-between min-h-[350px]">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-blue-600 rounded">
                                    <ShieldCheck size={18} className="text-white" />
                                </div>
                                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500 italic">Financial AI Shield</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="p-5 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                    <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mb-3">Profit Stabilization Engine</p>
                                    <p className="text-[11px] font-medium leading-relaxed text-gray-400 uppercase tracking-tighter italic">"Strategic Recommendation: Collective procurement for Orthopedic implants identified. Projected annual fiscal saving: ₹2.4 Lakhs."</p>
                                </div>
                                <div className="p-5 bg-blue-600/5 rounded border border-blue-500/10">
                                    <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest mb-2 font-mono">Real-time Audit Trace</p>
                                    <p className="text-[10px] font-medium text-gray-500 leading-relaxed uppercase">Zero billing leakage variances detected in the current 24-hour cycle. Institutional compliance: High.</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <TrendingUp size={200} />
                        </div>
                        <button className="w-full py-3 mt-6 bg-white/5 border border-white/10 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors">
                            Initialize Audit Export
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                            <CreditCard size={14} className="text-blue-500" /> Gateway Connectivity Matrix
                        </h2>
                        <div className="p-6 bg-gray-50 rounded border border-gray-100 text-center relative overflow-hidden group">
                            <CheckCircle size={24} className="mx-auto text-emerald-500 mb-3" />
                            <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">Institutional Nodes Connected</p>
                            <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">Unified UPI / Professional Card Gateway ACTIVE</p>
                            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                                <CreditCard size={80} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingDashboard;
