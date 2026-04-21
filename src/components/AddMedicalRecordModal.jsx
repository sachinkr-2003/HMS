import React, { useState } from 'react';
import axios from 'axios';
import { X, Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';

const AddMedicalRecordModal = ({ appointment, onClose, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        patient: appointment.patient._id,
        doctor: appointment.doctor._id,
        appointment: appointment._id,
        diagnosis: '',
        clinicalNotes: '',
        vitalSigns: {
            bloodPressure: '',
            temperature: '',
            pulse: '',
            weight: ''
        },
        symptoms: [''],
        prescriptions: [{ medicine: '', dosage: '', frequency: '', duration: '', notes: '' }]
    });

    const handleSymptomChange = (index, value) => {
        const newSymptoms = [...formData.symptoms];
        newSymptoms[index] = value;
        setFormData({ ...formData, symptoms: newSymptoms });
    };

    const addSymptom = () => setFormData({ ...formData, symptoms: [...formData.symptoms, ''] });
    const removeSymptom = (index) => setFormData({ ...formData, symptoms: formData.symptoms.filter((_, i) => i !== index) });

    const handlePrescriptionChange = (index, field, value) => {
        const newPrescriptions = [...formData.prescriptions];
        newPrescriptions[index][field] = value;
        setFormData({ ...formData, prescriptions: newPrescriptions });
    };

    const addPrescription = () => setFormData({ ...formData, prescriptions: [...formData.prescriptions, { medicine: '', dosage: '', frequency: '', duration: '', notes: '' }] });
    const removePrescription = (index) => setFormData({ ...formData, prescriptions: formData.prescriptions.filter((_, i) => i !== index) });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/medical-records`, formData);
            onSave();
            onClose();
        } catch (err) {
            console.error("Save failed:", err);
            alert("Failed to save medical record");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">New Clinical Record</h2>
                        <p className="text-xs text-gray-500 font-medium">Patient: {appointment.patient.name} | Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-8">
                    {/* Vital Signs */}
                    <section>
                        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Vital Signs</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.keys(formData.vitalSigns).map(key => (
                                <div key={key}>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block pl-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-bold"
                                        placeholder="Enter value"
                                        value={formData.vitalSigns[key]}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            vitalSigns: { ...formData.vitalSigns, [key]: e.target.value }
                                        })}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Symptoms */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Symptoms</h3>
                            <button type="button" onClick={addSymptom} className="text-blue-600 text-[10px] font-bold flex items-center gap-1 hover:underline">
                                <Plus size={12} /> Add Symptom
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {formData.symptoms.map((sym, i) => (
                                <div key={i} className="flex gap-2">
                                    <input 
                                        type="text"
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-bold"
                                        placeholder="e.g. Fever, Cough"
                                        value={sym}
                                        onChange={(e) => handleSymptomChange(i, e.target.value)}
                                    />
                                    <button type="button" onClick={() => removeSymptom(i)} className="text-red-400 hover:text-red-600 p-2">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Diagnosis & Notes */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Final Diagnosis</h3>
                            <input 
                                type="text"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-bold"
                                placeholder="Diagnosis name..."
                                value={formData.diagnosis}
                                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                            />
                        </div>
                        <div>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Clinical Notes</h3>
                            <textarea 
                                rows="3"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-bold"
                                placeholder="Details about the visit..."
                                value={formData.clinicalNotes}
                                onChange={(e) => setFormData({ ...formData, clinicalNotes: e.target.value })}
                            />
                        </div>
                    </section>

                    {/* Prescriptions */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Prescriptions</h3>
                            <button type="button" onClick={addPrescription} className="text-blue-600 text-[10px] font-bold flex items-center gap-1 hover:underline">
                                <Plus size={12} /> Add Medicine
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.prescriptions.map((pres, i) => (
                                <div key={i} className="p-4 bg-blue-50/30 rounded-xl border border-blue-100 flex flex-wrap gap-4 items-end">
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="text-[9px] font-black text-blue-400 uppercase mb-1 block">Medicine</label>
                                        <input 
                                            type="text"
                                            className="w-full bg-white border border-blue-200 rounded-lg p-2 text-xs font-bold"
                                            placeholder="Medicine name"
                                            value={pres.medicine}
                                            onChange={(e) => handlePrescriptionChange(i, 'medicine', e.target.value)}
                                        />
                                    </div>
                                    <div className="w-20">
                                        <label className="text-[9px] font-black text-blue-400 uppercase mb-1 block">Dosage</label>
                                        <input 
                                            type="text"
                                            className="w-full bg-white border border-blue-200 rounded-lg p-2 text-xs font-bold"
                                            placeholder="500mg"
                                            value={pres.dosage}
                                            onChange={(e) => handlePrescriptionChange(i, 'dosage', e.target.value)}
                                        />
                                    </div>
                                    <div className="w-24">
                                        <label className="text-[9px] font-black text-blue-400 uppercase mb-1 block">Frequency</label>
                                        <input 
                                            type="text"
                                            className="w-full bg-white border border-blue-200 rounded-lg p-2 text-xs font-bold"
                                            placeholder="1-0-1"
                                            value={pres.frequency}
                                            onChange={(e) => handlePrescriptionChange(i, 'frequency', e.target.value)}
                                        />
                                    </div>
                                    <div className="w-20">
                                        <label className="text-[9px] font-black text-blue-400 uppercase mb-1 block">Duration</label>
                                        <input 
                                            type="text"
                                            className="w-full bg-white border border-blue-200 rounded-lg p-2 text-xs font-bold"
                                            placeholder="5 Days"
                                            value={pres.duration}
                                            onChange={(e) => handlePrescriptionChange(i, 'duration', e.target.value)}
                                        />
                                    </div>
                                    <button type="button" onClick={() => removePrescription(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </form>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-all">Cancel</button>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                        {loading ? 'Saving...' : <><Save size={16} /> Save Record</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMedicalRecordModal;
