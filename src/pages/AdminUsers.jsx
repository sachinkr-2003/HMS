import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserPlus, Shield, Edit2, Trash2, MoreVertical, Filter, X, Loader2, AlertCircle } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'doctor'
    });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/auth/users');
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error("User Registry Failure:", err);
            setUsers([]); // Decommission static registry
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                email: user.email,
                password: '', // Keep empty for security
                role: user.role
            });
        } else {
            setEditingUser(null);
            setFormData({ name: '', email: '', password: '', role: 'doctor' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            if (editingUser) {
                await axios.put(`http://localhost:5000/api/auth/users/${editingUser._id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/auth/register', formData);
            }
            await fetchUsers();
            setShowModal(false);
            setFormData({ name: '', email: '', password: '', role: 'doctor' });
        } catch (err) {
            setError(err.response?.data?.message || "Credential Authorization Failure.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Authorize Access Termination? This action is permanent.")) {
            try {
                if (users.find(u => u._id === id)?.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1) {
                    alert("Institutional Protocol: Primary Admin cannot be terminated.");
                    return;
                }
                await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
                await fetchUsers();
            } catch (err) {
                alert("Authorization Denied. Security Clearance Required.");
            }
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">User Management</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Configure system access and manage hospital staff hierarchy.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 text-sm uppercase tracking-wider"
                >
                    <UserPlus size={18} /> Add New Staff
                </button>
            </div>

            {/* Compact Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 font-mono">Total Hospital Staff</p>
                    <h3 className="text-2xl font-bold text-gray-900">{users.length.toString().padStart(2, '0')} units</h3>
                </div>
                <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md border-l-4 border-l-emerald-500">
                    <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 font-mono text-center">Active Authenticated Units</p>
                    <h3 className="text-2xl font-bold text-gray-900 text-center">{users.length.toString().padStart(2, '0')}</h3>
                </div>
                <div className="p-5 bg-gray-900 rounded-xl border border-gray-800 shadow-xl border-l-4 border-l-blue-500">
                    <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 font-mono text-right">Primary Control Units</p>
                    <h3 className="text-2xl font-bold text-white text-right">{users.filter(u => u.role === 'admin').length.toString().padStart(2, '0')}</h3>
                </div>
            </div>

            {/* Standard Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/50">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Find staff by name or role..." 
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all text-xs font-bold text-gray-700" 
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Institutional Identity</th>
                                <th className="px-6 py-4">Assigned Clearance</th>
                                <th className="px-6 py-4">Terminal Status</th>
                                <th className="px-6 py-4 text-right">Access Ops</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-900 text-blue-400 flex items-center justify-center font-bold text-base uppercase shadow-lg shadow-blue-100/10">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{user.name}</p>
                                                <p className="text-[9px] text-gray-400 font-mono italic">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${
                                            user.role === 'admin' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-50 text-gray-500 border border-gray-100'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Link</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button 
                                                onClick={() => handleOpenModal(user)}
                                                className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                                            >
                                                <Edit2 size={15} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Master Unit Control Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <div>
                                <h2 className="text-base font-bold text-gray-800 uppercase tracking-widest">{editingUser ? 'Adjust Access Clearance' : 'Grant New Access'}</h2>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Institutional Credential Registry</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                <X size={18} className="text-gray-400" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            {error && (
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-3 text-rose-600">
                                    <AlertCircle size={18} />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Staff Legal Identity</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="Enter full legal name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">System Dispatch Email</label>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="admin@institution.com"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Assigned Unit</label>
                                    <select 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-xs font-bold text-gray-700 uppercase"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    >
                                        <option value="doctor">Doctor</option>
                                        <option value="pharmacy">Pharmacy</option>
                                        <option value="lab">Laboratory</option>
                                        <option value="ward">Ward</option>
                                        <option value="billing">Billing</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">{editingUser ? 'Update Key (Opt.)' : 'Secret Key'}</label>
                                    <input 
                                        type="password" 
                                        required={!editingUser}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-mono"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 mt-4 bg-gray-900 text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 shadow-2xl transition-all active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (editingUser ? "Authorize Credential Adjustment" : "Authorize Access Level")}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
