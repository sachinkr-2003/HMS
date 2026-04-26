import React, { useState, useEffect } from 'react';
import { 
    Video, Phone, MessageSquare, 
    User, Calendar, Clock, 
    ChevronLeft, Loader2, Signal, 
    Mic, VideoOff, Settings 
} from 'lucide-react';

import API from '../api/axios';

const Telemedicine = () => {
    const [activeMeeting, setActiveMeeting] = useState(false);
    const [scheduledCalls, setScheduledCalls] = useState([]);

    useEffect(() => {
        fetchCalls();
    }, []);

    const fetchCalls = async () => {
        try {
            const res = await API.get('/telemedicine');
            setScheduledCalls(res.data);
        } catch (err) {
            console.error("Failed to fetch tele-consultations");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Telemedicine Gateway</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Encrypted virtual clinical consultations and remote diagnostics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                        <Signal size={12} className="animate-pulse" /> Channel Secure
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Console */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-3xl aspect-video relative overflow-hidden shadow-2xl border border-slate-800 flex flex-col items-center justify-center">
                        {!activeMeeting ? (
                            <div className="text-center space-y-6">
                                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Video className="text-blue-500" size={32} />
                                </div>
                                <h2 className="text-white text-lg font-bold uppercase tracking-widest">No Active Connection</h2>
                                <p className="text-slate-500 text-xs max-w-xs mx-auto">Select a patient from the queue to initialize the encrypted medical video channel.</p>
                                <button 
                                    onClick={() => setActiveMeeting(true)}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
                                >
                                    Initialize Console
                                </button>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col">
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl animate-pulse">
                                        R
                                    </div>
                                    <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> Live: Rohan Mehta
                                    </div>
                                    <div className="absolute top-6 right-6 w-32 h-32 bg-slate-800 rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                                        <div className="w-full h-full bg-blue-500/20 flex items-center justify-center">
                                            <User className="text-blue-300" size={32} />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Controls */}
                                <div className="h-24 bg-slate-900/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-center gap-6">
                                    <button className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/5"><Mic size={20}/></button>
                                    <button className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/5"><VideoOff size={20}/></button>
                                    <button onClick={() => setActiveMeeting(false)} className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all shadow-xl shadow-red-500/20"><Phone size={20} className="rotate-[135deg]"/></button>
                                    <button className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/5"><Settings size={20}/></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Queue & Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Virtual Queue Today</h2>
                        <div className="space-y-4">
                            {scheduledCalls.map(call => (
                                <div key={call.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-blue-300 transition-all">
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{call.patient}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{call.time} • {call.reason}</p>
                                    </div>
                                    <span className="text-[8px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded uppercase tracking-widest">{call.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-600 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <MessageSquare className="text-blue-200 mb-4" size={24} />
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Remote Diagnostics</h3>
                            <p className="text-[10px] text-blue-100 font-medium leading-relaxed opacity-80 uppercase tracking-tighter">
                                System is encrypted and HIPAA compliant. All virtual session traffic is routed through private clinical nodes.
                            </p>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Telemedicine;
