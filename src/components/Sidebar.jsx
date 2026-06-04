import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  ChevronDown, 
  Users, 
  Menu, 
  X, 
  LogOut,
  Building2,
  ClipboardList,
  FileWarning,
  CreditCard,
  Wallet,
  Map,
  FileEdit,
  BarChart3
} from 'lucide-react';

export default function Sidebar() {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Automatically close mobile menu when a route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Reusable Gradient Text Class
  const gradientText = "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent";

  // --- Reusable Navigation Item Component ---
  // Added the "end" prop so the main Dashboard link doesn't stay highlighted when you visit sub-pages
  const NavItem = ({ to, icon: Icon, label, end = false }) => (
    <NavLink 
      to={to} 
      end={end}
      className={({ isActive }) => 
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
          isActive 
            ? 'bg-white shadow-sm font-bold' 
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200 font-medium'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={20} className={isActive ? "text-blue-600" : ""} />
          <span className={isActive ? gradientText : ""}>{label}</span>
        </>
      )}
    </NavLink>
  );

  // --- Shared Navigation Content ---
  const NavContent = () => (
    <>
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        
        {/* All routes now properly point to /dashboard/... */}
        <NavItem to="/dashboard" end icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/dashboard/properties" icon={Building2} label="Properties" />
        <NavItem to="/dashboard/assessment" icon={ClipboardList} label="Assessment" />
        <NavItem to="/dashboard/demand" icon={FileWarning} label="Demand" />
        <NavItem to="/dashboard/payment" icon={CreditCard} label="Payment" />
        <NavItem to="/dashboard/collection" icon={Wallet} label="Collection" />
        <NavItem to="/dashboard/gis-mapping" icon={Map} label="GIS Mapping" />
        <NavItem to="/dashboard/mutation" icon={FileEdit} label="Mutation" />

        {/* Reports Dropdown Menu */}
        <div className="pt-1">
          <button 
            onClick={() => setIsReportsOpen(!isReportsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-medium ${
              isReportsOpen ? 'text-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 size={20} />
              <span className={isReportsOpen ? gradientText : ""}>Reports</span>
            </div>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isReportsOpen ? 'rotate-180 text-blue-600' : ''}`} />
          </button>
          
          <div className={`grid transition-all duration-300 ease-in-out ${isReportsOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="pl-11 pr-3 py-1 space-y-1">
                <NavLink to="/dashboard/reports/daily" className={({ isActive }) => `block py-2 text-sm font-medium transition-colors ${isActive ? gradientText : 'text-gray-500 hover:text-blue-600'}`}>Daily Collection</NavLink>
                <NavLink to="/dashboard/reports/defaulters" className={({ isActive }) => `block py-2 text-sm font-medium transition-colors ${isActive ? gradientText : 'text-gray-500 hover:text-blue-600'}`}>Defaulters List</NavLink>
                <NavLink to="/dashboard/reports/tax" className={({ isActive }) => `block py-2 text-sm font-medium transition-colors ${isActive ? gradientText : 'text-gray-500 hover:text-blue-600'}`}>Tax Assessment</NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Users Dropdown Menu */}
        <div className="pt-1">
          <button 
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-medium ${
              isUsersOpen ? 'text-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span className={isUsersOpen ? gradientText : ""}>Users</span>
            </div>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isUsersOpen ? 'rotate-180 text-blue-600' : ''}`} />
          </button>
          
          <div className={`grid transition-all duration-300 ease-in-out ${isUsersOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="pl-11 pr-3 py-1 space-y-1">
                <NavLink to="/dashboard/users/list" className={({ isActive }) => `block py-2 text-sm font-medium transition-colors ${isActive ? gradientText : 'text-gray-500 hover:text-blue-600'}`}>User List</NavLink>
                <NavLink to="/dashboard/users/roles" className={({ isActive }) => `block py-2 text-sm font-medium transition-colors ${isActive ? gradientText : 'text-gray-500 hover:text-blue-600'}`}>Roles</NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 mt-auto">
        <NavItem to="/dashboard/settings" icon={Settings} label="Settings" />

        {/* User Profile */}
        <div className="flex items-center justify-between mt-6 px-3 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              S
            </div>
            <div className="flex flex-col truncate">
              <span className={`text-sm font-bold leading-tight truncate ${gradientText}`}>Sohan T.</span>
              <span className="text-[11px] text-gray-500 font-medium mt-0.5 truncate">Administrator</span>
            </div>
          </div>
          <button 
            onClick={() => {
              // Destroy the auth token
              localStorage.removeItem('ptcr_auth_token');
              // Send them to the login page
              navigate('/login');
            }}
            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50 shrink-0" 
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-[280px] h-screen bg-gray-100 border-r border-gray-200 flex-col shrink-0">
        <div className="h-24 flex items-center gap-3 px-8 border-b border-gray-200/50">
          {/* Logo Container */}
          <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
            <span className={`text-sm font-bold ${gradientText} ${/* Fallback if no image */ ''}`}>PT</span>
          </div>
          <span className={`text-3xl font-black tracking-tighter ${gradientText}`}>PTCR</span>
        </div>
        <NavContent />
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-4 w-full z-40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white border-2 border-gray-100 shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
            <span className={`text-xs font-bold ${gradientText}`}>PT</span>
          </div>
          <span className={`text-2xl font-black tracking-tighter ${gradientText}`}>PTCR</span>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-gray-600 hover:text-blue-600 transition-colors p-2 bg-gray-50 rounded-lg border border-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE SLIDE-OVER DRAWER */}
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`fixed inset-y-0 right-0 w-[300px] bg-gray-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              <span className={`text-xs font-bold ${gradientText}`}>PT</span>
            </div>
            <span className={`text-xl font-bold ${gradientText}`}>Menu</span>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-400 hover:text-gray-900 p-2 bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <NavContent />
      </div>
    </>
  );
}