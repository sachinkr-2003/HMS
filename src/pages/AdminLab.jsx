import React from 'react';
import { Microscope, Activity, CheckCircle, Clock, Search, MoreVertical, TrendingUp, Calendar } from 'lucide-react';

const AdminLab = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Lab & Diagnostics Command</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Institutional pathology tracking and diagnostic workflow management.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Calendar size={14} className="text-blue-500" /> {new Date().toDateString()}
                </div>
            </div>

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Total Lab Tests (MTD)</p>
                    <h3 className="text-xl font-bold text-gray-900">1,482</h3>
                    <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">Verified Reports</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Pending Reports</p>
                    <h3 className="text-xl font-bold text-amber-500">45</h3>
                    <p className="text-[9px] text-amber-500 mt-1 font-bold uppercase tracking-tighter">Action Required</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Completed Today</p>
                    <h3 className="text-xl font-bold text-emerald-500">128</h3>
                    <p className="text-[9px] text-emerald-500 mt-1 font-bold uppercase tracking-tighter">Live Updates</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Avg Turnaround Time</p>
                    <h3 className="text-xl font-bold text-blue-600">4.2 Hrs</h3>
                    <p className="text-[9px] text-blue-600 mt-1 font-bold uppercase tracking-tighter">Efficiency Optimized</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Live Test Queue */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h2 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Live Laboratory Queue</h2>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                            <input type="text" placeholder="Find test ID..." className="pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded text-[10px] outline-none w-32 focus:w-48 transition-all" />
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[
                            { patient: 'Rahul Sharma', test: 'Lipid Profile', time: '15 mins ago', status: 'Processing' },
                            { patient: 'Priya Singh', test: 'CBC with ESR', time: '40 mins ago', status: 'Pending' },
                            { patient: 'Amit Kumar', test: 'Thyroid Panel', time: '1 hr ago', status: 'Technician Assigned' },
                        ].map((item, i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">
                                        {item.patient[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{item.patient}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{item.test}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[9px] font-bold rounded uppercase tracking-tighter">{item.status}</span>
                                    <p className="text-[9px] text-gray-400 mt-1 font-medium">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lab Efficiency Insights */}
                <div className="bg-gray-900 p-8 rounded-xl shadow-xl text-white relative overflow-hidden flex flex-col border border-gray-800">
                    <div className="relative z-10">
                        <h2 className="text-sm font-bold mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-blue-400">
                            <TrendingUp size={18} /> Lab Analysis AI
                        </h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <p className="text-blue-300 text-[9px] font-bold uppercase tracking-widest mb-2">Queue Forecast</p>
                                <p className="text-xs text-blue-50 leading-relaxed italic">
                                    Predicting high sample volume for OPD hours (9 AM - 12 PM). Phlebotomy staff deployment optimized.
                                </p>
                            </div>
                            <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                                <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-widest mb-2">Performance Benchmark</p>
                                <p className="text-xs text-emerald-50 leading-relaxed italic">
                                    Turnaround Time (TAT) has achieved a 15% efficiency gain since digital report automation.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-12 -bottom-12 opacity-5 scale-150 rotate-12">
                        <Microscope size={200} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLab;
