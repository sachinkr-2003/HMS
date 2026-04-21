import React, { useState, useEffect } from 'react';
import { 
    Calendar, Clock, User, 
    ArrowLeftRight, Filter, Download, 
    CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight 
} from 'lucide-react';

import axios from 'axios';

const StaffRoster = () => {
    const [viewDate, setViewDate] = useState(new Date());
    const [rosterData, setRosterData] = useState([]);

    useEffect(() => {
        fetchRoster();
    }, [viewDate]);

    const fetchRoster = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/roster?date=${viewDate.toISOString()}`);
            setRosterData(res.data);
        } catch (err) {
            console.error("Failed to fetch roster");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Duty Roster & Shifts</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Institutional workforce scheduling and shift synchronization.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
                        <button onClick={() => setViewDate(new Date(viewDate.setDate(viewDate.getDate() - 1)))} className="p-1 hover:text-blue-600 transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <span className="px-4 text-xs font-bold text-gray-700 uppercase tracking-tighter w-32 text-center">
                            {viewDate.toDateString() === new Date().toDateString() ? 'Today' : viewDate.toLocaleDateString()}
                        </span>
                        <button onClick={() => setViewDate(new Date(viewDate.setDate(viewDate.getDate() + 1)))} className="p-1 hover:text-blue-600 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                        Assign Shift
                    </button>
                </div>
            </div>

            {/* Shift Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Morning Shift', count: 12, color: 'bg-amber-50 text-amber-600' },
                    { label: 'Evening Shift', count: 8, color: 'bg-indigo-50 text-indigo-600' },
                    { label: 'Night Shift', count: 6, color: 'bg-slate-900 text-slate-100' }
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition-all hover:border-blue-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</h3>
                            <Clock size={16} className="text-gray-300" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-gray-800">{s.count}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Staff Units</span>
                        </div>
                        <div className={`mt-4 px-3 py-1 rounded inline-block text-[9px] font-bold uppercase tracking-widest ${s.color}`}>
                            Capacity: 92%
                        </div>
                    </div>
                ))}
            </div>

            {/* Roster Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Live Shift Register</h2>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><Filter size={16}/></button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><Download size={16}/></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Personnel</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Shift Details</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rosterData.map(item => (
                                <tr key={item.id} className="hover:bg-blue-50/20 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-600 font-bold shadow-inner">
                                                {item.staff[0]}
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{item.staff}</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{item.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.dept}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${item.shift === 'Morning' ? 'bg-amber-400' : item.shift === 'Evening' ? 'bg-indigo-400' : 'bg-slate-400'}`} />
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-800 uppercase">{item.shift}</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{item.hours}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                                            item.status === 'On-Duty' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                            item.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-300 hover:text-blue-600 transition-all p-2 bg-gray-50 hover:bg-white rounded-lg border border-transparent hover:border-gray-100">
                                            <ArrowLeftRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Roster Alerts */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-center gap-6">
                <div className="p-3 bg-white rounded-xl text-amber-600 shadow-sm">
                    <AlertTriangle size={20} />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-tight">Shift Gaps Detected</h4>
                    <p className="text-[10px] text-amber-700 font-bold uppercase tracking-tighter mt-1 opacity-80">General Ward Night shift is currently under-staffed. 2 additional nurses required for full compliance.</p>
                </div>
            </div>
        </div>
    );
};

export default StaffRoster;
