import React from 'react';
import { Search, Plus, FileText, Download, Truck, Calendar } from 'lucide-react';

const purchases = [
  { id: 'PUR-2026-001', supplier: 'Sun Pharma Ltd.', date: '15 Apr 2026', amount: '₹1,24,500', status: 'Delivered' },
  { id: 'PUR-2026-002', supplier: 'Cipla Healthcare', date: '18 Apr 2026', amount: '₹85,000', status: 'In Transit' },
  { id: 'PUR-2026-003', supplier: 'Apollo Distributors', date: '19 Apr 2026', amount: '₹42,800', status: 'Pending' },
];

const PharmacyPurchases = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Purchase Management</h1>
          <p className="text-slate-500">Track medicine procurement and supplier invoices.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
          <Plus size={18} /> New Purchase Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Truck size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Orders</p>
            <h3 className="text-xl font-bold text-slate-900">08 Orders</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Monthly Spend</p>
            <h3 className="text-xl font-bold text-slate-900">₹4.2 Lakhs</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Upcoming Deliveries</p>
            <h3 className="text-xl font-bold text-slate-900">03 Today</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold">Purchase History</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search PO or Supplier..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs outline-none" />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">PO Number</th>
              <th className="px-6 py-4">Supplier Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {purchases.map((pur) => (
              <tr key={pur.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 text-sm font-bold text-slate-400">{pur.id}</td>
                <td className="px-6 py-4 font-bold text-slate-900">{pur.supplier}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{pur.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{pur.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    pur.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 
                    pur.status === 'In Transit' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {pur.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 bg-slate-50 text-slate-400 hover:bg-primary hover:text-white rounded-lg transition-all">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacyPurchases;
