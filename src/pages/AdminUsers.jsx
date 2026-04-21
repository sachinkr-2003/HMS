import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
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
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/users`);
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
            const dataToSubmit = { ...formData, role: formData.role.toLowerCase() };
            if (editingUser) {
                await axios.put(`${import.meta.env.VITE_API_BASE_URL}/auth/users/${editingUser._id}`, dataToSubmit);
                Swal.fire({
                    icon: 'success',
                    title: 'Credentials Adjusted',
                    text: 'Staff clearance level has been synchronized.',
                    confirmButtonColor: '#2563eb'
                });
            } else {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, dataToSubmit);
                Swal.fire({
                    icon: 'success',
                    title: 'Access Granted',
                    text: 'New staff unit has been onboarded successfully.',
                    confirmButtonColor: '#2563eb'
                });
            }
            await fetchUsers();
            setShowModal(false);
            setFormData({ name: '', email: '', password: '', role: 'doctor' });
        } catch (err) {
            setError(err.response?.data?.message || "Credential Authorization Failure.");
            Swal.fire({
                icon: 'error',
                title: 'Authorization Failure',
                text: err.response?.data?.message || "System denied the credential request.",
                confirmButtonColor: '#dc2626'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Terminate Access?',
            text: "This action will permanently revoke institutional credentials.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Confirm Termination',
            cancelButtonText: 'Abort'
        });

        if (result.isConfirmed) {
            try {
                if (users.find(u => u._id === id)?.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1) {
                    Swal.fire('Protocol Violation', 'Primary Admin cannot be terminated.', 'error');
                    return;
                }
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/auth/users/${id}`);
                await fetchUsers();
                Swal.fire('Deleted!', 'User access has been neutralized.', 'success');
            } catch (err) {
                Swal.fire('Access Denied', 'Institutional clearance required to delete users.', 'error');
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
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {error && (
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-3 text-rose-600">
                                    <AlertCircle size={18} />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide ml-1">Staff Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-semibold text-gray-700"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g. Rahul Sharma"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-semibold text-gray-700"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="name@hospital.com"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide ml-1">Account Role</label>
                                    <select 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-xs font-bold text-gray-700"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    >
                                        <option value="doctor">Doctor</option>
                                        <option value="staff">Staff / Reception</option>
                                        <option value="pharmacy">Pharmacy</option>
                                        <option value="lab">Laboratory</option>
                                        <option value="ward">Ward</option>
                                        <option value="billing">Billing</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide ml-1">{editingUser ? 'New Password' : 'Password'}</label>
                                    <input 
                                        type="password" 
                                        required={!editingUser}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        placeholder="Min 6 characters"
                                    />
                                </div>
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 mt-2 bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-xl transition-all active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (editingUser ? "Update User Account" : "Register New Staff")}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
