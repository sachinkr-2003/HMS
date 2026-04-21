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
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/lab`);
            setTests(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Lab Sync Failure");
            setLoading(false);
        }
    };

    const handleUpdateResult = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/lab/${selectedTest._id}`, { result: reportResult });
            fetchTests();
            setSelectedTest(null);
            setReportResult('');
        } catch (err) {
            console.error("Result Commit Failure");
        } finally {
            setIsSaving(false);
        }
    };

    const generatePDF = (test) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Institutional Report - ${test.patient?.name}</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 50px; color: #1e293b; line-height: 1.6; }
                        .header { border-bottom: 4px solid #1d4ed8; padding-bottom: 20px; text-align: center; }
                        .hospital-name { font-size: 24px; font-weight: 800; color: #1e3a8a; }
                        .report-title { font-size: 28px; font-weight: 900; text-align: center; margin: 40px 0; color: #1e40af; border: 2px solid #1e40af; display: inline-block; padding: 10px 40px; }
                        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; background: #f1f5f9; padding: 25px; border-radius: 8px; }
                        .result-box { border: 1px solid #e2e8f0; padding: 40px; border-radius: 12px; background: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
                        .footer { margin-top: 100px; text-align: center; font-size: 10px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="hospital-name">HEALTHREKHA INSTITUTIONAL DIAGNOSTICS</div>
                        <div style="font-size: 10px; font-weight: bold; color: #64748b; margin-top: 5px;">CERTIFIED CLINICAL LEDGER</div>
                    </div>
                    <div style="text-align: center;"><div class="report-title">LABORATORY REPORT</div></div>
                    <div class="info-grid">
                        <div><strong>SUBJECT NAME:</strong> ${test.patient?.name.toUpperCase()}</div>
                        <div><strong>LEDGER REF:</strong> ${test._id.slice(-8).toUpperCase()}</div>
                        <div><strong>INVESTIGATION:</strong> ${test.testName.toUpperCase()}</div>
                        <div><strong>DATE:</strong> ${new Date().toLocaleDateString('en-GB')}</div>
                    </div>
                    <div class="result-box">
                        <strong style="color: #1e40af; font-size: 14px; text-transform: uppercase;">Verified Observations:</strong>
                        <p style="margin-top: 20px; font-size: 16px;">${test.result || 'PENDING DISPATCH'}</p>
                    </div>
                    <div class="footer italic">
                        AUTHENTICATED ELECTRONIC RECORD • REPRODUCTION REQUIRES INSTITUTIONAL CLEARANCE
                    </div>
                    <script>window.print();</script>
                </body>
            </html>
        `);
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={30} /></div>;

    const stats = {
        completed: tests.filter(t => t.status === 'Completed').length,
        pending: tests.filter(t => t.status === 'Pending').length,
        total: tests.length
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Diagnostics Control Center</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-tighter">Live clinical inquiry management and report verification terminal.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchTests} className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">
                        <Printer size={16} /> Sync Ledger
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                        <Microscope size={16} /> View Requests
                    </button>
                </div>
            </div>

            {/* Real Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Verified Reports', val: stats.completed, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Pending Processing', val: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Total Investigations', val: stats.total, icon: TestTube, color: 'text-blue-600', bg: 'bg-blue-50' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between group hover:border-blue-400 transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 ${m.bg} ${m.color} rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                                <m.icon size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                                <h3 className="text-xl font-bold text-gray-900 leading-none">{m.val} Jobs</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
                    <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                        <h2 className="text-xs font-black text-gray-700 uppercase tracking-widest">Active Diagnostic Ledger</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <Activity size={12} className="text-blue-500" /> Operational Hub Online
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5">Patient Source</th>
                                    <th className="px-8 py-5">Diagnostic Plan</th>
                                    <th className="px-8 py-5 text-center">Protocol Status</th>
                                    <th className="px-8 py-5 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tests.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                    <BrainCircuit size={32} className="text-gray-200" />
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Awaiting subject diagnostic requests.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    tests.map((test) => (
                                        <tr key={test._id} className="hover:bg-blue-50/20 transition-all group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400 text-xs shadow-inner">
                                                        {test.patient?.name?.[0] || 'S'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{test.patient?.name || 'Unknown Subject'}</p>
                                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">REF-{test._id.slice(-6).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">{test.testName}</span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                                                    test.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                    {test.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                {test.status === 'Pending' ? (
                                                    <button onClick={() => setSelectedTest(test)} className="px-5 py-2 bg-gray-900 text-white rounded font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">Input Findings</button>
                                                ) : (
                                                    <button onClick={() => generatePDF(test)} className="p-2 text-gray-300 hover:text-blue-600 transition-all bg-gray-50 rounded-lg"><Printer size={16} /></button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-900 p-8 rounded-3xl shadow-xl text-white border border-gray-800 flex flex-col justify-between min-h-[350px]">
                        <div>
                             <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900/40 text-white">
                                    <BrainCircuit size={20} />
                                </div>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">Diagnostic Intel</h2>
                             </div>
                             <p className="text-sm font-medium text-gray-400 leading-relaxed italic">
                                Institutional Zero-State active. Diagnostic AI is ready to analyze quantitative findings once committed.
                             </p>
                        </div>
                        <div className="mt-8 border-t border-white/5 pt-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Compute Efficiency</span>
                                <span className="text-[9px] font-bold text-blue-400 uppercase">99.8%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full">
                                <div className="bg-blue-600 h-full w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedTest && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">Record Finding</h2>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{selectedTest.testName} • {selectedTest.patient?.name}</p>
                            </div>
                            <button onClick={() => setSelectedTest(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
                        </div>
                        <form onSubmit={handleUpdateResult} className="p-8 space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Clinical Qualitative Analysis</label>
                                <textarea required rows="6" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 font-semibold text-sm leading-relaxed" placeholder="Enter verified lab results here..." value={reportResult} onChange={(e) => setReportResult(e.target.value)} />
                            </div>
                            <button disabled={isSaving} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3">
                                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <><CheckCircle size={18} /> Commit Final Report</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabDashboard;
