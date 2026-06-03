import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  MapPin,
  Crosshair,
  ClipboardCheck,
  Plus, 
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Eye,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';

// Shared Dummy Data for both Map and Table
const propertyData = [
  { id: "S-001-2024", address: "123 Main Street", owner: "Rajesh Kumar", area: "250 m²", demanded: "₹3.4L", collected: "₹3.4L", status: "Paid", x: 25, y: 35 },
  { id: "S-002-2024", address: "456 Business Plaza", owner: "Priya Sharma", area: "500 m²", demanded: "₹10.8L", collected: "₹5.4L", status: "Partial", x: 60, y: 20 },
  { id: "S-003-2024", address: "789 Industrial Zone", owner: "Amit Patel", area: "1,000 m²", demanded: "₹13.0L", collected: "₹0.0L", status: "Overdue", x: 75, y: 65 },
  { id: "S-004-2024", address: "321 Residential Complex", owner: "Sneha Gupta", area: "300 m²", demanded: "₹4.8L", collected: "₹0.0L", status: "Pending", x: 35, y: 70 },
  { id: "S-005-2024", address: "654 Farm Estate", owner: "Harish Singh", area: "2,000 m²", demanded: "₹1.1L", collected: "₹1.1L", status: "Paid", x: 85, y: 40 },
  { id: "S-006-2024", address: "12 Lakeview Drive", owner: "Arun Verma", area: "400 m²", demanded: "₹5.2L", collected: "₹0.0L", status: "Overdue", x: 45, y: 50 },
];

