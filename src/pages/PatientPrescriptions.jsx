import React from 'react';
import { Pill, Clock, AlertCircle, Download, Printer, Calendar } from 'lucide-react';

const prescriptions = [
  { id: 'RX-7721', medicine: 'Amoxicillin 500mg', dosage: '1-0-1 (After Food)', duration: '5 Days', instructions: 'Finish full course even if feeling better.', status: 'Active' },
  { id: 'RX-7715', medicine: 'Paracetamol 650mg', dosage: '1-1-1 (SOS)', duration: '3 Days', instructions: 'Take only if fever > 100°F.', status: 'Active' },
  { id: 'RX-7650', medicine: 'Vitamin D3 60K', dosage: '0-0-1 (Weekly)', duration: '4 Weeks', instructions: 'Take with milk on Sunday morning.', status: 'Completed' },
];

const PatientPrescriptions = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Prescriptions</h1>
          <p className="text-slate-500 font-medium text-sm">Track your medications, dosages, and refill reminders.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
             <Download size={18} /> Download All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {prescriptions.map((px) => (
           <div key={px.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative group hover:border-primary/20 transition-all">
              <div className="flex justify-between items-start mb-6">
                 <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl">
                    <Pill size={32} />
                 </div>
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                   px.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                 }`}>
                    {px.status}
                 </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">{px.medicine}</h3>
              <p className="text-sm font-bold text-primary mb-6">{px.dosage}</p>
              
              <div className="space-y-4 pt-6 border-t border-slate-50">
                 <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                       <Calendar size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Duration: {px.duration}</span>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                       <AlertCircle size={16} />
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{px.instructions}</p>
                 </div>
              </div>

              <div className="mt-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-[10px] uppercase tracking-widest">Order Refill</button>
                 <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600">
                    <Printer size={18} />
                 </button>
              </div>

              <span className="absolute top-8 right-8 text-[10px] font-bold text-slate-300">ID: {px.id}</span>
           </div>
         ))}
      </div>

      {/* Medication Reminder Banner */}
      <div className="bg-indigo-900 p-8 rounded-[2.5rem] shadow-xl text-white flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-300">
               <Clock size={32} />
            </div>
            <div>
               <h3 className="text-xl font-bold">Medication Reminders</h3>
               <p className="text-indigo-200 text-sm">Sync with your phone to get timely alerts for your doses.</p>
            </div>
         </div>
         <button className="px-8 py-3 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all">
            Enable Alerts
         </button>
      </div>
    </div>
  );
};

export default PatientPrescriptions;
