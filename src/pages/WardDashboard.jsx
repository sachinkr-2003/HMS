import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { 
  Bed, 
  UserPlus, 
  Clock, 
  Activity,
  Loader2,
  Building,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';

const WardDashboard = () => {
    const [stats, setStats] = useState({
        totalBeds: 0,
        availableBeds: 0,
        occupiedBeds: 0,
        occupancyRate: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get('/dashboard/admin-stats');
                setStats({
                    totalBeds: res.data.totalBeds,
                    availableBeds: res.data.availableBeds,
                    occupiedBeds: res.data.totalBeds - res.data.availableBeds,
                    occupancyRate: res.data.occupancyRate
                });
                setLoading(false);
            } catch (err) {
                console.error("Dashboard Fetch Error");
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            {/* Simple Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Ward Overview Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Real-time bed management and patient occupancy summary.</p>
                </div>
                <button 
                    onClick={() => navigate('/ward/beds')}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md"
                >
                    <LayoutGrid size={18} /> Manage Bed Grid
                </button>
            </div>

            {/* Simple Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Beds', val: stats.totalBeds, icon: Bed, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Occupied Beds', val: stats.occupiedBeds, icon: UserPlus, color: 'text-red-600', bg: 'bg-red-50/50' },
                    { label: 'Available Beds', val: stats.availableBeds, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
                    { label: 'Occupancy Rate', val: `${stats.occupancyRate}%`, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50/50' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:border-blue-400 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                                <m.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.label}</span>
                        </div>
                        <h3 className="text-2xl font-black text-gray-800">{m.val}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Capacity Card */}
                <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[300px]">
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Hospital Capacity Chart</h2>
                        <span className="text-xs font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-full">Live Stats</span>
                    </div>

                    {stats.totalBeds === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-gray-400 space-y-3">
                            <Building size={48} className="opacity-20" />
                            <p className="text-sm font-medium">No beds found in the database.</p>
                        </div>
                    ) : (
                        <div className="space-y-10 py-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Current Bed Utilization</p>
                                        <p className="text-2xl font-black text-gray-800">{stats.occupiedBeds} <span className="text-sm font-normal text-gray-400">/ {stats.totalBeds} BEDS</span></p>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600">{stats.occupancyRate}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-blue-600 h-full transition-all duration-1000 shadow-lg shadow-blue-100" 
                                        style={{ width: `${stats.occupancyRate}%` }} 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Available Units</p>
                                    <p className="text-xl font-bold text-emerald-600">{stats.availableBeds}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Emergency Reserves</p>
                                    <p className="text-xl font-bold text-gray-800">02</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info / Quick Links Card */}
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600 border border-gray-100">
                                <Clock size={20} />
                            </div>
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Quick Summary</h2>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Current ward status is **Normal**. No immediate surges detected in the last 24 hours. Emergency units are on standby.
                        </p>
                    </div>

                    <div className="space-y-3 pt-6 mt-6 border-t border-gray-200">
                        <button 
                            onClick={() => navigate('/ward/admissions')}
                            className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold uppercase hover:bg-gray-100 transition-all text-center flex items-center justify-center gap-2"
                        >
                            <UserPlus size={14} /> New Admission
                        </button>
                        <button 
                            onClick={() => navigate('/ward/roster')}
                            className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold uppercase hover:bg-gray-100 transition-all text-center flex items-center justify-center gap-2"
                        >
                            <LayoutGrid size={14} /> Staff Roster
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WardDashboard;
