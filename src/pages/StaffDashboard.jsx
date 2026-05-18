import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Swal from 'sweetalert2';
import { 
  UserPlus, 
  CalendarCheck, 
  ListOrdered, 
  Search, 
  Plus,
  Clock,
  MoreVertical,
  Activity,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

const StaffDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [queue, setQueue] = useState([]);
    const [stats, setStats] = useState({
        totalEnrollments: 0,
        activeAppointments: 0,
        pendingQueue: 0
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        age: '',
        doctorId: '',
        fee: '500',
        paymentMethod: 'Cash',
        bp: '',
        temp: '',
        weight: ''
    });
    const [hospital, setHospital] = useState(null);

    const fetchData = async () => {
        try {
            // 1. Fetch Doctors
            const docRes = await API.get('/doctors');
            setDoctors(docRes.data);

            const aptRes = await API.get('/appointments');
            const today = new Date().setHours(0,0,0,0);
            const todayApts = aptRes.data.filter(a => new Date(a.appointmentDate).setHours(0,0,0,0) === today);
            
            setQueue(todayApts);
            setStats({
                totalEnrollments: todayApts.length,
                activeAppointments: todayApts.filter(a => a.status === 'Confirmed').length,
                pendingQueue: todayApts.filter(a => a.status === 'Pending').length
            });
        } catch (err) {
            console.error("Staff Data Fetch Failure:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const printPrescription = (data) => {
        const printWindow = window.open('', '_blank', 'width=800,height=1000');
        printWindow.document.write(`
            <html>
            <head>
                <title>Prescription Slip</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                        padding: 0;
                        margin: 0;
                        color: #333;
                        position: relative;
                        height: 100vh;
                        overflow: hidden;
                    }
                    
                    /* Green Waves */
                    .top-wave {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 200px;
                        height: 100px;
                        background: #a7f3d0;
                        border-bottom-right-radius: 100%;
                        opacity: 0.5;
                        z-index: -1;
                    }
                    .top-wave-2 {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 150px;
                        height: 70px;
                        background: #059669;
                        border-bottom-right-radius: 100%;
                        z-index: -1;
                    }
                    
                    .bottom-wave {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 300px;
                        height: 150px;
                        background: #a7f3d0;
                        border-top-left-radius: 100%;
                        opacity: 0.5;
                        z-index: -1;
                    }
                    .bottom-wave-2 {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 250px;
                        height: 100px;
                        background: #059669;
                        border-top-left-radius: 100%;
                        z-index: -1;
                    }
                    
                    .content {
                        padding: 50px 60px;
                        height: calc(100% - 100px);
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        z-index: 10;
                    }
                    
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-top: 20px;
                    }
                    
                    .hospital-info {
                        text-align: left;
                    }
                    .hospital-name {
                        font-size: 24px;
                        font-weight: 900;
                        color: #111827;
                    }
                    .hospital-address {
                        font-size: 10px;
                        color: #6b7280;
                        margin-top: 5px;
                        max-width: 300px;
                        line-height: 1.4;
                    }
                    
                    .doctor-info {
                        text-align: right;
                    }
                    .doctor-name {
                        font-size: 18px;
                        font-weight: 700;
                        color: #111827;
                    }
                    .doctor-sub {
                        font-size: 11px;
                        color: #4b5563;
                        margin-top: 2px;
                    }
                    
                    .divider {
                        border-top: 1px solid #d1d5db;
                        margin: 15px 0;
                        position: relative;
                    }
                    .divider::after {
                        content: 'DAY CARE CENTRE';
                        position: absolute;
                        right: 0;
                        top: 5px;
                        font-size: 9px;
                        font-weight: 700;
                        color: #4b5563;
                    }
                    
                    .patient-info {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 20px;
                        font-size: 13px;
                    }
                    
                    .patient-name-field {
                        display: flex;
                        gap: 10px;
                        width: 60%;
                        align-items: flex-end;
                    }
                    .dots-fill {
                        border-bottom: 1px dotted #9ca3af;
                        flex-grow: 1;
                        height: 1px;
                    }
                    
                    .right-fields {
                        width: 30%;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .small-field {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                    }
                    .small-field span:first-child {
                        font-weight: 500;
                        color: #4b5563;
                    }
                    .small-field span:last-child {
                        border-bottom: 1px dotted #9ca3af;
                        width: 120px;
                        text-align: right;
                        min-height: 15px;
                    }
                    
                    .rx-symbol {
                        font-size: 36px;
                        font-weight: 900;
                        color: #111827;
                        margin-top: 30px;
                        font-style: italic;
                    }
                    
                    .bg-caduceus {
                        position: absolute;
                        top: 55%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 450px;
                        opacity: 0.03;
                        z-index: -1;
                    }
                    
                    .footer {
                        margin-top: auto;
                        display: flex;
                        justify-content: space-between;
                        font-size: 10px;
                        color: #6b7280;
                        border-top: 1px solid #e5e7eb;
                        padding-top: 10px;
                        margin-bottom: 20px;
                    }
                    
                    @media print {
                        body { -webkit-print-color-adjust: exact; }
                    }
                </style>
            </head>
            <body>
                <div class="top-wave"></div>
                <div class="top-wave-2"></div>
                
                <div class="bottom-wave"></div>
                <div class="bottom-wave-2"></div>
                
                <div class="content">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Caduceus.svg" class="bg-caduceus" />

                    <div class="header">
                        <div class="hospital-info">
                            <div class="hospital-name">${hospital?.name || 'HEALTHREKHA'}</div>
                            <div class="hospital-address">
                                No. 4, Address Line 1, Street and Location, Address Line 2,<br/>
                                City & Pinode, Dist. Phone: #
                            </div>
                        </div>
                        <div class="doctor-info">
                            <div class="doctor-name">DR. ${data.doctorName.toUpperCase()}</div>
                            <div class="doctor-sub">M.B.B.S, MD (Gen)</div>
                            <div class="doctor-sub">Reg No: 000000</div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="patient-info">
                        <div class="patient-name-field">
                            <span style="font-weight: 500; color: #4b5563;">Name:</span>
                            <span style="font-weight: 700; color: #111827;">${data.patientName}</span>
                            <div class="dots-fill"></div>
                        </div>
                        <div class="right-fields">
                            <div class="small-field">
                                <span>Date:</span>
                                <span>${data.date}</span>
                            </div>
                            <div class="small-field">
                                <span>Age / Sex:</span>
                                <span>${data.age} Y / ${data.gender}</span>
                            </div>
                            <div class="small-field">
                                <span>BP:</span>
                                <span>${data.bp || ''}</span>
                            </div>
                            <div class="small-field">
                                <span>Temp:</span>
                                <span>${data.temp || ''}</span>
                            </div>
                            <div class="small-field">
                                <span>Weight:</span>
                                <span>${data.weight || ''}</span>
                            </div>
                        </div>
                    </div>

                    <div class="rx-symbol">Rx</div>

                    <div style="flex-grow: 1;"></div>

                    <div class="footer">
                        <div>Please bring this Prescription if coming next time.</div>
                        <div>Name of Print Desk</div>
                    </div>
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        };
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if(!formData.firstName || !formData.phone || !formData.doctorId || !formData.age || !formData.gender || !formData.fee) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Details',
                text: 'Please fill out all the required fields (including Age and Gender) before submitting.',
                confirmButtonColor: '#2563eb'
            });
            return;
        }

        try {
            Swal.fire({
                title: 'Adding Patient...',
                html: 'Please wait while we save the patient details.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // 1. Create Patient
            const patientRes = await API.post('/patients', {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                age: formData.age,
                gender: formData.gender,
                contact: formData.phone
            });

            // 2. Book Appointment
            const appointmentRes = await API.post('/appointments', {
                patientId: patientRes.data._id,
                doctorId: formData.doctorId,
                appointmentDate: new Date(),
                reason: 'Standard Consultation'
            });

            // 3. Create Bill
            const billRes = await API.post('/billing', {
                patient: patientRes.data._id,
                appointment: appointmentRes.data._id,
                items: [{
                    description: 'Consultation Fee',
                    amount: Number(formData.fee)
                }],
                totalAmount: Number(formData.fee),
                paidAmount: Number(formData.fee),
                status: 'Paid',
                paymentMethod: formData.paymentMethod
            });

            Swal.fire({
                icon: 'success',
                title: 'Patient Added Successfully!',
                text: `${formData.firstName} has been registered, appointment booked, and bill of ₹${formData.fee} generated.`,
                confirmButtonColor: '#2563eb'
            }).then(async () => {
                // Print Prescription Slip
                printPrescription({
                    patientName: `${formData.firstName} ${formData.lastName}`,
                    age: formData.age,
                    gender: formData.gender,
                    date: new Date().toLocaleDateString(),
                    doctorName: doctors.find(d => d._id === formData.doctorId)?.user?.name || 'Doctor',
                    fee: formData.fee,
                    bp: formData.bp,
                    temp: formData.temp,
                    weight: formData.weight
                });

                if (formData.paymentMethod === 'Online') {
                    if (hospital?.upiId) {
                        const upiUrl = `upi://pay?pa=${hospital.upiId}&pn=${encodeURIComponent(hospital.name)}&am=${formData.fee}&cu=INR`;
                        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiUrl)}&size=200x200`;
                        
                        await Swal.fire({
                            title: 'Scan QR to Pay',
                            html: `
                                <div class="flex flex-col items-center gap-4 pt-4">
                                    <p class="text-xs font-bold text-gray-600">Scan this QR code using any UPI app</p>
                                    <img src="${qrUrl}" alt="UPI QR Code" class="w-48 h-48 border-2 border-dashed p-2 rounded-lg" />
                                    <div class="text-center">
                                        <p class="text-xs font-bold text-blue-600">${hospital.upiId}</p>
                                        <p class="text-sm font-black text-gray-800 mt-1">AMOUNT: ₹${formData.fee}</p>
                                    </div>
                                </div>
                            `,
                            confirmButtonText: 'I HAVE PAID',
                            confirmButtonColor: '#10b981'
                        });
                    } else {
                        await Swal.fire({
                            icon: 'warning',
                            title: 'UPI Not Configured',
                            text: 'Admin has not set the Hospital UPI ID in Settings. Please ask Admin to set it first.',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
            });
            
            setFormData({ firstName: '', lastName: '', phone: '', gender: '', age: '', doctorId: '', fee: '500', paymentMethod: 'Cash' });
            fetchData(); // Refresh list immediately after registration
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Patient',
                text: err.response?.data?.message || 'Something went wrong while adding the patient. Please try again.',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-100 pb-4 mb-3 pl-4 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Staff Operations Center</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">Institutional reception desk for subject onboarding, queue synchronization & real-time activity surveillance.</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => {
                            Swal.fire({
                                icon: 'info',
                                title: 'Queue Analytics',
                                text: `Total Enrollments: ${stats.totalEnrollments} | Active: ${stats.activeAppointments} | Pending: ${stats.pendingQueue}`,
                                confirmButtonColor: '#2563eb'
                            });
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                        Queue Analytics
                    </button>
                    <button 
                        onClick={() => {
                            const el = document.getElementById('firstNameInput');
                            if(el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                setTimeout(() => el.focus(), 500);
                            }
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                        <Plus size={16} /> New Enrollment
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Shift Enrollments', val: stats.totalEnrollments, icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Appointments', val: stats.activeAppointments, icon: CalendarCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Queue Saturation', val: stats.pendingQueue, icon: ListOrdered, color: 'text-amber-600', bg: 'bg-amber-50' }
                ].map((m, i) => (
                    <div key={i} className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between min-h-[110px] hover:border-blue-400 transition-all group">
                        <div className="flex justify-between items-start">
                            <div className={`p-2 ${m.bg} ${m.color} rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                                <m.icon size={16} />
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate ml-2">{m.label}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2">{m.val} SUBJECTS</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <form onSubmit={handleRegister} className="bg-white p-7 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-[10px] font-bold mb-6 flex items-center gap-2 text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">
                            <UserPlus size={16} className="text-blue-600" /> Subject Induction Matrix
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    id="firstNameInput"
                                    type="text" 
                                    placeholder="GIVEN NAME" 
                                    className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" 
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                />
                                <input 
                                    type="text" 
                                    placeholder="SURNAME" 
                                    className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" 
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                />
                            </div>
                            <input 
                                type="tel" 
                                placeholder="PRIMARY CONTACT VECTOR (PHONE)" 
                                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <select 
                                    className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 text-gray-500 font-mono tracking-tighter"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                >
                                    <option value="">GENDER IDENT</option>
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                                <input 
                                    type="number" 
                                    placeholder="CHRONO AGE" 
                                    className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" 
                                    value={formData.age}
                                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                                />
                            </div>
                            
                            {/* Vitals */}
                            <div className="grid grid-cols-3 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="BP (e.g. 120/80)" 
                                    className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" 
                                    value={formData.bp || ''}
                                    onChange={(e) => setFormData({...formData, bp: e.target.value})}
                                />
                                <input 
                                    type="text" 
                                    placeholder="TEMP (e.g. 98.6)" 
                                    className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" 
                                    value={formData.temp || ''}
                                    onChange={(e) => setFormData({...formData, temp: e.target.value})}
                                />
                                <input 
                                    type="text" 
                                    placeholder="WEIGHT (KG)" 
                                    className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" 
                                    value={formData.weight || ''}
                                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Assign Doctor</label>
                                <select 
                                    className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 text-gray-700 font-mono tracking-tighter"
                                    value={formData.doctorId}
                                    onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                                >
                                    <option value="">-- CHOOSE CLINICIAN --</option>
                                    {doctors.map((doc) => {
                                        const docName = doc.user?.name || "Clinician";
                                        const displayName = docName.toUpperCase().startsWith('DR.') ? docName.toUpperCase() : `DR. ${docName.toUpperCase()}`;
                                        return (
                                            <option key={doc._id} value={doc._id}>
                                                {displayName} ({doc.specialization?.toUpperCase()})
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Consultation Fee (₹)</label>
                                    <input 
                                        type="number" 
                                        placeholder="FEE AMOUNT" 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 font-mono tracking-tighter" 
                                        value={formData.fee}
                                        onChange={(e) => setFormData({...formData, fee: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Payment Method</label>
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-[10px] font-bold uppercase outline-none focus:border-blue-400 text-gray-700 font-mono tracking-tighter"
                                        value={formData.paymentMethod}
                                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Online">Online</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]">
                                AUTHORIZE REGISTRATION
                            </button>
                        </div>
                    </form>

                    <div className="bg-gray-900 p-8 rounded-2xl shadow-xl text-white border border-gray-800 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                        <div>
                            <h2 className="text-[10px] font-bold mb-8 flex items-center gap-2 text-blue-400 uppercase tracking-[0.2em] italic border-b border-white/5 pb-4">
                                <ShieldCheck size={18} className="text-blue-500" /> Operational Surveillance
                            </h2>
                            <div className="space-y-4">
                                <div className="p-5 bg-white/5 rounded-xl border border-white/5 group hover:bg-blue-600/10 transition-all cursor-pointer">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-blue-400 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Clock size={12} /> Next Available Slot Sync
                                        </p>
                                        <span className="text-[8px] bg-blue-600 px-2 py-0.5 rounded text-white font-bold">LIVE</span>
                                    </div>
                                    <p className="text-[11px] font-medium text-gray-300 uppercase tracking-tighter">Dr. Anjali Rao (Neurology Satellite) - Slot 11:20 HRS Ready.</p>
                                    <button 
                                        onClick={() => {
                                            const el = document.getElementById('firstNameInput');
                                            if(el) {
                                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                setTimeout(() => el.focus(), 500);
                                            }
                                        }}
                                        className="mt-3 text-[9px] font-bold text-blue-400 hover:underline uppercase tracking-widest">Execute Immediate Booking</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Activity size={14} className="text-gray-500" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Queue Latency: 18.4 MINS AVG</p>
                            </div>
                            <button 
                                onClick={() => {
                                    fetchData();
                                    Swal.fire({
                                        toast: true,
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Queue Synced',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }}
                                className="px-3 py-1 bg-white/10 text-white text-[8px] font-bold uppercase rounded border border-white/10 tracking-widest hover:bg-white/20">Sync View</button>
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <UserCheck size={150} />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Live Subject Influx Queue</h2>
                            <div className="relative w-48">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={12} />
                                <input type="text" placeholder="Lookup Serial ID..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded text-[9px] font-bold uppercase focus:border-blue-400 outline-none" />
                            </div>
                        </div>
                        <div className="divide-y divide-gray-50 overflow-y-auto max-h-[600px]">
                            {queue.length === 0 ? (
                                <div className="p-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No subjects in live influx queue</div>
                            ) : queue.map((p, i) => (
                                <div key={p._id} className="flex items-center justify-between px-6 py-4 hover:bg-blue-50/20 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400 text-[11px] group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all font-mono tracking-tighter uppercase whitespace-nowrap">
                                            SID-{p._id.slice(-4).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{p.patient?.name || 'Incomplete Profile'}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 italic">Priority #{i+1} • {p.doctor?.user?.name || 'TBD'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                            p.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {p.status}
                                        </div>
                                        <button 
                                            onClick={() => {
                                                Swal.fire({
                                                    icon: 'info',
                                                    title: 'Options',
                                                    text: `Manage patient ${p.patient?.name}`,
                                                    confirmButtonColor: '#2563eb'
                                                });
                                            }}
                                            className="p-1.5 text-gray-300 hover:text-gray-600 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex justify-center">
                            <button 
                                onClick={() => {
                                    Swal.fire({
                                        icon: 'info',
                                        title: 'Influx Ledger',
                                        text: 'All currently available queue entries are already displayed above.',
                                        confirmButtonColor: '#2563eb'
                                    });
                                }}
                                className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em] hover:underline flex items-center gap-2">
                                Inspect Full Influx Ledger <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
