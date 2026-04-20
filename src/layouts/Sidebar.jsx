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
  DollarSign
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = {
    admin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'User Management', icon: Users, path: '/admin/users' },
      { name: 'Appointments', icon: Calendar, path: '/admin/appointments' },
      { name: 'Revenue/Billing', icon: DollarSign, path: '/admin/billing' },
      { name: 'Pharmacy Stock', icon: Pill, path: '/admin/pharmacy' },
      { name: 'Lab Diagnostics', icon: Microscope, path: '/admin/lab' },
      { name: 'Ward/Beds', icon: Bed, path: '/admin/beds' },
      { name: 'Analytics Reports', icon: TrendingUp, path: '/admin/reports' },
      { name: 'Admin Settings', icon: Settings, path: '/admin/settings' },
    ],
    doctor: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/doctor' },
        { name: 'Appointments', icon: Calendar, path: '/doctor/appointments' },
        { name: 'Patient Records', icon: Users, path: '/doctor/patients' },
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
        { name: 'Metrics', icon: TrendingUp, path: '/staff/metrics' },
        { name: 'Settings', icon: Settings, path: '/staff/settings' },
    ]
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div className="w-64 bg-[#0f172a] text-gray-300 h-screen flex flex-col shadow-2xl relative z-20">
      {/* Brand Section */}
      <div className="p-8 pb-10 flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg text-white">
          <Stethoscope size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white leading-none tracking-tight">HealthRekha</span>
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">Hospital ERP</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-2 scrollbar-hide">
        {currentMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
              location.pathname === item.path 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={18} className={location.pathname === item.path ? 'text-white' : 'text-gray-500'} />
            {item.name}
          </Link>
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
