import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  Pill,
  Microscope,
  Bed,
  Settings, 
  LogOut,
  FileText,
  TrendingUp,
  Plus,
  Truck,
  DollarSign,
  X,
  Sparkles,
  Video
} from 'lucide-react';

const Sidebar = ({ role, isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = {
    admin: [
      { type: 'header', name: 'Core Management' },
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'Staff & Users', icon: Users, path: '/admin/users' },
      { name: 'Duty Roster', icon: Calendar, path: '/ward/roster' },
      
      { type: 'header', name: 'Hospital Operations' },
      { name: 'Appointments', icon: Calendar, path: '/admin/appointments' },
      { name: 'Beds Status', icon: Bed, path: '/admin/beds' },
      { name: 'Medical Assets', icon: Truck, path: '/ward/assets' },
      
      { type: 'header', name: 'Clinical Units' },
      { name: 'Pharmacy Stock', icon: Pill, path: '/admin/pharmacy' },
      { name: 'Lab Requests', icon: Microscope, path: '/admin/lab' },
      { name: 'Telemedicine', icon: Video, path: '/doctor/telemedicine' },

      { type: 'header', name: 'Finance & Growth' },
      { name: 'Billing & Income', icon: DollarSign, path: '/admin/billing' },
      { name: 'Predictive Reports', icon: TrendingUp, path: '/admin/reports' },
      { name: 'Advanced AI', icon: Sparkles, path: '/admin/ai' },
      
      { type: 'header', name: 'Configuration' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
    doctor: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/doctor' },
        { name: 'Appointments', icon: Calendar, path: '/doctor/appointments' },
        { name: 'Patient Records', icon: Users, path: '/doctor/patients' },
        { name: 'Telemedicine', icon: Video, path: '/doctor/telemedicine' },
        { name: 'Prescriptions', icon: FileText, path: '/doctor/prescriptions' },
        { name: 'Settings', icon: Settings, path: '/doctor/settings' },
    ],
    pharmacy: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/pharmacy' },
        { name: 'Inventory', icon: Pill, path: '/pharmacy/inventory' },
        { name: 'Sales Billing', icon: FileText, path: '/pharmacy/billing' },
        { name: 'Settings', icon: Settings, path: '/pharmacy/settings' },
    ],
    lab: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/lab' },
        { name: 'Test Requests', icon: Microscope, path: '/lab/tests' },
        { name: 'Reports', icon: FileText, path: '/lab/reports' },
        { name: 'Settings', icon: Settings, path: '/lab/settings' },
    ],
    ward: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/ward' },
        { name: 'Bed Grid', icon: Bed, path: '/ward/beds' },
        { name: 'Admissions', icon: Plus, path: '/ward/admissions' },
        { name: 'Medical Assets', icon: Truck, path: '/ward/assets' },
        { name: 'Duty Roster', icon: Calendar, path: '/ward/roster' },
        { name: 'Settings', icon: Settings, path: '/ward/settings' },
    ],
    billing: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/billing' },
        { name: 'Create Bill', icon: Plus, path: '/billing/create' },
        { name: 'Invoices', icon: FileText, path: '/billing/invoices' },
        { name: 'Settings', icon: Settings, path: '/billing/settings' },
    ],
    patient: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/patient' },
        { name: 'Schedule', icon: Calendar, path: '/patient/appointments' },
        { name: 'My Files', icon: Microscope, path: '/patient/reports' },
        { name: 'Payments', icon: DollarSign, path: '/patient/billing' },
        { name: 'Profile/Security', icon: Settings, path: '/patient/profile' },
    ],
    staff: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/staff' },
        { name: 'Attendance', icon: Calendar, path: '/staff/attendance' },
        { name: 'Shift Roster', icon: Calendar, path: '/staff/roster' },
        { name: 'Medical Assets', icon: Truck, path: '/staff/assets' },
        { name: 'Metrics', icon: TrendingUp, path: '/staff/metrics' },
        { name: 'Settings', icon: Settings, path: '/staff/settings' },
    ]
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-gray-300 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand Section */}
      <div className="p-8 pb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 flex items-center justify-center relative group">
            <img 
              src="/logo.png" 
              alt="HealthRekha Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 items-center justify-center bg-blue-600 text-white font-black text-2xl">
              H
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white leading-none tracking-tight">HealthRekha</span>
             <select className="bg-transparent border-none text-[8px] font-black text-blue-400 uppercase tracking-widest mt-1 outline-none cursor-pointer hover:text-white transition-all">
                <option value="main" className="bg-[#0f172a]">Main Branch (HQ)</option>
                <option value="sub1" className="bg-[#0f172a]">Downtown Clinic</option>
                <option value="sub2" className="bg-[#0f172a]">North Wing Center</option>
            </select>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 text-gray-500 hover:text-white lg:hidden"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-2 sidebar-scroll">
        {currentMenu.map((item, index) => (
          item.type === 'header' ? (
            <div key={index} className="px-4 pt-4 pb-2 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">
              {item.name}
            </div>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} className={location.pathname === item.path ? 'text-white' : 'text-gray-500'} />
              {item.name}
            </Link>
          )
        ))}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 mt-auto border-t border-white/5 bg-black/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all font-semibold text-sm"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
