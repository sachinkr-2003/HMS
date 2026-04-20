import React from 'react';
import { Search, FileText, Upload, Download, Share2, CheckCircle, Clock, Filter } from 'lucide-react';

const reportQueue = [
  { id: 'REP-101', patient: 'Rahul Verma', test: 'CBC', date: '20 Apr 2026', status: 'Ready', size: '1.2 MB' },
  { id: 'REP-102', patient: 'Anika Singh', test: 'Lipid Profile', date: '20 Apr 2026', status: 'Draft', size: '0.8 MB' },
  { id: 'REP-103', patient: 'Ramesh Patel', test: 'X-Ray Chest', date: '19 Apr 2026', status: 'Ready', size: '4.5 MB' },
];

const LabReports = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Report Archive & Issuance</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Unified repository for diagnostic results, digital authorization & patient distribution.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Upload size={16} /> Upload Result Vector
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Control Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Authorized Issuance Queue</h2>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
              <input type="text" placeholder="Lookup Subject or MRN..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded text-[10px] font-bold uppercase outline-none focus:border-blue-400" />
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-all border border-gray-200 rounded bg-white">
                <Filter size={14} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Internal ID</th>
                <th className="px-6 py-4">Subject & Investigation</th>
                <th className="px-6 py-4">Authorization Date</th>
                <th className="px-6 py-4">Lifecycle State</th>
                <th className="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-inter">
              {reportQueue.map((rep) => (
                <tr key={rep.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter">{rep.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">{rep.patient}</p>
                      <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">{rep.test}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-gray-500 font-bold uppercase tracking-tighter">{rep.date}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                      rep.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {rep.status === 'Ready' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {rep.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-gray-300 hover:text-blue-600 transition-all" title="Review Report">
                        <FileText size={16} />
                      </button>
                      <button className="p-2 text-gray-300 hover:text-blue-600 transition-all" title="Download Official PDF">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-gray-300 hover:text-blue-600 transition-all" title="Secure Transmission">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Industrial Upload Terminal */}
      <div className="bg-white p-12 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-400 transition-all cursor-pointer group bg-gray-50/10">
        <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
          <Upload size={24} />
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-1 font-mono">Satellite Result Synchronization</h3>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight font-inter">Authorized vectors supported: PDF, JPG, DICOM (Max Aggregate: 50MB)</p>
        </div>
        <button className="px-6 py-2 bg-gray-900 text-white rounded text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 transition-all">Select Master Files</button>
      </div>
    </div>
  );
};

export default LabReports;
