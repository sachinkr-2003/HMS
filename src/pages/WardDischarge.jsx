import React from 'react';
import { Search, LogOut, FileText, CheckCircle, Clock, DollarSign, Download, ShieldCheck } from 'lucide-react';

const dischargeQueue = [
  { id: 'DIS-501', patient: 'Rahul Verma', bed: 'ICU-101', admitDate: '15 Apr 2026', totalDays: 5, status: 'Payment Pending', bill: '₹45,800' },
  { id: 'DIS-502', patient: 'Anika Singh', bed: 'GEN-204', admitDate: '18 Apr 2026', totalDays: 2, status: 'Cleared', bill: '₹12,400' },
];

const WardDischarge = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Discharge Authorization Terminal</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Unified processing for subject clearance, bed sanitization flow & final ledger reconciliation. </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-rose-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-all shadow-md shadow-rose-100">
          <LogOut size={16} /> Initiate Exit Protocol
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Discharge Queue Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Active Clearance Line</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
                <input type="text" placeholder="Lookup Subject or Bed ID..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none text-[10px] font-bold text-gray-700 focus:border-blue-400 transition-all" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Serial ID</th>
                    <th className="px-6 py-4">Subject & Unit</th>
                    <th className="px-6 py-4">Stay Context</th>
                    <th className="px-6 py-4">Authorization</th>
                    <th className="px-6 py-4 text-right">Ops</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dischargeQueue.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/20 transition-all group">
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter">{item.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{item.patient}</p>
                        <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">{item.bed}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter font-mono">{item.totalDays} DAYS DURATION</div>
                        <div className="text-[9px] text-gray-400 font-bold mt-0.5">EST. {item.admitDate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                          item.status === 'Cleared' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-gray-300 hover:text-blue-600 transition-all" title="Review Ledger">
                            <FileText size={16} />
                          </button>
                          {item.status === 'Cleared' ? (
                            <button className="px-3 py-1.5 bg-emerald-600 text-white text-[9px] font-bold rounded uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100">
                              COMMIT EXIT
                            </button>
                          ) : (
                            <button className="px-3 py-1.5 bg-gray-900 text-white text-[9px] font-bold rounded uppercase tracking-widest hover:bg-gray-800 transition-all">
                              PENDING SYNC
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Clearance Verification Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-[10px] font-bold mb-6 flex items-center gap-2 text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-3">
              <CheckCircle size={16} className="text-emerald-500" /> Protocol Verification
            </h2>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded border border-gray-100 space-y-3">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-gray-400 font-mono">SELECTED SUBJECT:</span>
                  <span className="text-gray-900">Rahul Verma</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-gray-400 font-mono">FINAL LEDGER:</span>
                  <span className="text-gray-900 italic">₹45,800.00</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-gray-400 font-mono">INSURANCE VETTING:</span>
                  <span className="text-blue-600">VERIFIED</span>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-[0.2em] ml-1">Pre-Discharge Checklist</p>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-all cursor-pointer border border-transparent hover:border-gray-100">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-0" checked readOnly />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Pharmacology Inventory Reconciled</span>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-all cursor-pointer border border-transparent hover:border-gray-100">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-0" checked readOnly />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Diagnostic Dossier Handover</span>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-all cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="w-3.5 h-3.5 rounded border-2 border-gray-200" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Accounts / Billing Finalization</span>
                </div>
              </div>

              <button className="w-full py-4 bg-gray-900 text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-blue-600 transition-all">
                 AUTHORIZE CLEARANCE
              </button>
            </div>
          </div>

          {/* Fiscal Terminal Briefing */}
          <div className="bg-gray-900 p-7 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden">
            <h2 className="text-[10px] font-bold mb-6 flex items-center gap-2 text-blue-400 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
              <ShieldCheck size={18} className="text-blue-500" /> Fiscal Sync Terminal
            </h2>
            <p className="text-[10px] text-gray-400 leading-relaxed font-medium uppercase tracking-widest opacity-80 mb-6">
              Exit protocols automatically synchronize with institutional reception & financial departments for master receipt generation.
            </p>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5 group cursor-pointer hover:bg-white/10 transition-all">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-gray-500" />
                <span className="text-[9px] font-bold font-mono text-gray-300">DRAFT_INVOICE_881.PDF</span>
              </div>
              <Download size={12} className="text-gray-500 group-hover:text-blue-400" />
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <DollarSign size={130} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardDischarge;
