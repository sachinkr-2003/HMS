import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
    Search, 
    Plus, 
    Edit, 
    Trash2, 
    Loader2, 
    Package, 
    Calendar, 
    X, 
    AlertCircle,
    ArrowRight,
    Pill
} from 'lucide-react';

const PharmacyInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Tablet',
        price: '',
        stock: '',
        expiryDate: ''
    });

    const fetchInventory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pharmacy`);
            setInventory(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Inventory Sync Error");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/pharmacy`, formData);
            Swal.fire({
                icon: 'success',
                title: 'Inventory Updated',
                text: `${formData.name} successfully registered in system.`,
                confirmButtonColor: '#2563eb'
            });
            setShowForm(false);
            setFormData({ name: '', category: 'Tablet', price: '', stock: '', expiryDate: '' });
            fetchInventory();
        } catch (err) {
            Swal.fire('Error', 'Failed to update ledger.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Authorize Deletion?',
            text: "This SKU will be decommissioned permanently.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Confirm Delete'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/pharmacy/${id}`);
                fetchInventory();
                Swal.fire('Decommissioned!', 'Item removed from ledger.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Action denied.', 'error');
            }
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Medicine Master Ledger</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Official institutional record of pharmaceutical stock and pricing.</p>
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                    {showForm ? 'Close Intake Form' : <><Plus size={16} /> Register New SKU</>}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-xl animate-in zoom-in-95 duration-200">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Package className="text-blue-600" size={18} /> SKU Entry Terminal
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Trade Name</label>
                            <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Sumo" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Formulation</label>
                            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option>Tablet</option>
                                <option>Syrup</option>
                                <option>Injection</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Unit Price (₹)</label>
                            <input required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0.00" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Volume (Stock)</label>
                            <input required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} placeholder="0" />
                        </div>
                        <div className="space-y-1 lg:col-span-1">
                             <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Expiry Date</label>
                             <input required type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold outline-none focus:border-blue-500" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
                        </div>
                        <div className="lg:col-span-5 flex justify-end">
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="px-10 py-3.5 bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg"
                            >
                                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Authorize System Entry"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Master Inventory Ledger</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input type="text" placeholder="Filter by SKU name..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400 font-semibold" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">SKU Designation</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5 text-center">Unit Price</th>
                                <th className="px-8 py-5 text-center">Stock Volume</th>
                                <th className="px-8 py-5 text-center">Expiry Data</th>
                                <th className="px-8 py-5 text-right">Ops</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {inventory.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">No active SKUs detected in institutional ledger.</td>
                                </tr>
                            ) : inventory.map((item) => (
                                <tr key={item._id} className="hover:bg-blue-50/20 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold shadow-sm">
                                                <Pill size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">RID-{item._id.slice(-6).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-tighter italic">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center font-bold text-gray-700 text-sm">₹{item.price}</td>
                                    <td className="px-8 py-5 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className={`text-sm font-bold ${item.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>{item.stock} UNT</span>
                                            {item.stock < 10 && <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter mt-1 animate-pulse">Critical</span>}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[11px] font-bold text-gray-600 flex items-center gap-1">
                                                <Calendar size={12} className="text-gray-300" />
                                                {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                                            </span>
                                            {item.expiryDate && new Date(item.expiryDate) < new Date() && <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter mt-1">Expired</span>}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button 
                                            onClick={() => handleDelete(item._id)}
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
                <div className="p-8 bg-gray-50/50 flex justify-end gap-10">
                    <div className="text-right">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Valuation</p>
                        <p className="text-xl font-bold text-gray-900">₹{inventory.reduce((acc, curr) => acc + (curr.price * curr.stock), 0).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacyInventory;
