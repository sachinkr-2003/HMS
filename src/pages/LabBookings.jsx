import React from 'react';
import { Search, Plus, Calendar, Clock, User, CheckCircle, AlertCircle, MoreVertical, Microscope, Activity } from 'lucide-react';

const bookings = [
  { id: 'BK-1001', patient: 'Anika Singh', test: 'Lipid Profile', doctor: 'Dr. Rao', time: '10:00 AM', status: 'Sample Collected', priority: 'Urgent' },
  { id: 'BK-1002', patient: 'Rahul Verma', test: 'CBC', doctor: 'Dr. Khan', time: '10:30 AM', status: 'Pending', priority: 'Normal' },
  { id: 'BK-1003', patient: 'Saira Banu', test: 'Thyroid Panel', doctor: 'Dr. Jha', time: '11:00 AM', status: 'Scheduled', priority: 'Normal' },
  { id: 'BK-1004', patient: 'Ramesh Patel', test: 'X-Ray Chest', doctor: 'Dr. Rao', time: '11:30 AM', status: 'Completed', priority: 'Normal' },
];

const LabBookings = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Investigation Bookings</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Universal registration desk for incoming test inquiries & sample acquisition.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Plus size={16} /> Register New Subject
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Search & Day Filter */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={16} />
            <input 
              type="text" 
              placeholder="Query bookings by ID, Patient or Referring Physician..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md outline-none text-xs font-bold text-gray-700 focus:border-blue-400" 
            />
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded border border-gray-200">
            <Calendar size={14} className="text-blue-500" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Active Shift: Today</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Serial ID</th>
                <th className="px-6 py-4">Subject & Investigation</th>
                <th className="px-6 py-4">Referred By</th>
                <th className="px-6 py-4">Scheduled</th>
                <th className="px-6 py-4">Lifecycle State</th>
                <th className="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter">{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-8 rounded-full ${booking.priority === 'Urgent' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-gray-200'}`} />
                      <div>
                        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">{booking.patient}</p>
                        <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">{booking.test}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">{booking.doctor}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      <Clock size={12} className="text-gray-300" /> {booking.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                      booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      booking.status === 'Sample Collected' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {booking.status === 'Pending' && (
                        <button className="px-3 py-1.5 bg-gray-900 text-white text-[9px] font-bold rounded uppercase tracking-widest hover:bg-blue-600 transition-all">
                          Acquire Sample
                        </button>
                      )}
                      <button className="p-2 text-gray-300 hover:text-blue-600 transition-all">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personnel Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <User size={14} className="text-blue-500" /> Authorized Personnel On Shift
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Suresh Raina', role: 'Chief Technician', status: 'On Duty', tests: 5 },
              { name: 'Amit Bhadana', role: 'Imaging Specialist', status: 'On Duty', tests: 3 },
            ].map((tech, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded border border-gray-100 flex items-center justify-center font-bold text-blue-600 text-xs shadow-sm">
                    {tech.name[0]}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">{tech.name}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{tech.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">{tech.status}</p>
                  <p className="text-[10px] text-gray-400 font-bold font-mono mt-1">{tech.tests} INVESTIGATIONS</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Terminal */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-500 rounded">
                    <Activity size={18} className="text-white" />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 italic">Priority Protocol Active</h2>
            </div>
            <p className="text-gray-400 text-[10px] font-medium leading-relaxed mb-8 uppercase tracking-widest">
                CRITICAL: 05 Urgent investigations pending synchronization. Accelerated sample collection enabled for STAT requests.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 flex items-center justify-center font-bold text-[10px] text-white">
                    {i}
                  </div>
                ))}
              </div>
              <button className="flex-1 py-3 bg-white text-gray-900 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-transparent shadow-2xl">
                Enter Urgent Queue Terminal
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Microscope size={150} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabBookings;
