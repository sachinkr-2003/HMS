import React from 'react';
import { Pill, AlertTriangle, TrendingUp, Package, Search, ArrowRight, DollarSign, Calendar } from 'lucide-react';

const AdminPharmacy = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Pharmacy Operations Control</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Institutional medication inventory and pharmaceutical analytics.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Calendar size={14} className="text-blue-500" /> {new Date().toDateString()}
                </div>
            </div>

            {/* Compact Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Total Medication Stock</p>
                    <h3 className="text-xl font-bold text-gray-900">4,281 Unique SKUs</h3>
                    <div className="mt-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Synchronized</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Critical Stock Alerts</p>
                    <h3 className="text-xl font-bold text-red-500">12 Item Groups</h3>
                    <div className="mt-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-red-500 uppercase">Action Pending</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Pharmacy Daily Revenue</p>
                    <h3 className="text-xl font-bold text-gray-900">₹42,500.00</h3>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase">
                        View Detailed Billings
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h2 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Low Stock Inventory Logs</h2>
                        <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">Full Inventory View</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Medication SKU</th>
                                    <th className="px-6 py-4 text-center">Batch Level</th>
                                    <th className="px-6 py-4 text-center">Reorder Pnt</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Procure</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { name: 'Paracetamol 650mg', stock: 45, threshold: 200, status: 'Critical' },
                                    { name: 'Amoxicillin 500mg', stock: 12, threshold: 100, status: 'Critical' },
                                    { name: 'Insulin Glargine', stock: 8, threshold: 20, status: 'Low' },
                                ].map((med, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-800">{med.name}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Generic Formulation</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-red-500 text-center">{med.stock}</td>
                                        <td className="px-6 py-4 text-[10px] font-bold text-gray-400 text-center">{med.threshold}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                                                med.status === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>{med.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-all">
                                                <ArrowRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between border border-gray-800">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6 text-blue-400">
                           <TrendingUp size={18} />
                           <h2 className="text-[11px] font-bold uppercase tracking-widest">Inventory Intelligence</h2>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Demand Forecast</p>
                            <p className="text-xs text-blue-100 font-medium leading-relaxed italic">
                                Predicted 25% surge in respiratory medications for upcoming week based on OPD records.
                            </p>
                        </div>
                        <div className="space-y-2 mb-8">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Suggested Actions</p>
                            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/10">
                                <span className="text-[10px] text-white">Dolo 650 Bulk</span>
                                <span className="text-[10px] font-bold text-blue-400">Add to PO</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50">
                        Sync Procurement
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPharmacy;
