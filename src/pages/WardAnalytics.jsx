import React from 'react';
import { TrendingUp, PieChart, Activity, Users, ArrowUpRight, Bed, Download, ShieldCheck } from 'lucide-react';

const WardAnalytics = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Floor Operational Analytics</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Institutional data analysis for stay durations, occupancy velocity & unit efficiency markers.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Download size={16} /> Export Performance Ledger
        </button>
      </div>

      {/* Compact High-D Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
            { label: 'Avg. Occupancy Coefficient', val: '82.4%', growth: '+5.2%', icon: Bed, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Avg. Inpatient Duration', val: '4.2 DAYS', growth: 'Optimal', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Cumulative Admissions (MTD)', val: '148 Subjects', growth: '+12.0%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' }
        ].map((m, i) => (
            <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                <div className="flex justify-between items-start">
                    <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                        <m.icon size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                </div>
                <div className="mt-2 flex items-end justify-between">
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">{m.val}</h3>
                    <span className={`text-[10px] font-bold ${m.growth.includes('+') ? 'text-emerald-500' : 'text-blue-500'}`}>{m.growth}</span>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ward Occupancy Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <PieChart className="text-blue-500" size={14} /> Unit Specific Analysis
          </h2>
          <div className="space-y-6">
            {[
              { type: 'ICU (Critical Care)', percentage: 92, color: 'bg-rose-500', trend: 'High Velocity' },
              { type: 'General Ward - Wing A', percentage: 75, color: 'bg-blue-500', trend: 'Optimal' },
              { type: 'Private Professional Rooms', percentage: 60, color: 'bg-emerald-500', trend: 'Moderate' },
              { type: 'Maternity Specialization', percentage: 85, color: 'bg-amber-500', trend: 'High Velocity' },
            ].map((ward, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                  <span className="text-gray-500">{ward.type}</span>
                  <span className={ward.trend.includes('High') ? 'text-rose-500' : 'text-gray-900'}>{ward.percentage}% | {ward.trend}</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`${ward.color} h-full transition-all duration-1000 shadow-sm`} style={{ width: `${ward.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Bio-Operational Engine */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden flex flex-col justify-between">
          <div>
            <h2 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-10 flex items-center gap-3 italic">
               <ShieldCheck className="text-blue-400" size={18} /> Operational AI Insights Engine
            </h2>
            <div className="space-y-6 lg:ml-2">
              <div className="p-5 bg-white/5 rounded border border-white/5 group hover:bg-white/10 transition-all">
                <p className="text-blue-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2">Cycle Time Prediction</p>
                <p className="text-[11px] font-medium leading-relaxed text-gray-400 uppercase tracking-tighter">Verified anomaly: General Ward B stay durations are 1.5 days above aggregate. Protocol audit requested for Ward B synchronization.</p>
              </div>
              <div className="p-5 bg-white/5 rounded border border-white/5 group hover:bg-white/10 transition-all">
                <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2">Resource Balancing Matrix</p>
                <p className="text-[11px] font-medium leading-relaxed text-gray-400 uppercase tracking-tighter">ICU demand peaks during Monday cycle. Strategic recommendation: Realign elective surgeries to mid-week window to preserve emergency capacity.</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <TrendingUp size={200} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardAnalytics;
