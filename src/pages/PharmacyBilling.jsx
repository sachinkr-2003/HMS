import React, { useState } from 'react';
import { Search, Plus, Trash2, Printer, DollarSign, User, FileText, ShoppingCart, ShieldCheck } from 'lucide-react';

const PharmacyBilling = () => {
  const [billItems, setBillItems] = useState([
    { id: 1, name: 'Paracetamol 500mg', qty: 2, price: 45.00, total: 90.00 },
    { id: 2, name: 'Vitamin C', qty: 1, price: 35.00, total: 35.00 },
  ]);

  const subtotal = billItems.reduce((acc, item) => acc + item.total, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Pharmacy Billing Terminal</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Authorized invoice generation, sales collection & unified digital receipting.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 text-[11px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
            <ShoppingCart size={16} /> Hold Tx
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
            <Printer size={16} /> Finalize & Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Patient Reference Section */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-5 border-b border-gray-50 pb-3">
              <h2 className="text-xs font-bold flex items-center gap-2 text-gray-800 uppercase tracking-widest">
                <User size={16} className="text-blue-600" /> Patient Lifecycle Information
              </h2>
              <span className="text-[9px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-[0.1em] border border-blue-100">Sync with clinical Rx</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" placeholder="Lookup Subject ID / MRN..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg outline-none text-xs font-bold text-gray-700 focus:border-blue-400 transition-all" />
              </div>
              <input type="text" placeholder="Manual Identification (Optional)" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg outline-none text-xs font-bold text-gray-700 focus:border-blue-400 transition-all" />
            </div>
          </div>

          {/* Transaction Ledger Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Billing Consumables</h2>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" placeholder="Scan SKU / Search Medicine..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none text-[10px] font-bold text-gray-700 focus:border-blue-400" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Drug Description</th>
                    <th className="px-6 py-4 text-center">Volume (Qty)</th>
                    <th className="px-6 py-4">Unit Rate</th>
                    <th className="px-6 py-4">Gross Total</th>
                    <th className="px-6 py-4 text-right">Ops</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {billItems.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/20 transition-all">
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-800 uppercase tracking-tighter">{item.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-200">-</button>
                          <span className="text-[11px] font-bold text-gray-700 w-6 text-center">{item.qty}</span>
                          <button className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-200">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[11px] text-gray-500 font-bold">₹{item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-900 italic">₹{item.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-300 hover:text-rose-600 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-600 hover:bg-gray-100 transition-all uppercase tracking-widest">
                <Plus size={12} /> Append SKU Manually
              </button>
            </div>
          </div>
        </div>

        {/* Ledger Summary & Checkout */}
        <div className="space-y-4">
          <div className="bg-gray-900 p-7 rounded-lg shadow-xl text-white border border-gray-800">
            <h2 className="text-xs font-bold mb-8 flex items-center gap-2 uppercase tracking-wide">
              <DollarSign size={18} className="text-blue-500" /> Invoice Breakdown
            </h2>
            <div className="space-y-4 border-b border-white/5 pb-8 mb-8">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500 font-bold uppercase">Base Aggregate</span>
                <span className="font-bold text-gray-300">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500 font-bold uppercase">Clinical GST (18%)</span>
                <span className="font-bold text-gray-300">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500 font-bold uppercase">Discount Adjustment</span>
                <span className="font-bold text-rose-500">- ₹0.00</span>
              </div>
              <div className="pt-4 flex justify-between items-end">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Ledger Total</span>
                <span className="text-3xl font-bold tracking-tighter text-white">₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-4">Payment Instrumentation</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all border border-blue-500 shadow-lg shadow-blue-900/40">Liquid Cash</button>
                <button className="py-2.5 bg-white/5 text-gray-400 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">UPI / Digital</button>
              </div>
              <button className="w-full mt-4 py-4 bg-white text-gray-900 rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all shadow-2xl">
                PROCESS CLEARANCE
              </button>
            </div>
          </div>

          {/* Diagnostic QR Terminal */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group cursor-pointer hover:border-blue-400 transition-all">
            <h2 className="text-[11px] font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-gray-800">
              <ShieldCheck className="text-blue-600" size={16} /> Barcode/SKU Scanner
            </h2>
            <div className="w-full aspect-video bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 border border-blue-200/50 rounded flex items-center justify-center bg-white shadow-inner relative">
                  <div className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-lg animate-pulse" />
                  <FileText className="text-gray-300" size={30} />
              </div>
              <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">Optical Scanner Initialized</p>
            </div>
            <div className="absolute top-0 right-0 p-2 opacity-5">
               <ShieldCheck size={100} className="text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyBilling;
