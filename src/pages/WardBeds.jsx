import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, Grid, List, Activity, 
  UserPlus, LogOut, Loader2, AlertCircle,
  Clock, CheckCircle, Smartphone, Plus
} from 'lucide-react';

const WardBeds = () => {
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBeds();
    }, []);

    const fetchBeds = async () => {
        try {
            const res = await axios.get('https://hms-backend-1-uchi.onrender.com/api/beds');
            setBeds(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch beds");
            setLoading(false);
        }
    };

    const handleDischarge = async (id) => {
        try {
            await axios.put(`https://hms-backend-1-uchi.onrender.com/api/beds/${id}/discharge`);
            fetchBeds();
        } catch (err) {
            console.error("Discharge failed");
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={30} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Institutional Floor Inventory</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Real-time surveillance of floor allocations, bed lifecycle & subject transition. </p>
                </div>
                <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                    <button className="px-5 py-1.5 bg-blue-600 text-white rounded-md font-bold text-[10px] uppercase tracking-widest transition-all">Grid Console</button>
                    <button className="px-5 py-1.5 text-gray-400 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-all">Floor List</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {beds.map((bed) => (
                    <div 
                        key={bed._id} 
                        className={`p-6 bg-white border rounded-lg shadow-sm transition-all relative group flex flex-col justify-between min-h-[220px] ${
                            bed.isAvailable 
                            ? 'border-gray-200 hover:border-blue-400' 
                            : 'border-blue-100 bg-blue-50/10'
                        }`}
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-2 rounded border ${bed.isAvailable ? 'bg-gray-50 text-gray-300 border-gray-100' : 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-100'}`}>
                                    <Activity size={16} />
                                </div>
                                <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                                    bed.isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                }`}>
                                    {bed.isAvailable ? 'Available' : 'Occupied'}
                                </span>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 tracking-tight uppercase">{bed.bedNumber}</h3>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">{bed.type} Unit</p>
                            </div>

                            {!bed.isAvailable ? (
                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Registered Subject</p>
                                        <p className="text-[11px] font-bold text-gray-800 uppercase truncate">{bed.currentPatient?.name || 'Assigned'}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleDischarge(bed._id)}
                                        className="w-full py-2 bg-gray-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={14} /> Clear Allocation
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-auto space-y-4 pt-4 border-t border-gray-50">
                                    <button 
                                        className="w-full py-2 bg-white border border-blue-600 text-blue-600 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <UserPlus size={14} /> Initialize Admission
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Provision New Bed Card */}
                <div className="p-6 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:border-blue-400 hover:text-blue-400 cursor-pointer transition-all min-h-[220px]">
                    <Plus size={30} className="mb-3" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Provision New Bed</p>
                </div>
            </div>
        </div>
    );
};

export default WardBeds;
