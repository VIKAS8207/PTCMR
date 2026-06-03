import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  FileWarning, 
  Plus, 
  X,
  MoreVertical,
  Search,
  Eye,
  Edit,
  Trash2,
  User,
  FileText,
  Info,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  UploadCloud,
  Loader2
} from 'lucide-react';

// Dummy data matching the Assessment table image
const tableData = [
  { id: "ASS001", property: "S-001-2024", owner: "Rajesh Kumar", year: "2024", value: "₹40.0L", rate: "8.5%", status: "approved" },
  { id: "ASS002", property: "S-002-2024", owner: "Priya Sharma", year: "2024", value: "₹120.0L", rate: "9%", status: "approved" },
  { id: "ASS003", property: "S-003-2024", owner: "Amit Patel", year: "2024", value: "₹200.0L", rate: "6.5%", status: "approved" },
  { id: "ASS004", property: "S-004-2024", owner: "Sneha Gupta", year: "2024", value: "₹60.0L", rate: "8%", status: "under review" },
  { id: "ASS005", property: "S-005-2024", owner: "Harish Singh", year: "2024", value: "₹25.0L", rate: "4.5%", status: "approved" },
];

export default function Assessment() {
  const [isCreating, setIsCreating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'pending', 'under review', 'approved', 'rejected', 'revised'];

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
            <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
            <p className="text-blue-100 mt-1">Process and review property tax assessments and documentation.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              {isCreating ? <X size={18} /> : <Plus size={18} />}
              {isCreating ? 'Cancel' : 'New Assessment'}
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
                <h2 className="text-2xl font-bold mb-6 text-gray-900">New Assessment Details</h2>
                
                <div className="space-y-6">
                  
                  {/* SECTION 1: Primary Owner */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 text-indigo-700">
                        <User size={18} />
                        <h3 className="font-bold text-sm">Primary owner</h3>
                      </div>
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        Aadhaar verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className={labelClass}>Full name</label>
                        <input type="text" className={inputClass} defaultValue="Ramesh Kumar Sahu" />
                      </div>
                      <div>
                        <label className={labelClass}>Aadhaar number</label>
                        <input type="text" className={`${inputClass} font-mono`} defaultValue="XXXX-XXXX-4782" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>Mobile (OTP verified)</label>
                        <input type="text" className={inputClass} defaultValue="+91 98XXXXXX21" />
                      </div>
                      <div>
                        <label className={labelClass}>Category</label>
                        <select className={inputClass} defaultValue="General">
                          <option>General</option>
                          <option>OBC</option>
                          <option>SC/ST</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Senior citizen (60+)</label>
                        <select className={inputClass} defaultValue="No">
                          <option>No</option>
                          <option>Yes</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Info Alert */}
                    <div className="mt-5 flex gap-2 bg-blue-50 border border-blue-100 text-blue-700 p-3 rounded-lg text-sm">
                      <Info size={16} className="shrink-0 mt-0.5" />
                      <p>Senior citizens (60+), women owners, and physically disabled owners are eligible for 10-25% additional rebate on total tax demand.</p>
                    </div>
                  </div>

                  {/* SECTION 2: Document Collection Status (INTERACTIVE UPLOADS) */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                      <FileText size={18} />
                      <h3 className="font-bold text-sm">Document collection status</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <UploadDocItem title="Sale deed / Title document" initialStatus="Uploaded" />
                      <UploadDocItem title="Building plan approval" initialStatus="Uploaded" />
                      <UploadDocItem title="Encumbrance certificate" initialStatus="Pending" />
                      <UploadDocItem title="Aadhaar / Identity proof" initialStatus="Verified via DigiLocker" />
                      <UploadDocItem title="Property photograph (geo-tagged)" initialStatus="Captured on-field" />
                      <UploadDocItem title="Water / electricity connection proof" initialStatus="Optional" />
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                      Submit for Review
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
            icon={<ClipboardList className="text-blue-500" size={24} />} 
            title="Total Assessments" value="3,412" trend="+124" trendText="this week" trendColor="text-blue-500" 
          />
          <StatCard 
            icon={<Clock className="text-amber-500" size={24} />} 
            title="Under Review" value="84" trend="12" trendText="urgent" trendColor="text-red-500" 
          />
          <StatCard 
            icon={<CheckCircle2 className="text-emerald-500" size={24} />} 
            title="Approved" value="3,120" trend="91%" trendText="approval rate" trendColor="text-emerald-500" 
          />
          <StatCard 
            icon={<FileWarning className="text-red-500" size={24} />} 
            title="Rejected/Revised" value="208" trend="-5%" trendText="vs last month" trendColor="text-emerald-500" 
          />
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header & Filters */}
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Title & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <h2 className="text-xl font-bold text-gray-900 shrink-0">Assessments</h2>
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
              placeholder="Search assessments..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-shadow"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Assessment ID</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Property</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Owner</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Year</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Assessed Value</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">Tax Rate</th>
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
                  <td className="py-4 px-6 text-sm text-gray-600">{row.year}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{row.value}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.rate}</td>
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
            Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">5</span> of <span className="font-medium text-gray-900">3,412</span> results
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
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 font-medium transition-colors">683</button>
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
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
        <CheckCircle2 size={14} /> approved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
      <Info size={14} /> under review
    </span>
  );
}

// --- NEW INTERACTIVE UPLOAD COMPONENT ---
function UploadDocItem({ title, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate network upload time
    setTimeout(() => {
      setIsUploading(false);
      setStatus('Uploaded');
    }, 1500); 
  };

  // Dynamically configure styles based on current state
  let Icon = Square;
  let iconColor = "text-gray-400";
  let badge = null;
  let actionBtn = null;

  if (isUploading) {
    Icon = Loader2;
    iconColor = "text-blue-500 animate-spin";
    badge = <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-blue-50 text-blue-800 border-blue-200">Uploading...</span>;
  } else if (status === 'Uploaded' || status.includes('Verified') || status.includes('Captured')) {
    Icon = CheckSquare;
    iconColor = "text-indigo-600";
    badge = <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-200">{status}</span>;
  } else if (status === 'Pending') {
    Icon = FileText;
    iconColor = "text-gray-400";
    badge = <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-orange-100 text-orange-800 border-orange-200">Pending</span>;
    actionBtn = (
      <button 
        onClick={handleUpload} 
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
      >
        <UploadCloud size={14} className="text-gray-500" /> Upload
      </button>
    );
  } else if (status === 'Optional') {
    Icon = Square;
    iconColor = "text-gray-400";
    badge = <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-gray-100 text-gray-600 border-gray-200">Optional</span>;
    actionBtn = (
      <button 
        onClick={handleUpload} 
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
      >
        <UploadCloud size={14} className="text-gray-500" /> Upload
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon size={18} className={iconColor} />
        <span className="text-sm font-medium text-gray-700">
          {title} {status === 'Pending' && <span className="text-red-500 ml-1">*</span>}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {badge}
        {actionBtn}
      </div>
    </div>
  );
}