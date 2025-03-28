import { NavLink } from 'react-router-dom';

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <nav className="mt-8">
          <NavLink 
            to="/dashboard/dreams" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`
            }
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            My Dreams
          </NavLink>
          
          <NavLink 
            to="/dashboard/analytics" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 mt-2 rounded-lg ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`
            }
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;