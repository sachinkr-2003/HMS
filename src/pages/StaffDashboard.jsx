import React from 'react';
import { 
  UserPlus, 
  CalendarCheck, 
  ListOrdered, 
  Search, 
  Plus,
  Clock,
  MoreVertical,
  Activity,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

const queue = [
  { id: '101', name: 'Rohan Sharma', doctor: 'Dr. Khan', status: 'Next', time: '10:15 AM' },
  { id: '102', name: 'Amit Kumar', doctor: 'Dr. Rao', status: 'Waiting', time: '10:30 AM' },
  { id: '103', name: 'Sonia Verma', doctor: 'Dr. Jha', status: 'Waiting', time: '10:45 AM' },
  { id: '104', name: 'Priya Singh', doctor: 'Dr. Khan', status: 'In Consultation', time: '10:00 AM' },
];

const StaffDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Staff Operations Center</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Institutional reception desk for subject onboarding, queue synchronization & real-time activity surveillance.</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                Queue Analytics
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                <Plus size={16} /> New Enrollment
            </button>
        </div>
      </div>

      {/* Compact High-D Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
              { label: 'Shift Enrollments', val: '24', icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Active Appointments', val: '56', icon: CalendarCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Queue Saturation', val: '08', icon: ListOrdered, color: 'text-amber-600', bg: 'bg-amber-50' }
          ].map((m, i) => (
              <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                  <div className="flex justify-between items-start">
                      <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                          <m.icon size={16} />
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2">{m.val} SUBJECTS</h3>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Registration Form */}
        <div className="space-y-6">
          <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-[10px] font-bold mb-6 flex items-center gap-2 text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">
               <UserPlus size={16} className="text-blue-600" /> Subject Induction Matrix
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="GIVEN NAME" className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" />
                <input type="text" placeholder="SURNAME" className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" />
              </div>
              <input type="tel" placeholder="PRIMARY CONTACT VECTOR (PHONE)" className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" />
              <div className="grid grid-cols-2 gap-4">
                <select className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 text-gray-400 font-mono tracking-tighter">
                  <option>GENDER IDENT</option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                  <option>OTHER</option>
                </select>
                <input type="number" placeholder="CHRONO AGE" className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" />
              </div>
              <button className="w-full py-4 bg-gray-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]">
                AUTHORIZE REGISTRATION
              </button>
            </div>
          </div>

          {/* Activity Alerts Terminal */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div>
                <h2 className="text-[10px] font-bold mb-8 flex items-center gap-2 text-blue-400 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
                    <ShieldCheck size={18} className="text-blue-500" /> Operational Surveillance
                </h2>
                <div className="space-y-4">
                    <div className="p-5 bg-white/5 rounded border border-white/5 group hover:bg-blue-600/10 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-blue-400 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <Clock size={12} /> Next Available Slot Sync
                            </p>
                            <span className="text-[8px] bg-blue-600 px-2 py-0.5 rounded text-white font-bold">LIVE</span>
                        </div>
                        <p className="text-[11px] font-medium text-gray-300 uppercase tracking-tighter">Dr. Anjali Rao (Neurology Satellite) - Slot 11:20 HRS Ready.</p>
                        <button className="mt-3 text-[9px] font-bold text-blue-400 hover:underline uppercase tracking-widest">Execute Immediate Booking</button>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center gap-3">
                    <Activity size={14} className="text-gray-500" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Queue Latency: 18.4 MINS AVG</p>
                </div>
                <button className="px-3 py-1 bg-white/10 text-white text-[8px] font-bold uppercase rounded border border-white/10 tracking-widest hover:bg-white/20">Sync View</button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <UserCheck size={150} />
            </div>
          </div>
        </div>

        {/* Real-time Influx Terminal */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Live Subject Influx Queue</h2>
              <div className="relative w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={12} />
                <input type="text" placeholder="Lookup Serial ID..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded text-[9px] font-bold uppercase focus:border-blue-400 outline-none" />
              </div>
            </div>
            <div className="divide-y divide-gray-50 overflow-y-auto max-h-[600px]">
              {queue.map((p, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-blue-50/20 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded flex items-center justify-center font-bold text-gray-400 text-[11px] group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all font-mono tracking-tighter uppercase whitespace-nowrap">
                      SID-{p.id}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{p.name}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 italic">Token Priority #{i+1} • {p.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-800 text-[9px] font-bold uppercase tracking-widest rounded hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm">
                      Fiscal Check
                    </button>
                    <button className="p-1.5 text-gray-300 hover:text-gray-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex justify-center">
                <button className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em] hover:underline flex items-center gap-2">
                    Inspect Full Influx Ledger <ArrowRight size={12} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
