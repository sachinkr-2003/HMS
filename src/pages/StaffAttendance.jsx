import React from 'react';
import { Clock, CheckCircle, XCircle, Calendar, Search, Filter, ArrowRight, Activity, UserCheck } from 'lucide-react';

const attendanceData = [
  { id: 'STF-101', name: 'Rohan Sharma', role: 'Receptionist', shift: 'Morning (08:00 - 16:00)', clockIn: '07:55 AM', status: 'Present' },
  { id: 'STF-102', name: 'Suhani Singh', role: 'Billing Clerk', shift: 'Morning (08:00 - 16:00)', clockIn: '08:05 AM', status: 'Late' },
  { id: 'STF-105', name: 'Amit Kumar', role: 'Ward Assistant', shift: 'Night (20:00 - 04:00)', clockIn: '--', status: 'Absent' },
  { id: 'STF-108', name: 'Priya Verma', role: 'Lab Tech', shift: 'General (10:00 - 18:00)', clockIn: '09:58 AM', status: 'Present' },
];

const StaffAttendance = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Institutional Attendance Register</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Official terminal for staff shift authorization, chronological clock-ins & workforce availability Surveillance.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-all">
            <Calendar size={12} className="text-blue-600" /> Current Cycle: Today
        </div>
      </div>

      {/* Compact High-D Attendance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
              { label: 'Total Workforce On-Strength', val: '42', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Active Personnel (Present)', val: '38', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Variance Identified (Late)', val: '02', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Non-Availability (Absent)', val: '02', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' }
          ].map((m, i) => (
              <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                  <div className="flex justify-between items-start">
                      <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                          <m.icon size={16} />
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2">{m.val} UNITS</h3>
              </div>
          ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Control & Filter Line */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
            <input 
              type="text" 
              placeholder="Query Attendance Archives by RID or Full Name..." 
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded outline-none text-[10px] font-bold text-gray-700 uppercase focus:border-blue-400 tracking-tighter" 
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 rounded border border-gray-200 transition-colors">
            <Filter size={14} /> Global Refinement
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">RID (Serial)</th>
                <th className="px-6 py-4">Personnel Identity</th>
                <th className="px-6 py-4">Assigned Shift Vector</th>
                <th className="px-6 py-4">Clock-In Timestamp</th>
                <th className="px-6 py-4 text-center">Lifecycle State</th>
                <th className="px-6 py-4 text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-inter">
              {attendanceData.map((staff) => (
                <tr key={staff.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter uppercase">{staff.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{staff.name}</p>
                    <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">{staff.role}</p>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">{staff.shift}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-900 font-mono italic">{staff.clockIn}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border shadow-sm ${
                      staff.status === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      staff.status === 'Late' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-300 hover:text-blue-600 transition-all">
                      <ArrowRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Shift Health brief */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-gray-900 rounded-lg text-white border border-gray-800 shadow-xl relative overflow-hidden">
               <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-4 italic">Workforce Velocity AI</h3>
               <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-relaxed">Intelligence: Shift synchronization identified at 92.4% efficiency. Morphological late-arrival clusters detected in **Morning Shift Wing B**. Recommendation: Review check-in protocols.</p>
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Activity size={100} />
               </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between">
               <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Staff On Floor</p>
                   <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-1">38 Authorized Units</h3>
               </div>
               <button className="px-5 py-2 bg-gray-900 text-white rounded text-[9px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">Export Shift Ledger</button>
          </div>
      </div>
    </div>
  );
};

export default StaffAttendance;
