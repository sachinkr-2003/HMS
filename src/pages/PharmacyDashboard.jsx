import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pill, AlertTriangle, TrendingUp, Package, Loader2, DollarSign, Activity, ChevronRight, BarChart2 } from 'lucide-react';

const PharmacyDashboard = () => {
    const [stats, setStats] = useState({
        totalMedicines: 0,
        lowStockAlerts: 0,
        dailySales: 0,
        recentInvoices: 0
    });
    const [lowStockMeds, setLowStockMeds] = useState([]);
    const [expiringMeds, setExpiringMeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pharmacy`);
                const allMeds = res.data;
                
                const lowStock = allMeds.filter(m => m.stock < (m.minStockLevel || 10));
                
                // Fetch Expiring Meds
                const expiryRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pharmacy/expiry`);
                setExpiringMeds(expiryRes.data);

                setStats({
                    totalMedicines: allMeds.length,
                    lowStockAlerts: lowStock.length,
                    dailySales: 0,
                    recentInvoices: 0
                });
                setLowStockMeds(lowStock);
                setLoading(false);
            } catch (err) {
                console.error("Pharmacy Sync Failure:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={30} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Simple Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Pharmacy Stock Terminal</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Unified inventory surveillance, expiry tracking & procurement intelligence.</p>
                </div>
                <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                   <Link to="/pharmacy/inventory" className="px-5 py-1.5 bg-blue-600 text-white rounded-md font-bold text-[10px] uppercase tracking-widest text-center">Inventory View</Link>
                   <Link to="/pharmacy/billing" className="px-5 py-1.5 text-gray-400 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-colors text-center">Dispensing Desk</Link>
                </div>
            </div>

            {/* Real Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Catalog', val: stats.totalMedicines, icon: Pill, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Critically Low', val: stats.lowStockAlerts, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Daily Revenue', val: `₹${stats.dailySales.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Ledger Count', val: `${stats.recentInvoices} Processed`, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                        <div className="flex justify-between items-start">
                            <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                                <m.icon size={16} />
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                        </div>
                        <h3 className={`text-xl font-bold tracking-tight mt-2 ${m.color === 'text-rose-600' ? 'text-rose-600' : 'text-gray-800'}`}>{m.val}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Real Stock Alerts */}
                <div className="lg:col-span-2 space-y-4">
                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Immediate Depletion Alerts</h2>
                            <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">View All Alerts</button>
                        </div>
                        <div className="divide-y divide-gray-50 font-inter min-h-[200px]">
                            {lowStockMeds.length === 0 ? (
                                <div className="p-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No critical stock depletion detected.</div>
                            ) : lowStockMeds.map((item, i) => (
                                <div key={item._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all border border-gray-100">
                                            <Package size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-800 uppercase">{item.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-16 bg-gray-100 h-1 rounded-full overflow-hidden">
                                                    <div className="bg-rose-500 h-full" style={{ width: `${(item.stock/10)*100}%` }} />
                                                </div>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase truncate">{item.stock} Units Remaining</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border bg-rose-50 text-rose-600 border-rose-100`}>Critically Low</span>
                                        <button className="px-4 py-1.5 bg-gray-900 text-white rounded text-[9px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">Restock</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Intelligence & Alerts */}
                <div className="space-y-4">
                     <div className="bg-red-600 p-6 rounded-lg shadow-xl text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="text-white" size={18} />
                            <h2 className="text-xs font-bold uppercase tracking-[0.1em]">Expiry Warnings</h2>
                        </div>
                        <div className="space-y-3">
                            {expiringMeds.length === 0 ? (
                                <p className="text-[10px] font-medium opacity-80 uppercase">No medicines expiring soon.</p>
                            ) : expiringMeds.slice(0, 3).map(med => (
                                <div key={med._id} className="flex justify-between items-center bg-white/10 p-2 rounded border border-white/5">
                                    <span className="text-[10px] font-bold uppercase truncate pr-2">{med.name}</span>
                                    <span className="text-[8px] font-black bg-white text-red-600 px-1.5 py-0.5 rounded">{new Date(med.expiryDate).toLocaleDateString()}</span>
                                </div>
                            ))}
                            {expiringMeds.length > 3 && <p className="text-[9px] text-center opacity-70 mt-2">+{expiringMeds.length - 3} more items...</p>}
                        </div>
                     </div>

                     <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Activity className="text-blue-600" size={18} />
                            <h2 className="text-xs font-bold uppercase text-gray-800 tracking-[0.1em]">Medicine Status</h2>
                        </div>
                        <p className="text-gray-400 text-[10px] font-medium leading-relaxed mb-4 uppercase tracking-tighter">
                            Monitoring <span className="text-blue-600 font-bold">{stats.totalMedicines}</span> SKUs for usage patterns and stock health.
                        </p>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-600 w-full" />
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacyDashboard;
