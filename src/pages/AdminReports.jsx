import React from 'react';
import { TrendingUp, BarChart3, PieChart, Users, DollarSign, ArrowUpRight, Download, Calendar } from 'lucide-react';
import { ExportEngine } from '../utils/ExportEngine';

const AdminReports = () => {
    const reportData = [
        ['Surgery Unit', '98%', 'Peak', '₹1.2 Cr'],
        ['Diagnostics', '92%', 'Stable', '₹85.4 L'],
        ['Pharmacy', '85%', 'High', '₹42.1 L'],
        ['Emergency', '78%', 'Normal', '₹22.5 L']
    ];

    const handleExport = () => {
        ExportEngine.toPDF(
            'Institutional Performance Matrix',
            ['Department', 'Efficiency', 'Status', 'Revenue Contribution'],
            reportData,
            'HMS-Global-Performance'
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Classic Header Block */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Hospital Intelligence & Reports</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Global performance metrics and multi-departmental growth analytics.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Calendar size={14} className="text-blue-500" /> Range
                    </button>
                    <button 
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                    >
                        <Download size={14} /> Export Report
                    </button>
                </div>
            </div>

            {/* Adjusted Horizontal Stats - Reduced by 10px as requested (min-h-110) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 min-h-[110px] rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h3 className="text-2xl font-bold text-gray-900 leading-none">12.4k</h3>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                                <ArrowUpRight size={10} /> 24%
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2.5">Total Patient Footfall</p>
                    </div>
                </div>

                <div className="bg-white p-5 min-h-[110px] rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h3 className="text-2xl font-bold text-gray-900 leading-none">₹4.2 Cr</h3>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                                <ArrowUpRight size={10} /> 15%
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2.5">Annual Revenue</p>
                    </div>
                </div>

                <div className="bg-white p-5 min-h-[110px] rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h3 className="text-2xl font-bold text-gray-900 leading-none">92%</h3>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 uppercase">
                                SCORE
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2.5">Patient Satisfaction</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-[10px] font-bold mb-6 uppercase tracking-[0.15em] text-gray-700">Patient Intake Trend (Annual)</h2>
                    <div className="h-40 flex items-end justify-between gap-2 px-2">
                        {[40, 60, 45, 90, 65, 80, 50, 70, 85, 60, 95, 100].map((val, i) => (
                            <div key={i} className="flex-1 bg-blue-50 rounded-t-sm relative group border-t border-blue-100">
                                <div 
                                    className="absolute bottom-0 left-0 w-full bg-blue-500/80 rounded-t-sm transition-all duration-1000"
                                    style={{ height: `${val}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-3 px-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Jan - Mar</span>
                        <span>Apr - Jun</span>
                        <span>Jul - Sep</span>
                        <span>Oct - Dec</span>
                    </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl shadow-xl text-white flex flex-col justify-between border border-gray-800 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-[10px] font-bold mb-6 flex items-center gap-3 uppercase tracking-widest text-blue-400">
                           <BarChart3 size={16} /> Performance By Department
                        </h2>
                        <div className="space-y-3">
                            {[
                                { name: 'Surgery Unit', efficiency: 98, status: 'Peak' },
                                { name: 'Diagnostics', efficiency: 92, status: 'Stable' },
                                { name: 'Pharmacy', efficiency: 85, status: 'High' },
                            ].map((dept, i) => (
                                <div key={i} className="flex items-center justify-between px-3 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-500/20 rounded border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-xs">
                                            {dept.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white">{dept.name}</p>
                                            <p className="text-[8px] text-gray-500 font-bold uppercase">{dept.status}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-base font-black text-emerald-400">{dept.efficiency}%</p>
                                        <p className="text-[8px] text-gray-600 uppercase font-bold text-center">Eff.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-5 -mb-2 mr-0 pointer-events-none">
                        <BarChart3 size={150} className="text-blue-500 translate-y-10 translate-x-10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
