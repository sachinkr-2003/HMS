import React from 'react';
import { TrendingUp, BarChart3, PieChart, DollarSign, ArrowUpRight, Download, Calendar, Activity, ShieldCheck, Target } from 'lucide-react';

const BillingReports = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Institutional Financial Intelligence</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Multi-dimensional analysis of revenue streams, unit-level profitability & institutional audit markers.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-all">
            <Calendar size={12} className="text-blue-600" /> Active Range: Last 30 Cycles
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
            <Download size={16} /> Final Audit Generation
          </button>
        </div>
      </div>

      {/* Compact High-D Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
            { label: 'Cumulative Gross Revenue (Monthly)', val: '₹18,52,400', growth: '+12.5%', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Institutional Net Margin', val: '32.8%', growth: 'Optimized', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Outstanding Inpatient Dues', val: '₹2,14,500', growth: '08% of Total', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' }
        ].map((m, i) => (
            <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                <div className="flex justify-between items-start">
                    <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                        <m.icon size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                </div>
                <div className="mt-2 flex items-end justify-between">
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight italic font-mono">{m.val}</h3>
                    <span className={`text-[9px] font-bold ${m.growth.includes('+') ? 'text-emerald-500' : m.growth.includes('08%') ? 'text-rose-500' : 'text-blue-500'} uppercase tracking-widest`}>{m.growth}</span>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Vector Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <BarChart3 className="text-blue-500" size={14} /> Departmental Yield analysis
          </h2>
          <div className="space-y-6">
            {[
              { dept: 'Institutional Pharmacy', revenue: '₹6,40,000', percentage: 35, color: 'bg-emerald-500' },
              { dept: 'OPR / Consultation Node', revenue: '₹4,10,000', percentage: 22, color: 'bg-blue-500' },
              { dept: 'Diagnostic & Lab Stream', revenue: '₹3,50,000', percentage: 19, color: 'bg-blue-800' },
              { dept: 'Ward / IPD Infrastructure', revenue: '₹4,52,400', percentage: 24, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2.5">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                  <span className="text-gray-500">{item.dept}</span>
                  <span className="text-gray-900 font-mono italic">{item.revenue} | {item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full transition-all duration-1000 shadow-sm`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Bio-Financial Forecast Engine */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden flex flex-col justify-between h-full min-h-[380px]">
          <div className="relative z-10">
            <h2 className="text-[10px] font-bold mb-8 flex items-center gap-3 text-blue-500 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
               <ShieldCheck className="text-blue-400" size={18} /> Predictive Fiscal Intelligence
            </h2>
            <div className="space-y-6">
               <div className="p-5 bg-white/5 border border-white/10 rounded group hover:bg-white/10 transition-all cursor-pointer">
                 <p className="text-blue-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Cycle Variance Projection</p>
                 <p className="text-lg font-bold font-mono text-white italic tracking-tighter">₹20.4 Lakhs Projected</p>
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest line-clamp-2 mt-2">Institutional Intelligence: 10% Upside variance identified for the next cycle due to high-velocity wellness campaigns.</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-blue-600/5 rounded border border-blue-500/10">
                    <p className="text-emerald-500 text-[8px] font-bold uppercase mb-2 tracking-widest italic">Efficiency Index</p>
                    <p className="text-[11px] font-bold text-gray-200 uppercase tracking-tighter">+₹45k RECLAIMED</p>
                    <p className="text-[8px] text-gray-500 uppercase font-bold mt-1 tracking-widest">Supply-Chain Sync</p>
                 </div>
                 <div className="p-4 bg-rose-600/5 rounded border border-rose-500/10">
                    <p className="text-amber-500 text-[8px] font-bold uppercase mb-2 tracking-widest italic">Solvency Factor</p>
                    <p className="text-[11px] font-bold text-gray-200 uppercase tracking-tighter">STABLE ALPHA</p>
                    <p className="text-[8px] text-gray-500 uppercase font-bold mt-1 tracking-widest">Bad Debt Coefficient</p>
                 </div>
               </div>
            </div>
            <button className="mt-8 w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl border border-transparent">
              <Activity size={14} className="mr-2" /> Inspect Detailed Audit Dataset
            </button>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <DollarSign size={220} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingReports;
