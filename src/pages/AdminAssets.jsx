import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Activity, Shield, AlertCircle, 
    Wrench, Truck, Calendar, 
    Download, Search, Plus, Loader2, Trash2
} from 'lucide-react';
import Swal from 'sweetalert2';

const AdminAssets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const res = await axios.get(`${API_BASE}/assets`);
            setAssets(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch assets");
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'REGISTER NEW ASSET',
            html:
                '<div class="space-y-4 pt-4">' +
                '<input id="swal-name" class="swal2-input" placeholder="Equipment Name (e.g. Ventilator)">' +
                '<input id="swal-code" class="swal2-input" placeholder="Asset Code (e.g. VEN-001)">' +
                '<select id="swal-type" class="swal2-input">' +
                '<option value="Imaging">Imaging (X-Ray/CT)</option>' +
                '<option value="Critical Care">Critical Care</option>' +
                '<option value="Diagnostic">Diagnostic</option>' +
                '<option value="General">General Medical</option>' +
                '</select>' +
                '<input id="swal-vendor" class="swal2-input" placeholder="Vendor Name">' +
                '</div>',
            showCancelButton: true,
            confirmButtonText: 'REGISTER UNIT',
            confirmButtonColor: '#2563eb',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-name').value,
                    assetCode: document.getElementById('swal-code').value,
                    type: document.getElementById('swal-type').value,
                    vendor: document.getElementById('swal-vendor').value
                };
            }
        });

        if (formValues) {
            try {
                await axios.post(`${API_BASE}/assets`, formValues);
                Swal.fire('Registered!', 'Equipment has been logged into system.', 'success');
                fetchAssets();
            } catch (err) {
                Swal.fire('Error', 'Registration failed. Check if code is unique.', 'error');
            }
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${API_BASE}/assets/${id}`, { status });
            fetchAssets();
            Swal.fire('Updated', `Asset status changed to ${status}`, 'success');
        } catch (err) {
            Swal.fire('Error', 'Update failed', 'error');
        }
    };

    const filteredAssets = assets.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.assetCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: assets.length,
        operational: assets.filter(a => a.status === 'Operational').length,
        maintenance: assets.filter(a => a.status === 'Maintenance').length,
        critical: assets.filter(a => a.status === 'Repair Required' || a.status === 'Low Battery').length
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            {/* Simple Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Medical Assets Ledger</h1>
                    <p className="text-sm text-gray-500">Official registry for hospital equipment and lifecycle tracking.</p>
                </div>
                <button 
                    onClick={handleRegister}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md"
                >
                    <Plus size={18} /> Register New Unit
                </button>
            </div>

            {/* Real Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Inventory', val: stats.total, color: 'text-gray-900', bg: 'bg-white' },
                    { label: 'Operational', val: stats.operational, color: 'text-emerald-600', bg: 'bg-emerald-50/30' },
                    { label: 'In Maintenance', val: stats.maintenance, color: 'text-amber-600', bg: 'bg-amber-50/30' },
                    { label: 'Attention Required', val: stats.critical, color: 'text-rose-600', bg: 'bg-rose-50/30' }
                ].map((m, i) => (
                    <div key={i} className={`${m.bg} p-6 border border-gray-200 rounded-xl shadow-sm`}>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                        <h3 className={`text-2xl font-black ${m.color}`}>{m.val} Units</h3>
                    </div>
                ))}
            </div>

            {/* Assets Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Filter by Code or Name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" 
                        />
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Showing {filteredAssets.length} Units
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Asset Code</th>
                                <th className="px-6 py-4">Equipment Info</th>
                                <th className="px-6 py-4">Current Status</th>
                                <th className="px-6 py-4">Vendor</th>
                                <th className="px-6 py-4 text-right">Ops</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAssets.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-sm">No medical assets registered.</td>
                                </tr>
                            ) : filteredAssets.map(asset => (
                                <tr key={asset._id} className="hover:bg-blue-50/10 transition-all">
                                    <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">{asset.assetCode}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-800 uppercase">{asset.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{asset.type}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={asset.status}
                                            onChange={(e) => updateStatus(asset._id, e.target.value)}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase outline-none border ${
                                                asset.status === 'Operational' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                asset.status === 'Maintenance' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                            }`}
                                        >
                                            <option value="Operational">Operational</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Repair Required">Repair Required</option>
                                            <option value="Low Battery">Low Battery</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">{asset.vendor || 'Institutional'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-300 hover:text-blue-600"><Activity size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Vendor Supply Chain Block */}
            <div className="p-8 bg-[#0f172a] rounded-2xl text-white flex flex-col md:flex-row items-center justify-between border border-white/5 shadow-2xl gap-6">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-blue-600/20 rounded-2xl text-blue-400">
                        <Truck size={32} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em]">Asset Supply Intelligence</h4>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">Connect with registered healthcare vendors for lifecycle maintenance, AMC renewals and critical part procurement.</p>
                    </div>
                </div>
                <button className="whitespace-nowrap px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">Vendor Directory</button>
            </div>
        </div>
    );
};

export default AdminAssets;
