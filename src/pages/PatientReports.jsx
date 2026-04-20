import React from 'react';
import { Search, Microscope, Download, Eye, Calendar, AlertCircle, CheckCircle, Activity } from 'lucide-react';

const reports = [
  { id: 'LAB-881', name: 'Lipid Profile', date: '18 Apr 2026', status: 'Completed', result: 'Abnormal' },
  { id: 'LAB-850', name: 'Complete Blood Count (CBC)', date: '12 Mar 2026', status: 'Completed', result: 'Normal' },
  { id: 'LAB-821', name: 'Thyroid Panel (T3, T4, TSH)', date: '05 Feb 2026', status: 'Completed', result: 'Normal' },
];

const PatientReports = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Diagnostic Test Reports</h1>
            <p className="text-xs text-gray-500 font-medium mt-1">Official laboratory results and unified medical history.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Microscope size={16} /> Book New Investigation
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={16} />
            <input 
              type="text" 
              placeholder="Search reports by investigations..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md outline-none text-xs font-bold text-gray-700 focus:border-blue-400" 
            />
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded border border-gray-200 hover:bg-gray-50">Filter: All Time</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Investigation Name</th>
                <th className="px-6 py-4">Release Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Clinical Insight</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reports.map((rep) => (
                <tr key={rep.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded border border-blue-100">
                         <Microscope size={14} />
                      </div>
                      <span className="text-xs font-bold text-gray-800">{rep.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                        <Calendar size={12} className="text-gray-300" /> {rep.date}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded text-[9px] font-bold uppercase tracking-widest border border-emerald-100">
                        {rep.status}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${rep.result === 'Normal' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {rep.result === 'Normal' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                        {rep.result}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-all" title="Review Online">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-all" title="Download PDF Report">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Clinical Explainer Block */}
      <div className="bg-gray-900 px-8 py-8 rounded-lg shadow-xl text-white relative overflow-hidden border border-gray-800">
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
               <h2 className="text-lg font-bold mb-4 flex items-center gap-3 uppercase tracking-tight">
                  <Activity className="text-blue-500" size={20} /> AI Diagnostic Interpreter
               </h2>
               <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                  Utilize unified intelligence to translate complex laboratory metrics into understandable recovery steps. Our AI verifies results against historical data for trend analysis.
               </p>
               <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/40">
                  Initiate AI Analysis
               </button>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/5 backdrop-blur-md">
               <div className="flex items-center gap-2 mb-3">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                   <p className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.2em]">Live Intelligence Feed</p>
               </div>
               <p className="text-xs italic text-gray-300 leading-relaxed font-serif">
                  "Trend observed: Your Lipid Profile indicates elevated LDL (Low-Density Lipoprotein). Please ensure a consultation with a cardiologist within 48 hours for clinical optimization."
               </p>
            </div>
         </div>
         <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Microscope size={200} className="text-white" />
         </div>
      </div>
    </div>
  );
};

export default PatientReports;
