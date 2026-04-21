import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Calendar, Filter, Clock, MoreVertical, X, Check, Plus, Loader2, AlertCircle, User, Activity } from 'lucide-react';

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form States
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        appointmentDate: '',
        reason: ''
    });

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://hms-backend-1-uchi.onrender.com/api';

    useEffect(() => {
        fetchAppointments();
        fetchPatientsAndDoctors();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`${API_BASE}/appointments`);
            setAppointments(res.data);
            setLoading(false);
        } catch (err) {
            setError("Connection to appointment registry failed.");
            setAppointments([]); 
            setLoading(false);
        }
    };

    const fetchPatientsAndDoctors = async () => {
        try {
            const [pRes, dRes] = await Promise.all([
                axios.get(`${API_BASE}/patients`),
                axios.get(`${API_BASE}/doctors`)
            ]);
            setPatients(pRes.data);
            setDoctors(dRes.data);
        } catch (err) {
            console.error("Failed to fetch registry data");
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`${API_BASE}/appointments/${id}/status`, { status });
            fetchAppointments(); // Refresh
        } catch (err) {
            console.error("Update failed");
        }
    };

    const handleOpenModal = () => {
        setFormData({
            patientId: '',
            doctorId: '',
            appointmentDate: '',
            reason: ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${API_BASE}/appointments`, formData);
            await fetchAppointments();
            setShowModal(false);
        } catch (err) {
            setError(err.response?.data?.message || "Booking failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-100 pb-4 mb-3 px-2 sm:px-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight text-center sm:text-left">Appointment Control</h1>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1 text-center sm:text-left">Real-time scheduling and clinician allocation management.</p>
                </div>
                <button 
                    onClick={handleOpenModal}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 text-sm w-full sm:w-auto"
                >
                    <Plus size={18} /> Add Booking
                </button>
            </div>

            {/* Standard Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-3 md:p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/50">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search..." 
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

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <div>
                                <h2 className="text-base font-bold text-gray-800 uppercase tracking-widest">New Appointment</h2>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Institutional Scheduling Module</p>
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
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Select Patient</label>
                                <select 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                    value={formData.patientId}
                                    onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                                >
                                    <option value="">Choose Patient...</option>
                                    {patients.map(p => (
                                        <option key={p._id} value={p._id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Assigned Specialist</label>
                                <select 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                    value={formData.doctorId}
                                    onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                                >
                                    <option value="">Choose Doctor...</option>
                                    {doctors.map(d => (
                                        <option key={d._id} value={d._id}>{d.user?.name} ({d.specialization})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Schedule Date & Time</label>
                                <input 
                                    type="datetime-local" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                    value={formData.appointmentDate}
                                    onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Reason for Visit</label>
                                <textarea 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700"
                                    rows="3"
                                    value={formData.reason}
                                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                    placeholder="Enter clinical reason..."
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 mt-4 bg-gray-900 text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 shadow-2xl transition-all active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Authorize Secure Booking"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAppointments;
