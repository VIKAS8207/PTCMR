import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileEdit, 
  Users, 
  CheckCircle2, 
  Clock, 
  Plus, 
  X,
  MoreVertical,
  Search,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  ArrowRightLeft,
  Info,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

// Dummy data matching the Mutations table image exactly
const tableData = [
  { id: "MUT001", property: "S-001-2024", type: "Transfer", oldOwner: "Rajesh Kumar", newOwner: "Vikram Singh", date: "3/1/2024", status: "completed" },
  { id: "MUT002", property: "S-002-2024", type: "Partition", oldOwner: "Priya Sharma", newOwner: "Priya Sharma & Co.", date: "4/1/2024", status: "under review" },
  // Adding a few more for demonstration
  { id: "MUT003", property: "S-089-2024", type: "Inheritance", oldOwner: "Late SK Das", newOwner: "Rahul Das", date: "5/12/2024", status: "pending" },
  { id: "MUT004", property: "S-112-2024", type: "Gift", oldOwner: "Amit Patel", newOwner: "Neha Patel", date: "5/20/2024", status: "approved" },
];

export default function Mutation() {
  const [isCreating, setIsCreating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'pending', 'under review', 'approved', 'rejected', 'completed'];

  // PTCR System input classes
  const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 transition-shadow";
  const labelClass = "block text-[13px] font-medium text-gray-700 mb-1.5";

  return (
    <div className="pb-12">
      
      {/* Main Header Area (Static layout to prevent grid jitter) */}
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
            <h1 className="text-3xl font-bold tracking-tight">Property Mutations</h1>
            <p className="text-blue-100 mt-1">Manage property ownership transfers, partitions, and updates.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              {isCreating ? <X size={18} /> : <Plus size={18} />}
              {isCreating ? 'Cancel' : 'New Mutation'}
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
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">New Mutation Request</h2>
                
                <div className="space-y-6">
                  
                  {/* SECTION 1: Mutation Details */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <FileEdit size={18} />
                      <h3 className="font-bold text-sm">Mutation Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                      <div>
                        <label className={labelClass}>Mutation ID</label>
                        <input type="text" className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`} value="MUT089 (Auto-generated)" readOnly />
                      </div>
                      <div>
                        <label className={labelClass}>Property ID</label>
                        <input type="text" className={inputClass} placeholder="e.g., S-001-2024" />
                      </div>
                      <div>
                        <label className={labelClass}>Mutation Type</label>
                        <select className={inputClass} defaultValue="Transfer">
                          <option>Transfer (Sale)</option>
                          <option>Partition</option>
                          <option>Inheritance / Will</option>
                          <option>Gift Deed</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Transfer/Execution Date</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="date" className={`${inputClass} pl-10`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Ownership Transfer */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <ArrowRightLeft size={18} />
                      <h3 className="font-bold text-sm">Ownership Transfer</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Old Owner */}
                      <div className="p-4 border border-gray-200 bg-white rounded-lg">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Current / Old Owner</span>
                        <div className="space-y-4">
                          <div>
                            <label className={labelClass}>Full Name</label>
                            <input type="text" className={`${inputClass} bg-gray-50`} placeholder="Auto-filled from Property ID" readOnly />
                          </div>
                          <div>
                            <label className={labelClass}>Contact Info</label>
                            <input type="text" className={`${inputClass} bg-gray-50`} placeholder="Auto-filled from Property ID" readOnly />
                          </div>
                        </div>
                      </div>

                      {/* New Owner */}
                      <div className="p-4 border border-blue-200 bg-blue-50/30 rounded-lg">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 block">New Owner / Transferee</span>
                        <div className="space-y-4">
                          <div>
                            <label className={labelClass}>Full Name</label>
                            <input type="text" className={inputClass} placeholder="Enter new owner's name" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className={labelClass}>Mobile Number</label>
                              <input type="text" className={inputClass} placeholder="+91" />
                            </div>
                            <div>
                              <label className={labelClass}>Aadhaar/ID No.</label>
                              <input type="text" className={inputClass} placeholder="XXXX-XXXX-XXXX" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Documents Checklist */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 text-indigo-700">
                        <FileText size={18} />
                        <h3 className="font-bold text-sm">Supporting Documents</h3>
                      </div>
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                        Verification Required
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Registered Sale Deed / Title Document</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-700">NOC from Old Owner (if applicable)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Identity Proof of New Owner</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Updated Tax Receipt (No Dues)</span>
                      </div>
                    </div>

                    {/* Info Alert */}
                    <div className="mt-4 flex gap-2 bg-blue-50 border border-blue-100 text-blue-700 p-3 rounded-lg text-sm">
                      <Info size={16} className="shrink-0 mt-0.5" />
                      <p>Mutation requests require clearance of all pending tax arrears. Ensure "No Dues" status before submitting.</p>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                      Submit Mutation Request
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 z-20 relative">
          <StatCard 
            icon={<FileEdit className="text-blue-500" size={24} />} 
            title="Total Requests" value="842" trend="+12" trendText="this month" trendColor="text-blue-500" 
          />
          <StatCard 
            icon={<Clock className="text-amber-500" size={24} />} 
            title="Under Review" value="45" trend="8" trendText="pending action" trendColor="text-red-500" 
          />
          <StatCard 
            icon={<CheckCircle2 className="text-purple-500" size={24} />} 
            title="Completed" value="780" trend="92%" trendText="clearance rate" trendColor="text-emerald-500" 
          />
          <StatCard 
            icon={<ShieldCheck className="text-emerald-500" size={24} />} 
            title="Avg. Process Time" value="4 Days" trend="-1.2" trendText="days vs last year" trendColor="text-emerald-500" 
          />
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header & Filters */}
        <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Title & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <h2 className="text-xl font-bold text-gray-900 shrink-0">Mutations</h2>
            <div className="flex flex-wrap items-center gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === filter 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Search */}
          <div className="relative shrink-0 w-full xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search mutations..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-shadow"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Mutation ID</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Property</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Type</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Old Owner</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">New Owner</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Transfer Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{row.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.property}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.type}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.oldOwner}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{row.newOwner}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.date}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={row.status} />
                  </td>
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
            Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">4</span> of <span className="font-medium text-gray-900">842</span> results
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
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 font-medium transition-colors">85</button>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-white transition-colors">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* --- Reusable UI Sub-components --- */

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

// Status Badge matching the exact image styles
function StatusBadge({ status }) {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-purple-100 text-purple-700">
          completed
        </span>
      );
    case 'under review':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700">
          under review
        </span>
      );
    case 'approved':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">
          approved
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700">
          pending
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700">
          rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700">
          {status}
        </span>
      );
  }
}