import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Wallet,
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  X,
  MoreVertical,
  Search,
  Eye,
  Download,
  Printer,
  FileText,
  Calendar,
  IndianRupee,
  Info,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Banknote
} from 'lucide-react';

// Dummy data matching the Payment Records table image
const tableData = [
  { id: "RCP/2024/001", property: "S-001-2024", owner: "Rajesh Kumar", amount: "₹3.4L", mode: "bank transfer", date: "4/10/2024", status: "completed" },
  { id: "RCP/2024/002", property: "S-002-2024", owner: "Priya Sharma", amount: "₹5.4L", mode: "online", date: "4/20/2024", status: "completed" },
  { id: "RCP/2024/003", property: "S-005-2024", owner: "Harish Singh", amount: "₹1.1L", mode: "cash", date: "3/15/2024", status: "completed" },
  { id: "RCP/2024/004", property: "S-004-2024", owner: "Sneha Gupta", amount: "₹4.8L", mode: "online", date: "5/12/2024", status: "pending" },
  { id: "RCP/2024/005", property: "S-003-2024", owner: "Amit Patel", amount: "₹13.0L", mode: "bank transfer", date: "5/01/2024", status: "failed" },
];

export default function Payment() {
  const [isCreating, setIsCreating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'pending', 'completed', 'failed', 'refunded'];

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
            <h1 className="text-3xl font-bold tracking-tight">Payments & Receipts</h1>
            <p className="text-blue-100 mt-1">Record manual payments, generate receipts, and track settlements.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              {isCreating ? <X size={18} /> : <Plus size={18} />}
              {isCreating ? 'Cancel' : 'Record Payment'}
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
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Record Manual Payment</h2>
                
                <div className="space-y-6">
                  
                  {/* SECTION 1: Payment Identification */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <FileText size={18} />
                      <h3 className="font-bold text-sm">Receipt Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Receipt No (Auto-generated)</label>
                        <input type="text" className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`} value="RCP/2024/006" readOnly />
                      </div>
                      <div>
                        <label className={labelClass}>Property ID</label>
                        <input type="text" className={inputClass} placeholder="Enter Survey No (e.g., S-001-2024)" />
                      </div>
                      <div>
                        <label className={labelClass}>Owner Name</label>
                        <input type="text" className={`${inputClass} bg-gray-50`} placeholder="Auto-filled from Property ID" readOnly />
                      </div>
                      <div>
                        <label className={labelClass}>Associated Demand No (Optional)</label>
                        <input type="text" className={inputClass} placeholder="Link to existing demand" />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Transaction Details */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <IndianRupee size={18} />
                      <h3 className="font-bold text-sm">Transaction Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>Payment Amount</label>
                        <input type="number" className={inputClass} placeholder="0.00" />
                      </div>
                      <div>
                        <label className={labelClass}>Payment Mode</label>
                        <select className={inputClass} defaultValue="cash">
                          <option value="cash">Cash</option>
                          <option value="bank transfer">Bank Transfer (NEFT/RTGS)</option>
                          <option value="online">Online / UPI</option>
                          <option value="cheque">Cheque / DD</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Payment Date</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="date" className={`${inputClass} pl-10`} />
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <label className={labelClass}>Transaction / Reference ID (For Bank/Online/Cheque)</label>
                        <input type="text" className={inputClass} placeholder="Enter Txn ID, Cheque No, or UTR" />
                      </div>
                    </div>
                    
                    {/* Info Alert */}
                    <div className="mt-5 flex gap-2 bg-blue-50 border border-blue-100 text-blue-700 p-3 rounded-lg text-sm">
                      <Info size={16} className="shrink-0 mt-0.5" />
                      <p>Once generated, the receipt will be marked as "completed" for cash. Bank transfers and cheques will be marked "pending" until clearance is verified.</p>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                      Generate Receipt
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
            icon={<Wallet className="text-blue-500" size={24} />} 
            title="Total Collection" value="₹32.1Cr" trend="+2.4%" trendText="vs last month" trendColor="text-emerald-500" 
          />
          <StatCard 
            icon={<Banknote className="text-emerald-500" size={24} />} 
            title="Today's Receipts" value="₹12.5L" trend="42" trendText="transactions" trendColor="text-gray-400" 
          />
          <StatCard 
            icon={<CreditCard className="text-purple-500" size={24} />} 
            title="Online Payments" value="68%" trend="+5%" trendText="adoption rate" trendColor="text-emerald-500" 
          />
          <StatCard 
            icon={<Landmark className="text-orange-500" size={24} />} 
            title="Pending Clearance" value="14" trend="₹4.2L" trendText="in transit" trendColor="text-gray-400" 
          />
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header & Filters */}
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Title & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <h2 className="text-xl font-bold text-gray-900 shrink-0">Payment Records</h2>
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
              placeholder="Search receipts..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-shadow"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Receipt No</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Property</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Owner</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Amount</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Mode</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{row.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.property}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.owner}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-bold">{row.amount}</td>
                  <td className="py-4 px-6">
                    <ModeBadge mode={row.mode} />
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.date}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Download Receipt">
                        <Download size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Print">
                        <Printer size={16} />
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
            Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">5</span> of <span className="font-medium text-gray-900">8,942</span> results
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
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 font-medium transition-colors">1788</button>
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

// Custom Badge for Payment Mode (Matching the image)
function ModeBadge({ mode }) {
  const styles = {
    'bank transfer': "bg-orange-100 text-orange-700",
    'online': "bg-purple-100 text-purple-700",
    'cash': "bg-emerald-100 text-emerald-700",
    'cheque': "bg-blue-100 text-blue-700"
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${styles[mode] || 'bg-gray-100 text-gray-700'}`}>
      {mode}
    </span>
  );
}

// Status Badge
function StatusBadge({ status }) {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={14} /> completed
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700">
          pending
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700">
          <AlertCircle size={14} /> failed
        </span>
      );
    case 'refunded':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700">
          refunded
        </span>
      );
    default:
      return null;
  }
}