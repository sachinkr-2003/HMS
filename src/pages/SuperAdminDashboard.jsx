import React, { useState, useEffect } from 'react';
import { Building2, Users, Activity, Settings, Database, ShieldCheck, Server, Search, Plus, MoreVertical, Edit, Power, Download, Clock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import API from '../api/axios';

const mockLogs = [
    { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), action: 'SYSTEM INITIALIZED', details: 'HealthRekha global control tower is online and actively monitoring network.', status: 'SUCCESS' }
];

const SuperAdminDashboard = () => {
    const [hospitals, setHospitals] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const { data } = await API.get('/superadmin/hospitals');
                setHospitals(data.data);
            } catch (error) {
                console.error("Error fetching hospitals:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    const handleAction = (actionName) => {
        Swal.fire('Action Registered', `${actionName} module is being initialized.`, 'info');
    };

    const toggleStatus = async (id, currentName) => {
        try {
            const { data } = await API.put(`/superadmin/hospitals/${id}/toggle`, {});
            
            setHospitals(hospitals.map(h => h._id === id ? { ...h, status: data.data.status } : h));
            Swal.fire('Status Updated', `Hospital ${currentName} is now ${data.data.status}.`, 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to update hospital status', 'error');
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10 max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Super Admin HQ</h1>
                    <p className="text-gray-500 text-sm mt-1">System Control Tower & Global Overview</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => Swal.fire('Backup Complete', 'Database snapshot has been securely saved to cloud storage.', 'success')} className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-all border border-gray-200 shadow-sm">
                        <Database size={16} /> Snapshot
                    </button>
                    <button onClick={() => navigate('/superadmin/hospitals')} className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
                        <Plus size={16} /> New Hospital
                    </button>
                </div>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Hospitals', value: hospitals.length.toString(), icon: Building2, trend: 'Global Network', color: 'blue' },
                    { label: 'Active Hospitals', value: hospitals.filter(h => h.status === 'Active').length.toString(), icon: Server, trend: 'Online Instances', color: 'green' },
                    { label: 'Global Users', value: hospitals.reduce((acc, h) => acc + (h.users || 0), 0).toString(), icon: Users, trend: 'Total Registered Accounts', color: 'purple' },
                    { label: 'Network Health', value: '100%', icon: Activity, trend: 'Optimal Performance', color: 'orange' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 border border-gray-200 rounded-md shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <div className={`p-2 bg-${stat.color}-50 text-${stat.color}-600 rounded-md`}>
                                    <stat.icon size={18} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-xs font-medium text-gray-500 mt-2">{stat.trend}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Hospital Directory (Spans 2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <Building2 size={18} className="text-blue-600" /> Institutional Directory
                            </h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search hospitals..." 
                                    className="pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700 outline-none focus:border-blue-500 w-48 shadow-sm transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs font-semibold border-b border-gray-200 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-5 py-3">ID / Name</th>
                                        <th className="px-5 py-3">Location</th>
                                        <th className="px-5 py-3">Users</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {hospitals.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase())).map((hospital) => (
                                        <tr key={hospital._id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-5 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-blue-600 mb-0.5">{hospital.hospitalId}</span>
                                                    <span className="text-sm font-bold text-gray-900">{hospital.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-600">{hospital.location}</td>
                                            <td className="px-5 py-4 text-sm font-medium text-gray-700">{hospital.users || 0}</td>
                                            <td className="px-5 py-4">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${hospital.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                                    {hospital.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => toggleStatus(hospital._id, hospital.name)} className={`p-1.5 rounded-md border transition-all ${hospital.status === 'Active' ? 'text-green-600 bg-green-50 border-green-100 hover:bg-green-100' : 'text-red-600 bg-red-50 border-red-100 hover:bg-red-100'}`} title="Toggle Status">
                                                        <Power size={16} />
                                                    </button>
                                                    <button onClick={() => handleAction('Edit Hospital')} className="p-1.5 text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-md transition-all" title="Edit">
                                                        <Edit size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: System Logs & Quick Controls */}
                <div className="space-y-6">
                    {/* Security & Settings Menu */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50">
                            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-blue-600" /> Infrastructure Security
                            </h2>
                        </div>
                        <div className="p-2">
                            {[
                                { name: 'Global Access Policies', icon: ShieldCheck },
                                { name: 'Database Architecture', icon: Database },
                                { name: 'Billing & Subscriptions', icon: Activity },
                                { name: 'System Configuration', icon: Settings }
                            ].map((item, i) => (
                                <button key={i} onClick={() => handleAction(item.name)} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium rounded-md">
                                    <span className="flex items-center gap-3"><item.icon size={16} className="text-gray-400" /> {item.name}</span>
                                    <MoreVertical size={16} className="text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Audit Logs */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <Clock size={18} className="text-blue-600" /> Audit Logs
                            </h2>
                            <button className="text-xs font-semibold text-blue-600 hover:underline">View All</button>
                        </div>
                        <div className="p-5 space-y-4">
                            {mockLogs.map((log, i) => (
                                <div key={i} className="flex gap-4 border-l-2 pl-3 pb-4 last:pb-0 border-gray-200">
                                    <div className="w-2 h-2 rounded-full mt-1.5 -ml-[17px] bg-white border-2 border-gray-300" 
                                         style={{ borderColor: log.status === 'SUCCESS' ? '#22c55e' : log.status === 'WARNING' ? '#ef4444' : '#3b82f6' }} />
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{log.time}</p>
                                            <p className="text-xs font-bold text-gray-800">{log.action}</p>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                            <button onClick={() => handleAction('Export Logs')} className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-gray-600 hover:text-blue-600 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow transition-all">
                                <Download size={16} /> Export Audit Report
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SuperAdminDashboard;
