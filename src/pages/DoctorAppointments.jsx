import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Calendar, Clock, CheckCircle, XCircle, MoreVertical, Loader2, User, Phone, Clipboard, ArrowRight } from 'lucide-react';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/appointments`);
            setAppointments(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch appointments");
            // Demo data if API fails
            setAppointments([]);
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/appointments/${id}/status`, { status });
            fetchAppointments();
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
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Consultation Queue</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Manage daily patient flow and review clinical case objectives.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 shadow-sm uppercase tracking-wider">
                    <Calendar size={14} /> Active Schedule (Today)
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Appointments List */}
                <div className="lg:col-span-2 space-y-3">
                    {appointments.length === 0 ? (
                        <div className="bg-white p-20 rounded-xl border border-gray-200 text-center text-gray-400">
                           <Clock size={32} className="mx-auto mb-4 opacity-10" />
                           <p className="text-sm font-medium italic">No clinical queue registered for today.</p>
                        </div>
                    ) : appointments.map((apt) => (
                        <div key={apt._id} className="bg-white px-6 py-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-all group overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-sm">
                                        {apt.patient?.name?.[0] || 'P'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-base font-bold text-gray-800">{apt.patient?.name || 'Patient'}</h3>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                                                apt.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                                                apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-50 text-gray-400 border border-gray-100'
                                            }`}>
                                                {apt.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1.5">
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                                <Clock size={12} className="text-blue-500" /> 
                                                {new Date(apt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                                <Clipboard size={12} className="text-blue-500" /> 
                                                {apt.reason || 'Symptom Review'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {apt.status !== 'Completed' && (
                                        <button 
                                            onClick={() => handleStatusChange(apt._id, 'Completed')}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-[9px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 flex items-center gap-1.5"
                                        >
                                            Verify Visit <ArrowRight size={12} />
                                        </button>
                                    )}
                                    <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Patient Insights / Alerts */}
                <div className="space-y-6">
                    <div className="bg-gray-900 px-6 py-8 rounded-xl shadow-xl text-white border border-gray-800 relative">
                        <div className="flex items-center gap-2 mb-6 font-bold text-blue-400 text-[10px] uppercase tracking-widest border-b border-white/5 pb-3">
                            <CheckCircle size={14} /> Intelligence Protocol
                        </div>
                        <p className="text-xs font-medium leading-relaxed italic text-blue-50 border-l-2 border-blue-500/30 pl-4">
                            "Cross-reference AI Diagnostic trends with current patient vitals. Interaction flags and recent lab shifts are highlighted in the digital timeline."
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col justify-between h-48">
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Terminal Status</p>
                           <h4 className="text-xs font-bold text-gray-800 uppercase tracking-tighter">System Cloud Synchronization</h4>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                           <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                               <CheckCircle size={24} />
                           </div>
                           <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-tight">Active & Secure</p>
                        </div>
                        <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                            <div className="bg-emerald-500 h-full w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointments;
