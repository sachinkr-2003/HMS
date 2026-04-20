import React, { useState } from 'react';
import { Plus, Trash2, Printer, Save, FileText, Search } from 'lucide-react';

const DoctorPrescriptions = () => {
  const [medicines, setMedicines] = useState([
    { name: 'Paracetamol', dosage: '500mg', duration: '5 Days', frequency: '1-0-1' },
    { name: 'Amoxicillin', dosage: '250mg', duration: '7 Days', frequency: '1-1-1' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prescription Builder</h1>
          <p className="text-slate-500">Create and manage digital prescriptions for patients.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Save size={18} /> Save Draft
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
            <Printer size={18} /> Print Rx (PDF)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Selection Mock */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">Patient Information</h2>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search patient to prescribe..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none text-sm focus:ring-2 ring-primary/20" 
              />
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Patient Name</p>
                <p className="text-sm font-bold text-slate-900">Anika Singh</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Age / Gender</p>
                <p className="text-sm font-bold text-slate-900">24 / Female</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">ID</p>
                <p className="text-sm font-bold text-slate-900">#PAT-8821</p>
              </div>
            </div>
          </div>

          {/* Medicine List Builder */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold">Medicines & Dosage</h2>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all">
                <Plus size={14} /> Add Medicine
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Medicine Name</th>
                  <th className="px-6 py-4">Dosage</th>
                  <th className="px-6 py-4">Frequency</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4 text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {medicines.map((med, i) => (
                  <tr key={i} className="group">
                    <td className="px-6 py-4 font-bold text-slate-900">{med.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.dosage}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{med.frequency}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.duration}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes & Preview Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">Instructions</h2>
            <textarea 
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 ring-primary/20 h-32"
              placeholder="E.g. Drink plenty of water, avoid cold items..."
            />
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FileText className="text-secondary" /> Rx Preview
            </h2>
            <div className="space-y-4 opacity-75">
              <div className="border-b border-white/10 pb-2">
                <p className="text-[10px] text-slate-400">Diagnosis</p>
                <p className="text-sm font-medium italic">Viral Fever with dehydration</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-slate-400">Selected Meds</p>
                <p className="text-xs">• Paracetamol 500mg (1-0-1)</p>
                <p className="text-xs">• Amoxicillin 250mg (1-1-1)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
