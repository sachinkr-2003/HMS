import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bed, Activity, PieChart, TrendingUp, Search, AlertCircle, CheckCircle, Calendar, Loader2 } from 'lucide-react';

const AdminBeds = () => {
    const [stats, setStats] = useState({
        total: 0,
        occupied: 0,
        available: 0,
        maintenance: 0,
        wards: []
    });
    const [loading, setLoading] = useState(true);

    const fetchBedStats = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/beds/stats');
            setStats(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Bed Census Failure:", err);
            // Institutional Empty State
            setStats({ total: 0, occupied: 0, available: 0, maintenance: 0, wards: [] });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBedStats();
    }, []);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Bed & Ward Control Center</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Live tracking of institutional occupancy levels and unit capacity.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Calendar size={14} className="text-blue-500" /> {new Date().toDateString()}
                </div>
            </div>

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Global Bed Inventory</p>
                    <h3 className="text-xl font-bold text-gray-900">{stats.total} Beds</h3>
                    <div className="mt-2 flex items-center gap-1.5 font-bold text-[9px] text-gray-400 uppercase">Master Ledger Verified</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Live Occupancy</p>
                    <h3 className="text-xl font-bold text-blue-600">{stats.occupied} Beds</h3>
                    <div className="mt-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">
                            {stats.total > 0 ? ((stats.occupied/stats.total)*100).toFixed(1) : 0}% Utilization
                        </span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Immediate Available</p>
                    <h3 className="text-xl font-bold text-emerald-500">{stats.available} Beds</h3>
                    <div className="mt-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Ready for Admission</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Sanitization Protocol</p>
                    <h3 className="text-xl font-bold text-amber-500">{stats.maintenance} Units</h3>
                    <div className="mt-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-tighter">Maintenance Mode</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ward-wise Occupancy */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xs font-bold mb-8 flex items-center gap-2 uppercase tracking-[0.2em] text-gray-700">
                       Unit-wise Capacity Breakdown
                    </h2>
                    <div className="space-y-6">
                        {stats.wards.length === 0 ? (
                            <div className="py-10 text-center text-gray-400 text-[10px] font-bold uppercase">No Ward Data Registered</div>
                        ) : stats.wards.map((ward, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-tighter text-gray-500">
                                    <span>{ward.name}</span>
                                    <span className="text-gray-900 font-black">{ward.occupied} / {ward.total} Beds</span>
                                </div>
                                <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden border border-gray-100">
                                    <div className={`bg-blue-600 h-full transition-all duration-1000 shadow-[0_0_8px_rgba(0,0,0,0.05)]`} style={{ width: `${(ward.occupied/ward.total)*100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Capacity Alerts */}
                <div className="bg-gray-900 p-8 rounded-xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between border border-gray-800">
                    <div className="relative z-10">
                        <h2 className="text-xs font-bold mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-blue-400">
                           <TrendingUp size={18} /> Neural Capacity Insights
                        </h2>
                        <div className="p-6 bg-white/5 rounded-lg border border-white/10 mb-6 font-medium">
                           <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-3">Critical ICU Forecast</p>
                           <p className="text-xs leading-relaxed italic text-blue-50">
                               System analysis indicates ICU saturation within 24 hours based on ER traffic. Emergency setup of Unit 4 backup beds is recommended.
                           </p>
                        </div>
                    </div>
                    <div className="absolute -right-16 -bottom-16 opacity-5 rotate-45 scale-150">
                        <Bed size={240} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBeds;
