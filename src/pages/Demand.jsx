import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileWarning, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  X,
  MoreVertical,
  Search,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  IndianRupee,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Dummy data matching the Demand table image exactly
const tableData = [
  { id: "DMD/2024/001", property: "S-001-2024", owner: "Rajesh Kumar", year: "2024", amount: "₹3.4L", paid: "₹3.4L", dueDate: "6/30/2024", status: "paid" },
  { id: "DMD/2024/002", property: "S-002-2024", owner: "Priya Sharma", year: "2024", amount: "₹10.8L", paid: "₹5.4L", dueDate: "6/30/2024", status: "partial" },
  { id: "DMD/2024/003", property: "S-003-2024", owner: "Amit Patel", year: "2024", amount: "₹13.0L", paid: "₹0.0L", dueDate: "6/30/2024", status: "overdue" },
  { id: "DMD/2024/004", property: "S-004-2024", owner: "Sneha Gupta", year: "2024", amount: "₹4.8L", paid: "₹0.0L", dueDate: "7/15/2024", status: "issued" },
  { id: "DMD/2024/005", property: "S-005-2024", owner: "Harish Singh", year: "2024", amount: "₹1.1L", paid: "₹1.1L", dueDate: "6/30/2024", status: "paid" },
];

export default function Demand() {
  const [isCreating, setIsCreating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'pending', 'issued', 'paid', 'partial', 'overdue'];

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
            <h1 className="text-3xl font-bold tracking-tight">Demand Notices</h1>
            <p className="text-blue-100 mt-1">Generate and track property tax demand notices and arrears.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              {isCreating ? <X size={18} /> : <Plus size={18} />}
              {isCreating ? 'Cancel' : 'Generate Demand'}
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
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Generate New Demand Notice</h2>
                
                <div className="space-y-6">
                  
                  {/* SECTION 1: Property Identification */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <FileText size={18} />
                      <h3 className="font-bold text-sm">Demand Identification</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Demand No (Auto-generated)</label>
                        <input type="text" className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`} value="DMD/2024/006" readOnly />
                      </div>
                      <div>
                        <label className={labelClass}>Financial Year</label>
                        <select className={inputClass} defaultValue="2024">
                          <option>2023</option>
                          <option>2024</option>
                          <option>2025</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Property ID</label>
                        <input type="text" className={inputClass} placeholder="Enter Survey No (e.g., S-001-2024)" />
                      </div>
                      <div>
                        <label className={labelClass}>Owner Name</label>
                        <input type="text" className={`${inputClass} bg-gray-50`} placeholder="Auto-filled from Property ID" readOnly />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Financial Details */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <IndianRupee size={18} />
                      <h3 className="font-bold text-sm">Financial Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>Current Tax Amount</label>
                        <input type="number" className={inputClass} placeholder="0.00" />
                      </div>
                      <div>
                        <label className={labelClass}>Previous Arrears</label>
                        <input type="number" className={inputClass} placeholder="0.00" />
                      </div>
                      <div>
                        <label className={labelClass}>Penalty / Interest</label>
                        <input type="number" className={inputClass} placeholder="0.00" />
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Total Demand Amount</label>
                        <input type="text" className={`${inputClass} font-bold text-lg text-indigo-700 bg-indigo-50`} placeholder="₹0.00" readOnly />
                      </div>
                      <div>
                        <label className={labelClass}>Due Date</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="date" className={`${inputClass} pl-10`} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Info Alert */}
                    <div className="mt-5 flex gap-2 bg-blue-50 border border-blue-100 text-blue-700 p-3 rounded-lg text-sm">
                      <Info size={16} className="shrink-0 mt-0.5" />
                      <p>Generating a demand will automatically issue an SMS and Email notification to the registered owner.</p>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                      Generate & Issue Demand
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
            icon={<FileWarning className="text-blue-500" size={24} />} 
            title="Total Demands" value="₹45.2Cr" trend="1,248" trendText="total issued" trendColor="text-gray-400" 
          />
          <StatCard 
            icon={<CheckCircle2 className="text-emerald-500" size={24} />} 
            title="Collected" value="₹32.1Cr" trend="71%" trendText="collection rate" trendColor="text-emerald-500" 
          />
          <StatCard 
            icon={<Clock className="text-amber-500" size={24} />} 
            title="Pending/Issued" value="₹8.5Cr" trend="420" trendText="notices active" trendColor="text-gray-400" 
          />
          <StatCard 
            icon={<AlertCircle className="text-red-500" size={24} />} 
            title="Overdue Arrears" value="₹4.6Cr" trend="+12%" trendText="vs last year" trendColor="text-red-500" 
          />
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header & Filters */}
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Title & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <h2 className="text-xl font-bold text-gray-900 shrink-0">Demands</h2>
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
          <div className="relative shrink-0 w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search demands..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-shadow"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Demand No</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Property</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Owner</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Year</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Amount</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Paid</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Due Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row, index) => {
                const isOverdue = row.status === 'overdue';
                return (
                  <tr key={index} className={`transition-colors group ${isOverdue ? 'bg-red-50/50 hover:bg-red-50/80' : 'hover:bg-gray-50/80'}`}>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{row.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{row.property}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{row.owner}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{row.year}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">{row.amount}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{row.paid}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{row.dueDate}</td>
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
                );
              })}
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

function StatusBadge({ status }) {
  switch (status) {
    case 'paid':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
          paid
        </span>
      );
    case 'partial':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
          partial
        </span>
      );
    case 'issued':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
          issued
        </span>
      );
    case 'overdue':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700 border border-red-200">
          <AlertCircle size={14} /> overdue
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
          {status}
        </span>
      );
  }
}