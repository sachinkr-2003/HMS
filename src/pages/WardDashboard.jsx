import React from 'react';
import { 
  Bed, 
  UserPlus, 
  UserMinus, 
  Clock, 
  PieChart, 
  AlertCircle,
  TrendingUp,
  Activity,
  Filter,
  ChevronRight
} from 'lucide-react';

const WardDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Institutional Ward Surveillance</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Real-time bed occupancy metrics, admission flow control & floor optimization.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
            Floor Map View
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
            + Admit Subject
          </button>
        </div>
      </div>

      {/* Compact High-D Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
            { label: 'Inventory (Total Beds)', val: '120', icon: Bed, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active Occupancy', val: '84', icon: UserPlus, color: 'text-rose-600', bg: 'bg-rose-50' },
            { label: 'Available (Ready)', val: '28', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Sanitization Flow', val: '08', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((m, i) => (
            <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                <div className="flex justify-between items-start">
                    <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                        <m.icon size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2">{m.val}</h3>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ward Distribution Progress */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Floor Wise Occupancy Distribution</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer">
                <Filter size={12} className="text-blue-500" /> Authorized Filter: All Floors
            </div>
          </div>
          <div className="space-y-8 px-2">
            {[
              { type: 'General Ward (Floor 1-3)', occupied: 45, total: 60, color: 'bg-blue-500' },
              { type: 'ICU (Critical Care Unit)', occupied: 18, total: 20, color: 'bg-rose-500' },
              { type: 'Private Suite (Wing A)', occupied: 12, total: 25, color: 'bg-emerald-500' },
              { type: 'Emergency Reception', occupied: 9, total: 15, color: 'bg-amber-500' },
            ].map((ward, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">{ward.type}</h4>
                    <p className="text-[10px] text-gray-400 font-bold font-mono tracking-widest mt-0.5">{ward.occupied}/{ward.total} REGISTERED BEDS</p>
                  </div>
                  <span className="text-xs font-bold text-gray-800 font-mono italic">{Math.round((ward.occupied/ward.total)*100)}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`${ward.color} h-full transition-all duration-1000 shadow-sm`} 
                    style={{ width: `${(ward.occupied/ward.total)*100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Bio-Surveillance Terminal */}
        <div className="space-y-4">
          <div className="bg-gray-900 p-7 rounded-lg shadow-xl text-white border border-gray-800 h-full flex flex-col justify-between min-h-[350px]">
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-600 rounded">
                        <TrendingUp size={18} className="text-white" />
                    </div>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500 italic">Occupancy AI Predictor</h2>
                </div>
                <div className="space-y-4">
                    <div className="p-5 bg-white/5 rounded border border-white/5">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-3">Admission Forecast Engine</p>
                    <p className="text-[11px] font-medium leading-relaxed text-gray-400">High-velocity admission influx predicted for **General Ward** within the next 24-48 HRS.</p>
                    <div className="mt-4 text-emerald-400 text-[9px] font-bold flex items-center gap-2 uppercase tracking-widest animate-pulse">
                        <Activity size={14} /> Intelligence: Initiate 04 Subject Discharges
                    </div>
                    </div>
                    
                    <div className="p-5 bg-rose-500/5 rounded border border-rose-500/10">
                    <div className="flex items-center gap-2 text-rose-500 mb-2">
                        <AlertCircle size={14} />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">STAT Alert: ICU Capacity</p>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-tighter">Critical Threshold: Only 02 units remaining. Notify Floor Dispatch & Triage immediately.</p>
                    </div>
                </div>
            </div>
            <button className="w-full py-3 mt-6 bg-white/5 border border-white/10 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors">
                Sync Occupancy Ledger
            </button>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <UserPlus size={14} className="text-blue-500" /> Latest Lifecycle Events
            </h2>
            <div className="space-y-2">
              {[
                { name: 'Amit Kumar', bed: 'ICU-102', time: '10 MINS AGO' },
                { name: 'Saira Banu', bed: 'GEN-405', time: '45 MINS AGO' },
              ].map((adm, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-100 hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white border border-gray-100 rounded flex items-center justify-center font-bold text-blue-600 text-[10px] shadow-sm">
                      {adm.name[0]}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">{adm.name}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{adm.bed} ASSIGNED</p>
                    </div>
                  </div>
                  <span className="text-[8px] text-gray-400 font-bold italic">{adm.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardDashboard;
