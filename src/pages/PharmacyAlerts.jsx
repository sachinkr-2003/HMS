import React from 'react';
import { Settings, AlertTriangle, Bell, Clock, Package } from 'lucide-react';

const PharmacyAlerts = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inventory Alerts</h1>
        <p className="text-slate-500">Critical notifications for stock and expiry management.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expiry Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="text-rose-500" /> Near Expiry (Next 30 Days)
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Insulin Glargine', batch: 'BT-005', expiry: '25 Apr 2026', risk: 'Critical' },
              { name: 'Azithromycin', batch: 'BT-442', expiry: '12 May 2026', risk: 'Medium' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-rose-200 transition-all">
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Batch: {item.batch}</p>
                  <p className="text-xs text-rose-500 mt-1 font-medium">Expires: {item.expiry}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  item.risk === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {item.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Package className="text-amber-500" /> Low Stock Notification
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Paracetamol 500mg', stock: 12, min: 50 },
              { name: 'Cough Syrup (Z)', stock: 5, min: 20 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-all">
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">Current Stock: <span className="text-rose-500 font-bold">{item.stock}</span> units</p>
                  <p className="text-[10px] text-slate-400 mt-1">Minimum required: {item.min}</p>
                </div>
                <button className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 transition-all">
                  REORDER
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyAlerts;
