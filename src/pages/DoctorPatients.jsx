import React from 'react';
import { Search, User, FileText, History, ExternalLink, Filter } from 'lucide-react';

const patientList = [
  { id: 'PAT-8821', name: 'Anika Singh', age: 24, gender: 'Female', lastVisit: '15 Apr 2026', condition: 'Viral Fever' },
  { id: 'PAT-8822', name: 'Rohan Mehta', age: 32, gender: 'Male', lastVisit: '10 Apr 2026', condition: 'Hypertension' },
  { id: 'PAT-8823', name: 'Saira Banu', age: 28, gender: 'Female', lastVisit: '02 Apr 2026', condition: 'Thyroid' },
  { id: 'PAT-8824', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '20 Mar 2026', condition: 'Diabetes' },
];

const DoctorPatients = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient EMR Records</h1>
          <p className="text-slate-500">Access full medical history and records of your patients.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all">
          <Search size={18} /> Find Patient
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search by ID or Name..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm outline-none" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-500 text-sm font-medium hover:bg-slate-50 rounded-lg transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            Total Patients: <span className="text-slate-900">{patientList.length}</span>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Patient ID</th>
              <th className="px-6 py-4">Name / Info</th>
              <th className="px-6 py-4">Last Visit</th>
              <th className="px-6 py-4">Primary Condition</th>
              <th className="px-6 py-4 text-right">EMR Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {patientList.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">{patient.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{patient.name}</p>
                      <p className="text-[10px] text-slate-500">{patient.age} Yrs • {patient.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{patient.lastVisit}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                    {patient.condition}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
                    <ExternalLink size={14} /> VIEW EMR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick History Cards (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <History size={20} className="text-primary" /> Recently Accessed
          </h3>
          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Patient #{8820 + i}</p>
                    <p className="text-[10px] text-slate-400">Viewed 5 mins ago</p>
                  </div>
                </div>
                <button className="text-primary text-xs font-bold hover:underline">Open</button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText size={20} className="text-primary" /> Reports Pending
          </h3>
          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-rose-500 shadow-sm">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Lab Test #{1024 + i}</p>
                    <p className="text-[10px] text-slate-400">Awaiting doctor review</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-lg">Review</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatients;
