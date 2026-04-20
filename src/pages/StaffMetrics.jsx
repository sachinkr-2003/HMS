import React from 'react';
import { Target, TrendingUp, Users, Activity, Star, Calendar, Download, ShieldCheck, Zap } from 'lucide-react';

const staffPerformance = [
  { id: 'STF-101', name: 'Rohan Sharma', role: 'Receptionist', patients: 142, rating: 4.8, efficiency: '94%' },
  { id: 'STF-102', name: 'Suhani Singh', role: 'Billing Clerk', patients: 89, rating: 4.9, efficiency: '98%' },
  { id: 'STF-104', name: 'Dr. Anjali Rao', role: 'Neurologist', patients: 210, rating: 4.7, efficiency: '88%' },
  { id: 'STF-108', name: 'Priya Verma', role: 'Lab Tech', patients: 175, rating: 4.6, efficiency: '92%' },
];

const StaffMetrics = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Personnel Performance Metrics</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Multi-dimensional analysis of workforce efficiency, subject handling volume & clinical satisfaction indices.</p>
        </div>
        <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-all">
                <Calendar size={12} className="text-blue-600" /> Cycle: 1Q-2026
            </div>
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                <Download size={16} /> Export Personnel Audit
            </button>
        </div>
      </div>

      {/* Compact High-D Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
              { label: 'Avg. Institutional Efficiency', val: '92.4%', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Cumulative Subject Handover', val: '1,420', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Mean Satisfaction Index', val: '4.7/5.0', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' }
          ].map((m, i) => (
              <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                  <div className="flex justify-between items-start">
                      <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                          <m.icon size={16} />
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2 italic font-mono">{m.val}</h3>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Leaderboard Ledger */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Active Personnel Efficiency Ledger</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">RID</th>
                  <th className="px-6 py-4">Personnel</th>
                  <th className="px-6 py-4">Handling Vol.</th>
                  <th className="px-6 py-4">Satisfaction</th>
                  <th className="px-6 py-4 text-center">Efficiency Vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-inter">
                {staffPerformance.map((staff) => (
                  <tr key={staff.id} className="hover:bg-blue-50/20 transition-all group">
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter uppercase">{staff.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{staff.name}</p>
                      <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">{staff.role}</p>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-900 font-mono italic">{staff.patients} Subjects</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-1">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          <span className="text-[11px] font-bold text-gray-800">{staff.rating}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm">
                            {staff.efficiency} COEFFICIENT
                        </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Performance Surveillance Engine */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]">
          <div>
            <h2 className="text-[10px] font-bold mb-8 flex items-center gap-2 text-blue-500 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
               <ShieldCheck size={18} className="text-blue-400" /> Bio-Metric Efficiency Engine
            </h2>
            <div className="space-y-6">
               <div className="p-5 bg-white/5 border border-white/10 rounded group hover:bg-white/10 transition-all cursor-pointer">
                 <p className="text-blue-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Institutional Capability Trace</p>
                 <p className="text-[11px] font-medium leading-relaxed text-gray-400 uppercase tracking-tighter italic">"Operational Synchronization identified at 98.2% for Billing Department. High-velocity processing nodes confirmed for Personnel STF-102."</p>
               </div>
               <div className="p-5 bg-blue-600/5 rounded border border-blue-500/10">
                  <p className="text-emerald-500 text-[8px] font-bold uppercase mb-2 tracking-widest italic">Optimization Marker</p>
                  <p className="text-[10px] font-bold text-gray-200 uppercase tracking-tighter">Neurology Wing: Subject through-put capacity increased by 12% in the current cycle.</p>
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <TrendingUp size={220} />
          </div>
          <button className="mt-8 w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl border border-transparent">
             INSPECT QUALITY ARCHIVES
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffMetrics;
