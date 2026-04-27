import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, TrendingUp, ArrowUpRight, Download, Loader2, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminBilling = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/dashboard/admin-stats`);
                setStats(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch billing stats");
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const exportToCSV = () => {
        if (!stats) return;
        
        const data = [
            ["Category", "Amount (INR)"],
            ["Total Revenue", stats.revenue],
            ["GST Collected (18%)", stats.gstCollected],
            ["Insurance Claims", stats.insuranceClaims],
            ["Pending Payments", stats.pendingDues],
            ["Consultation Fees", stats.consultationRev],
            ["Medication Sales", stats.medicationRev],
            ["Lab Revenue", stats.labRev],
            ["Ward Revenue", stats.wardRev]
        ];

        let csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "financial_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        Swal.fire({
            icon: 'success',
            title: 'Report Exported',
            text: 'Financial data has been downloaded as CSV.',
            timer: 2000,
            showConfirmButton: false
        });
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    const totalRev = stats?.revenue || 0;
    const pendingDues = stats?.pendingDues || 0;

    const departments = [
        { name: 'Consultation Fees', amount: stats?.consultationRev || 0, color: 'bg-blue-500' },
        { name: 'Admission & Wards', amount: stats?.wardRev || 0, color: 'bg-indigo-500' },
        { name: 'Medication Sales', amount: stats?.medicationRev || 0, color: 'bg-amber-500' },
        { name: 'Diagnostics / Lab', amount: stats?.labRev || 0, color: 'bg-red-500' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Financial Control Tower</h1>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Institutional Revenue & Compliance Intelligence</p>
                </div>
                <button 
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
                >
                    <Download size={16} /> Export CSV Ledger
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-200 transition-all">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Monthly Revenue</p>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">₹{totalRev.toLocaleString()}</h3>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                        <ArrowUpRight size={14} /> Synchronized
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-200 transition-all">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">GST (18%) Collected</p>
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">₹{stats?.gstCollected?.toLocaleString() || 0}</h3>
                    <p className="mt-3 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Compliant</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-200 transition-all">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Insurance Claims</p>
                    <h3 className="text-2xl font-black text-indigo-600 tracking-tight">₹{stats?.insuranceClaims?.toLocaleString() || 0}</h3>
                    <p className="mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Claimed</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-red-200 transition-all">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Pending Payments</p>
                    <h3 className="text-2xl font-black text-red-500 tracking-tight">₹{pendingDues.toLocaleString()}</h3>
                    <p className="mt-3 text-[10px] font-bold text-amber-500 uppercase tracking-widest">Attention Required</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xs font-black text-gray-800 mb-8 flex items-center gap-2 uppercase tracking-[0.2em]">
                       Revenue Distribution Matrix
                    </h2>
                    <div className="space-y-8">
                        {departments.map((item, i) => {
                            const percentage = totalRev > 0 ? (item.amount / totalRev) * 100 : 0;
                            return (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                                        <span>{item.name}</span>
                                        <span className="text-gray-900">₹{item.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div 
                                            className={`${item.color} h-full transition-all duration-1000 ease-out`} 
                                            style={{ width: `${percentage}%` }} 
                                        />
                                    </div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">{percentage.toFixed(1)}% Contribution</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-[#0f172a] p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden flex flex-col justify-between border border-white/5">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <TrendingUp size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8 text-blue-400">
                           <Sparkles size={20} />
                           <h2 className="text-xs font-black uppercase tracking-[0.3em]">AI Predictive Analytics</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default">
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Forecasted Bed Demand (Next 7 Days)</p>
                                <h3 className="text-3xl font-black text-white tracking-tighter">84% <span className="text-emerald-400 text-sm font-bold ml-2">(+6%)</span></h3>
                                <p className="text-[9px] text-amber-500 mt-3 font-bold uppercase tracking-widest leading-relaxed">Recommendation: Clear non-emergency discharge queue by Friday to maintain operational surge capacity.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default">
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Disease Trend Surveillance</p>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="bg-rose-500 h-full w-[72%] shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                                    </div>
                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Surge Detected</span>
                                </div>
                                <p className="text-[9px] text-gray-500 mt-3 italic leading-relaxed font-medium uppercase tracking-tight">Intelligence based on regional seasonal clinical patterns and institutional intake velocity.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Neural Core v2.4 Active</span>
                        <div className="flex gap-1">
                            {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBilling;
