import React, { useState } from 'react';
import { Settings, Hospital, Shield, Bell, CreditCard, Save, Globe, Smartphone, Lock, Eye, EyeOff, CheckCircle2, ChevronRight, Calendar } from 'lucide-react';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('Hospital Profile');
    const [showPassword, setShowPassword] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const tabs = [
        { name: 'Hospital Profile', icon: Hospital },
        { name: 'Security & Auth', icon: Shield },
        { name: 'Notification Rules', icon: Bell },
        { name: 'Payment Gateways', icon: CreditCard },
        { name: 'Localization', icon: Globe },
        { name: 'App Integrations', icon: Smartphone },
    ];

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Settings & Preferences</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Configure institutional parameters and system-wide security protocols.</p>
                </div>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 text-sm"
                >
                    {isSaved ? <><CheckCircle2 size={18} /> Settings Applied</> : <><Save size={18} /> Update All Rules</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Compact Side Navigation */}
                <div className="lg:col-span-1 space-y-1">
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all text-left group ${activeTab === tab.name
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                    : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon size={16} className={activeTab === tab.name ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'} />
                                {tab.name}
                            </div>
                            {activeTab === tab.name && <ChevronRight size={14} />}
                        </button>
                    ))}
                </div>

                {/* Settings Panel Content */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {activeTab === 'Hospital Profile' && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                                <Hospital className="text-blue-600" size={20} />
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Institutional Identity</h2>
                            </div>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Hospital Name</label>
                                        <input type="text" defaultValue="HealthRekha Multispeciality" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Reg. Accreditation</label>
                                        <input type="text" defaultValue="HR-HOSP-2026-X99" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none focus:border-blue-500 transition-all font-mono" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Global HQ Address</label>
                                    <textarea rows="2" defaultValue="Plot 42, Healthcare City, Cyberabad, India" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none focus:border-blue-500 transition-all" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Security & Auth' && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                                <Shield className="text-blue-600" size={20} />
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Access Control & Auth</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="mb-4">
                                        <h3 className="text-xs font-bold text-gray-800 uppercase">Credential Management</h3>
                                        <p className="text-[10px] text-gray-500 font-medium mt-1">Institutional password rotation policy.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5 relative">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Current Secret</label>
                                            <div className="relative">
                                                <input 
                                                    type={showPassword ? 'text' : 'password'} 
                                                    placeholder="••••••••"
                                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-mono outline-none focus:border-blue-500 transition-all" 
                                                />
                                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Policy Signature</label>
                                            <input type="password" placeholder="Complex hash recommended" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-mono outline-none focus:border-blue-500 transition-all" />
                                        </div>
                                    </div>
                                    <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                                        Verify & Update
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Global Policy Toggle</p>
                                    <div className="flex items-center justify-between p-4 bg-blue-50/30 rounded-lg border border-blue-100">
                                        <div>
                                            <p className="text-xs font-bold text-gray-800 flex items-center gap-2 uppercase tracking-tighter">Two-Factor Encryption (2FA)</p>
                                            <p className="text-[10px] text-gray-500 font-medium">Require biometric or OTP validation for staff access.</p>
                                        </div>
                                        <div className="w-10 h-5 bg-gray-200 rounded-full cursor-pointer relative transition-all">
                                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div>
                                            <p className="text-xs font-bold text-gray-800 uppercase tracking-tighter">Automatic Session Expiry</p>
                                            <p className="text-[10px] text-gray-500 font-medium">Revoke tokens after 30 minutes of terminal inactivity.</p>
                                        </div>
                                        <div className="w-10 h-5 bg-blue-600 rounded-full cursor-pointer relative transition-all">
                                            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'Hospital Profile' && activeTab !== 'Security & Auth' && (
                         <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
                            <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                                <Settings size={24} />
                            </div>
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-1">{activeTab} Pending</h2>
                            <p className="text-xs text-gray-500 max-w-sm">Institutional module integration in progress. Scheduled for next release cycle.</p>
                        </div>
                    )}

                    {/* Critical Mode */}
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white rounded-lg text-red-600 shadow-sm border border-red-100">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-red-900 text-sm italic uppercase tracking-tight">Enterprise Maintenance Protocol</h4>
                                <p className="text-[10px] text-red-600 font-bold uppercase tracking-tighter mt-1">Suspend all system terminals and client access for audits.</p>
                            </div>
                        </div>
                        <button className="whitespace-nowrap px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-md shadow-red-100">
                            Execute Lockdown
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
