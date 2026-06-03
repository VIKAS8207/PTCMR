import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Home, 
  Wallet, 
  Plus, 
  X,
  MoreVertical,
  Search,
  Eye,
  Edit,
  Trash2,
  IdCard,
  Map,
  Info,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Dummy data
const tableData = [
  { id: "S-001-2024", owner: "Rajesh Kumar", address: "123 Main Street", type: "Residential", area: "250", value: "₹50.0L" },
  { id: "S-002-2024", owner: "Priya Sharma", address: "456 Business Plaza", type: "Commercial", area: "500", value: "₹150.0L" },
  { id: "S-003-2024", owner: "Amit Patel", address: "789 Industrial Zone", type: "Industrial", area: "1,000", value: "₹250.0L" },
  { id: "S-004-2024", owner: "Sneha Gupta", address: "321 Residential Complex", type: "Residential", area: "300", value: "₹75.0L" },
  { id: "S-005-2024", owner: "Harish Singh", address: "654 Farm Estate", type: "Agricultural", area: "2,000", value: "₹30.0L" },
];

export default function Properties() {
  const [isCreating, setIsCreating] = useState(false);

  // Reusable input class for a thin, professional look
  const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 transition-shadow";
  const labelClass = "block text-[13px] font-medium text-gray-700 mb-1.5";

  return (
    <div className="pb-12">
      
      {/* Main Header Area (Layout prop removed to fix grid jitter) */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[24px] shadow-md p-6 md:p-8 mb-8 flex flex-col overflow-hidden">
        
        {/* Static Grid Overlay Layer (Now anchored securely) */}
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
            <h1 className="text-3xl font-bold tracking-tight">Property Directory</h1>
            <p className="text-blue-100 mt-1">Manage all registered properties and assessments.</p>
          </div>
          
          <div className="flex items-center">
            {/* Button without layout animations, Bell removed */}
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              {isCreating ? <X size={18} /> : <Plus size={18} />}
              {isCreating ? 'Cancel' : 'Add Property'}
            </button>
          </div>
        </div>

        {/* The Form */}
        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full bg-white rounded-2xl shadow-2xl mb-8 z-20 relative overflow-hidden"
            >
              {/* Padding moved to a wrapper inside motion.div to prevent height calculation glitches */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">New Property Registration</h2>
                
                <div className="space-y-6">
                  {/* SECTION 1: Property Identification */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <IdCard size={18} />
                      <h3 className="font-bold text-sm">Property identification</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>UPIN (auto-generated)</label>
                        <input type="text" className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`} value="UPIN-2024-RJP-00487" readOnly />
                      </div>
                      <div>
                        <label className={labelClass}>Ward / Zone</label>
                        <input type="text" className={inputClass} placeholder="Ward 12 / Zone C" />
                      </div>
                      <div>
                        <label className={labelClass}>Door / Plot number</label>
                        <input type="text" className={inputClass} placeholder="14-B, Indira Nagar" />
                      </div>
                      <div>
                        <label className={labelClass}>Street / Locality</label>
                        <input type="text" className={inputClass} placeholder="MG Road Extension" />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Building & usage */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <Home size={18} />
                      <h3 className="font-bold text-sm">Building & usage</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>Usage type</label>
                        <select className={inputClass}>
                          <option>Residential</option>
                          <option>Commercial</option>
                          <option>Industrial</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Occupancy</label>
                        <select className={inputClass}>
                          <option>Self-occupied</option>
                          <option>Tenanted</option>
                          <option>Vacant</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Construction type</label>
                        <select className={inputClass}>
                          <option>RCC / Pucca</option>
                          <option>Semi-Pucca</option>
                          <option>Kutcha</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Number of floors</label>
                        <input type="text" className={inputClass} placeholder="G + 2 (3 floors)" />
                      </div>
                      <div>
                        <label className={labelClass}>Year of construction</label>
                        <input type="number" className={inputClass} placeholder="2012" />
                      </div>
                      <div>
                        <label className={labelClass}>Plot area (sq. m)</label>
                        <input type="number" className={inputClass} placeholder="180" />
                      </div>

                      <div>
                        <label className={labelClass}>Built-up area — Ground floor (sq. m)</label>
                        <input type="number" className={inputClass} placeholder="120" />
                      </div>
                      <div>
                        <label className={labelClass}>Built-up area — Floor 1 (sq. m)</label>
                        <input type="number" className={inputClass} placeholder="120" />
                      </div>
                      <div>
                        <label className={labelClass}>Built-up area — Floor 2 (sq. m)</label>
                        <input type="number" className={inputClass} placeholder="80" />
                      </div>
                    </div>
                    
                    {/* Info Alert */}
                    <div className="mt-5 flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 p-3 rounded-lg text-sm">
                      <Info size={16} className="shrink-0" />
                      <p>Total built-up area: <span className="font-bold">320 sq. m</span> — each floor assessed separately for multi-floor properties</p>
                    </div>
                  </div>

                  {/* SECTION 3: Location classification */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 text-indigo-700">
                        <Map size={18} />
                        <h3 className="font-bold text-sm">Location classification</h3>
                      </div>
                      <span className="text-[11px] font-bold bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full">
                        Affects tax rate
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Location zone</label>
                        <select className={inputClass}>
                          <option>Zone C — Semi-urban periphery</option>
                          <option>Zone A — Core city</option>
                          <option>Zone B — Urban</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Special area type</label>
                        <select className={inputClass}>
                          <option>None</option>
                          <option>Notified Slum</option>
                          <option>Rural</option>
                        </select>
                      </div>
                    </div>

                    {/* Warning Alert */}
                    <div className="mt-5 flex gap-2 bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-sm">
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                      <p>Zone A (core city) attracts full rate. Zone C gets 15% location rebate on base tax. Special zones (tribal / rural / notified slum) get up to 40% rebate.</p>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                      Save Property Assessment
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Stats Row */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 z-20 relative">
          <StatCard 
            icon={<Building2 className="text-blue-500" size={24} />} 
            title="Total Properties" value="1,248" trend="+24" trendText="this month" trendColor="text-blue-500" 
          />
          <StatCard 
            icon={<Home className="text-emerald-500" size={24} />} 
            title="Residential" value="892" trend="72%" trendText="of total" trendColor="text-gray-400" 
          />
          <StatCard 
            icon={<MapPin className="text-purple-500" size={24} />} 
            title="Commercial" value="214" trend="18%" trendText="of total" trendColor="text-gray-400" 
          />
          <StatCard 
            icon={<Wallet className="text-orange-500" size={24} />} 
            title="Total Valuation" value="₹45.2Cr" trend="+1.2%" trendText="vs last year" trendColor="text-emerald-500" 
          />
        </motion.div>
      </div>

      {/* Main Table Content */}
      <motion.div layout className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header & Search */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Registered Properties</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition-shadow"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Survey No</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Owner Name</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Address</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Type</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Area (m²)</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Value</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{row.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.owner}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.address}</td>
                  <td className="py-4 px-6">
                    <TypeBadge type={row.type} />
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.area}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{row.value}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
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
            Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">5</span> of <span className="font-medium text-gray-900">1,248</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronLeft size={16} /> Previous
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 font-medium transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 font-medium transition-colors">3</button>
              <span>...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 font-medium transition-colors">250</button>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-white transition-colors">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

/* --- Sub-components --- */

function StatCard({ icon, title, value, trend, trendText, trendColor }) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
      </div>
      <p className="text-[40px] font-bold text-gray-900 leading-none">{value}</p>
      <div className="mt-3 text-sm flex items-center font-medium">
        <span className={trendColor}>{trend}</span>
        <span className="text-gray-400 ml-1.5">{trendText}</span>
      </div>
    </div>
  );
}

// Badge Component to match the exact colors in your image
function TypeBadge({ type }) {
  const styles = {
    Residential: "bg-blue-100 text-blue-700",
    Commercial: "bg-purple-100 text-purple-700",
    Industrial: "bg-orange-100 text-orange-700",
    Agricultural: "bg-emerald-100 text-emerald-700"
  };

  return (
    <span className={`px-3 py-1.5 rounded-md text-xs font-bold ${styles[type] || 'bg-gray-100 text-gray-700'}`}>
      {type}
    </span>
  );
}