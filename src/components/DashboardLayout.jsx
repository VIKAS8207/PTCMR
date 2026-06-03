import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    // 'flex-col' on mobile makes the top-bar stay on top. 'md:flex-row' makes the sidebar side-by-side on desktop.
    <div className="flex flex-col md:flex-row h-screen bg-[#f8fafc] text-gray-900 font-sans overflow-hidden">
      
      {/* Navigation (Handles both Desktop & Mobile internally) */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative w-full">
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-[1600px] mx-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}