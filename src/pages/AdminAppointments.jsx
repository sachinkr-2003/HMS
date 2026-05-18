import React, { useState, useEffect } from 'react';
import API from '../api/axios';
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

    useEffect(() => {
        fetchAppointments();
        fetchPatientsAndDoctors();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await API.get('/appointments');
            setAppointments(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            setError("Failed to load appointments.");
            setAppointments([]);
            setLoading(false);
        }
    };

    const fetchPatientsAndDoctors = async () => {
        try {
            const [pRes, dRes] = await Promise.all([
                API.get('/patients'),
                API.get('/doctors')
            ]);
            setPatients(Array.isArray(pRes.data) ? pRes.data : []);
            setDoctors(Array.isArray(dRes.data) ? dRes.data : []);
        } catch (err) {
            console.error('Failed to fetch registry data');
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await API.put(`/appointments/${id}/status`, { status });
            fetchAppointments();
        } catch (err) {
            console.error('Update failed');
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
            await API.post('/appointments', { patient: formData.patientId, doctor: formData.doctorId, appointmentDate: formData.appointmentDate, reason: formData.reason });
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
                            {(!Array.isArray(appointments) || appointments.length === 0) ? (
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200">
                        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Calendar size={20} className="text-blue-600" />
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">New Appointment</h2>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            {error && (
                                <div className="p-3 bg-rose-50 border border-rose-100 rounded-md flex items-center gap-2 text-rose-600 text-sm font-medium">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}
                            
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase">Select Patient</label>
                                <select 
                                    required
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    value={formData.patientId}
                                    onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                                >
                                    <option value="">Choose Patient...</option>
                                    {Array.isArray(patients) && patients.map(p => (
                                        <option key={p._id} value={p._id}>{p?.name || 'Unknown Patient'}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase">Assigned Specialist</label>
                                <select 
                                    required
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    value={formData.doctorId}
                                    onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                                >
                                    <option value="">Choose Doctor...</option>
                                    {Array.isArray(doctors) && doctors.map(d => (
                                        <option key={d._id} value={d._id}>{d?.user?.name || 'Unnamed Specialist'} ({d?.specialization || 'General'})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase">Schedule Date & Time</label>
                                <input 
                                    type="datetime-local" 
                                    required
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    value={formData.appointmentDate}
                                    onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase">Reason for Visit</label>
                                <textarea 
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    rows="3"
                                    value={formData.reason}
                                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                    placeholder="Enter clinical reason..."
                                ></textarea>
                            </div>
                            
                            <div className="pt-2">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2.5 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="animate-spin" size={16} /> Processing...</>
                                    ) : (
                                        <><Calendar size={16} /> Complete Booking</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAppointments;
