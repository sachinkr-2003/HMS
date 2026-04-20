import React from 'react';
import { Microscope, FileText, Download, CheckCircle, Clock } from 'lucide-react';

const DoctorReports = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Lab & Diagnostic Reports</h1>
        <p className="text-slate-500">Monitor and review patient lab results.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[
          { patient: 'Anika Singh', test: 'Complete Blood Count (CBC)', date: '20 Apr 2026', status: 'Ready', result: 'Normal' },
          { patient: 'Rohan Mehta', test: 'Lipid Profile', date: '19 Apr 2026', status: 'Awaiting Review', result: 'High Cholesterol' },
          { patient: 'Saira Banu', test: 'Thyroid Function Test', date: '18 Apr 2026', status: 'Ready', result: 'Normal' },
        ].map((report, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-primary/30 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Microscope size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{report.test}</h3>
                <p className="text-sm text-slate-500">Patient: <span className="font-medium text-slate-700">{report.patient}</span> • {report.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Result</p>
                <p className={`text-sm font-bold ${report.result === 'Normal' ? 'text-emerald-500' : 'text-rose-500'}`}>{report.result}</p>
              </div>
              <div className={`px-4 py-1 rounded-full text-xs font-bold ${
                report.status === 'Ready' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {report.status}
              </div>
              <button className="p-2 bg-slate-50 text-slate-400 hover:bg-primary hover:text-white rounded-lg transition-all">
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorReports;
