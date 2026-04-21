import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminAppointments from './pages/AdminAppointments';
import AdminBilling from './pages/AdminBilling';
import AdminPharmacy from './pages/AdminPharmacy';
import AdminLab from './pages/AdminLab';
import AdminBeds from './pages/AdminBeds';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import AdminAssets from './pages/AdminAssets';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorPatients from './pages/DoctorPatients';
import PatientHistory from './pages/PatientHistory';
import DoctorPrescriptions from './pages/DoctorPrescriptions';
import DoctorReports from './pages/DoctorReports';
import PharmacyDashboard from './pages/PharmacyDashboard';
import PharmacyInventory from './pages/PharmacyInventory';
import PharmacyBilling from './pages/PharmacyBilling';
import PharmacyPurchases from './pages/PharmacyPurchases';
import PharmacyReports from './pages/PharmacyReports';
import PharmacyAlerts from './pages/PharmacyAlerts';
import LabDashboard from './pages/LabDashboard';
import LabTests from './pages/LabTests';
import LabBookings from './pages/LabBookings';
import LabReports from './pages/LabReports';
import LabAnalytics from './pages/LabAnalytics';
import WardDashboard from './pages/WardDashboard';
import WardBeds from './pages/WardBeds';
import WardAdmissions from './pages/WardAdmissions';
import WardDischarge from './pages/WardDischarge';
import WardAnalytics from './pages/WardAnalytics';
import BillingDashboard from './pages/BillingDashboard';
import BillingCreate from './pages/BillingCreate';
import BillingPayments from './pages/BillingPayments';
import BillingInvoices from './pages/BillingInvoices';
import BillingReports from './pages/BillingReports';
import PatientDashboard from './pages/PatientDashboard';
import PatientAppointments from './pages/PatientAppointments';
import PatientRecords from './pages/PatientRecords';
import PatientReports from './pages/PatientReports';
import PatientPrescriptions from './pages/PatientPrescriptions';
import PatientBilling from './pages/PatientBilling';
import PatientProfile from './pages/PatientProfile';
import PatientSupport from './pages/PatientSupport';
import StaffDashboard from './pages/StaffDashboard';
import ProfileSettings from './pages/ProfileSettings';
import StaffAttendance from './pages/StaffAttendance';
import StaffRoster from './pages/StaffRoster';
import StaffMetrics from './pages/StaffMetrics';
import Telemedicine from './pages/Telemedicine';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

const AppContent = () => {
    const { user } = useAuth();
    return (
        <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${user.role}`} />} />

          {/* Root Redirect */}
          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/admin" />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/appointments" element={<AdminAppointments />} />
                  <Route path="/billing" element={<AdminBilling />} />
                  <Route path="/pharmacy" element={<AdminPharmacy />} />
                  <Route path="/lab" element={<AdminLab />} />
                  <Route path="/beds" element={<AdminBeds />} />
                  <Route path="/reports" element={<AdminReports />} />
                  <Route path="/settings" element={<AdminSettings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Doctor Routes */}
          <Route path="/doctor/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<DoctorDashboard />} />
                  <Route path="/appointments" element={<DoctorAppointments />} />
                  <Route path="/patients" element={<DoctorPatients />} />
                  <Route path="/patients/:id/history" element={<PatientHistory />} />
                  <Route path="/telemedicine" element={<Telemedicine />} />
                  <Route path="/prescriptions" element={<DoctorPrescriptions />} />
                  <Route path="/reports" element={<DoctorReports />} />
                  <Route path="/settings" element={<ProfileSettings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Pharmacy Routes */}
          <Route path="/pharmacy/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<PharmacyDashboard />} />
                  <Route path="/inventory" element={<PharmacyInventory />} />
                  <Route path="/billing" element={<PharmacyBilling />} />
                  <Route path="/purchases" element={<PharmacyPurchases />} />
                  <Route path="/reports" element={<PharmacyReports />} />
                  <Route path="/alerts" element={<PharmacyAlerts />} />
                  <Route path="/settings" element={<ProfileSettings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Lab Routes */}
          <Route path="/lab/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<LabDashboard />} />
                  <Route path="/tests" element={<LabTests />} />
                  <Route path="/bookings" element={<LabBookings />} />
                  <Route path="/reports" element={<LabReports />} />
                  <Route path="/analytics" element={<LabAnalytics />} />
                  <Route path="/settings" element={<ProfileSettings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Ward Routes */}
          <Route path="/ward/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<WardDashboard />} />
                  <Route path="/beds" element={<WardBeds />} />
                  <Route path="/admissions" element={<WardAdmissions />} />
                  <Route path="/discharge" element={<WardDischarge />} />
                  <Route path="/analytics" element={<WardAnalytics />} />
                  <Route path="/assets" element={<AdminAssets />} />
                  <Route path="/roster" element={<StaffRoster />} />
                  <Route path="/settings" element={<ProfileSettings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Billing Routes */}
          <Route path="/billing/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<BillingDashboard />} />
                  <Route path="/create" element={<BillingCreate />} />
                  <Route path="/payments" element={<BillingPayments />} />
                  <Route path="/invoices" element={<BillingInvoices />} />
                  <Route path="/reports" element={<BillingReports />} />
                  <Route path="/settings" element={<ProfileSettings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Patient Routes */}
          <Route path="/patient/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<PatientDashboard />} />
                  <Route path="/appointments" element={<PatientAppointments />} />
                  <Route path="/records" element={<PatientRecords />} />
                  <Route path="/reports" element={<PatientReports />} />
                  <Route path="/prescriptions" element={<PatientPrescriptions />} />
                  <Route path="/billing" element={<PatientBilling />} />
                  <Route path="/profile" element={<PatientProfile />} />
                  <Route path="/support" element={<PatientSupport />} />
                  <Route path="/settings" element={<ProfileSettings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Staff Routes */}
          <Route path="/staff/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<StaffDashboard />} />
                  <Route path="/attendance" element={<StaffAttendance />} />
                  <Route path="/roster" element={<StaffRoster />} />
                  <Route path="/metrics" element={<StaffMetrics />} />
                  <Route path="/assets" element={<AdminAssets />} />
                  <Route path="/settings" element={<ProfileSettings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <NotificationProvider>
                <AppContent />
            </NotificationProvider>
        </AuthProvider>
    );
};

export default App;
