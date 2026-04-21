import React, { useState, useEffect } from 'react';
import { 
    Activity, Shield, AlertCircle, 
    Wrench, Truck, Calendar, 
    Download, Search, Plus 
} from 'lucide-react';

import axios from 'axios';

const AdminAssets = () => {
    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/assets`);
            setAssets(res.data);
        } catch (err) {
            console.error("Failed to fetch assets");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Medical Assets & Equipment</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Lifecycle tracking and maintenance scheduling for hospital hardware.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md">
                        <Plus size={16} /> Register Asset
                    </button>
                </div>
            </div>

            {/* Asset Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Assets', val: '482', color: 'text-gray-900' },
                    { label: 'Operational', val: '456', color: 'text-emerald-600' },
                    { label: 'In Maintenance', val: '18', color: 'text-amber-600' },
                    { label: 'Critical Failure', val: '08', color: 'text-rose-600' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                        <h3 className={`text-xl font-black ${m.color}`}>{m.val} Units</h3>
                    </div>
                ))}
            </div>

            {/* Assets Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input type="text" placeholder="Search by Asset ID or Name..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold outline-none" />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600"><Download size={18} /></button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Asset Code</th>
                                <th className="px-6 py-4">Equipment Info</th>
                                <th className="px-6 py-4">Maintenance Status</th>
                                <th className="px-6 py-4">Next Service Due</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {assets.map(asset => (
                                <tr key={asset.id} className="hover:bg-blue-50/20 transition-all font-medium">
                                    <td className="px-6 py-4 text-[10px] font-mono text-gray-400">{asset.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-[11px] font-bold text-gray-800 uppercase">{asset.name}</p>
                                        <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest">{asset.type}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                                            asset.status === 'Operational' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                            asset.status === 'Maintenance' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] font-bold text-gray-500">{asset.nextService}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">Log Maintenance</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Vendor Management Placeholder */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white flex items-center justify-between border border-slate-800 shadow-xl">
                <div className="flex items-center gap-4">
                    <Truck className="text-blue-400" size={24} />
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest">Global Asset Supply Chain</h4>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight mt-1">Connect with registered healthcare vendors for equipment procurement and AMC renewals.</p>
                    </div>
                </div>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Vendor Directory</button>
            </div>
        </div>
    );
};

export default AdminAssets;
