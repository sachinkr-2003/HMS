import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, Plus, UserPlus, Loader2, 
  CheckCircle2, Trash2, Bed as BedIcon
} from 'lucide-react';
import Swal from 'sweetalert2';

const WardAdmissions = () => {
    const [beds, setBeds] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedBed, setSelectedBed] = useState('');
    const [wardCategory, setWardCategory] = useState('All');

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [bedsRes, patientsRes] = await Promise.all([
                axios.get(`${API_BASE}/beds`),
                axios.get(`${API_BASE}/patients`)
            ]);
            setBeds(bedsRes.data);
            setPatients(patientsRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch data");
            setLoading(false);
        }
    };

    const handleAdmit = async () => {
        if (!selectedPatient || !selectedBed) {
            return Swal.fire('Error', 'Please select a patient and a bed.', 'error');
        }

        try {
            await axios.put(`${API_BASE}/beds/${selectedBed}/assign`, {
                patientId: selectedPatient._id
            });
            
            Swal.fire({
                icon: 'success',
                title: 'Admission Successful',
                text: `${selectedPatient.name} has been admitted to ${beds.find(b => b._id === selectedBed)?.bedNumber}`,
                confirmButtonColor: '#3b82f6'
            });
            
            setSelectedPatient(null);
            setSelectedBed('');
            setSearchQuery('');
            fetchData();
        } catch (err) {
            Swal.fire('Error', 'Failed to admit patient.', 'error');
        }
    };

    const handleDischarge = async (id) => {
        const result = await Swal.fire({
            title: 'Discharge Patient?',
            text: "This will free up the bed unit.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Discharge',
            confirmButtonColor: '#ef4444'
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`${API_BASE}/beds/${id}/discharge`);
                fetchData();
                Swal.fire('Discharged', 'The bed is now available.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Discharge failed.', 'error');
            }
        }
    };

    const activeAdmissions = beds.filter(bed => !bed.isAvailable);
    const availableBeds = beds.filter(bed => bed.isAvailable && (wardCategory === 'All' || bed.type === wardCategory));
    
    const filteredPatients = patients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.patientId?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            {/* Simple Header */}
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Patient Admissions</h1>
                    <p className="text-sm text-gray-500">Manage ward allocations and IPD enrollments.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Simple Admission Form */}
                <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <UserPlus size={20} className="text-blue-600" /> New Admission
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Search Patient</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Patient Name or ID..." 
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        if (selectedPatient) setSelectedPatient(null);
                                    }}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" 
                                />
                            </div>
                            {searchQuery && !selectedPatient && (
                                <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                                    {filteredPatients.map(p => (
                                        <div 
                                            key={p._id}
                                            onClick={() => {
                                                setSelectedPatient(p);
                                                setSearchQuery(p.name);
                                            }}
                                            className="p-3 hover:bg-blue-50 cursor-pointer transition-all text-sm border-b last:border-0"
                                        >
                                            <p className="font-bold text-gray-800">{p.name}</p>
                                            <p className="text-xs text-gray-500">ID: {p.patientId || 'N/A'}</p>
                                        </div>
                                    ))}
                                    {filteredPatients.length === 0 && <div className="p-3 text-xs text-gray-400">No patients found.</div>}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Ward Category</label>
                            <select 
                                value={wardCategory}
                                onChange={(e) => {
                                    setWardCategory(e.target.value);
                                    setSelectedBed('');
                                }}
                                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-sm"
                            >
                                <option value="All">All Wards / Categories</option>
                                <option value="General">General Ward</option>
                                <option value="ICU">ICU (Critical Care)</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Private">Private Cabin</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Available Bed</label>
                            <select 
                                value={selectedBed}
                                onChange={(e) => setSelectedBed(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-sm"
                            >
                                <option value="">{availableBeds.length > 0 ? `Select Bed (${availableBeds.length} Available)` : 'No Beds Available'}</option>
                                {availableBeds.map(bed => (
                                    <option key={bed._id} value={bed._id}>{bed.bedNumber} - {bed.type}</option>
                                ))}
                            </select>
                            {beds.length === 0 && (
                                <p className="text-[10px] text-orange-600 mt-1 font-bold uppercase">Note: No beds provisioned. Go to "Bed Grid" to add beds.</p>
                            )}
                            {beds.length > 0 && availableBeds.length === 0 && (
                                <p className="text-[10px] text-red-500 mt-1 font-bold uppercase">No available units in {wardCategory}.</p>
                            )}
                        </div>

                        <button 
                            onClick={handleAdmit}
                            disabled={!selectedPatient || !selectedBed}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none mt-2"
                        >
                            Confirm Admission
                        </button>
                    </div>
                </div>

                {/* Simple Admissions Table */}
                <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Active Admissions List</h2>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{activeAdmissions.length} Patients</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Patient Name</th>
                                    <th className="px-6 py-4">Bed Unit</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {activeAdmissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm">
                                            No patients currently admitted.
                                        </td>
                                    </tr>
                                ) : activeAdmissions.map((bed) => (
                                    <tr key={bed._id} className="hover:bg-gray-50 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800 text-sm">{bed.currentPatient?.name || 'Assigned'}</div>
                                            <div className="text-[10px] text-gray-400">IPD Status: In Treatment</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100">
                                                {bed.bedNumber}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
                                                <CheckCircle2 size={12} /> Admitted
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleDischarge(bed._id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-all"
                                                title="Discharge Patient"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WardAdmissions;
