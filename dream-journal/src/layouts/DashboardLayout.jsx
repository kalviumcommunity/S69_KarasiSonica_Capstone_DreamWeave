import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/layouts/DashboardNavbar';
import DashboardSidebar from '../components/layouts/DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <DashboardNavbar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* This renders child routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;