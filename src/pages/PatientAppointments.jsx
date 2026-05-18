import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Search, Calendar, Clock, Star, Plus, ChevronRight, Loader2, CheckCircle, X } from 'lucide-react';
import Swal from 'sweetalert2';

const PatientAppointments = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [reason, setReason] = useState('');
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docRes, aptRes] = await Promise.all([
          API.get('/doctors'),
          API.get('/appointments')
        ]);
        setDoctors(Array.isArray(docRes.data) ? docRes.data : []);
        setAppointments(Array.isArray(aptRes.data) ? aptRes.data : []);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBook = async () => {
    if (!selectedDoctor || !bookingDate) {
      Swal.fire('Missing Info', 'Please select a doctor and date.', 'warning');
      return;
    }
    setBooking(true);
    try {
      // First get or create patient record for this user
      const patientsRes = await API.get('/patients');
      const myPatient = (Array.isArray(patientsRes.data) ? patientsRes.data : [])
        .find(p => p.createdBy === user?._id || p.contact === user?.phone);

      if (!myPatient) {
        Swal.fire('Profile Incomplete', 'Please ask staff to register your patient profile first.', 'info');
        setBooking(false);
        return;
      }

      await API.post('/appointments', {
        patient: myPatient._id,
        doctor: selectedDoctor._id,
        appointmentDate: bookingDate,
        reason: reason || 'General Consultation'
      });

      Swal.fire({ icon: 'success', title: 'Appointment Booked!', text: `Your appointment with ${selectedDoctor.user?.name} is confirmed.`, confirmButtonColor: '#2563eb' });
      setSelectedDoctor(null);
      setBookingDate('');
      setReason('');
      const aptRes = await API.get('/appointments');
      setAppointments(Array.isArray(aptRes.data) ? aptRes.data : []);
    } catch (err) {
      Swal.fire('Failed', err.response?.data?.message || 'Booking failed. Please try again.', 'error');
    } finally {
      setBooking(false);
    }
  };

  const filtered = doctors.filter(d =>
    (d.user?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (d.specialization || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Book Appointment</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Select a specialist and secure your clinical slot instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 focus-within:border-blue-400 transition-all">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search by name or specialty..." className="flex-1 bg-transparent border-none outline-none text-xs font-bold text-gray-700"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Available Specialists</p>
            {filtered.length === 0 ? (
              <div className="bg-white p-10 rounded-lg border border-gray-200 text-center text-gray-400 text-sm">No doctors found.</div>
            ) : filtered.map((doc) => (
              <div key={doc._id}
                onClick={() => setSelectedDoctor(doc)}
                className={`bg-white px-6 py-4 rounded-lg shadow-sm border transition-all cursor-pointer ${selectedDoctor?._id === doc._id ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-blue-400'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg border border-blue-100">
                      {doc.user?.name?.[0] || 'D'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-800">{doc.user?.name || 'Doctor'}</h3>
                        {selectedDoctor?._id === doc._id && <CheckCircle size={14} className="text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">{doc.specialization} • ₹{doc.fees}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
              </div>
            ))}
          </div>

          {appointments.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-4">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">My Appointments</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {appointments.slice(0, 5).map(apt => (
                  <div key={apt._id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-800">{apt.doctor?.user?.name || 'Doctor'}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{new Date(apt.appointmentDate).toLocaleString()} • {apt.reason}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase border ${apt.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' : apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">Scheduling Console</h2>
            {selectedDoctor ? (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Selected Doctor</p>
                  <p className="text-sm font-bold text-blue-800 mt-1">{selectedDoctor.user?.name}</p>
                  <p className="text-[10px] text-blue-500">{selectedDoctor.specialization}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Date & Time</label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500"
                    value={bookingDate} onChange={e => setBookingDate(e.target.value)} min={new Date().toISOString().slice(0, 16)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Reason (Optional)</label>
                  <input type="text" placeholder="e.g. Fever, Checkup..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500"
                    value={reason} onChange={e => setReason(e.target.value)} />
                </div>
                <button onClick={handleBook} disabled={booking}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {booking ? <Loader2 size={14} className="animate-spin" /> : <Calendar size={14} />}
                  {booking ? 'Booking...' : 'Confirm Booking'}
                </button>
                <button onClick={() => setSelectedDoctor(null)} className="w-full py-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-gray-600">
                  Cancel
                </button>
              </div>
            ) : (
              <p className="text-xs text-gray-400 text-center py-8">Select a doctor from the list to book an appointment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
