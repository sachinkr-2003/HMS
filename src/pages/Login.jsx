import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Stethoscope, UserCircle, Pill, Microscope, Bed, DollarSign, Loader2, AlertCircle, Building2, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState({ id: 'admin', label: 'Administrator', icon: ShieldCheck });
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { login, error, setError } = useAuth();
    const navigate = useNavigate();

    const roles = [
        { id: 'admin', label: 'Administrator', icon: ShieldCheck },
        { id: 'doctor', label: 'Medical Doctor', icon: Stethoscope },
        { id: 'staff', label: 'Reception / Staff', icon: UserCircle },
        { id: 'patient', label: 'Patient', icon: UserCircle },
        { id: 'pharmacy', label: 'Pharmacy Staff', icon: Pill },
        { id: 'lab', label: 'Lab Technician', icon: Microscope },
        { id: 'ward', label: 'Ward Management', icon: Bed },
        { id: 'billing', label: 'Billing / Accounts', icon: DollarSign }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const userData = await login(formData.email, formData.password);
            
            // Direct Login Logic: Ignore role selector mismatch and go to the real role
            // This ensures a "Direct Login" experience without permission blocks.
            navigate(`/${userData.role}`);
            
        } catch (err) {
            console.error("Authentication Blocked:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-inter">
            {/* Split Screen Layout - Pure Flex for Stability */}
            <div className="w-full flex flex-col lg:flex-row min-h-screen">

                {/* Left Side: Technical Clinical Identity (Visible on Desktop) */}
                <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden flex-col justify-between p-16">
                    {/* Background Visuals */}
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />
                    <img
                        src="/hospital_login_bg.png"
                        alt="Clinical Environment"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5]"
                    />

                    {/* Branding Top */}
                    <div className="relative z-20 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center shadow-2xl shadow-blue-500/20">
                            <Building2 className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-white uppercase">HealthRekha <span className="text-blue-500">ERP</span></span>
                    </div>

                    {/* Content Middle */}
                    <div className="relative z-20">
                        <div className="inline-block px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6">
                            Enterprise Clinical Management v4.0
                        </div>
                        <h2 className="text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                            Unified Hospital <br /> <span className="text-blue-500 underline decoration-blue-500/30">Intelligence</span> Operating System.
                        </h2>
                        <p className="text-gray-400 text-lg max-w-lg font-medium leading-relaxed">
                            Deploying next-generation clinical workflows with 99.9% uptime and reliable performance benchmarks.
                        </p>
                    </div>

                    {/* Stats Bottom */}
                    <div className="relative z-20 flex items-center gap-12">
                        <div>
                            <p className="text-2xl font-bold text-white tracking-widest leading-none">256+</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-widest">Active Terminals</p>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div>
                            <p className="text-2xl font-bold text-white tracking-widest leading-none">0.2s</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-widest">Sync Latency</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Access Form (Always Visible) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white border-l border-gray-100 relative z-30">
                    <div className="max-w-md mx-auto w-full px-6 py-12 lg:py-0">
                        {/* Mobile Logo Only */}
                        <div className="mb-8 lg:hidden flex flex-col items-center">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-blue-100">
                                <Building2 className="text-white" size={28} />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase">HealthRekha ERP</h2>
                        </div>

                        <div className="mb-10 text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Access Portal</h1>
                            <p className="text-gray-400 text-sm font-medium mt-1">Please authenticate your credentials to enter the system.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={18} className="shrink-0" />
                                <p className="text-xs font-bold uppercase tracking-tighter truncate">{error}</p>
                                <button onClick={() => setError(null)} className="ml-auto text-red-500 font-bold">×</button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Role Select */}
                            <div className="space-y-1.5 relative">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Authorization Area</label>
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all text-gray-800 shadow-sm"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <selectedRole.icon className="text-blue-600 shrink-0" size={18} />
                                        <span className="text-[11px] font-bold uppercase tracking-tight truncate">{selectedRole.label}</span>
                                    </div>
                                    <ChevronDown className="text-gray-400 shrink-0" size={16} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-2xl z-[100] overflow-hidden border-t-4 border-t-blue-600">
                                        {roles.map((role) => (
                                            <button
                                                key={role.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedRole(role);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <role.icon className={`${selectedRole.id === role.id ? 'text-blue-600' : 'text-gray-400'} shrink-0`} size={16} />
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedRole.id === role.id ? 'text-blue-600' : 'text-gray-600'}`}>{role.label}</span>
                                                </div>
                                                {selectedRole.id === role.id && <Check className="text-blue-600" size={14} />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder={`Ref: name@${selectedRole.id}.com`}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-600 transition-all text-xs font-bold text-gray-800"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if(error) setError(null);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="password" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-600 transition-all font-mono text-xs font-bold text-gray-800"
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, password: e.target.value });
                                            if(error) setError(null);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer shadow-sm" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight group-hover:text-gray-600">Persistent Session</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-[0.1em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] flex items-center justify-center gap-2 disabled:bg-gray-200"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="animate-spin" size={16} /> Authenticating...</>
                                ) : (
                                    <>Initiate Login <ArrowRight size={16} /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center border-t border-gray-100 pt-10">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">
                                Warning: Unauthorized Access Prohibited <br /> 
                                <span className="text-gray-300">Secure Institutional Access Terminal</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
