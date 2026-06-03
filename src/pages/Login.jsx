import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  ArrowLeft,
  KeyRound,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function Login() {
  // View State: 'login' | 'forgot' | 'otp'
  const [view, setView] = useState('login');
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  // Loading & Timer States
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  // OTP Timer Logic
  useEffect(() => {
    let timer;
    if (view === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [view, countdown]);

  // --- Handlers ---
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard'); 
    }, 1200);
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(60); // Reset timer
      setView('otp');
    }, 1000);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Password reset link verified! Please log in.');
      setView('login');
      setOtp('');
      setPassword('');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMsg(''), 5000);
    }, 1500);
  };

  // --- Shared Styles ---
  const gradientText = "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent";
  const inputClass = "w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 transition-all";
  const labelClass = "block text-[13px] font-bold text-gray-700 mb-2";

  // Animation Variants for smooth form sliding
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 relative p-4">
      
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Main Enterprise Split-Card */}
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 relative min-h-[600px]">
        
        {/* LEFT PANEL: Branding & Info */}
        <div className="md:w-5/12 bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 p-10 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Decorative Background Circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
              <ShieldCheck size={28} className="text-blue-100" />
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-tight mb-4">
              PTCR<br/>System
            </h1>
            <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
              Property Tax & Collection Registry. Secure portal for municipal officers and administrators.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 text-sm text-indigo-200 mb-2">
              <Building2 size={16} />
              <span>Municipal Corporation Portal</span>
            </div>
            <p className="text-xs text-indigo-300/60">
              © {new Date().getFullYear()} PTCR. All rights reserved.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: Dynamic Forms */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: LOGIN */}
            {view === 'login' && (
              <motion.div key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome back</h2>
                  <p className="text-sm text-gray-500 font-medium">Please enter your credentials to access the portal.</p>
                </div>

                {successMsg && (
                  <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm flex items-center gap-2 font-medium">
                    <CheckCircle2 size={16} />
                    {successMsg}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="email" required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className={inputClass} placeholder="admin@ptcr.gov" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-[13px] font-bold text-gray-700">Password</label>
                      <button type="button" onClick={() => setView('forgot')} className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="password" required
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        className={inputClass} placeholder="••••••••" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={isLoading}
                    className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                  >
                    {isLoading ? <><Loader2 size={18} className="animate-spin" /> Authenticating...</> : 'Secure Login'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* VIEW 2: FORGOT PASSWORD */}
            {view === 'forgot' && (
              <motion.div key="forgot" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm mx-auto">
                
                <button onClick={() => setView('login')} className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-gray-900 mb-6 transition-colors w-fit">
                  <ArrowLeft size={16} /> Back
                </button>

                <div className="mb-8">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                    <KeyRound size={24} className="text-indigo-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Reset Password</h2>
                  <p className="text-sm text-gray-500 font-medium">Enter your registered email address and we'll send you an OTP to reset your password.</p>
                </div>

                <form onSubmit={handleSendOTP} className="space-y-5">
                  <div>
                    <label className={labelClass}>Registered Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="email" required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className={inputClass} placeholder="admin@ptcr.gov" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={isLoading || !email}
                    className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Send OTP Code'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* VIEW 3: OTP VERIFICATION */}
            {view === 'otp' && (
              <motion.div key="otp" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm mx-auto">
                
                <button onClick={() => setView('login')} className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-gray-900 mb-6 transition-colors w-fit">
                  <ArrowLeft size={16} /> Back to Login
                </button>

                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Check your email</h2>
                  <p className="text-sm text-gray-500 font-medium">
                    We've sent a 6-digit verification code to <span className="font-bold text-gray-900">{email}</span>.
                  </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2 text-center">Enter Verification Code</label>
                    <input 
                      type="text" 
                      maxLength="6"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Numbers only
                      className="w-full border border-gray-300 rounded-xl px-4 py-4 text-2xl font-mono tracking-[0.5em] text-center outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                      placeholder="------" 
                    />
                  </div>

                  <button 
                    type="submit" disabled={isLoading || otp.length < 6}
                    className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-600 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Continue'}
                  </button>
                  
                  {/* Timer & Resend Logic */}
                  <div className="text-center text-sm font-medium">
                    {countdown > 0 ? (
                      <p className="text-gray-500">Resend code in <span className="text-indigo-600 font-bold">00:{countdown.toString().padStart(2, '0')}</span></p>
                    ) : (
                      <p className="text-gray-500">Didn't receive the code? <button type="button" onClick={handleSendOTP} className="text-indigo-600 font-bold hover:underline">Click to resend</button></p>
                    )}
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}