import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Microscope, DollarSign, Edit, Trash2, Clock, Filter, Download, X, Loader2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const LabTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Hematology',
    price: '',
    turnaround: ''
  });

  const fetchTests = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/lab');
      setTests(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Lab Registry Failure:", err);
      setTests([]); // Decommission static fallback
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleOpenModal = (test = null) => {
    if (test) {
      setEditingTest(test);
      setFormData({
        name: test.name,
        category: test.category,
        price: test.price,
        turnaround: test.turnaround
      });
    } else {
      setEditingTest(null);
      setFormData({ name: '', category: 'Hematology', price: '', turnaround: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingTest) {
        await axios.put(`http://localhost:5000/api/lab/${editingTest._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/lab', formData);
      }
      await fetchTests();
      setShowModal(false);
    } catch (err) {
      alert("Institutional Request Failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Authorize SKU Deletion?")) {
      try {
        await axios.delete(`http://localhost:5000/api/lab/${id}`);
        await fetchTests();
      } catch (err) {
        alert("Deletion Authorization Denied.");
      }
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Investigation Catalog</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Official master list of diagnostic services, pricing structures & TAT protocols.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
        >
          <Plus size={16} /> New Investigation SKU
        </button>
      </div>

      {/* Category Briefing */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
              { label: 'Hematology', color: 'text-blue-500' },
              { label: 'Biochemistry', color: 'text-emerald-500' },
              { label: 'Radiology', color: 'text-amber-500' },
              { label: 'Immunology', color: 'text-rose-500' }
          ].map((cat, i) => (
              <div key={i} className={`bg-white p-5 rounded border border-gray-200 border-l-4 shadow-sm hover:border-blue-400 transition-all`} style={{ borderLeftColor: cat.color.replace('text-', '') }}>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">{cat.label} Section</p>
                   <h3 className="text-lg font-bold text-gray-800 mt-2">{tests.filter(t => t.category === cat.label).length.toString().padStart(2, '0')} Units</h3>
              </div>
          ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={16} />
            <input 
              type="text" 
              placeholder="Query investigations by name..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md outline-none text-xs font-bold text-gray-700 focus:border-blue-400 transition-all" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Internal ID</th>
                <th className="px-6 py-4">Investigation Specification</th>
                <th className="px-6 py-4">Financial Rate</th>
                <th className="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tests.map((test) => (
                <tr key={test._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter capitalize">{test._id.slice(-6)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                        <Microscope size={16} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">{test.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{test.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-[11px] text-gray-900">{formatCurrency(test.price)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleOpenModal(test)} className="p-2 text-gray-300 hover:text-blue-600 transition-all"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(test._id)} className="p-2 text-gray-300 hover:text-rose-600 transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tool */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
                <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">{editingTest ? 'Adjust Investigation' : 'New Investigation Entry'}</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Laboratory Terminal • ID: {editingTest?._id?.slice(-6) || 'NEW'}</p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors"><X size={20} className="text-gray-400" /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Investigation Identity</label>
                        <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Complete Blood Count" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Category Division</label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-xs font-bold text-gray-700" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option>Hematology</option>
                                <option>Biochemistry</option>
                                <option>Radiology</option>
                                <option>Immunology</option>
                                <option>Pathology</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Fiscal Rate (INR)</label>
                            <input type="number" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold text-gray-700" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-4 mt-4 bg-gray-900 text-white rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-600 shadow-xl transition-all active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3">
                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (editingTest ? "Authorize Investigation Update" : "Authorize Global SKU Entry")}
                    </button>
                </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default LabTests;
