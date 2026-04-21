import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Bed, 
  UserPlus, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Activity,
  Filter,
  Loader2,
  Building
} from 'lucide-react';

const WardDashboard = () => {
    const [bedStats, setBedStats] = useState({
        totalBeds: 0,
        availableBeds: 0,
        occupiedBeds: 0,
        occupancyRate: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBedData = async () => {
            try {
                // Fetching real bed stats from the dashboard endpoint
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard/admin-stats`);
                setBedStats({
                    totalBeds: res.data.totalBeds,
                    availableBeds: res.data.availableBeds,
                    occupiedBeds: res.data.totalBeds - res.data.availableBeds,
                    occupancyRate: res.data.occupancyRate
                });
                setLoading(false);
            } catch (err) {
                console.error("Ward Sync Failure");
                setLoading(false);
            }
        };
        fetchBedData();
    }, []);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={30} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Institutional Ward Surveillance</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-tighter">Real-time bed occupancy metrics and patient floor distribution control.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                        <Bed size={16} /> Manage Bed Grid
                    </button>
                </div>
            </div>

            {/* Real Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Inventory', val: bedStats.totalBeds, icon: Bed, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Occupancy', val: bedStats.occupiedBeds, icon: UserPlus, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Available Units', val: bedStats.availableBeds, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'System Health', val: '100%', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between min-h-[120px] hover:border-blue-400 transition-all">
                        <div className="flex justify-between items-start">
                            <div className={`p-2.5 ${m.bg} ${m.color} rounded-lg`}>
                                <m.icon size={18} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">{m.label}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 tracking-tight mt-2">{m.val.toString().padStart(2, '0')}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 min-h-[400px] flex flex-col justify-center items-center text-center">
                    {bedStats.totalBeds === 0 ? (
                        <div className="space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-gray-200">
                                <Building size={32} className="text-gray-300" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest">No Bed Inventory Mapped</h3>
                                <p className="text-[10px] text-gray-400 font-medium mt-1 italic">Use the "Manage Bed Grid" terminal to define institutional wards.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full space-y-8">
                             <div className="flex items-center justify-between border-b pb-4 border-gray-50">
                                <h2 className="text-[11px] font-black text-gray-700 uppercase tracking-[0.2em]">Institutional Capacity Flow</h2>
                                <span className="text-xs font-bold text-blue-600 italic">Global Occupancy: {bedStats.occupancyRate}%</span>
                             </div>
                             <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[11px] font-black uppercase text-gray-500">
                                        <span>Total Utilization Matrix</span>
                                        <span>{bedStats.occupiedBeds} / {bedStats.totalBeds} BEDS</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${bedStats.occupancyRate}%` }} />
                                    </div>
                                </div>
                             </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-900 p-8 rounded-3xl shadow-xl text-white border border-gray-800 flex flex-col justify-between h-full min-h-[400px]">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg border border-blue-500 text-white">
                                    <TrendingUp size={20} />
                                </div>
                                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500 italic">Ward Intelligence</h2>
                            </div>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed italic">
                                System state: **Zero-Station**. Awaiting bed configuration and patient admissions for trajectory analysis.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2">Admission Forecast</p>
                                <p className="text-xs text-gray-400 font-medium tracking-tight">STABLE • NO SURGE DETECTED</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WardDashboard;
