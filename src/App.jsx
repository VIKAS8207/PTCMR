import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Properties from './pages/Properties';
import Assessment from './pages/Assessment';
import Demand from './pages/Demand';
import Payment from './pages/Payment';
import GISMapping from './pages/GISMapping';
import Mutation from './pages/Mutation';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        
        {/* 1. FORCE REDIRECT: Automatically send users to Login when they open the app */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2. PUBLIC ROUTE: Standalone Login Page */}
        <Route path="/login" element={<Login />} />

        {/* 3. SECURE ROUTES: Now hosted under the "/dashboard" path */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          
          <Route index element={<DashboardHome />} />
          <Route path="properties" element={<Properties />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="demand" element={<Demand />} />
          <Route path="payment" element={<Payment />} />
          <Route path="gis-mapping" element={<GISMapping />} />
          <Route path="mutation" element={<Mutation />} />
          
          <Route path="collection" element={<div className="p-8">Collection Page</div>} />
          <Route path="settings" element={<div className="p-8">Settings Page</div>} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;