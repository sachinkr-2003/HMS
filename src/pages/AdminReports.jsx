import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, BarChart3, Users, DollarSign, ArrowUpRight, Download, Calendar, Loader2, Award } from 'lucide-react';

const AdminReports = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/dashboard/admin-stats`);
                setStats(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Reports Fetch Failure");
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Header Block */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Hospital Intelligence & Reports</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-tighter">Global performance metrics and multi-departmental growth analytics.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">
                        <Download size={14} /> Global Ledger Export
                    </button>
                </div>
            </div>

            {/* Zero-State Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 leading-none">{stats?.patientCount || 0}</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Total Subject Footfall</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-emerald-300 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 leading-none">₹{(stats?.revenue || 0).toLocaleString()}</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Annual Revenue Yield</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-indigo-300 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <Award size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 leading-none">100%</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Compliance Score</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Zero State Chart */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center min-h-[300px]">
                    <BarChart3 className="text-gray-100 mb-4" size={64} />
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Institutional Trend Awaiting Data</h2>
                    <p className="text-[10px] text-gray-300 font-medium mt-2 italic">Annual patient intake trends will populate here once transactions begin.</p>
                </div>

                {/* Performance Summary */}
                <div className="bg-gray-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                        <h2 className="text-[11px] font-black mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-blue-400">
                           <TrendingUp size={18} /> Operational Efficiency Matrix
                        </h2>
                        <div className="space-y-4">
                            {[
                                { name: 'Surgery Unit', stat: 'Idle', color: 'bg-blue-500' },
                                { name: 'Diagnostics', stat: 'Awaiting', color: 'bg-emerald-500' },
                                { name: 'Pharmacy', stat: 'Online', color: 'bg-indigo-500' },
                            ].map((dept, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-1.5 h-6 ${dept.color} rounded-full`} />
                                        <span className="text-xs font-bold uppercase tracking-tight">{dept.name}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{dept.stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 border-t border-white/5 pt-6 relative z-10">
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter leading-loose">
                            System is currently in institutional zero-state. No performance variances detected across departments.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
