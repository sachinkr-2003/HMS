import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Microscope, Clock, CheckCircle, AlertCircle, 
  TrendingUp, Activity, BrainCircuit, ArrowRight,
  Loader2, Printer, Search, X, TestTube
} from 'lucide-react';

const LabDashboard = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTest, setSelectedTest] = useState(null);
    const [reportResult, setReportResult] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/lab');
            setTests(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch lab tests");
            setLoading(false);
        }
    };

    const handleUpdateResult = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axios.put(`http://localhost:5000/api/lab/${selectedTest._id}`, { result: reportResult });
            fetchTests();
            setSelectedTest(null);
            setReportResult('');
        } catch (err) {
            console.error("Failed to update result");
        } finally {
            setIsSaving(false);
        }
    };

    const generatePDF = (test) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Lab Report - ${test.patient?.name}</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; padding: 50px; color: #334155; }
                        .header { border-bottom: 4px solid #1d4ed8; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
                        .hospital-name { font-size: 24px; font-weight: 900; color: #1e293b; }
                        .report-title { font-size: 32px; font-weight: 900; text-align: center; margin: 40px 0; color: #1e40af; text-transform: uppercase; }
                        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
                        .result-box { border: 2px solid #e2e8f0; padding: 30px; border-radius: 4px; min-height: 200px; font-size: 18px; line-height: 1.6; }
                        .footer { margin-top: 100px; border-top: 1px solid #e2e8f0; pt-20px; font-size: 12px; color: #94a3b8; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="hospital-name">HEALTHREKHA CLINICAL LABORATORY</div>
                        <div>Date: ${new Date().toLocaleDateString()}</div>
                    </div>
                    <div class="report-title">LABORATORY INVESTIGATION REPORT</div>
                    <div class="info-grid">
                        <div><strong>Patient Name:</strong> ${test.patient?.name}</div>
                        <div><strong>Test ID:</strong> ${test._id.slice(-8).toUpperCase()}</div>
                        <div><strong>Test Name:</strong> ${test.testName}</div>
                        <div><strong>Status:</strong> ${test.status}</div>
                    </div>
                    <div class="result-box">
                        <strong style="display: block; margin-bottom: 15px; color: #1e40af;">Clinical Observation / Results:</strong>
                        ${test.result || 'Result Pending'}
                    </div>
                    <div class="footer">
                        This is an electronically generated report and does not require a physical signature.
                        <br/>Hospital Address: Healthcare City, Plot 42, Cyberabad.
                    </div>
                    <script>window.print();</script>
                </body>
            </html>
        `);
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={30} /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Classic Header Block - Right Shifted */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Diagnostic Workflow Control</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Authorized processing terminal for clinical inquiries & report generation.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">
                        <Printer size={16} /> Bulk Sync
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                        <TestTube size={16} /> New Booking
                    </button>
                </div>
            </div>

            {/* Departmental Briefing - Top Level */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                {[
                    { label: 'Hematology', val: '12 Investigations', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Biochemistry', val: '08 Investigations', icon: BrainCircuit, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Radiology', val: '15 Investigations', icon: Microscope, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Immunology', val: '06 Investigations', icon: TestTube, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-5 border-l-4 border border-gray-200 rounded shadow-sm flex flex-col justify-between hover:border-blue-400 transition-all group" style={{ borderLeftColor: m.color.replace('text-', '') }}>
                        <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">{m.label} Section</span>
                            <m.icon size={14} className={m.color} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 tracking-tight mt-2">{m.val}</h3>
                    </div>
                ))}
            </div>

            {/* Compact Professional Operational Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Authorized Reports', val: tests.filter(t => t.status === 'Completed').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Pending Processing', val: tests.filter(t => t.status === 'Pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Inquiry Coefficient', val: tests.length, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Fiscal Revenue (EST)', val: `₹${tests.length * 450}`, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm flex items-center gap-4 hover:border-blue-400 transition-all">
                        <div className={`p-2.5 ${m.bg} ${m.color} rounded-lg`}>
                            <m.icon size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{m.label}</p>
                            <h3 className="text-lg font-bold text-gray-800 tracking-tighter leading-none">{m.val}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Test Queue Table */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Active Investigation Line</h2>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                            <input type="text" placeholder="Lookup Subject..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded text-[10px] uppercase font-bold outline-none focus:border-blue-400" />
                        </div>
                    </div>
                    <div className="divide-y divide-gray-50 overflow-x-auto min-h-[300px]">
                        {tests.length === 0 ? (
                            <div className="h-[300px] flex flex-col items-center justify-center text-gray-300">
                                <Microscope size={40} className="mb-2 opacity-20" />
                                <p className="text-[10px] font-bold uppercase tracking-widest">No Requests Logged</p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3">Patient Identity</th>
                                        <th className="px-6 py-3">Investigation</th>
                                        <th className="px-6 py-3 center">Status</th>
                                        <th className="px-6 py-3 text-right">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {tests.map((test, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-all group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded border flex items-center justify-center text-[10px] font-bold ${test.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                        {test.patient?.name?.[0] || 'P'}
                                                    </div>
                                                    <span className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">{test.patient?.name || 'Subject Unknown'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">{test.testName}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border ${
                                                    test.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                    {test.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {test.status === 'Pending' ? (
                                                    <button 
                                                        onClick={() => setSelectedTest(test)}
                                                        className="px-4 py-1.5 bg-gray-900 text-white rounded text-[9px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all"
                                                    >
                                                        Input Results
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => generatePDF(test)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 transition-all"
                                                    >
                                                        <Printer size={16} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* AI Diagnostic Intel */}
                <div className="space-y-4">
                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-xl text-white relative flex flex-col justify-between h-full min-h-[300px]">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-600 rounded">
                                    <BrainCircuit size={18} className="text-white" />
                                </div>
                                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500 italic">Diagnostic AI Sync</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded border border-white/5">
                                    <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest mb-2">Workflow Optimization</p>
                                    <p className="text-[11px] font-medium leading-relaxed text-gray-400">
                                        Surge predicted in **Lipid Panels** on Mondays. System prep advised by Sunday 22:00 HRS.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-3 mt-6 bg-white/5 border border-white/10 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">
                            Export Analytics Ledger
                        </button>
                    </div>
                </div>
            </div>

            {/* Classic Update Modal */}
            {selectedTest && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-xl rounded-lg shadow-2xl overflow-hidden border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Input Diagnostic Data</h2>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">{selectedTest.testName} | {selectedTest.patient?.name}</p>
                            </div>
                            <button onClick={() => setSelectedTest(null)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdateResult} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Clinical Observations & Quantitative Data</label>
                                <textarea 
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all font-medium text-xs leading-relaxed"
                                    placeholder="Enter verified findings here..."
                                    value={reportResult}
                                    onChange={(e) => setReportResult(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setSelectedTest(null)}
                                    className="flex-1 py-3 bg-gray-50 text-gray-400 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    Cancel Operation
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-[2] py-3 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={14} /> : <><CheckCircle size={14} /> Commit Report</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabDashboard;
