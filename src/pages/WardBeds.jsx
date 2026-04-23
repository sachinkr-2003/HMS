import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Grid, List, Activity, 
  UserPlus, LogOut, Loader2, 
  Plus, Printer, Filter
} from 'lucide-react';
import Swal from 'sweetalert2';

const WardBeds = () => {
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchBeds();
    }, []);

    const fetchBeds = async () => {
        try {
            const res = await axios.get(`${API_BASE}/beds`);
            setBeds(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch beds");
            setLoading(false);
        }
    };

    const handleProvision = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'PROVISION NEW BED',
            html:
                '<div class="space-y-4 pt-4">' +
                '<input id="swal-input1" class="swal2-input" placeholder="Bed Number (e.g. B-101)">' +
                '<select id="swal-input2" class="swal2-input">' +
                '<option value="General">General Ward</option>' +
                '<option value="ICU">ICU</option>' +
                '<option value="Emergency">Emergency</option>' +
                '<option value="Private">Private Room</option>' +
                '</select>' +
                '</div>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'CONFIRM PROVISION',
            confirmButtonColor: '#2563eb',
            preConfirm: () => {
                const number = document.getElementById('swal-input1').value;
                const type = document.getElementById('swal-input2').value;
                if (!number) {
                    Swal.showValidationMessage('Bed number is required');
                }
                return { bedNumber: number, type: type };
            }
        });

        if (formValues) {
            try {
                await axios.post(`${API_BASE}/beds`, formValues);
                Swal.fire('Provisioned!', 'New bed unit has been initialized.', 'success');
                fetchBeds();
            } catch (err) {
                Swal.fire('Error', 'Failed to provision bed.', 'error');
            }
        }
    };

    const handleDischarge = async (id) => {
        const result = await Swal.fire({
            title: 'Confirm Discharge?',
            text: "This will free up the bed for new admissions.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            confirmButtonText: 'YES, CLEAR ALLOCATION'
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`${API_BASE}/beds/${id}/discharge`);
                fetchBeds();
                Swal.fire('Cleared!', 'Bed is now available.', 'success');
            } catch (err) {
                console.error("Discharge failed");
            }
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={30} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Classic Header Block */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-6 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Institutional Floor Inventory</h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time surveillance of floor allocations, bed lifecycle & subject transition.</p>
                </div>
                <div className="flex bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:text-blue-600'}`}
                    >
                        <Grid size={14} /> Grid Console
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:text-blue-600'}`}
                    >
                        <List size={14} /> Floor List
                    </button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Provision New Bed Card */}
                    <div 
                        onClick={handleProvision}
                        className="p-6 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-50/10 cursor-pointer transition-all min-h-[240px] group"
                    >
                        <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-blue-100 transition-all">
                            <Plus size={32} />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em]">PROVISION NEW BED</p>
                        <p className="text-[9px] text-gray-400 mt-2 uppercase font-bold tracking-tighter">Initialize Hardware Unit</p>
                    </div>

                    {beds.map((bed) => (
                        <div 
                            key={bed._id} 
                            className={`p-6 bg-white border rounded-2xl shadow-sm transition-all relative overflow-hidden flex flex-col justify-between min-h-[240px] ${
                                bed.isAvailable 
                                ? 'border-gray-100 hover:border-blue-300' 
                                : 'border-blue-100 bg-blue-50/5'
                            }`}
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`p-2.5 rounded-xl border ${bed.isAvailable ? 'bg-gray-50 text-gray-300 border-gray-100' : 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-100'}`}>
                                        <Activity size={18} />
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                        bed.isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                    }`}>
                                        {bed.isAvailable ? 'AVAILABLE' : 'OCCUPIED'}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{bed.bedNumber}</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{bed.type} Unit</p>
                                </div>

                                {!bed.isAvailable ? (
                                    <div className="mt-auto space-y-4 pt-4 border-t border-gray-50">
                                        <div>
                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Subject Linked</p>
                                            <p className="text-[11px] font-black text-gray-800 uppercase truncate flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                                {bed.currentPatient?.name || 'In-Process'}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => handleDischarge(bed._id)}
                                            className="w-full py-3 bg-[#0f172a] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            <LogOut size={14} /> Clear Allocation
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-auto pt-4 border-t border-gray-50">
                                        <button 
                                            onClick={() => navigate('/ward/admissions')}
                                            className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <UserPlus size={14} /> Initialize Admission
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Bed Unit</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Status</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {beds.map((bed) => (
                                <tr key={bed._id} className="hover:bg-gray-50/50 transition-all">
                                    <td className="p-4 font-black text-gray-900 text-sm uppercase">{bed.bedNumber}</td>
                                    <td className="p-4 text-[10px] font-bold text-gray-500 uppercase">{bed.type}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                            bed.isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                            {bed.isAvailable ? 'Available' : 'Occupied'}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-xs text-gray-700 uppercase">{bed.currentPatient?.name || '---'}</td>
                                    <td className="p-4 text-right">
                                        {!bed.isAvailable ? (
                                            <button 
                                                onClick={() => handleDischarge(bed._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-all"
                                            >
                                                <LogOut size={16} />
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => navigate('/ward/admissions')}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            >
                                                <UserPlus size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WardBeds;
