import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Calendar, Clock, User, 
    ArrowLeftRight, Filter, Download, 
    CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight,
    Plus, Loader2
} from 'lucide-react';
import Swal from 'sweetalert2';

const StaffRoster = () => {
    const [viewDate, setViewDate] = useState(new Date());
    const [rosterData, setRosterData] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchRoster();
        fetchUsers();
    }, [viewDate]);

    const fetchRoster = async () => {
        try {
            const dateStr = viewDate.toISOString().split('T')[0];
            const res = await axios.get(`${API_BASE}/roster?date=${dateStr}`);
            setRosterData(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch roster");
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_BASE}/auth/users`); // Assuming this exists or using /patients as backup for demo
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users");
        }
    };

    const handleAssignShift = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'ASSIGN STAFF SHIFT',
            html:
                '<div class="space-y-4 pt-4">' +
                '<select id="swal-user" class="swal2-input">' +
                users.map(u => `<option value="${u._id}">${u.name} (${u.role})</option>`).join('') +
                '</select>' +
                '<select id="swal-shift" class="swal2-input">' +
                '<option value="Morning">Morning (08:00 - 16:00)</option>' +
                '<option value="Evening">Evening (16:00 - 00:00)</option>' +
                '<option value="Night">Night (00:00 - 08:00)</option>' +
                '<option value="General">General (09:00 - 17:00)</option>' +
                '</select>' +
                '<input id="swal-dept" class="swal2-input" placeholder="Department (e.g. Ward A)">' +
                '</div>',
            showCancelButton: true,
            confirmButtonText: 'CONFIRM ASSIGNMENT',
            confirmButtonColor: '#2563eb',
            preConfirm: () => {
                return {
                    personnel: document.getElementById('swal-user').value,
                    shift: document.getElementById('swal-shift').value,
                    department: document.getElementById('swal-dept').value,
                    role: users.find(u => u._id === document.getElementById('swal-user').value)?.role || 'Staff',
                    date: viewDate.toISOString().split('T')[0]
                };
            }
        });

        if (formValues) {
            try {
                await axios.post(`${API_BASE}/roster/assign`, formValues);
                Swal.fire('Assigned!', 'Staff shift has been registered.', 'success');
                fetchRoster();
            } catch (err) {
                const msg = err.response?.data?.message || 'Shift assignment failed.';
                Swal.fire('Error', msg, 'error');
            }
        }
    };

    const stats = {
        morning: rosterData.filter(r => r.shift === 'Morning').length,
        evening: rosterData.filter(r => r.shift === 'Evening').length,
        night: rosterData.filter(r => r.shift === 'Night').length
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            {/* Simple Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Staff Duty Roster</h1>
                    <p className="text-sm text-gray-500">Manage workforce shifts and departmental coverage.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                        <button onClick={() => setViewDate(new Date(viewDate.setDate(viewDate.getDate() - 1)))} className="p-2 hover:bg-gray-50 rounded-lg"><ChevronLeft size={16} /></button>
                        <span className="px-4 text-xs font-bold text-gray-700 uppercase min-w-[120px] text-center">
                            {viewDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <button onClick={() => setViewDate(new Date(viewDate.setDate(viewDate.getDate() + 1)))} className="p-2 hover:bg-gray-50 rounded-lg"><ChevronRight size={16} /></button>
                    </div>
                    <button 
                        onClick={handleAssignShift}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
                    >
                        <Plus size={18} /> Assign Shift
                    </button>
                </div>
            </div>

            {/* Simple Shift Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Morning Shift', val: stats.morning, icon: <Clock size={20} className="text-amber-500" />, bg: 'bg-amber-50/50' },
                    { label: 'Evening Shift', val: stats.evening, icon: <Clock size={20} className="text-indigo-500" />, bg: 'bg-indigo-50/50' },
                    { label: 'Night Shift', val: stats.night, icon: <Clock size={20} className="text-slate-500" />, bg: 'bg-slate-50/50' }
                ].map((s, i) => (
                    <div key={i} className={`${s.bg} p-6 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between`}>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                            <h3 className="text-2xl font-black text-gray-800">{s.val} Staff</h3>
                        </div>
                        {s.icon}
                    </div>
                ))}
            </div>

            {/* Roster Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Live Shift Register</h2>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Records for {viewDate.toDateString()}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Personnel</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Shift</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rosterData.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-sm italic">
                                        No shifts assigned for this date.
                                    </td>
                                </tr>
                            ) : rosterData.map(item => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-all">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-800 text-sm uppercase">{item.personnel?.name || 'Unknown'}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">{item.role}</div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{item.department}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-gray-700 uppercase">{item.shift}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase border ${
                                            item.status === 'On-Duty' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                            'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600"><ArrowLeftRight size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffRoster;
