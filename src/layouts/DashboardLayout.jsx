import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useLocation } from 'react-router-dom';
import { Bell, Search, User, X, Clock, AlertCircle } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { alerts, unreadCount, markAsRead, clearAlerts } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Determine role based on URL for testing/demo
  let currentRole = user?.role || 'admin';
  if (pathname.startsWith('/doctor')) currentRole = 'doctor';
  if (pathname.startsWith('/staff')) currentRole = 'staff';
  if (pathname.startsWith('/pharmacy')) currentRole = 'pharmacy';
  if (pathname.startsWith('/lab')) currentRole = 'lab';
  if (pathname.startsWith('/ward')) currentRole = 'ward';
  if (pathname.startsWith('/billing')) currentRole = 'billing';
  if (pathname.startsWith('/patient')) currentRole = 'patient';

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden">
      <Sidebar role={currentRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shadow-sm relative z-30 shrink-0">
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-400">
                <Search size={16} />
                <input type="text" placeholder="Global system search..." className="bg-transparent border-none outline-none text-xs font-medium text-gray-600 w-64" />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
                <button 
                    onClick={() => {
                        setShowNotifications(!showNotifications);
                        if (!showNotifications) markAsRead();
                    }}
                    className="p-3 text-gray-400 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all relative"
                >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-red-600 text-[10px] flex items-center justify-center text-white rounded-full border-2 border-white font-bold animate-bounce">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200 z-50">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Active Alerts</h3>
                            <button onClick={clearAlerts} className="text-[9px] font-bold text-blue-600 uppercase hover:underline">Clear Logs</button>
                        </div>
                        <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                            {alerts.length === 0 ? (
                                <div className="p-10 text-center text-gray-400">
                                    <Bell className="mx-auto mb-2 opacity-10" size={32} />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">No terminal alerts</p>
                                </div>
                            ) : (
                                alerts.map((alert) => (
                                    <div key={alert.id} className="p-4 hover:bg-gray-50/50 transition-colors cursor-pointer group">
                                        <div className="flex gap-3">
                                            <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                                alert.priority === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                                <AlertCircle size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate">{alert.type} Broadcast</span>
                                                    <span className="text-[8px] font-mono text-gray-400 flex items-center gap-1"><Clock size={10}/> {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>
                                                <p className="text-[11px] font-bold text-gray-700 leading-snug group-hover:text-blue-600 transition-colors uppercase tracking-tight">{alert.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="h-8 w-px bg-gray-100 mx-1" />
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-gray-900">{user?.name}</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">{currentRole}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-100 uppercase">
                    {user?.name?.[0]}
                </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main - Applied scrollbar-hide to remove scroll icon/bar */}
        <main className="flex-1 overflow-y-auto p-4 pt-2 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
