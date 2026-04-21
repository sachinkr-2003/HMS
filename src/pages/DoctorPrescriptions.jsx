import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Printer, Save, FileText, Search, Loader2 } from 'lucide-react';

const DoctorPrescriptions = () => {
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', duration: '', frequency: '', quantity: 1, price: 0 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');

  const totalEstimate = medicines.reduce((acc, med) => acc + (med.quantity * med.price), 0);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        searchPatients();
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery]);

  const searchPatients = async () => {
    setIsSearching(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/patients?search=${searchQuery}`);
      setPatients(res.data);
    } catch (err) {
      console.error("Patient search failed");
    } finally {
      setIsSearching(false);
    }
  };

  const addRow = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '', frequency: '', quantity: 1, price: 0 }]);
  };

  const updateMedicine = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleFinalize = async () => {
    if (!selectedPatient) return alert("Please select a patient first.");
    if (!diagnosis) return alert("Please enter a diagnosis.");
    
    setIsSyncing(true);
    try {
      const prescriptionData = {
        patient: selectedPatient._id,
        doctor: JSON.parse(localStorage.getItem('userInfo'))?.id || "64f1a2b3c4d5e6f7a8b9c0d1", // Fallback for demo
        diagnosis,
        prescriptions: medicines.map(m => ({
          medicine: m.name,
          dosage: m.dosage,
          frequency: m.frequency,
          duration: m.duration,
          quantity: m.quantity,
          price: m.price
        })),
        visitDate: new Date()
      };

      await axios.post('http://localhost:5000/api/medical-records', prescriptionData);
      
      alert(`Smart Billing Sync Complete: ₹${totalEstimate} record generated for ${selectedPatient.name}.`);
      // Reset form
      setMedicines([{ name: '', dosage: '', duration: '', frequency: '', quantity: 1, price: 0 }]);
      setSelectedPatient(null);
      setDiagnosis('');
    } catch (err) {
      console.error("Prescription sync failed", err);
      alert("Failed to sync prescription. Check backend connectivity.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Institutional Prescription Hub</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Authorized clinical documentation & smart billing synchronization.</p>
        </div>
        <div className="flex gap-3">
          <button 
            disabled={isSyncing}
            onClick={handleFinalize}
            className={`flex items-center gap-2 px-8 py-3 ${isSyncing ? 'bg-slate-400' : 'bg-blue-600'} text-white rounded-xl font-black hover:bg-opacity-90 transition-all shadow-xl shadow-blue-500/20 text-[10px] uppercase tracking-[0.2em]`}
          >
            {isSyncing ? <Loader2 className="animate-spin" size={16} /> : <FileText size={16} />} 
            {isSyncing ? 'Synchronizing...' : 'Authorize & Sync Billing'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Selection */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:border-blue-200">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Search size={14}/> Recipient Identity Verification
            </h2>
            <div className="relative mb-6">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-bold" size={18} />
              <input 
                type="text" 
                placeholder="Query Subject by MRN, Contact or Registered Name..." 
                className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none text-xs font-bold focus:ring-2 ring-blue-500/20 font-mono tracking-tighter" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 animate-spin text-blue-600" size={18} />}
            </div>

            {patients.length > 0 && !selectedPatient && (
                <div className="mb-6 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto divide-y divide-slate-50">
                    {patients.map(p => (
                        <div key={p._id} onClick={() => { setSelectedPatient(p); setPatients([]); setSearchQuery(''); }} className="p-4 hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">
                                    {p.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-[11px] uppercase tracking-tighter">{p.name}</p>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{p.phone} | {p.email}</p>
                                </div>
                            </div>
                            <Plus size={14} className="text-blue-600" />
                        </div>
                    ))}
                </div>
            )}

            {selectedPatient && (
                <div className="grid grid-cols-3 gap-6 p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl animate-in slide-in-from-top-2 duration-300">
                    <div>
                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-2">Subject Name</p>
                        <p className="text-xs font-black text-white uppercase">{selectedPatient.name}</p>
                    </div>
                    <div>
                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-2">Identity Hub</p>
                        <p className="text-xs font-black text-white uppercase">{selectedPatient.gender} / {selectedPatient.age}Y</p>
                    </div>
                    <div className="text-right">
                        <button onClick={() => setSelectedPatient(null)} className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline px-3 py-1 bg-rose-500/10 rounded-lg">Reset Identity</button>
                    </div>
                </div>
            )}
          </div>

          {/* Medicine List Builder */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:border-blue-200 transition-all">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Pharmaceutical Ledger</h2>
              <button 
                onClick={addRow}
                className="flex items-center gap-3 px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
              >
                <Plus size={14} /> Append Row
              </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-400 text-[9px] uppercase font-black tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5">Specification</th>
                      <th className="px-6 py-5">Protocol / Freq</th>
                      <th className="px-6 py-5">Duration</th>
                      <th className="px-6 py-5">Qty/Price</th>
                      <th className="px-8 py-5 text-right">Aggregate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {medicines.map((med, i) => (
                      <tr key={i} className="group hover:bg-blue-50/30 transition-colors">
                        <td className="px-8 py-6">
                            <input 
                                className="w-full bg-transparent border-none outline-none font-black text-slate-800 text-[11px] uppercase tracking-tighter" 
                                placeholder="Medicine Name..."
                                value={med.name}
                                onChange={(e) => updateMedicine(i, 'name', e.target.value)}
                            />
                        </td>
                        <td className="px-6 py-6">
                             <input 
                                className="w-full bg-transparent border-none outline-none text-[11px] text-slate-600 font-bold" 
                                placeholder="Dosage (e.g. 1-0-1)"
                                value={med.dosage}
                                onChange={(e) => updateMedicine(i, 'dosage', e.target.value)}
                            />
                        </td>
                        <td className="px-6 py-6">
                            <input 
                                className="w-full bg-transparent border-none outline-none text-[11px] text-slate-500 font-bold" 
                                placeholder="Days..."
                                value={med.duration}
                                onChange={(e) => updateMedicine(i, 'duration', e.target.value)}
                            />
                        </td>
                        <td className="px-6 py-6">
                            <div className="flex items-center gap-2">
                                <input type="number" className="w-10 bg-slate-100 rounded p-1 text-[10px] font-bold" value={med.quantity} onChange={(e) => updateMedicine(i, 'quantity', parseInt(e.target.value)||0)} />
                                <span className="text-[10px] font-bold text-slate-300">@</span>
                                <input type="number" className="w-16 bg-slate-100 rounded p-1 text-[10px] font-bold" value={med.price} onChange={(e) => updateMedicine(i, 'price', parseInt(e.target.value)||0)} />
                            </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <p className="text-xs font-black text-slate-900 font-mono italic">₹{med.quantity * med.price}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
        </div>

        {/* Notes & Preview Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:border-blue-200">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Primary Diagnosis & Notes</h2>
            <textarea 
              className="w-full bg-slate-50 border-none rounded-2xl p-5 text-[11px] font-bold outline-none focus:ring-2 ring-blue-500/20 h-40 placeholder:font-medium placeholder:text-slate-300"
              placeholder="Record findings, symptoms and primary diagnosis here..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden border border-slate-800">
            <div className="relative z-10">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2 text-blue-400">
                <FileText size={16} /> Fiscal Sync Matrix
                </h2>
                <div className="space-y-6">
                <div className="py-6 border-y border-white/5 space-y-4">
                    {medicines.filter(m => m.name).map((m, i) => (
                        <div key={i} className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                            <span className="text-slate-500">{m.name} <span className="text-white/20 ml-2">x{m.quantity}</span></span>
                            <span className="font-mono italic">₹{m.quantity * m.price}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between text-blue-400">
                    <p className="text-[10px] font-black uppercase tracking-widest">Aggregate Total</p>
                    <p className="text-3xl font-black font-mono italic">₹{totalEstimate}</p>
                </div>
                <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20">
                    <p className="text-[9px] text-blue-300 font-bold uppercase tracking-widest leading-relaxed">
                        Authorized for immediate institutional billing synchronization.
                    </p>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
