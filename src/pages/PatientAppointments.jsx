import React, { useState } from 'react';
import { Search, Calendar, Clock, MapPin, Star, Plus, ChevronRight, User, Activity } from 'lucide-react';

const doctors = [
  { id: 1, name: 'Dr. Sameer Khan', special: 'Chief Surgeon', rating: 4.9, image: 'S' },
  { id: 2, name: 'Dr. Anjali Rao', special: 'Neurologist', rating: 4.8, image: 'A' },
  { id: 3, name: 'Dr. Vikram Jha', special: 'General Physician', rating: 4.7, image: 'V' },
  { id: 4, name: 'Dr. Priya Singh', special: 'Gynaecologist', rating: 4.9, image: 'P' },
];

const PatientAppointments = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Classic Header Block - Right Shifted */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Book Appointment</h1>
            <p className="text-xs text-gray-500 font-medium mt-1">Select a specialist and secure your clinical slot instantly.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Plus size={16} /> New Request
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor Search & List */}
        <div className="lg:col-span-2 space-y-4">
           {/* Simple Clean Search */}
           <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 group focus-within:border-blue-400 transition-all">
              <Search size={18} className="text-gray-400 group-focus-within:text-blue-500" />
              <input type="text" placeholder="Search by name, department or specialty..." className="flex-1 bg-transparent border-none outline-none text-xs font-bold text-gray-700" />
           </div>

           <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Verified Specialists</p>
              {doctors.map((doc) => (
                <div key={doc.id} className="bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between group hover:border-blue-400 transition-all cursor-pointer">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg border border-blue-50">
                         {doc.image}
                      </div>
                      <div>
                         <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-800">{doc.name}</h3>
                            <div className="flex items-center gap-0.5 text-amber-500">
                               <Star size={10} className="fill-current" />
                               <span className="text-[9px] font-bold text-gray-500 ml-0.5">{doc.rating}</span>
                            </div>
                         </div>
                         <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">{doc.special}</p>
                      </div>
                   </div>
                   <button className="p-2 text-gray-300 group-hover:text-blue-600 transition-all">
                      <ChevronRight size={18} />
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* Booking Sidebar / Slot Picker */}
        <div className="space-y-4">
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">Scheduling Console</h2>
              <div className="space-y-5">
                 <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Service Date</label>
                    <div className="grid grid-cols-3 gap-2">
                       <button className="py-2.5 bg-blue-600 text-white rounded-md text-[10px] font-bold uppercase">22 Apr</button>
                       <button className="py-2.5 bg-gray-50 text-gray-500 rounded-md text-[10px] font-bold uppercase border border-gray-100">23 Apr</button>
                       <button className="py-2.5 bg-gray-50 text-gray-500 rounded-md text-[10px] font-bold uppercase border border-gray-100">24 Apr</button>
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Available Slot</label>
                    <div className="grid grid-cols-2 gap-2">
                       <button className="py-2.5 bg-white text-gray-500 rounded-md text-[10px] font-bold uppercase border border-gray-200">10:00 AM</button>
                       <button className="py-2.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase border border-blue-200">11:30 AM</button>
                       <button className="py-2.5 bg-white text-gray-500 rounded-md text-[10px] font-bold uppercase border border-gray-200">02:00 PM</button>
                       <button className="py-2.5 bg-white text-gray-500 rounded-md text-[10px] font-bold uppercase border border-gray-200">04:30 PM</button>
                    </div>
                 </div>

                 <div className="pt-2">
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                       Process Booking
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-gray-900 p-6 rounded-lg text-white border border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                 <MapPin className="text-blue-500" size={16} />
                 <h3 className="text-xs font-bold uppercase tracking-widest">Medical Center</h3>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-bold uppercase tracking-tighter">Block B, 4th Floor, HealthRekha Clinical Complex, New Delhi.</p>
              <div className="mt-4 w-full h-24 bg-white/5 rounded border border-white/5 flex items-center justify-center">
                 <Activity className="text-blue-500/20" size={40} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
