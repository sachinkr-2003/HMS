import React from 'react';
import { Search, Plus, UserPlus, Bed, Calendar, Clock, ArrowRightLeft, MoreVertical, Filter, ShieldCheck } from 'lucide-react';

const admissions = [
  { id: 'ADM-8801', patient: 'Amit Kumar', bed: 'ICU-102', date: '20 Apr 2026', time: '10:00 AM', status: 'Admitted' },
  { id: 'ADM-8802', patient: 'Saira Banu', bed: 'GEN-405', date: '20 Apr 2026', time: '11:30 AM', status: 'Admitted' },
  { id: 'ADM-8795', patient: 'Rahul Verma', bed: 'ICU-101', date: '18 Apr 2026', time: '02:00 PM', status: 'In Treatment' },
];

const WardAdmissions = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Admission Control Terminal</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Official register for subject ward allotment, IPD lifecycle management & clinical transfers.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Plus size={16} /> Finalize New Admission
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admission Register List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Active IPD Enrollments</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
                <input type="text" placeholder="Lookup Admission ID or MRN..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none text-[10px] font-bold text-gray-700 focus:border-blue-400 trasition-all" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Internal ID</th>
                    <th className="px-6 py-4">Subject Name</th>
                    <th className="px-6 py-4 text-center">Assigned Unit</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4 text-right">Ops</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {admissions.map((adm) => (
                    <tr key={adm.id} className="hover:bg-blue-50/20 transition-all group">
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter">{adm.id}</td>
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-800 uppercase tracking-tight">{adm.patient}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded text-[9px] font-bold uppercase border border-blue-100 tracking-widest">
                          {adm.bed}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter italic">{adm.date}</div>
                        <div className="text-[9px] text-gray-300 font-bold mt-0.5">{adm.time} HRS</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-gray-300 hover:text-blue-600 transition-all" title="Shift Allocation">
                            <ArrowRightLeft size={14} />
                          </button>
                          <button className="p-2 text-gray-300 hover:text-gray-600 transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Admission Control */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-[10px] font-bold mb-6 flex items-center gap-2 text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-3">
              <UserPlus size={16} className="text-blue-600" /> Accelerated Induction
            </h2>
            <div className="space-y-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
                <input type="text" placeholder="Authorized Patient Lookup..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg outline-none text-[11px] font-bold text-gray-700 focus:border-blue-400 transition-all font-inter" />
              </div>
              
              <div className="space-y-2">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] ml-1">Ward Category Selection</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold border border-blue-100 uppercase tracking-widest">General</button>
                  <button className="py-2.5 bg-gray-50 text-gray-400 rounded-lg text-[10px] font-bold border border-gray-100 uppercase tracking-widest">ICU (Critical)</button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] ml-1">Floor Allocation</p>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold uppercase outline-none focus:border-blue-400 transition-all text-gray-700 font-inter">
                  <option>Select Valid Unit</option>
                  <option>GEN-104 (AUTHORIZED)</option>
                  <option>ICU-103 (AUTHORIZED)</option>
                  <option>PVT-202 (AUTHORIZED)</option>
                </select>
              </div>

              <div className="pt-2">
                <button className="w-full py-4 bg-gray-900 text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-blue-600 transition-all">
                  AUTHORIZE ADMISSION
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-white border border-gray-800">
            <h2 className="text-[10px] font-bold mb-8 flex items-center gap-2 text-blue-400 uppercase tracking-[0.2em] border-b border-white/5 pb-4 italic">
              <ShieldCheck className="text-blue-500" size={18} /> Floor Capacity Engine
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-400">ICU Saturation</span>
                  <span className="text-rose-500 italic">90% CAP</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: '90%' }} />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-400">General Ward Matrix</span>
                  <span className="text-emerald-500 italic">65% CAP</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
            <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-10 text-center italic">Live capacity surveillance active.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardAdmissions;
