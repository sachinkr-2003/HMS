import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck, ArrowRight, HeartPulse, Stethoscope, UserCircle, Pill, Microscope, Bed, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register, error, setError } = useAuth();
    const navigate = useNavigate();

    const roles = [
        { id: 'admin', label: 'Admin', icon: ShieldCheck },
        { id: 'doctor', label: 'Doctor', icon: Stethoscope },
        { id: 'patient', label: 'Patient', icon: UserCircle },
        { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
        { id: 'lab', label: 'Laboratory', icon: Microscope },
        { id: 'ward', label: 'Ward/Staff', icon: Bed },
        { id: 'billing', label: 'Billing', icon: DollarSign }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const userData = await register(formData.name, formData.email, formData.password, formData.role);
            navigate(`/${userData.role}`);
        } catch (err) {
            // Error handled by AuthContext
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen w-full flex overflow-hidden font-inter bg-white">
            <div className="w-full flex md:flex-row-reverse">

                {/* Visuals Panel */}
                <div className="hidden md:flex md:w-1/2 bg-indigo-600 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/90 to-emerald-600/60 z-10" />
                    <img
                        src="/hospital_login_bg.png"
                        alt="Join Us"
                        className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                    />

                    <div className="relative z-20 p-16 flex flex-col justify-between h-full text-white">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                <HeartPulse className="text-white" size={28} />
                            </div>
                            <span className="text-2xl font-poppins font-bold tracking-tight">HealthRekha</span>
                        </div>

                        <div>
                            <h2 className="text-4xl font-poppins font-bold leading-tight mb-4">
                                Join our Global <br /> Medical Network.
                            </h2>
                            <p className="text-indigo-100/80 text-lg">
                                Create your account to start managing appointments, medical records, and hospital operations in one place.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                                <p className="text-2xl font-bold text-white">99.9%</p>
                                <p className="text-xs text-indigo-200">System Uptime</p>
                            </div>
                            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                                <p className="text-2xl font-bold text-white">24/7</p>
                                <p className="text-xs text-indigo-200">Security Monitoring</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Panel */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center bg-white overflow-y-auto no-scrollbar">
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-poppins font-bold text-slate-900 mb-2">Create Account</h1>
                        <p className="text-slate-500">Join the HealthRekha eco-system today.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 animate-in fade-in slide-in-from-top-2 duration-300">
                            <AlertCircle size={20} className="shrink-0" />
                            <p className="text-sm font-bold">{error}</p>
                            <button onClick={() => setError(null)} className="ml-auto text-rose-400 hover:text-rose-600 font-bold">×</button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 font-medium">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all font-bold" size={16} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Rashmi Sharma"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all text-sm"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if(error) setError(null);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 font-medium">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all font-bold" size={16} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="rashmi@provider.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all text-sm"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if(error) setError(null);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 font-medium">
                            <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Select Your Role</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-3">
                                {roles.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: item.id })}
                                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all gap-1.5 ${formData.role === item.id
                                                ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm'
                                                : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5 font-medium">
                            <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Create Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all font-bold" size={16} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all font-mono text-sm"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        if(error) setError(null);
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 mt-4 bg-indigo-600 text-white rounded-2xl font-poppins font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:bg-indigo-400 disabled:shadow-none"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="animate-spin" size={20} /> Creating Account...</>
                            ) : (
                                <>Create Account <ArrowRight size={20} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium border-t border-slate-100 pt-6">
                        <p className="text-slate-500">
                            Already have an account? {' '}
                            <Link to="/login" className="text-indigo-600 font-bold hover:underline underline-offset-4">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
