import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Calendar, Filter, Clock, MoreVertical, X, Check, Plus, Loader2, AlertCircle } from 'lucide-react';

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/appointments');
            setAppointments(res.data);
            setLoading(false);
        } catch (err) {
            setError("Connection to appointment registry failed.");
            setAppointments([]); // Show empty state instead of static data
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/appointments/${id}/status`, { status });
            fetchAppointments(); // Refresh
        } catch (err) {
            console.error("Update failed");
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Appointment Control</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Real-time scheduling and clinician allocation management.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 text-sm">
                    <Plus size={18} /> Add Booking
                </button>
            </div>

            {/* Standard Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/50">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Find appointment ID, patient or doctor..." 
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all text-xs font-medium" 
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Ref ID</th>
                                <th className="px-6 py-4">Patient Information</th>
                                <th className="px-6 py-4">Medical Lead</th>
                                <th className="px-6 py-4">Schedule</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {appointments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center text-gray-400 font-medium text-sm italic">
                                        No active bookings registered in the system.
                                    </td>
                                </tr>
                            ) : appointments.map((apt) => (
                                <tr key={apt._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 text-[10px] font-bold text-blue-600">#{apt._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-800">{apt.patient?.name || 'Manual Registered'}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{apt.reason || 'General Check'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-blue-600 flex items-center justify-center font-bold text-[10px] shadow-sm">
                                                {apt.doctor?.user?.name?.[0] || 'D'}
                                            </div>
                                            <div className="text-xs font-bold text-gray-700">{apt.doctor?.user?.name || 'Asst. Surgeon'}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                            <Clock size={12} className="text-blue-500" /> 
                                            {new Date(apt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="text-[9px] text-gray-400 ml-5 font-bold">{new Date(apt.appointmentDate).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                                            apt.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                                            apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                                            apt.status === 'Cancelled' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                        }`}>
                                            {apt.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {apt.status === 'Pending' && (
                                                <button 
                                                    onClick={() => handleUpdateStatus(apt._id, 'Confirmed')}
                                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-all" 
                                                >
                                                    <Check size={16} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleUpdateStatus(apt._id, 'Cancelled')}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-all" 
                                            >
                                                <X size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded transition-colors">
                                                <MoreVertical size={16} />
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
    );
};

export default AdminAppointments;
