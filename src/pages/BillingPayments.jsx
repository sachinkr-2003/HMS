import React from 'react';
import { Search, Filter, CreditCard, DollarSign, Smartphone, CheckCircle, Clock, MoreVertical, Download, Activity, ShieldAlert } from 'lucide-react';

const payments = [
  { id: 'PAY-9901', patient: 'Rahul Verma', method: 'UPI', date: '20 Apr 2026', time: '14:30', amount: '₹12,450', status: 'Success' },
  { id: 'PAY-9902', patient: 'Anika Singh', method: 'Cash', date: '20 Apr 2026', time: '15:15', amount: '₹4,200', status: 'Success' },
  { id: 'PAY-9895', patient: 'Saira Banu', method: 'Card', date: '19 Apr 2026', time: '11:00', amount: '₹28,600', status: 'Pending' },
  { id: 'PAY-9890', patient: 'Amit Kumar', method: 'UPI', date: '19 Apr 2026', time: '09:45', amount: '₹1,500', status: 'Refunded' },
];

const BillingPayments = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Financial Influx Monitor</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Real-time surveillance of payment transactions, settlement method distribution & institutional refunds.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Download size={16} /> Export Daily Settlement Ledger
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Control & Filter Line */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
            <input 
              type="text" 
              placeholder="Query Transactions by Subject, ID or Authorized Method..." 
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded outline-none text-[10px] font-bold text-gray-700 uppercase focus:border-blue-400 tracking-tighter" 
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 rounded border border-gray-200 transition-colors">
            <Filter size={14} /> Refine Settlement Channel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Subject Name</th>
                <th className="px-6 py-4">Settlement Channel</th>
                <th className="px-6 py-4">Execution Timestamp</th>
                <th className="px-6 py-4">Aggregate</th>
                <th className="px-6 py-4 text-center">Lifecycle</th>
                <th className="px-6 py-4 text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-inter">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter uppercase">{pay.id}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-800 uppercase tracking-tight">{pay.patient}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded bg-gray-50 border border-gray-100">
                        {pay.method === 'UPI' && <Smartphone size={12} className="text-emerald-500" />}
                        {pay.method === 'Card' && <CreditCard size={12} className="text-blue-500" />}
                        {pay.method === 'Cash' && <DollarSign size={12} className="text-amber-500" />}
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{pay.method} Node</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter italic">{pay.date}</div>
                    <div className="text-[9px] text-gray-300 font-bold mt-0.5">{pay.time} HRS</div>
                  </td>
                  <td className="px-6 py-4 text-[12px] font-bold text-gray-900 font-mono italic">{pay.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border shadow-sm ${
                      pay.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      pay.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {pay.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-300 hover:text-blue-600 transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settlement Matrix Breakdown */}
        <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <CheckCircle size={16} className="text-blue-500" /> Fiscal Influx Vector analysis
          </h2>
          <div className="space-y-6 lg:px-2">
            {[
              { method: 'Unified Payments (UPI)', amount: '₹1,12,000', percentage: 65, color: 'bg-emerald-500' },
              { method: 'Professional Card Network', amount: '₹42,500', percentage: 25, color: 'bg-blue-500' },
              { method: 'Direct Fiscal (Cash)', amount: '₹18,000', percentage: 10, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2.5">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                  <span className="text-gray-500">{item.method}</span>
                  <span className="text-gray-900 italic font-mono">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full transition-all duration-1000 shadow-sm`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Bio-Receivable Security */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden flex flex-col justify-between">
          <div>
              <h2 className="text-[10px] font-bold mb-6 flex items-center gap-2 text-amber-500 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
                <ShieldAlert size={18} /> Financial Surveillance Engine
              </h2>
              <p className="text-gray-400 text-[10px] font-medium leading-relaxed mb-8 uppercase tracking-widest opacity-80">
                Institutional Intel: 05 Incomplete settlements identified. Automated reminder synchronization prioritized for outstanding fiscal units.
              </p>
              <div className="space-y-3">
                {[
                    { name: 'Amit Kumar', unit: 'IPD-STAT', due: '₹8,500' },
                    { name: 'Saira Banu', unit: 'LAB-RECO', due: '₹1,200' }
                ].map((debt, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-white/5 rounded border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">{debt.name} ({debt.unit})</span>
                        <span className="text-[10px] font-bold text-rose-500 font-mono italic">{debt.due} OUTSTANDING</span>
                    </div>
                ))}
              </div>
          </div>
          <button className="mt-8 w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-700 transition-all border border-transparent">
             Synchronize Bulk Notifications
          </button>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Activity size={180} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPayments;
