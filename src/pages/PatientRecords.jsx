import React from 'react';
import { Search, FileText, Calendar, User, Download, Eye, Stethoscope } from 'lucide-react';

const records = [
  { id: 'REC-101', date: '12 Mar 2026', doctor: 'Dr. Sameer Khan', diagnosis: 'Acute Bronchitis', type: 'Outpatient' },
  { id: 'REC-098', date: '05 Feb 2026', doctor: 'Dr. Anjali Rao', diagnosis: 'Routine Checkup', type: 'Consultation' },
  { id: 'REC-082', date: '15 Dec 2025', doctor: 'Dr. Vikram Jha', diagnosis: 'Seasonal Flu', type: 'Emergency' },
];

const PatientRecords = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Medical Records (EMR)</h1>
          <p className="text-slate-500 font-medium text-sm">Your complete digital health history and doctor notes.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <Download size={18} /> Download All
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by diagnosis or doctor..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl outline-none text-sm focus:ring-2 ring-primary/20" 
            />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="px-8 py-5">Visit Date</th>
              <th className="px-6 py-5">Diagnosis</th>
              <th className="px-6 py-5">Doctor</th>
              <th className="px-6 py-5">Type</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {records.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-sm font-bold text-slate-900">{rec.date}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <p className="text-sm font-black text-slate-700">{rec.diagnosis}</p>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-50 rounded flex items-center justify-center text-[10px] font-bold text-indigo-600">
                       {rec.doctor[4]}
                    </div>
                    <span className="text-xs font-medium text-slate-600">{rec.doctor}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                   <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      {rec.type}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-primary transition-all" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-indigo-500 transition-all" title="Download Report">
                      <Download size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-indigo-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
            <div className="relative z-10">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Stethoscope className="text-indigo-400" /> Professional Notes
               </h3>
               <p className="text-sm text-indigo-100 leading-relaxed mb-6">
                  Access detailed observations, lifestyle advice, and follow-up instructions provided by your doctors during each visit.
               </p>
               <button className="px-6 py-2 bg-white text-indigo-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all">
                  Request Case Summary
               </button>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10">
               <FileText size={180} />
            </div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
               <User className="text-primary" /> Care Team
            </h3>
            <div className="space-y-4">
               {[
                 { name: 'Dr. Sameer Khan', role: 'Primary Specialist' },
                 { name: 'Dr. Anjali Rao', role: 'Visiting Neurologist' },
               ].map((doc, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/10 transition-all">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-primary">
                          {doc.name[4]}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{doc.role}</p>
                       </div>
                    </div>
                    <button className="text-primary text-[10px] font-black uppercase tracking-widest">Message</button>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default PatientRecords;
