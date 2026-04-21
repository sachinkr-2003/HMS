import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
    History, User, Activity, FileText, 
    Calendar, ChevronLeft, Loader2, Pill, 
    AlertCircle, Download, CheckCircle2 
} from 'lucide-react';

const PatientHistory = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const pRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/patients/${id}`);
                const rRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/medical-records/patient/${id}`);
                setPatient(pRes.data);
                setRecords(rRes.data);
                setLoading(false);
            } catch (err) {
                console.error("History Fetch Failure");
                setLoading(false);
            }
        };
        fetchHistory();
    }, [id]);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-4">
                    <Link to={-1} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Clinical Timeline</h1>
                        <p className="text-xs text-gray-500 font-medium mt-1">Full medical journey and historical records for {patient?.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-xs uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={14} /> Full Export
                    </button>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-100">
                        Patient ID: {patient?._id?.slice(-6).toUpperCase()}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                        <div className="w-20 h-20 bg-gray-900 text-blue-400 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-xl">
                            {patient?.name?.[0]}
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">{patient?.name}</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{patient?.gender} | {patient?.age} Years</p>
                        
                        <div className="mt-6 pt-6 border-t border-gray-50 space-y-4">
                            <div className="flex justify-between items-center text-left">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Blood Group</span>
                                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">O+</span>
                            </div>
                            <div className="flex justify-between items-center text-left">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Visits</span>
                                <span className="text-xs font-bold text-gray-800">{records.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="lg:col-span-3">
                    {records.length === 0 ? (
                        <div className="bg-white p-20 rounded-2xl border border-gray-100 text-center flex flex-col items-center">
                            <History className="text-gray-100 mb-4" size={64} />
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">No Medical Records Found</h3>
                            <p className="text-xs text-gray-300 mt-2">Patient journey will begin after the first clinical visit.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {records.map((record, index) => (
                                <div key={record._id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-gray-100 last:before:hidden">
                                    <div className="absolute left-[-5px] top-2 w-[10px] h-[10px] rounded-full bg-blue-600 border-4 border-white shadow-sm ring-2 ring-blue-100" />
                                    
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:border-blue-300">
                                        <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="text-blue-600" size={16} />
                                                <span className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">{new Date(record.visitDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-right">
                                                    <p className="text-[9px] text-gray-400 font-bold uppercase">Doctor In-Charge</p>
                                                    <p className="text-[10px] font-bold text-gray-800">Dr. {record.doctor?.name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                        <Activity size={12} className="text-red-500" /> Vitals & Assessment
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {record.vitalSigns && Object.entries(record.vitalSigns).map(([key, val]) => (
                                                            <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">{key}</p>
                                                                <p className="text-[11px] font-black text-gray-700">{val || '--'}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <CheckCircle2 size={12} className="text-blue-500" /> Diagnosis
                                                    </h4>
                                                    <p className="text-xs font-bold text-gray-800 bg-blue-50/50 p-3 rounded-xl border border-blue-100 inline-block">
                                                        {record.diagnosis}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                        <Pill size={12} className="text-indigo-500" /> Prescribed Medications
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {record.prescriptions?.map((p, i) => (
                                                            <div key={i} className="flex justify-between items-center p-3 bg-indigo-50/30 rounded-xl border border-indigo-50">
                                                                <div>
                                                                    <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{p.medicine}</p>
                                                                    <p className="text-[9px] text-indigo-500 font-bold uppercase mt-0.5">{p.dosage} | {p.frequency}</p>
                                                                </div>
                                                                <span className="text-[9px] font-bold text-gray-400 uppercase">{p.duration}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <FileText size={12} className="text-amber-500" /> Clinical Notes
                                                    </h4>
                                                    <p className="text-xs text-gray-500 leading-relaxed font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                                                        "{record.clinicalNotes}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientHistory;
