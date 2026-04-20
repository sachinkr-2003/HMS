import React from 'react';
import { MessageSquare, Bot, Send, User, BrainCircuit, Activity, HelpCircle } from 'lucide-react';

const PatientSupport = () => {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Support & Assistance</h1>
          <p className="text-slate-500 font-medium text-sm">Get help from our AI assistant or chat with your medical care team.</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
           <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <Bot size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900">HealthRekha AI</h3>
                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
                    </p>
                 </div>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Messages */}
              <div className="flex gap-4 max-w-2xl">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                    <Bot size={20} />
                 </div>
                 <div className="bg-slate-50 p-4 rounded-[2rem] rounded-tl-none">
                    <p className="text-sm text-slate-600 leading-relaxed">
                       Hello Rohan! I'm your HealthRekha AI. How can I help you today? You can ask about your reports, schedule an appointment, or describe symptoms you're feeling.
                    </p>
                 </div>
              </div>

              <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse">
                 <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
                    <User size={20} />
                 </div>
                 <div className="bg-primary p-4 rounded-[2rem] rounded-tr-none text-white shadow-lg shadow-primary/20">
                    <p className="text-sm leading-relaxed font-medium">
                       Can you explain my last Lipid Profile report?
                    </p>
                 </div>
              </div>

              <div className="flex gap-4 max-w-2xl">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                    <Bot size={20} />
                 </div>
                 <div className="bg-slate-50 p-4 rounded-[2rem] rounded-tl-none">
                    <p className="text-sm text-slate-600 leading-relaxed">
                       Sure! Your last report shows a **Total Cholesterol of 210 mg/dL**, which is slightly above the desirable range (under 200). Your **LDL (Bad Cholesterol)** is also elevated. I suggest discussing a low-fat diet with your doctor. Would you like to book a follow-up?
                    </p>
                 </div>
              </div>
           </div>

           <div className="p-6 bg-slate-50/50 border-t border-slate-100">
              <div className="flex items-center gap-4 bg-white p-2 pl-6 rounded-2xl border border-slate-100 shadow-sm">
                 <input 
                    type="text" 
                    placeholder="Type your health query here..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                 />
                 <button className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    <Send size={18} />
                 </button>
              </div>
           </div>
        </div>

        {/* Support Sidebar */}
        <div className="space-y-6 flex flex-col min-h-0 overflow-y-auto pr-2">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden shrink-0">
              <div className="relative z-10">
                 <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                    <BrainCircuit size={24} className="text-indigo-400" /> AI Symptom Checker
                 </h2>
                 <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    Describe how you're feeling and our clinical AI will help identify potential causes.
                 </p>
                 <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5">
                    <Activity size={18} /> Start New Scan
                 </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 shrink-0">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <HelpCircle size={20} className="text-primary" /> Common FAQs
              </h3>
              <div className="space-y-3">
                 {[
                   'How to book a lab test?',
                   'Where can I find my old prescriptions?',
                   'How to update insurance details?',
                 ].map((q, i) => (
                   <button key={i} className="w-full text-left p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-primary transition-all border border-transparent hover:border-primary/10">
                      {q}
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-center gap-4 shrink-0">
              <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                 <MessageSquare size={20} />
              </div>
              <div>
                 <h4 className="text-xs font-black text-indigo-900 uppercase">Emergency Support</h4>
                 <p className="text-xs text-indigo-600 font-bold">+91 1800-444-999</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSupport;
