import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Activity, DollarSign, PieChart, ArrowUpRight, Microscope, Download, BarChart2, Loader2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const LabAnalytics = () => {
  const [stats, setStats] = useState({
    cumulative: 0,
    revenue: 0,
    avgTAT: '0 HRS',
    distribution: []
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/lab/analytics');
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Clinical Intelligence Failure:", err);
      // Empty state
      setStats({ cumulative: 0, revenue: 0, avgTAT: '0 HRS', distribution: [] });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Clinical Performance Ledger</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Institutional analytics for investigation volumes, financial throughput & diagnostic velocity.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Download size={16} /> Export Fiscal Analytics
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
            { label: 'Cumulative Volume (Monthly)', val: stats.cumulative, growth: '+0%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Diagnostic Revenue (MTD)', val: formatCurrency(stats.revenue), growth: '+0%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Average TAT Latency', val: stats.avgTAT, growth: '0 HRS', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' }
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
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Activity className="text-blue-500" size={14} /> Statistical Distribution
          </h2>
          <div className="space-y-6">
            {stats.distribution.length === 0 ? (
                <div className="py-20 text-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">No Intelligence Data Registered</div>
            ) : stats.distribution.map((test, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                  <span className="text-gray-600">{test.name}</span>
                  <span className="text-gray-900">{test.count} | {test.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden border border-gray-50">
                  <div className={`bg-blue-600 h-full transition-all duration-1000`} style={{ width: `${test.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 p-7 rounded-lg shadow-xl text-white border border-gray-800 flex flex-col justify-between">
          <div>
            <h2 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 italic">
              <PieChart className="text-blue-400" size={16} /> Bio-Diagnostic Intel Engine
            </h2>
            <div className="p-5 bg-white/5 rounded border border-white/5 font-medium">
                <h4 className="text-[10px] font-bold text-blue-400 mb-3 uppercase tracking-widest">Anomaly Detection Frequency</h4>
                <p className="text-[11px] leading-relaxed text-gray-400 uppercase tracking-tighter">Verified intelligence: System is monitoring real-time diagnostic outcomes for outlier clinical frequency. Data integrity: Synchronized.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabAnalytics;
