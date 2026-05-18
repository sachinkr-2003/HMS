import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { TrendingUp, Users, Star, Calendar, Download, ShieldCheck, Zap, Loader2 } from 'lucide-react';

const StaffMetrics = () => {
  const [users, setUsers] = useState([]);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, rosterRes] = await Promise.all([
          API.get('/auth/users'),
          API.get(`/roster?date=${today}`)
        ]);
        setUsers(Array.isArray(userRes.data) ? userRes.data.filter(u => u.role !== 'patient') : []);
        setRoster(Array.isArray(rosterRes.data) ? rosterRes.data : []);
      } catch (err) {
        console.error('Metrics fetch failed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onDuty = roster.filter(r => r.status === 'On-Duty').length;
  const scheduled = roster.filter(r => r.status === 'Scheduled').length;

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Personnel Performance Metrics</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Workforce efficiency, shift coverage & departmental analytics.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            <Calendar size={12} className="text-blue-600" /> {new Date().toDateString()}
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Staff', val: users.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'On Duty Today', val: onDuty, icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Scheduled Shifts', val: scheduled, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((m, i) => (
          <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
            <div className="flex justify-between items-start">
              <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                <m.icon size={16} />
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2 font-mono">{m.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Staff Directory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 ? (
                  <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm italic">No staff found.</td></tr>
                ) : users.map((u) => {
                  const rosterEntry = roster.find(r => r.personnel?._id === u._id || r.personnel === u._id);
                  return (
                    <tr key={u._id} className="hover:bg-blue-50/20 transition-all group">
                      <td className="px-6 py-4">
                        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{u.name}</p>
                      </td>
                      <td className="px-6 py-4 text-[9px] text-blue-500 font-bold uppercase tracking-widest">{u.role}</td>
                      <td className="px-6 py-4 text-[10px] text-gray-500 font-mono">{u.email}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                          rosterEntry?.status === 'On-Duty' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          rosterEntry ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-gray-50 text-gray-400 border-gray-100'
                        }`}>
                          {rosterEntry?.status || 'Not Assigned'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-white border border-gray-800 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
          <div>
            <h2 className="text-[10px] font-bold mb-8 flex items-center gap-2 text-blue-500 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
              <ShieldCheck size={18} className="text-blue-400" /> Shift Coverage Summary
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Morning', count: roster.filter(r => r.shift === 'Morning').length },
                { label: 'Evening', count: roster.filter(r => r.shift === 'Evening').length },
                { label: 'Night', count: roster.filter(r => r.shift === 'Night').length },
                { label: 'General', count: roster.filter(r => r.shift === 'General').length },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{s.label} Shift</p>
                  <span className="text-[11px] font-bold text-blue-400">{s.count} Staff</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><TrendingUp size={220} /></div>
        </div>
      </div>
    </div>
  );
};

export default StaffMetrics;
