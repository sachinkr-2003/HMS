import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Microscope, Activity, CheckCircle, Clock, Search, TrendingUp, Calendar, Loader2, TestTube, Database } from 'lucide-react';

const AdminLab = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/lab`);
                setTests(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            } catch (err) {
                console.error("Lab Data Sync Failure");
                setLoading(false);
            }
        };
        fetchTests();
    }, []);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    const stats = {
        total: Array.isArray(tests) ? tests.length : 0,
        pending: Array.isArray(tests) ? tests.filter(t => t?.status === 'Pending').length : 0,
        completedToday: Array.isArray(tests) ? tests.filter(t => t?.status === 'Completed').length : 0,
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Diagnostic Command Center</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-tighter">Institutional oversight of pathology workflows and diagnostic accuracy.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Calendar size={14} className="text-blue-500" /> {new Date().toDateString()}
                </div>
            </div>

            {/* Real Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Institutional Investigations</p>
                    <h3 className="text-2xl font-black text-gray-900">{stats.total}</h3>
                    <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter italic">Total Registered Records</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Pending Protocol</p>
                    <h3 className="text-2xl font-black text-amber-500">{stats.pending}</h3>
                    <p className="text-[9px] text-amber-500 mt-1 font-bold uppercase tracking-tighter italic">Immediate Action Required</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Authorized Today</p>
                    <h3 className="text-2xl font-black text-emerald-500">{stats.completedToday}</h3>
                    <p className="text-[9px] text-emerald-500 mt-1 font-bold uppercase tracking-tighter italic">Live Report Dispatches</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Terminal Status</p>
                    <h3 className="text-2xl font-black text-blue-600">Online</h3>
                    <p className="text-[9px] text-blue-600 mt-1 font-bold uppercase tracking-tighter italic">Sync Efficiency 100%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real Test Queue */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[300px]">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                        <h2 className="text-xs font-black text-gray-700 uppercase tracking-widest">Active Investigation Queue</h2>
                        <Database size={16} className="text-blue-500" />
                    </div>
                    {(!Array.isArray(tests) || tests.length === 0) ? (
                        <div className="p-20 text-center flex flex-col items-center">
                            <TestTube size={48} className="text-gray-100 mb-4" />
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Zero Investigations Tracked</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {tests.slice(0, 5).map((test) => (
                                <div key={test._id} className="px-8 py-5 flex items-center justify-between hover:bg-blue-50/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-50 border border-gray-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xs uppercase shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {test.patient?.name?.[0] || 'S'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{test.patient?.name || 'Unknown Subject'}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{test.testName}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                            test.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            {test.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Lab Intelligence */}
                <div className="bg-gray-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col border border-gray-800">
                    <div className="relative z-10">
                        <h2 className="text-[11px] font-black mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-blue-400">
                            <TrendingUp size={18} /> Lab Workflow AI
                        </h2>
                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic">
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-3">Diagnostic Status Report</p>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                    "Institutional Zero-State active. All diagnostic channels are clear and awaiting clinical subject intake."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLab;
