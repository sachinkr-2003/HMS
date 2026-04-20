import React, { useState } from 'react';
import { 
    User, Shield, Lock, Bell, Mail, Phone, MapPin, 
    ChevronRight, Save, CheckCircle2, Camera, CreditCard, HeartPulse
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PatientProfile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('Personal Profile');
    const [isSaved, setIsSaved] = useState(false);

    const tabs = [
        { name: 'Personal Profile', icon: User },
        { name: 'Medical Identity', icon: HeartPulse },
        { name: 'Security Matrix', icon: Shield },
        { name: 'Billing & Insurance', icon: CreditCard },
    ];

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Classic Header Block */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Account Configuration</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Manage your health records, personal profile and institutional security clearance.</p>
                </div>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 text-[11px] uppercase tracking-widest"
                >
                    {isSaved ? <><CheckCircle2 size={16} /> Changes Applied</> : <><Save size={16} /> Update Account</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Classic Navbar - Left Sidebar Style */}
                <div className="lg:col-span-1 space-y-1">
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center justify-between p-3.5 rounded border-l-4 transition-all text-left group ${activeTab === tab.name
                                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon size={16} className={activeTab === tab.name ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{tab.name}</span>
                            </div>
                            {activeTab === tab.name && <ChevronRight size={14} className="text-blue-400" />}
                        </button>
                    ))}
                </div>

                {/* Settings Panel Content */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {activeTab === 'Personal Profile' && (
                        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-8 mb-10 border-b border-gray-50 pb-8">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-3xl border border-blue-100 shadow-inner">
                                        {user?.name?.[0]}
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 p-1.5 bg-white border border-gray-200 rounded text-gray-400 hover:text-blue-600 shadow-sm">
                                        <Camera size={14} />
                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">{user?.name}</h2>
                                    <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-1">Patient Unit • ID: HR-PAT-2026-X8</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Identification</label>
                                        <input type="email" defaultValue={user?.email} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-[11px] font-bold text-gray-700 outline-none focus:border-blue-500 shadow-inner" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Vector</label>
                                        <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-[11px] font-bold text-gray-700 outline-none focus:border-blue-500 shadow-inner" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Residential Coordinates</label>
                                    <textarea rows="2" defaultValue="Plot 42, H-Block, Rohini, New Delhi" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-[11px] font-bold text-gray-700 outline-none focus:border-blue-500 shadow-inner" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Security Matrix' && (
                        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                             <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                                <Shield className="text-blue-600" size={18} />
                                <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-none">Access Control Matrix</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Current Sign-Key</label>
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-xs font-mono outline-none focus:border-blue-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Policy Signature</label>
                                        <input type="password" placeholder="Define new password" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-xs font-mono outline-none focus:border-blue-500" />
                                    </div>
                                </div>
                                <button className="px-6 py-2.5 bg-gray-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                                    Authorize Secret Rotation
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Medical Identity' && (
                        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                             <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
                                <HeartPulse className="text-rose-600" size={18} />
                                <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-none">Clinical Metadata</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Blood Type Vector</p>
                                        <p className="text-xl font-bold text-rose-600">B+ (Positive)</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verified Allergies</p>
                                        <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">Penicillin, Peanuts</p>
                                    </div>
                                </div>
                                <div className="p-5 bg-rose-50 border border-rose-100 rounded-lg">
                                    <h4 className="text-[10px] font-bold text-rose-900 uppercase mb-3">Emergency Contact Link</h4>
                                    <p className="text-sm font-bold text-rose-800">Sunita Sharma (Spouse)</p>
                                    <p className="text-xs font-bold text-rose-600 mt-1 uppercase tracking-tight">+91 99000 88000</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Billing & Insurance' && (
                        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-2xl text-white relative overflow-hidden h-[300px] flex flex-col justify-between">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                                    <CreditCard className="text-blue-500" size={18} />
                                    <h2 className="text-[10px] font-bold uppercase tracking-widest leading-none">Fiscal Protection Proxy</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Insurance Node</p>
                                        <p className="text-sm font-bold uppercase tracking-tight">Star Health Insurance</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Policy Serial</p>
                                        <p className="text-sm font-bold font-mono">POL-X88022-Sync</p>
                                    </div>
                                </div>
                            </div>
                            <button className="relative z-10 w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">
                                Update Carrier Details
                            </button>
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <CreditCard size={180} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
