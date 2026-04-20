import React, { useState } from 'react';
import { 
    User, Lock, Eye, EyeOff, Save, CheckCircle2, 
    Bell, Shield, ChevronRight, Globe, Fingerprint
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileSettings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('Personal Profile');
    const [showPassword, setShowPassword] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const tabs = [
        { name: 'Personal Profile', icon: User },
        { name: 'Security & Auth', icon: Shield },
        { name: 'Notification Rules', icon: Bell },
        { name: 'Preferences', icon: Globe },
    ];

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">System Configuration</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Manage institutional credentials, account synchronization and professional preferences.</p>
                </div>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 text-[11px] uppercase tracking-widest"
                >
                    {isSaved ? <><CheckCircle2 size={16} /> Changes Applied</> : <><Save size={16} /> Update Preferences</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Classic Setting Navigation - Left Sidebar Style */}
                <div className="lg:col-span-1 space-y-1">
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center justify-between p-3.5 rounded border-l-4 transition-all text-left group ${activeTab === tab.name
                                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
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

                {/* Settings Panel Content area */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {activeTab === 'Personal Profile' && (
                        <div className="bg-white p-7 rounded-lg border border-gray-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                             <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                                <User className="text-blue-600" size={18} />
                                <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-none">Institutional Identity Matrix</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Legal Full Name</label>
                                        <input type="text" defaultValue={user?.name} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-[11px] font-bold text-gray-700 outline-none focus:border-blue-500 transition-all uppercase tracking-tight" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Authorized Role</label>
                                        <input type="text" defaultValue={user?.role} readOnly className="w-full px-4 py-2.5 bg-gray-100 border border-gray-100 rounded text-[11px] font-bold text-gray-400 outline-none cursor-not-allowed uppercase tracking-widest font-mono" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Professional Email Signal</label>
                                    <input type="email" defaultValue={user?.email} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-[11px] font-bold text-gray-700 outline-none focus:border-blue-500 transition-all font-mono" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Security & Auth' && (
                        <div className="bg-white p-7 rounded-lg border border-gray-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                                <Lock className="text-blue-600" size={18} />
                                <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-none">Credential Rotation Policy</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2 relative">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Legacy Secret (Current)</label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? 'text' : 'password'} 
                                                placeholder="••••••••"
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-xs font-mono outline-none focus:border-blue-500 transition-all" 
                                            />
                                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                                                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">New System Signature</label>
                                        <input type="password" placeholder="Define entropy secret" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-xs font-mono outline-none focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                                <button className="px-6 py-2.5 bg-gray-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                                    Authorize Secret Rotation
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'Personal Profile' && activeTab !== 'Security & Auth' && (
                         <div className="bg-gray-50 p-12 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
                            <div className="w-14 h-14 bg-white border border-gray-100 rounded shadow-sm mb-4 flex items-center justify-center text-gray-300">
                                <Globe size={24} />
                            </div>
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{activeTab} Initializing</h2>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest max-w-[200px]">Node integration for {activeTab} in final verification phase.</p>
                        </div>
                    )}

                    {/* Security Footnote */}
                    <div className="bg-blue-600 p-5 rounded-lg border border-blue-700 shadow-xl text-white relative overflow-hidden group hover:bg-blue-700 transition-all cursor-pointer">
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white/10 rounded border border-white/10 group-hover:bg-blue-600 transition-all">
                                    <Shield size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[11px] uppercase tracking-tight italic">Biometric Synchronization (B-SYNC)</h4>
                                    <p className="text-[9px] text-blue-100 font-bold uppercase tracking-widest mt-1">Enable cryptological fingerprint validation for station login.</p>
                                </div>
                            </div>
                            <button className="px-4 py-1.5 bg-white text-blue-700 rounded text-[9px] font-bold uppercase tracking-widest hover:bg-blue-50 transition-all">
                                ACTIVATE
                            </button>
                        </div>
                        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-all">
                            <Fingerprint size={160} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
