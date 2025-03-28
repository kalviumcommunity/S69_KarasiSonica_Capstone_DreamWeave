import { Outlet } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

const DashboardWrapper = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet /> {/* This renders DreamsPage or AnalyticsPage */}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardWrapper;