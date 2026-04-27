import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
    Pill, 
    Plus, 
    Search, 
    Trash2, 
    Loader2, 
    Package, 
    AlertCircle,
    Activity,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';

const AdminPharmacy = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Tablet',
        price: '',
        stock: '',
        expiryDate: ''
    });

    const fetchMedicines = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/pharmacy`);
            setMedicines(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch medicines");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/pharmacy`, formData);
            Swal.fire({
                icon: 'success',
                title: 'Stock Updated',
                text: `${formData.name} has been added to the inventory.`,
                confirmButtonColor: '#2563eb'
            });
            setShowForm(false);
            setFormData({ name: '', category: 'Tablet', price: '', stock: '', expiryDate: '' });
            fetchMedicines();
        } catch (err) {
            Swal.fire('Error', 'Failed to add medicine to stock.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Medicine?',
            text: "This will remove the item from inventory.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Delete'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/pharmacy/${id}`);
                fetchMedicines();
                Swal.fire('Deleted!', 'Medicine removed.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Action failed.', 'error');
            }
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Simple Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Pharmacy Stock Control</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Manage institutional medicine inventory and real-time stock levels.</p>
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                    {showForm ? 'Close Form' : <><Plus size={16} /> Add New Medicine</>}
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Stocked Items</p>
                    <h3 className="text-xl font-bold text-gray-900">{(Array.isArray(medicines) ? medicines.length : 0)} Medicines</h3>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Low Stock Warning</p>
                    <h3 className="text-xl font-bold text-red-500">{(Array.isArray(medicines) ? medicines.filter(m => m?.stock < 10).length : 0)} Items</h3>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Valuation</p>
                    <h3 className="text-xl font-bold text-gray-900">₹{(Array.isArray(medicines) ? medicines.reduce((acc, m) => acc + ((m?.price || 0) * (m?.stock || 0)), 0) : 0).toLocaleString()}</h3>
                </div>
            </div>

            {showForm && (
                <div className="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-xl animate-in zoom-in-95 duration-200">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Package className="text-blue-600" size={18} /> Medicine Information Form
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Medicine Name</label>
                            <input 
                                required
                                type="text"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="e.g. Paracetamol"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Category</label>
                            <select 
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option>Tablet</option>
                                <option>Syrup</option>
                                <option>Injection</option>
                                <option>Ointment</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Unit Price (₹)</label>
                            <input 
                                required
                                type="number"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Stock Quantity</label>
                            <input 
                                required
                                type="number"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500"
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                placeholder="00"
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white rounded-lg p-3.5 font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center"
                        >
                            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Save to Stock"}
                        </button>
                    </form>
                </div>
            )}

            {/* Inventory List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 px-8 py-4">
                    <h2 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Active Inventory Ledger</h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input type="text" placeholder="Search by name..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Medicine Item</th>
                                <th className="px-8 py-5">Department</th>
                                <th className="px-8 py-5 text-center">Price</th>
                                <th className="px-8 py-5 text-center">Quantity</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {(!Array.isArray(medicines) || medicines.length === 0) ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">No stock found in inventory.</td>
                                </tr>
                            ) : medicines.map((med, i) => (
                                <tr key={med._id} className="hover:bg-blue-50/20 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold shadow-sm">
                                                <Pill size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{med.name}</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">SID-{med._id.slice(-6).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                                            {med.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center font-bold text-gray-700 text-sm">₹{med.price}</td>
                                    <td className="px-8 py-5 text-center font-bold text-sm">
                                        <span className={med.stock < 10 ? 'text-red-600' : 'text-gray-900'}>{med.stock} pcs</span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                            med.stock < 10 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                        }`}>
                                            {med.stock < 10 ? 'LOW STOCK' : 'IN STOCK'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button 
                                            onClick={() => handleDelete(med._id)}
                                            className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
    );
};

export default AdminPharmacy;
