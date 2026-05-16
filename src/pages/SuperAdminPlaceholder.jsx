import React from 'react';
import { Construction, Sparkles } from 'lucide-react';

const SuperAdminPlaceholder = ({ title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-100">
                <Construction size={48} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">{title}</h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">{description || "This module is currently undergoing structural engineering and will be deployed in the next system update."}</p>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg uppercase tracking-widest text-xs">
                <Sparkles size={16} /> Notify on Deployment
            </button>
        </div>
    );
};

export default SuperAdminPlaceholder;
