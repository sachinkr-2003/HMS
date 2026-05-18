import React, { useState, useEffect } from 'react';
import { Building2, Search, Filter, Plus, MoreVertical, Edit, Trash2, Power, Eye, X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const SuperAdminHospitals = () => {
    const { user } = useAuth();
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        adminName: '',
        adminEmail: '',
        adminPassword: '',
        plan: 'Basic'
    });

    // Fetch initial data
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const { data } = await API.get('/superadmin/hospitals');
                setHospitals(data.data);
            } catch (error) {
                console.error("Error fetching hospitals:", error);
                Swal.fire('Error', 'Failed to fetch hospitals from server', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    const toggleStatus = async (id, currentName, currentStatus) => {
        try {
            const { data } = await API.put(`/superadmin/hospitals/${id}/toggle`, {});
            
            setHospitals(hospitals.map(h => h._id === id ? { ...h, status: data.data.status } : h));
            Swal.fire('Status Updated', `Hospital ${currentName} is now ${data.data.status}.`, 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to update hospital status', 'error');
        }
    };

    const handleFilter = async () => {
        const { value: status } = await Swal.fire({
            title: 'Filter Hospitals',
            input: 'select',
            inputOptions: {
                'All': 'All Hospitals',
                'Active': 'Active Only',
                'Suspended': 'Suspended Only'
            },
            inputPlaceholder: 'Select status filter',
            showCancelButton: true,
            inputValue: filterStatus
        });

        if (status) {
            setFilterStatus(status);
        }
    };

    const handleViewDetails = (hospital) => {
        Swal.fire({
            title: `<span class="text-xl font-bold text-gray-900">${hospital.name}</span>`,
            html: `
                <div class="text-left space-y-4 mt-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <span class="text-gray-500 font-medium">Hospital ID</span>
                        <span class="font-bold text-blue-600">${hospital.hospitalId}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <span class="text-gray-500 font-medium">Location</span>
                        <span class="font-semibold text-gray-900">${hospital.location}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <span class="text-gray-500 font-medium">Primary Admin</span>
                        <span class="font-semibold text-gray-900">${hospital.adminName}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <span class="text-gray-500 font-medium">Admin Email</span>
                        <span class="font-semibold text-gray-900">${hospital.adminEmail}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <span class="text-gray-500 font-medium">Active Users</span>
                        <span class="font-semibold text-gray-900">${hospital.users || 0}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <span class="text-gray-500 font-medium">SaaS Plan</span>
                        <span class="font-semibold text-purple-600">${hospital.plan}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <span class="text-gray-500 font-medium">Status</span>
                        <span class="font-bold ${hospital.status === 'Active' ? 'text-green-600' : 'text-red-600'}">${hospital.status}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500 font-medium">Joined Network</span>
                        <span class="font-semibold text-gray-900">${new Date(hospital.joinedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            `,
            showConfirmButton: true,
            confirmButtonText: 'Close Details',
            confirmButtonColor: '#2563eb'
        });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const { data } = await API.post('/superadmin/hospitals', formData);
            
            setHospitals([data.data, ...hospitals]);
            setIsModalOpen(false);
            setFormData({ name: '', location: '', adminName: '', adminEmail: '', adminPassword: '', plan: 'Basic' });
            
            Swal.fire({
                title: 'Hospital Registered!',
                html: `
                    <p>${data.data.name} has been successfully added to the global network.</p>
                    <p class="mt-4 text-sm text-gray-500">The administrator can log in using:</p>
                    <p class="font-mono bg-gray-100 p-2 mt-2 rounded">Email: ${data.data.adminEmail}<br>Pass: (As configured)</p>
                `,
                icon: 'success',
                confirmButtonText: 'Great'
            });
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed to register hospital', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex items-center justify-between pb-2">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hospital Network</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all clinical institutions and branches</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all shadow-sm text-sm">
                    <Plus size={18} /> Add Hospital
                </button>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                <div className="p-5 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by ID, Name or Location..." 
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 outline-none focus:border-blue-500 transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={handleFilter} className="flex items-center gap-2 px-4 py-2 text-gray-600 text-sm font-medium hover:bg-white rounded-md border border-gray-300 transition-all w-full sm:w-auto justify-center shadow-sm">
                        <Filter size={16} /> {filterStatus === 'All' ? 'Filter List' : `Filtered: ${filterStatus}`}
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-semibold border-b border-gray-200 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Hospital Details</th>
                                <th className="px-6 py-4">Primary Admin</th>
                                <th className="px-6 py-4">Subscription Plan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {hospitals.filter(h => {
                                const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) || h.hospitalId?.toLowerCase().includes(searchTerm.toLowerCase()) || h.location.toLowerCase().includes(searchTerm.toLowerCase());
                                const matchesFilter = filterStatus === 'All' || h.status === filterStatus;
                                return matchesSearch && matchesFilter;
                            }).map((hospital) => (
                                <tr key={hospital._id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                                <Building2 size={20} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-xs font-bold text-blue-600">{hospital.hospitalId}</span>
                                                    <span className="text-xs text-gray-400">• Joined {new Date(hospital.joinedAt).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-sm font-bold text-gray-900">{hospital.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{hospital.location}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-900">{hospital.adminName}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{hospital.users || 0} Active Users</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                                            hospital.plan === 'Enterprise' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                            hospital.plan === 'Professional' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            'bg-gray-100 text-gray-700 border-gray-200'
                                        }`}>
                                            {hospital.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 text-xs font-medium ${hospital.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${hospital.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            {hospital.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => toggleStatus(hospital._id, hospital.name, hospital.status)} className={`p-2 rounded-md transition-all border ${hospital.status === 'Active' ? 'text-green-600 bg-green-50 border-green-100 hover:bg-green-100' : 'text-red-600 bg-red-50 border-red-100 hover:bg-red-100'}`} title={hospital.status === 'Active' ? 'Suspend' : 'Activate'}>
                                                <Power size={16} />
                                            </button>
                                            <button onClick={() => handleViewDetails(hospital)} className="p-2 text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-md transition-all" title="View Details">
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {hospitals.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No hospitals found. Click "Add Hospital" to register one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Hospital Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                            <div className="flex items-center gap-3">
                                <Building2 size={20} className="text-blue-600" />
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Register New Hospital</h2>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase">Hospital / Clinic Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    placeholder="Enter hospital name"
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-700 uppercase">City & State</label>
                                <input 
                                    type="text" 
                                    name="location"
                                    required
                                    placeholder="e.g. Mumbai, MH"
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-700 uppercase">Admin Name</label>
                                    <input 
                                        type="text" 
                                        name="adminName"
                                        required
                                        placeholder="Full name"
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        value={formData.adminName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-700 uppercase">Admin Email</label>
                                    <input 
                                        type="email" 
                                        name="adminEmail"
                                        required
                                        placeholder="Email address"
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        value={formData.adminEmail}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-700 uppercase">Admin Password</label>
                                    <input 
                                        type="text" 
                                        name="adminPassword"
                                        required
                                        placeholder="Set password"
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        value={formData.adminPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-700 uppercase">Subscription Plan</label>
                                    <select 
                                        name="plan"
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        value={formData.plan}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Basic">Basic (Up to 50 Users)</option>
                                        <option value="Professional">Professional (Up to 200 Users)</option>
                                        <option value="Enterprise">Enterprise (Unlimited Users)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full py-2.5 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="animate-spin" size={16} /> Processing...</>
                                    ) : (
                                        <><Building2 size={16} /> Complete Registration</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperAdminHospitals;
