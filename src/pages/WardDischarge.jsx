import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Search, LogOut, FileText, CheckCircle, Clock, DollarSign, Download, ShieldCheck, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const WardDischarge = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchBeds(); }, []);

  const fetchBeds = async () => {
    try {
      const res = await API.get('/beds');
      setBeds((Array.isArray(res.data) ? res.data : []).filter(b => !b.isAvailable));
    } catch (err) {
      console.error('Failed to fetch beds', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDischarge = async (bed) => {
    const result = await Swal.fire({
      title: `Discharge ${bed.currentPatient?.name || 'Patient'}?`,
      text: 'This will free up the bed unit.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Yes, Discharge'
    });
    if (result.isConfirmed) {
      try {
        await API.put(`/beds/${bed._id}/discharge`);
        Swal.fire({ icon: 'success', title: 'Discharged', text: 'Bed is now available.', timer: 1500, showConfirmButton: false });
        fetchBeds();
      } catch {
        Swal.fire('Error', 'Discharge failed.', 'error');
      }
    }
  };

  const filtered = beds.filter(b =>
    (b.currentPatient?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.bedNumber || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Discharge Authorization Terminal</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Process patient clearance and free up bed units.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest">
          <Clock size={12} className="text-blue-600" /> {beds.length} Active Admissions
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Active Admissions</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type="text" placeholder="Search patient or bed..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none text-[10px] font-bold text-gray-700 focus:border-blue-400" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Bed Unit</th>
                  <th className="px-6 py-4">Ward Type</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic text-sm">No active admissions found.</td></tr>
                ) : filtered.map((bed) => (
                  <tr key={bed._id} className="hover:bg-blue-50/20 transition-all group">
                    <td className="px-6 py-4">
                      <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{bed.currentPatient?.name || 'Unknown'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100">{bed.bedNumber}</span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase">{bed.type}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
                        <CheckCircle size={12} /> Admitted
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDischarge(bed)}
                        className="px-3 py-1.5 bg-rose-600 text-white text-[9px] font-bold rounded uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center gap-1 ml-auto">
                        <LogOut size={12} /> Discharge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-[10px] font-bold mb-4 flex items-center gap-2 text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-3">
              <ShieldCheck size={16} className="text-emerald-500" /> Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                <span className="text-gray-400">Total Occupied</span>
                <span className="text-gray-900">{beds.length} Beds</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                <span className="text-gray-400">Pending Discharge</span>
                <span className="text-amber-600">{filtered.length} Patients</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-7 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden">
            <h2 className="text-[10px] font-bold mb-4 flex items-center gap-2 text-blue-400 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
              <ShieldCheck size={18} className="text-blue-500" /> Discharge Protocol
            </h2>
            <p className="text-[10px] text-gray-400 leading-relaxed font-medium uppercase tracking-widest opacity-80">
              Discharging a patient will automatically free the bed unit for new admissions. Ensure billing is settled before proceeding.
            </p>
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
