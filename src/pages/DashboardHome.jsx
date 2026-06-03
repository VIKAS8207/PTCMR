import { motion } from 'framer-motion';
import { 
  Building2, 
  Wallet, 
  TrendingUp, 
  AlertCircle,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  PieChart,
  BarChart3
} from 'lucide-react';

// Dummy data for Recent Payments Table
const recentPayments = [
  { id: "RCP/24/089", property: "S-102-2024", owner: "Amit Patel", amount: "₹12,500", date: "Today, 10:42 AM", mode: "Online", status: "completed" },
  { id: "RCP/24/088", property: "S-045-2024", owner: "Neha Sharma", amount: "₹8,200", date: "Today, 09:15 AM", mode: "Cash", status: "completed" },
  { id: "RCP/24/087", property: "S-210-2024", owner: "Rajesh Kumar", amount: "₹45,000", date: "Yesterday", mode: "Cheque", status: "pending" },
  { id: "RCP/24/086", property: "S-005-2024", owner: "Harish Singh", amount: "₹3,400", date: "Yesterday", mode: "Online", status: "completed" },
];

export default function DashboardHome() {
  return (
    <div className="pb-12">
      
      {/* Main Header Area */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[24px] shadow-md p-6 md:p-8 mb-8 flex flex-col overflow-hidden">
        
        {/* Aesthetic Grid Overlay Layer */}
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
            <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
            <p className="text-blue-100 mt-1">Real-time overview of property tax collections and municipal revenue.</p>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 z-20 relative">
          <StatCard 
            icon={<Wallet className="text-emerald-500" size={24} />} 
            title="Total Revenue (YTD)" value="₹42.5 Cr" trend="+14.2%" trendText="vs last year" trendColor="text-emerald-500" trendIcon={ArrowUpRight}
          />
          <StatCard 
            icon={<TrendingUp className="text-blue-500" size={24} />} 
            title="Collection Rate" value="84.2%" trend="+2.1%" trendText="this month" trendColor="text-emerald-500" trendIcon={ArrowUpRight}
          />
          <StatCard 
            icon={<AlertCircle className="text-red-500" size={24} />} 
            title="Pending Arrears" value="₹8.4 Cr" trend="-5.4%" trendText="recovered" trendColor="text-emerald-500" trendIcon={ArrowDownRight}
          />
          <StatCard 
            icon={<Building2 className="text-purple-500" size={24} />} 
            title="Properties Assessed" value="45,210" trend="+120" trendText="new this week" trendColor="text-blue-500" trendIcon={ArrowUpRight}
          />
        </div>
      </div>

      {/* Main Dashboard Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        
        {/* LEFT COLUMN (Charts & Tables) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Revenue Bar Chart Card */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-gray-900">
                <BarChart3 size={20} className="text-indigo-600" />
                <h2 className="text-lg font-bold">Monthly Collection Trend</h2>
              </div>
              <select className="border border-gray-300 text-sm rounded-md px-3 py-1 outline-none focus:ring-1 focus:ring-indigo-500">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            
            {/* CSS-based Bar Chart Mockup */}
            <div className="h-64 flex items-end justify-between gap-2 pt-4 border-b border-gray-100 relative">
              {/* Y-Axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pb-6 hidden sm:flex">
                <span>₹10Cr</span><span>₹7.5Cr</span><span>₹5Cr</span><span>₹2.5Cr</span><span>0</span>
              </div>
              <div className="w-8 sm:w-10 pl-8 sm:pl-12 hidden sm:block"></div> {/* Spacer for Y-axis */}
              
              {/* Bars */}
              <ChartBar height="40%" label="Apr" />
              <ChartBar height="65%" label="May" />
              <ChartBar height="85%" label="Jun" active />
              <ChartBar height="55%" label="Jul" />
              <ChartBar height="70%" label="Aug" />
              <ChartBar height="45%" label="Sep" />
              <ChartBar height="90%" label="Oct" />
              <ChartBar height="30%" label="Nov" />
            </div>
          </div>

          {/* Recent Collections Table */}
          <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-900">
                <IndianRupee size={20} className="text-emerald-600" />
                <h2 className="text-lg font-bold">Recent Payments</h2>
              </div>
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Receipt No</th>
                    <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property / Owner</th>
                    <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentPayments.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-6 text-sm font-medium text-gray-900">
                        {row.id}
                        <div className="text-xs text-gray-500 font-normal mt-0.5">{row.date}</div>
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-900">
                        <span className="font-medium">{row.property}</span>
                        <div className="text-xs text-gray-500 mt-0.5">{row.owner}</div>
                      </td>
                      <td className="py-3 px-6 text-sm font-bold text-gray-900">
                        {row.amount}
                        <div className="text-xs text-gray-500 font-normal mt-0.5">{row.mode}</div>
                      </td>
                      <td className="py-3 px-6">
                        <StatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Pie Chart & Summary) */}
        <div className="space-y-6">
          
          {/* Pie Chart Card: Revenue by Property Type */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
            <div className="flex items-center gap-2 text-gray-900 mb-6">
              <PieChart size={20} className="text-indigo-600" />
              <h2 className="text-lg font-bold">Revenue by Type</h2>
            </div>
            
            {/* CSS Doughnut Chart */}
            <div className="flex justify-center items-center py-4">
              <div 
                className="w-48 h-48 rounded-full relative flex items-center justify-center shadow-inner"
                style={{
                  background: 'conic-gradient(#4f46e5 0% 45%, #10b981 45% 75%, #f59e0b 75% 90%, #64748b 90% 100%)'
                }}
              >
                {/* Inner white circle to make it a doughnut */}
                <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                  <span className="text-xs text-gray-500 font-medium">Total</span>
                  <span className="text-lg font-black text-gray-900">₹42.5Cr</span>
                </div>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="mt-6 space-y-3">
              <LegendItem color="bg-indigo-600" label="Residential" value="45%" amount="₹19.1 Cr" />
              <LegendItem color="bg-emerald-500" label="Commercial" value="30%" amount="₹12.7 Cr" />
              <LegendItem color="bg-amber-500" label="Industrial" value="15%" amount="₹6.3 Cr" />
              <LegendItem color="bg-slate-500" label="Agricultural/Other" value="10%" amount="₹4.4 Cr" />
            </div>
          </div>

          {/* Quick Zone Summary Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-[20px] p-6 shadow-md text-white">
            <h2 className="text-lg font-bold mb-4">Top Performing Zones</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Zone A (Core City)</span>
                  <span className="font-bold text-emerald-400">92%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Zone B (Urban)</span>
                  <span className="font-bold text-blue-400">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Zone C (Periphery)</span>
                  <span className="font-bold text-amber-400">64%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

/* --- Reusable Sub-components --- */

function StatCard({ icon, title, value, trend, trendText, trendColor, trendIcon: TrendIcon }) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
      </div>
      <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
      <div className="mt-3 text-sm flex items-center font-medium">
        <span className={`flex items-center gap-0.5 ${trendColor}`}>
          {TrendIcon && <TrendIcon size={14} />} {trend}
        </span>
        <span className="text-gray-400 ml-1.5">{trendText}</span>
      </div>
    </div>
  );
}

// Sub-component for the Bar Chart mockup
function ChartBar({ height, label, active }) {
  return (
    <div className="flex flex-col items-center justify-end h-full w-full group relative">
      <div 
        className={`w-full max-w-[40px] rounded-t-md transition-all duration-300 ${active ? 'bg-indigo-600' : 'bg-blue-100 group-hover:bg-blue-200'}`}
        style={{ height: height }}
      >
        {/* Tooltip on hover */}
        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded font-bold whitespace-nowrap pointer-events-none transition-opacity">
          {height}
        </div>
      </div>
      <span className={`text-xs mt-3 font-medium ${active ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>{label}</span>
    </div>
  );
}

// Sub-component for the Pie Chart Legend
function LegendItem({ color, label, value, amount }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-gray-600 font-medium">{label}</span>
      </div>
      <div className="text-right">
        <span className="font-bold text-gray-900 mr-2">{value}</span>
        <span className="text-xs text-gray-500 font-medium">{amount}</span>
      </div>
    </div>
  );
}

// Standard PTCR Status Badge for the table
function StatusBadge({ status }) {
  if (status === 'completed') {
    return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">Completed</span>;
  }
  if (status === 'pending') {
    return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700">Pending</span>;
  }
  return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
}