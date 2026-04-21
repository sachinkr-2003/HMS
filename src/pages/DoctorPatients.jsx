import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, FileText, History, ExternalLink, Filter, X, Activity, Pill, Thermometer, Heart } from 'lucide-react';

const patientList = [
  { id: 'PAT-8821', name: 'Anika Singh', age: 24, gender: 'Female', lastVisit: '15 Apr 2026', condition: 'Viral Fever', vitals: { bp: '120/80', hr: '72', temp: '98.6' } },
  { id: 'PAT-8822', name: 'Rohan Mehta', age: 32, gender: 'Male', lastVisit: '10 Apr 2026', condition: 'Hypertension', vitals: { bp: '140/90', hr: '84', temp: '98.4' } },
  { id: 'PAT-8823', name: 'Saira Banu', age: 28, gender: 'Female', lastVisit: '02 Apr 2026', condition: 'Thyroid', vitals: { bp: '110/70', hr: '68', temp: '98.2' } },
  { id: 'PAT-8824', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '20 Mar 2026', condition: 'Diabetes', vitals: { bp: '130/85', hr: '76', temp: '98.8' } },
];

const DoctorPatients = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = patientList.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient EMR Records</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Access full medical history and records of your patients.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 uppercase tracking-wider text-xs">
                    <Search size={16} /> Find Patient
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search by ID or Name..." 
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-blue-500 transition-all" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-500 text-xs font-bold uppercase tracking-widest hover:bg-white rounded-lg border border-slate-100 transition-all">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 lowercase first-letter:uppercase">Patient ID</th>
                                <th className="px-6 py-4 lowercase first-letter:uppercase">Name / Info</th>
                                <th className="px-6 py-4 lowercase first-letter:uppercase">Last Visit</th>
                                <th className="px-6 py-4 lowercase first-letter:uppercase">Primary Condition</th>
                                <th className="px-6 py-4 text-right lowercase first-letter:uppercase">EMR Access</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-blue-50/20 transition-colors group">
                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-400 group-hover:text-blue-600 font-mono tracking-tighter uppercase">{patient.id}</td>
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
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600 tracking-tighter">{patient.lastVisit}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-tighter border border-blue-100">
                                            {patient.condition}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                        <Link 
                                            to={`/doctor/patients/${patient.id}/history`}
                                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100"
                                        >
                                            <History size={14} /> HISTORY
                                        </Link>
                                        <button 
                                            onClick={() => setSelectedPatient(patient)}
                                            className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md active:scale-95"
                                        >
                                            <ExternalLink size={14} /> VIEW EMR
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EMR Modal */}
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
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">{selectedPatient.id} • {selectedPatient.gender} • {selectedPatient.age} YRS</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedPatient(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">Diagnostic Vitals</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                                        <Heart size={16} className="text-rose-500 mb-2" />
                                        <p className="text-[9px] font-bold text-rose-400 uppercase tracking-tighter">BP Level</p>
                                        <p className="text-sm font-bold text-slate-900 font-mono tracking-tighter">{selectedPatient.vitals.bp}</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <Activity size={16} className="text-blue-500 mb-2" />
                                        <p className="text-[9px] font-bold text-blue-400 uppercase tracking-tighter">Heart Rate</p>
                                        <p className="text-sm font-bold text-slate-900 font-mono tracking-tighter">{selectedPatient.vitals.hr} BPM</p>
                                    </div>
                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <Thermometer size={16} className="text-amber-500 mb-2" />
                                        <p className="text-[9px] font-bold text-amber-400 uppercase tracking-tighter">Body Temp</p>
                                        <p className="text-sm font-bold text-slate-900 font-mono tracking-tighter">{selectedPatient.vitals.temp}°F</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">Clinical Course</h3>
                                    <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 relative">
                                        <div className="absolute left-6 top-8 bottom-4 w-0.5 bg-blue-100" />
                                        <div className="relative z-10 w-4 h-4 bg-blue-600 rounded-full border-4 border-white mt-1" />
                                        <div className="flex-1">
                                            <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-1">{selectedPatient.lastVisit}</p>
                                            <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">{selectedPatient.condition}</p>
                                            <p className="text-[10px] text-slate-500 mt-2 font-medium leading-relaxed">Prescribed symptomatic treatment and follow-up in 7 days. Patient responding well.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">Medication Matrix</h3>
                                <div className="space-y-3">
                                    {['Amoxicillin 500mg', 'Paracetamol 650mg'].map((med, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-blue-200 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    <Pill size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-tighter">{med}</p>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">1-0-1 | After Meal</p>
                                                </div>
                                            </div>
                                            <CheckCircle size={14} className="text-emerald-500" />
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 mt-4 shadow-xl shadow-slate-100">
                                    <FileText size={16} /> Generate Clinical Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorPatients;
