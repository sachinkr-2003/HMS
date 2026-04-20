import React from 'react';
import { Search, FileText, Download, Printer, Eye, Mail, MoreVertical, Filter, ShieldCheck, MailCheck } from 'lucide-react';

const invoices = [
  { id: 'INV-2026-001', patient: 'Rahul Verma', date: '20 Apr 2026', type: 'Combined', amount: '₹14,691', status: 'Paid' },
  { id: 'INV-2026-002', patient: 'Anika Singh', date: '20 Apr 2026', type: 'OPD', amount: '₹1,500', status: 'Paid' },
  { id: 'INV-2026-003', patient: 'Saira Banu', date: '19 Apr 2026', type: 'IPD', amount: '₹48,200', status: 'Draft' },
  { id: 'INV-2026-004', patient: 'Amit Kumar', date: '19 Apr 2026', type: 'Pharmacy', amount: '₹2,450', status: 'Partial' },
];

const BillingInvoices = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Voucher Archive & Repository</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Authorized access to institutional historical invoices, financial drafts & audit-ready billing records.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-6 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
            Bulk Vector Export
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
            Create New Voucher
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Control & Filter Line */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
            <input 
              type="text" 
              placeholder="Query Archives by Voucher ID or Subject Identity..." 
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded outline-none text-[10px] font-bold text-gray-700 uppercase focus:border-blue-400 tracking-tighter" 
            />
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white text-gray-500 text-[9px] font-bold uppercase tracking-widest rounded border border-gray-200 hover:bg-gray-100 transition-all">Filter: All Specification Types</button>
             <button className="px-4 py-2 bg-white text-gray-500 text-[9px] font-bold uppercase tracking-widest rounded border border-gray-200 hover:bg-gray-100 transition-all">Filter: Authorized (PAID)</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Serial ID</th>
                <th className="px-6 py-4">Subject Identity</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4 text-center">Unit Category</th>
                <th className="px-6 py-4">Financial Agg.</th>
                <th className="px-6 py-4">Authorization</th>
                <th className="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-blue-500" />
                      <span className="text-[11px] font-bold text-gray-400 font-mono tracking-tighter uppercase">{inv.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-800 uppercase tracking-tight">{inv.patient}</td>
                  <td className="px-6 py-4 text-[10px] text-gray-500 font-bold uppercase tracking-tighter italic">{inv.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-gray-50 text-gray-400 rounded text-[9px] font-bold uppercase tracking-widest border border-gray-100">{inv.type}</span>
                  </td>
                  <td className="px-6 py-4 text-[12px] font-bold text-gray-900 font-mono italic">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      inv.status === 'Draft' ? 'bg-gray-50 text-gray-400 border-gray-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-gray-300 hover:text-blue-600 transition-all" title="Full Inspection">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-300 hover:text-blue-600 transition-all" title="Vector Download">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-gray-300 hover:text-blue-600 transition-all" title="Authorized Print">
                        <Printer size={16} />
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

      {/* Industrial Disclosure Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-8 rounded-lg text-white relative overflow-hidden shadow-xl border border-gray-800">
           <div className="relative z-10">
              <h3 className="text-[10px] font-bold mb-6 flex items-center gap-2 text-blue-400 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
                <ShieldCheck size={18} /> Institutional Compliance Protocol
              </h3>
              <p className="text-gray-400 text-[10px] font-medium leading-relaxed mb-8 uppercase tracking-widest opacity-80">
                Institutional vouchers undergo automated synchronization via **12% GST Clinical Framework**. Exported datasets include verified HSN/SAC indices for audit-level transparency.
              </p>
              <button className="flex items-center gap-2 text-[9px] font-bold bg-white text-gray-900 px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                Inspect Institutional GST Ledger
              </button>
           </div>
           <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
              <FileText size={200} />
           </div>
        </div>

        <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
           <div>
               <h3 className="text-[10px] font-bold mb-4 flex items-center gap-2 text-gray-800 uppercase tracking-widest">
                <Mail size={16} className="text-blue-600" /> Automated Transmission Sync
              </h3>
              <p className="text-[10px] font-medium text-gray-500 mb-6 uppercase tracking-tight leading-relaxed">System architecture ensures automated secure transmission of verified vouchers to subject-encoded communication channels (Email/Professional SMS) upon authorization.</p>
           </div>
           <div className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-100 group transition-all hover:border-blue-200">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-white border border-gray-100 rounded flex items-center justify-center text-blue-600 font-bold shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">@</div>
                 <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Network Status: Transmission ACTIVE</span>
              </div>
              <button className="text-[9px] font-bold text-blue-600 uppercase tracking-widest hover:underline px-3 py-1 bg-white border border-gray-200 rounded">RECONFIGURE</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInvoices;