export default function GISMapping() {
  const [isCreating, setIsCreating] = useState(false);
  const [mapFilter, setMapFilter] = useState('All');
  const [activePin, setActivePin] = useState(null);

  const filters = ['All', 'Paid', 'Partial', 'Pending', 'Overdue'];

  // Filter the data based on the selected map filter
  const filteredData = mapFilter === 'All' 
    ? propertyData 
    : propertyData.filter(prop => prop.status === mapFilter);

  // PTCR System input classes
  const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 transition-shadow";
  const labelClass = "block text-[13px] font-medium text-gray-700 mb-1.5";

  return (
    <div className="pb-12">
      
      {/* Main Header Area */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[24px] shadow-md p-6 md:p-8 mb-8 flex flex-col overflow-hidden">
        
        {/* Static Grid Overlay Layer */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 85%)'
          }}
        />

        {/* Top Navigation */}
        <div className="flex justify-between items-start mb-8 z-20 relative">
          <div className="text-white">
            <h1 className="text-3xl font-bold tracking-tight">GIS Mapping & Survey</h1>
            <p className="text-blue-100 mt-1">Live geographic tracking of property statuses and field surveys.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              {isCreating ? <X size={18} /> : <Plus size={18} />}
              {isCreating ? 'Cancel' : 'Record Survey'}
            </button>
          </div>
        </div>

        {/* The Detailed Form */}
        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full bg-white rounded-2xl shadow-2xl mb-8 z-20 relative overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Log Survey Data</h2>
                
                <div className="space-y-6">
                  
                  {/* SECTION 1: GPS Coordinates */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <Crosshair size={18} />
                      <h3 className="font-bold text-sm">GPS coordinates captured</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                      <div>
                        <label className={labelClass}>Latitude</label>
                        <input type="text" className={inputClass} defaultValue="21.2514° N" />
                      </div>
                      <div>
                        <label className={labelClass}>Longitude</label>
                        <input type="text" className={inputClass} defaultValue="81.6296° E" />
                      </div>
                      <div>
                        <label className={labelClass}>Accuracy</label>
                        <input type="text" className={inputClass} defaultValue="±3 m" />
                      </div>
                    </div>

                    {/* Simulated Map View Box */}
                    <div className="w-full bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-6 flex flex-col items-center justify-center text-blue-600 mb-4 transition-colors hover:bg-blue-100/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Map size={20} />
                        <span className="font-semibold text-sm">GIS map view</span>
                        <span className="text-sm text-blue-500">— ward 12, zone C · property boundary marked</span>
                      </div>
                    </div>

                    {/* Verification Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <CheckCircle2 size={14} /> Within ward boundary
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={14} /> No overlap detected
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-white text-gray-600 border border-gray-200 shadow-sm">
                        Satellite layer: active
                      </span>
                    </div>
                  </div>

                  {/* SECTION 2: Field Survey */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <ClipboardCheck size={18} />
                      <h3 className="font-bold text-sm">Field survey — inspector findings</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                      <div>
                        <label className={labelClass}>Surveyor</label>
                        <input type="text" className={inputClass} defaultValue="Insp. D.K. Nayak" />
                      </div>
                      <div>
                        <label className={labelClass}>Survey date</label>
                        <input type="text" className={inputClass} defaultValue="14 Jan 2025" />
                      </div>
                      <div>
                        <label className={labelClass}>Status</label>
                        <div className="flex items-center h-[38px]">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className={labelClass}>Actual usage observed</label>
                        <input type="text" className={inputClass} defaultValue="Residential — confirmed" />
                      </div>
                      <div>
                        <label className={labelClass}>Floor count — on-site</label>
                        <input type="text" className={inputClass} defaultValue="G + 2 (matches record)" />
                      </div>
                      <div>
                        <label className={labelClass}>Unauthorised construction</label>
                        <input type="text" className={inputClass} defaultValue="None" />
                      </div>
                      <div>
                        <label className={labelClass}>Water connection</label>
                        <input type="text" className={inputClass} defaultValue="Municipal — active" />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Inspector remarks</label>
                      <input type="text" className={inputClass} defaultValue="All details match, property in good condition." />
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                      Save Survey Data
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- LIVE INTERACTIVE GIS MAP UI --- */}
        <div className="relative w-full h-[450px] bg-[#eef2f6] rounded-xl border-4 border-white/20 shadow-inner overflow-hidden z-20">
          
          {/* Subtle Map Background Pattern */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%23cbd5e1' stroke-width='2'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23cbd5e1' stroke-width='1'/%3E%3C/svg%3E")`,
                 backgroundSize: '100px 100px'
               }} 
          />

          {/* Map Controls & Filters Overlay */}
          <div className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-200/50">
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-800">
              <Filter size={16} className="text-indigo-600"/> Map Filters
            </div>
            <div className="flex flex-col gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setMapFilter(filter)}
                  className={`text-left px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    mapFilter === filter 
                      ? 'bg-indigo-600 text-white shadow-md pl-4' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 right-4 z-30 bg-white/90 backdrop-blur-md py-2 px-4 rounded-xl shadow-lg border border-gray-200/50 flex gap-4 text-[11px] font-bold text-gray-600">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"/> Paid</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"/> Overdue</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"/> Partial</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"/> Pending</span>
          </div>

          {/* Interactive Map Pins */}
          <AnimatePresence>
            {filteredData.map((prop) => (
              <motion.div
                key={prop.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-20"
                style={{ left: `${prop.x}%`, top: `${prop.y}%` }}
                onMouseEnter={() => setActivePin(prop.id)}
                onMouseLeave={() => setActivePin(null)}
              >
                {/* The Pin Icon */}
                <div className="relative group">
                  <MapPin size={32} className={`drop-shadow-lg transition-transform duration-200 ${getPinColor(prop.status)} ${activePin === prop.id ? 'scale-125' : ''}`} fill="white" />
                  
                  {/* Active Ping Animation */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-ping ${getAccentColor(prop.status)}`} />
                  
                  {/* Tooltip Card */}
                  <AnimatePresence>
                    {activePin === prop.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white p-3 rounded-xl shadow-2xl pointer-events-none z-50"
                      >
                        <p className="font-bold text-sm mb-1">{prop.id}</p>
                        <p className="text-xs text-gray-300 mb-2 truncate">{prop.address}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Demanded:</span>
                          <span className="font-semibold">{prop.demanded}</span>
                        </div>
                        <StatusBadge status={prop.status} className="mt-2 w-full justify-center" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
      </div>

      {/* --- MAIN TABLE CONTENT --- */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header & Search */}
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900 shrink-0">Geotagged Properties List</h2>
          
          <div className="relative shrink-0 w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Survey No or Address..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-shadow"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Survey No</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Owner Name</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Address</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Area (m²)</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Demanded</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Collected</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{row.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.owner}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.address}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.area}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{row.demanded}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{row.collected}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Locate on Map">
                        <MapPin size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Edit Survey">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete Record">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <div>
            Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{filteredData.length}</span> of <span className="font-medium text-gray-900">{filteredData.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronLeft size={16} /> Previous
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white font-medium">1</button>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* --- Helper Functions for Map UI --- */

function getPinColor(status) {
  switch (status) {
    case 'Paid': return 'text-emerald-500';
    case 'Partial': return 'text-orange-500';
    case 'Overdue': return 'text-red-500';
    case 'Pending': return 'text-amber-400';
    default: return 'text-gray-500';
  }
}

function getAccentColor(status) {
  switch (status) {
    case 'Paid': return 'bg-emerald-500';
    case 'Partial': return 'bg-orange-500';
    case 'Overdue': return 'bg-red-500';
    case 'Pending': return 'bg-amber-400';
    default: return 'bg-gray-500';
  }
}

// Standard PTCR Status Badge
function StatusBadge({ status, className = "" }) {
  switch (status) {
    case 'Paid':
      return <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700 w-fit ${className}`}>Paid</span>;
    case 'Partial':
      return <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-700 w-fit ${className}`}>Partial</span>;
    case 'Overdue':
      return <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700 w-fit ${className}`}>Overdue</span>;
    case 'Pending':
      return <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700 w-fit ${className}`}>Pending</span>;
    default:
      return <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700 w-fit ${className}`}>{status}</span>;
  }
}