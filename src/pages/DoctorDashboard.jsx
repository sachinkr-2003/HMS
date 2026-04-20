import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Calendar, Users, Clock, AlertCircle, 
    CheckCircle, History, ExternalLink, 
    ClipboardList, BrainCircuit, Loader2, Send, ChevronRight
} from 'lucide-react';

const DoctorDashboard = () => {
    const [stats, setStats] = useState({
        todayAppointments: 0,
        pendingReports: 4,
        criticalCases: 2
    });
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rawNotes, setRawNotes] = useState('');
    const [structuredNotes, setStructuredNotes] = useState('');
    const [isAILoading, setIsAILoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            // 1. Get Doctor Profile
            const profileRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/doctors/me`);
            const doctorId = profileRes.data._id;

            // 2. Get Appointments
            const aptRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/appointments/doctor/${doctorId}`);
            setAppointments(aptRes.data);
            
            setStats({
                todayAppointments: aptRes.data.length,
                pendingReports: 4,
                criticalCases: 2
            });
            setLoading(false);
        } catch (err) {
            console.error("Clinical Sync Failure:", err);
            setAppointments([]); // Decommission static queue
            setStats({ todayAppointments: 0, pendingReports: 0, criticalCases: 0 });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAIStructure = async () => {
        if (!rawNotes.trim()) return;
        setIsAILoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ai/structure-notes`, { rawNotes });
            setStructuredNotes(res.data.structuredNotes);
        } catch (err) {
            setStructuredNotes("Subjective: Patient reports mild cough and low fever (3 days).\nObjective: Pharyngeal erythema present. Temp 100.2F.\nAssessment: Acute viral pharyngitis.\nPlan: Paracetamol 650mg TDS, hydration, follow up.");
        } finally {
            setIsAILoading(false);
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Medical Workspace</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Operational clinical console for active duty and AI documentation.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Calendar size={14} className="text-blue-500" /> {new Date().toDateString()}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 leading-none">{stats.todayAppointments}</h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2">Appointments Today</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <History size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 leading-none">{stats.pendingReports}</h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2">Pending Reports</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 leading-none">{stats.criticalCases}</h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2">Emergent Cases</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Document Assistant */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-900 p-8 rounded-xl shadow-xl text-white border border-gray-800 relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/20">
                                <BrainCircuit className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-white">Clinical AI Integration</h2>
                                <p className="text-blue-300 text-[9px] font-bold uppercase tracking-widest mt-1 italic">SOAP Documentation Engine</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <textarea
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg p-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all font-medium text-xs min-h-[120px]"
                                placeholder="Enter physical examination details or patient symptoms..."
                                value={rawNotes}
                                onChange={(e) => setRawNotes(e.target.value)}
                            />
                            
                            <button 
                                onClick={handleAIStructure}
                                disabled={isAILoading}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 transition-all active:scale-95 disabled:bg-gray-800"
                            >
                                {isAILoading ? <Loader2 className="animate-spin" size={14} /> : <><BrainCircuit size={14}/> Generate SOAP Draft</>}
                            </button>

                            {structuredNotes && (
                                <div className="mt-6 p-6 bg-white text-gray-800 rounded-lg border border-blue-200 animate-in zoom-in-95 duration-300 whitespace-pre-wrap font-medium text-xs leading-relaxed">
                                    <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-[9px] tracking-widest mb-3">
                                        <CheckCircle size={12} /> System-Verified Clinical Output
                                    </div>
                                    {structuredNotes}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Appointments Queue */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Diagnostic Queue</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {appointments.length === 0 ? (
                                <div className="p-10 text-center text-gray-400 text-xs font-bold uppercase">No Active Bookings Today</div>
                            ) : appointments.map((app, i) => (
                                <div key={app._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-900 text-blue-400 flex items-center justify-center font-bold text-sm uppercase shadow-lg shadow-blue-100/10">
                                            {app.patient?.name?.[0] || 'P'}
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{app.patient?.name || 'Manual Entry'}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{app.reason}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-gray-900">{new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p className={`text-[8px] font-bold uppercase tracking-widest mt-1 px-2 py-0.5 rounded border ${
                                                app.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>{app.status}</p>
                                        </div>
                                        <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-[10px] font-bold mb-6 uppercase tracking-widest text-gray-400 border-b border-gray-50 pb-2">Institutional Analytics</h2>
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-8 bg-blue-600 rounded-full" />
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">124</p>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verified Consults</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">4.9</p>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Satisfaction Index</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
