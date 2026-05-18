import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Clock, CheckCircle, XCircle, Calendar, Search, Filter, ArrowRight, Activity, UserCheck, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const StaffAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [attRes, userRes] = await Promise.all([
        API.get(`/attendance?date=${today}`),
        API.get('/auth/users')
      ]);
      setAttendanceData(Array.isArray(attRes.data) ? attRes.data : []);
      setUsers(Array.isArray(userRes.data) ? userRes.data : []);
    } catch (err) {
      console.error('Attendance fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async () => {
    const staffOptions = users.filter(u => u.role !== 'patient')
      .map(u => `<option value="${u._id}">${u.name} (${u.role})</option>`).join('');

    const { value } = await Swal.fire({
      title: 'Mark Attendance',
      html: `<div class="space-y-3 pt-2">
        <select id="s-user" class="swal2-input">
          <option value="">-- Select Staff --</option>${staffOptions}
        </select>
        <select id="s-status" class="swal2-input">
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="Absent">Absent</option>
          <option value="On Leave">On Leave</option>
        </select>
        <input id="s-checkin" class="swal2-input" type="time" placeholder="Check-in time" />
      </div>`,
      showCancelButton: true,
      confirmButtonText: 'Mark',
      confirmButtonColor: '#2563eb',
      preConfirm: () => ({
        staff: document.getElementById('s-user').value,
        status: document.getElementById('s-status').value,
        checkIn: document.getElementById('s-checkin').value,
        date: today
      })
    });

    if (value && value.staff) {
      try {
        await API.post('/attendance', value);
        Swal.fire({ icon: 'success', title: 'Marked!', timer: 1500, showConfirmButton: false });
        fetchData();
      } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'Failed to mark attendance', 'error');
      }
    }
  };

  const filtered = attendanceData.filter(a =>
    (a.staff?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: users.filter(u => u.role !== 'patient').length,
    present: attendanceData.filter(a => a.status === 'Present').length,
    late: attendanceData.filter(a => a.status === 'Late').length,
    absent: attendanceData.filter(a => a.status === 'Absent').length,
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Staff Attendance Register</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Manage staff shifts, clock-ins, and daily availability records.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            <Calendar size={12} className="text-blue-600" /> {new Date().toDateString()}
          </div>
          <button onClick={handleMarkAttendance} className="px-5 py-2 bg-blue-600 text-white rounded text-[9px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all">
            + Mark Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', val: stats.total, icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Present Today', val: stats.present, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Late Arrivals', val: stats.late, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Absent Today', val: stats.absent, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' }
        ].map((m, i) => (
          <div key={i} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
            <div className="flex justify-between items-start">
              <div className={`p-2 ${m.bg} ${m.color} rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                <m.icon size={16} />
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2">{m.val} Staff Members</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search staff by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded outline-none text-[10px] font-bold text-gray-700 uppercase focus:border-blue-400 tracking-tighter"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 rounded border border-gray-200 transition-colors">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Staff ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Check-In</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-sm italic">No attendance records for today.</td></tr>
              ) : filtered.map((a) => (
                <tr key={a._id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 font-mono tracking-tighter uppercase">{a._id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{a.staff?.name || 'Unknown'}</p>
                    <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">{a.staff?.role || ''}</p>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-900 font-mono italic">{a.checkIn || '--'}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border shadow-sm ${
                      a.status === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      a.status === 'Late' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      a.status === 'On Leave' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>{a.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-300 hover:text-blue-600 transition-all"><ArrowRight size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-gray-900 rounded-lg text-white border border-gray-800 shadow-xl relative overflow-hidden">
          <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-4 italic">Workforce Summary</h3>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-relaxed">
            Present: {stats.present} | Late: {stats.late} | Absent: {stats.absent} | Total Staff: {stats.total}
          </p>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Activity size={100} /></div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Staff On Floor</p>
            <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-1">{stats.present} People Present</h3>
          </div>
          <button onClick={fetchData} className="px-5 py-2 bg-gray-900 text-white rounded text-[9px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default StaffAttendance;
