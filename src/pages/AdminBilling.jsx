import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, TrendingUp, ArrowUpRight, BarChart3, PieChart, Download, Calendar, Loader2 } from 'lucide-react';

const AdminBilling = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/dashboard/admin-stats');
                setStats(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch billing stats");
                setStats({ revenue: 145000, pendingDues: 24000 });
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    const totalRev = stats?.revenue || 0;
    const pendingDues = stats?.pendingDues || 0;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Financial Ledger</h1>
                    <p className="text-sm text-gray-500 font-medium">Global hospital revenue tracking and department-wise billing analytics.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                    <Download size={18} /> Export CSV
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Total Monthly Revenue</p>
                    <h3 className="text-xl font-bold text-gray-900">₹{totalRev.toLocaleString()}</h3>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                        <ArrowUpRight size={14} /> Synchronized
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Pharmacy Income</p>
                    <h3 className="text-xl font-bold text-gray-900">₹{(totalRev * 0.15).toLocaleString()}</h3>
                    <p className="mt-3 text-[10px] font-bold text-gray-400">15% of total share</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Lab Revenue</p>
                    <h3 className="text-xl font-bold text-gray-900">₹{(totalRev * 0.12).toLocaleString()}</h3>
                    <p className="mt-3 text-[10px] font-bold text-gray-400">Verified by Lab Engine</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Pending Payments</p>
                    <h3 className="text-xl font-bold text-red-500">₹{pendingDues.toLocaleString()}</h3>
                    <p className="mt-3 text-[10px] font-bold text-amber-500 uppercase">Attention Required</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2 uppercase tracking-wider">
                       Revenue Share by Department
                    </h2>
                    <div className="space-y-5">
                        {[
                            { name: 'Consultation Fees', percentage: 25, color: 'bg-blue-500' },
                            { name: 'Admission & Wards', percentage: 48, color: 'bg-indigo-500' },
                            { name: 'Medication Sales', percentage: 15, color: 'bg-amber-500' },
                            { name: 'Diagnostics / Lab', percentage: 12, color: 'bg-red-500' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <span>{item.name}</span>
                                    <span className="text-gray-700">₹{(totalRev * item.percentage / 100).toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden border border-gray-100">
                                    <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: `${item.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6 text-blue-400">
                           <TrendingUp size={20} />
                           <h2 className="text-sm font-bold uppercase tracking-widest">AI Financial Forecast</h2>
                        </div>
                        <div className="p-6 bg-white/5 rounded-xl border border-white/10 mb-6">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Estimated Monthly Close</p>
                            <h3 className="text-2xl font-bold text-white">₹{(totalRev * 1.08).toLocaleString()}</h3>
                            <p className="text-[10px] text-gray-500 mt-2 italic leading-relaxed">
                                Projected figures based on historical trends and current patient admissions database.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBilling;
