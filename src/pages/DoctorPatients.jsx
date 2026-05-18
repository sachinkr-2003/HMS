import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { Search, User, FileText, History, ExternalLink, Filter, X, Activity, Pill, Thermometer, Heart, CheckCircle, Loader2 } from 'lucide-react';

const DoctorPatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await API.get('/patients');
                setPatients(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error('Failed to fetch patients', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const filtered = patients.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p._id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient EMR Records</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Access full medical history and records of your patients.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/30">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Patient ID</th>
                                <th className="px-6 py-4">Name / Info</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Blood Group</th>
                                <th className="px-6 py-4 text-right">EMR Access</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-16 text-center text-gray-400 text-sm italic">No patients found.</td></tr>
                            ) : filtered.map((patient) => (
                                <tr key={patient._id} className="hover:bg-blue-50/20 transition-colors group">
                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-400 font-mono tracking-tighter uppercase">{patient._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-blue-600 shadow-sm border border-slate-50">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-xs uppercase tracking-tight">{patient.name}</p>
                                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{patient.age} Yrs • {patient.gender}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{patient.contact || '—'}</td>
                                    <td className="px-6 py-4">
                                        {patient.bloodGroup ? (
                                            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold uppercase border border-red-100">{patient.bloodGroup}</span>
                                        ) : <span className="text-gray-300 text-xs">—</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                        <Link
                                            to={`/doctor/patients/${patient._id}/history`}
                                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100"
                                        >
                                            <History size={14} /> History
                                        </Link>
                                        <button
                                            onClick={() => setSelectedPatient(patient)}
                                            className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md active:scale-95"
                                        >
                                            <ExternalLink size={14} /> View EMR
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedPatient && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{selectedPatient.name}</h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">{selectedPatient.gender} • {selectedPatient.age} YRS • {selectedPatient.bloodGroup || 'Blood Group N/A'}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedPatient(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact</p>
                                    <p className="text-sm font-bold text-slate-800">{selectedPatient.contact || '—'}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Address</p>
                                    <p className="text-sm font-bold text-slate-800">{selectedPatient.address || '—'}</p>
                                </div>
                            </div>

                            {selectedPatient.medicalHistory?.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2 mb-4">Medical History</h3>
                                    <div className="space-y-3">
                                        {selectedPatient.medicalHistory.map((h, i) => (
                                            <div key={i} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{new Date(h.date).toLocaleDateString()}</p>
                                                <p className="text-xs font-bold text-slate-800 mt-1">{h.diagnosis}</p>
                                                <p className="text-[10px] text-slate-500 mt-1">{h.treatment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Link
                                to={`/doctor/patients/${selectedPatient._id}/history`}
                                onClick={() => setSelectedPatient(null)}
                                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-xl"
                            >
                                <FileText size={16} /> View Full Clinical History
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorPatients;
