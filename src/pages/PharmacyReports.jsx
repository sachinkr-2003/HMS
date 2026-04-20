import React from 'react';
import { TrendingUp, DollarSign, Package, PieChart, ArrowUpRight, Download } from 'lucide-react';

const PharmacyReports = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pharmacy Analytics & Reports</h1>
          <p className="text-slate-500">Track sales performance, profit margins, and inventory health.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
          <Download size={18} /> Export Full Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Sales (MTD)</p>
          <h3 className="text-2xl font-black text-slate-900">₹12,45,000</h3>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-500">
            <ArrowUpRight size={14} /> +12.5% vs last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Net Profit (MTD)</p>
          <h3 className="text-2xl font-black text-slate-900">₹3,12,000</h3>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-500">
            <ArrowUpRight size={14} /> +8.2% margin increase
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Inventory Turnover</p>
          <h3 className="text-2xl font-black text-slate-900">4.2x</h3>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-500">
             Healthy Stock Movement
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Medicines */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-primary" /> Top Selling Medicines
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Paracetamol 500mg', sales: 1240, revenue: '₹55,800', growth: '+15%' },
              { name: 'Vitamin C Tabs', sales: 850, revenue: '₹29,750', growth: '+10%' },
              { name: 'Azithromycin 500mg', sales: 420, revenue: '₹42,000', growth: '+5%' },
              { name: 'Cough Syrup (Z)', sales: 310, revenue: '₹18,600', growth: '+2%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-transparent hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                    #{i+1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{item.sales} Units Sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{item.revenue}</p>
                  <p className="text-[10px] text-emerald-500 font-bold">{item.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <PieChart className="text-primary" /> Revenue by Category
          </h2>
          <div className="space-y-6">
            {[
              { category: 'Antibiotics', percentage: 35, color: 'bg-indigo-500' },
              { category: 'Analgesics', percentage: 25, color: 'bg-emerald-500' },
              { category: 'Supplements', percentage: 20, color: 'bg-amber-500' },
              { category: 'Others', percentage: 20, color: 'bg-slate-300' },
            ].map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500">{cat.category}</span>
                  <span className="text-slate-900">{cat.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${cat.color} h-full rounded-full transition-all`} style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-xs text-indigo-700 font-medium">
              💡 **Insight:** Antibiotics are driving 35% of your total revenue this month. Consider checking stock for high-demand items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyReports;
