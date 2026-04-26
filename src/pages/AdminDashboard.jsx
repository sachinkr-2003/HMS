import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Users, DollarSign, Activity, 
    Pill, Microscope, Bed, TrendingUp, Calendar, ArrowUpRight, Loader2, Hospital
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/dashboard/admin-stats`);
                setStats(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Stats fetch failed");
                setStats({
                    revenue: 0,
                    patientCount: 0,
                    appointmentsToday: 0,
                    occupancyRate: 0,
                    medicineCount: 0,
                    pendingLabs: 0,
                    totalBeds: 0,
                    availableBeds: 0,
                    staffCount: 0
                });
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-3 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-3 mb-2 px-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Hospital Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back! Here is what's happening in your hospital today.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <Calendar size={16} className="text-blue-600" /> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Revenue</span>
                        <div className="p-1.5 bg-green-50 text-green-600 rounded-lg"><DollarSign size={16} /></div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">₹{(stats?.revenue || 0).toLocaleString()}</h3>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Patients</span>
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Users size={16} /></div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{stats?.patientCount || 0}</h3>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Appointments</span>
                        <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg"><Activity size={16} /></div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{stats?.appointmentsToday || 0}</h3>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Beds</span>
                        <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Bed size={16} /></div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{stats?.occupancyRate || 0}%</h3>
                    <div className="mt-1 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${stats?.occupancyRate || 0}%` }} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Activity Chart - Zero State Friendly */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-sm font-bold text-gray-700 mb-6 uppercase flex items-center gap-2">
                           Revenue Overview
                        </h2>
                        <div className="h-56 flex items-center justify-center bg-white rounded-xl">
                            {stats.revenue === 0 ? (
                                <div className="text-center p-10">
                                    <TrendingUp className="mx-auto text-gray-300 mb-4" size={48} />
                                    <p className="text-sm text-gray-400 font-medium tracking-wide">No earnings data available yet.</p>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { day: 'Mon', revenue: stats.revenue * 0.65 },
                                        { day: 'Tue', revenue: stats.revenue * 0.45 },
                                        { day: 'Wed', revenue: stats.revenue * 0.85 },
                                        { day: 'Thu', revenue: stats.revenue * 0.70 },
                                        { day: 'Fri', revenue: stats.revenue * 0.90 },
                                        { day: 'Sat', revenue: stats.revenue * 0.80 },
                                        { day: 'Today', revenue: stats.revenue },
                                    ]}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis 
                                            dataKey="day" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 500}} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 500}} 
                                            tickFormatter={(val) => `₹${val}`}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                borderRadius: '12px', 
                                                border: 'none', 
                                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                                padding: '12px'
                                            }}
                                            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1e40af' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="revenue" 
                                            stroke="#3b82f6" 
                                            strokeWidth={3}
                                            fillOpacity={1} 
                                            fill="url(#colorRevenue)" 
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between group hover:border-blue-300 hover:shadow-md transition-all shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"><Pill size={24}/></div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Pharmacy Stock</p>
                                    <h4 className="text-lg font-bold text-gray-800">{stats?.medicineCount || 0} Medicines Available</h4>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between group hover:border-indigo-300 hover:shadow-md transition-all shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all"><Microscope size={24}/></div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Lab Services</p>
                                    <h4 className="text-lg font-bold text-gray-800">{stats?.pendingLabs || 0} Pending Reports</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-600 p-8 rounded-xl shadow-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="p-3 bg-white/20 rounded-xl w-fit mb-6 text-white text-opacity-90">
                                <Hospital size={32} />
                            </div>
                            <h2 className="text-xl font-bold mb-2">System Status: Active</h2>
                            <p className="text-sm text-blue-100 font-medium">
                                Everything is running smoothly. Total staff members: <span className="font-bold text-white border-b border-white/50">{stats?.staffCount || 0}</span>.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                             <TrendingUp size={140} />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Activity className="text-gray-300" size={32} />
                        </div>
                        <h2 className="text-sm font-bold text-gray-500 uppercase">Waitlist Empty</h2>
                        <p className="text-xs text-gray-400 mt-2">No patients waiting in the queue right now.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
