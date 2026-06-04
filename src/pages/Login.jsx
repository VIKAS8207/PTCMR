import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Mail, 
  Loader2, 
  ShieldCheck, 
  ArrowLeft,
  KeyRound,
  Building2,
  CheckCircle2,
  MapPin,
  AlertCircle,
  Eye,
  EyeOff,
  Server
} from 'lucide-react';

// --- Background Animation Component ---
function LiveMapBackground() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPin = {
        id: Math.random().toString(36).substring(2, 9),
        x: Math.random() * 90 + 5, 
        y: Math.random() * 90 + 5, 
        color: ['text-blue-400', 'text-indigo-400', 'text-emerald-400', 'text-purple-400'][Math.floor(Math.random() * 4)]
      };

      setPins(current => [...current, newPin]);

      setTimeout(() => {
        setPins(current => current.filter(p => p.id !== newPin.id));
      }, 3500);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
      <div 
        className="absolute inset-0 opacity-40 mix-blend-luminosity bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('/image/login.jpg')` }}
      />
      <div className="absolute inset-0 bg-indigo-900/60 mix-blend-multiply" />
      
      <AnimatePresence>
        {pins.map(pin => (
          <motion.div
            key={pin.id}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="absolute"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div className="relative flex flex-col items-center">
              <MapPin size={36} className={`${pin.color} drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]`} fill="currentColor" />
              <div className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-ping bg-white opacity-75`} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function Login() {
  // View State: 'login' | 'forgot' | 'otp' | 'resetPassword'
  const [view, setView] = useState('login');
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Loading, Timer & Message States
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

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
    setErrorMsg(''); 
    
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'Admin' && password === 'Admin123') {
        localStorage.setItem('ptcr_auth_token', 'true');
        navigate('/dashboard'); 
      } else {
        setErrorMsg('Invalid Username or Password. Please try again.');
      }
    }, 1200);
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(60);
      setView('otp');
    }, 1000);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    setTimeout(() => {
      setIsLoading(false);
      // Move to reset password view instead of login
      setView('resetPassword');
      setOtp('');
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Pre-flight validation
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to save new password
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Password successfully reset! Please log in with your new credentials.');
      setView('login');
      
      // Clear sensitive states
      setNewPassword('');
      setConfirmPassword('');
      setPassword(''); 
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMsg(''), 5000);
    }, 1500);
  };

  // --- Shared Styles ---
  const gradientText = "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent";
  const inputClass = "w-full border border-gray-200 rounded-xl pl-11 pr-11 py-3.5 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 bg-gray-50/50 focus:bg-white text-gray-900 transition-all placeholder:text-gray-400";
  const labelClass = "block text-[13px] font-bold text-gray-700 mb-2";

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative p-4 sm:p-8">
      
      <LiveMapBackground />

      <div className="w-full max-w-[1050px] bg-white/95 backdrop-blur-2xl rounded-[28px] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 relative min-h-[650px] border border-white/20">
        
        {/* LEFT PANEL */}
        <div className="md:w-5/12 bg-gradient-to-br from-blue-700/95 via-indigo-800/95 to-purple-900/95 p-12 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8 shadow-inner">
              <ShieldCheck size={32} className="text-blue-100" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-5">
              PTCR<br/>System
            </h1>
            <p className="text-blue-200 text-sm leading-relaxed max-w-sm font-medium">
              Property Tax & Collection Registry. Secure authorization portal for municipal officers and system administrators.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 text-sm text-indigo-200 mb-3 font-medium">
              <Building2 size={18} />
              <span>Municipal Corporation Portal</span>
            </div>
            <p className="text-xs text-indigo-300/60 font-medium tracking-wide">
              © {new Date().getFullYear()} PTCR. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-white relative">
          
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: LOGIN */}
            {view === 'login' && (
              <motion.div key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-[380px] mx-auto">
                <div className="mb-10">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome back</h2>
                  <p className="text-sm text-gray-500 font-medium">Please enter your administrative credentials.</p>
                </div>

                {successMsg && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-sm flex items-center gap-3 font-semibold shadow-sm">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    {successMsg}
                  </div>
                )}

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-start gap-3 font-semibold shadow-sm">
                    <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className={labelClass}>Username or Email</label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type="text" 
                        required
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass} 
                        placeholder="Admin or admin@ptcr.gov" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Password</label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass} 
                        placeholder="••••••••" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 pb-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600 font-medium cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                      <span className="group-hover:text-gray-900 transition-colors">Remember me</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => { setView('forgot'); setErrorMsg(''); }} 
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button 
                    type="submit" disabled={isLoading}
                    className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-4 rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                  >
                    {isLoading ? <><Loader2 size={18} className="animate-spin" /> Authenticating...</> : 'Secure Login'}
                  </button>
                </form>

                <div className="mt-8 flex justify-center items-center gap-2 text-xs font-semibold text-gray-400">
                  <Server size={14} /> 256-bit Secure Connection
                </div>
              </motion.div>
            )}

            {/* VIEW 2: FORGOT PASSWORD */}
            {view === 'forgot' && (
              <motion.div key="forgot" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-[380px] mx-auto">
                
                <button onClick={() => { setView('login'); setErrorMsg(''); }} className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-gray-900 mb-8 transition-colors w-fit group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
                </button>

                <div className="mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 shadow-sm">
                    <KeyRound size={26} className="text-indigo-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Reset Password</h2>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">Enter your registered administrative email address and we will send you a secure OTP.</p>
                </div>

                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label className={labelClass}>Registered Email</label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type="email" required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className={inputClass} placeholder="admin@ptcr.gov" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={isLoading || !email}
                    className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-4 rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Send OTP Code'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* VIEW 3: OTP VERIFICATION */}
            {view === 'otp' && (
              <motion.div key="otp" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-[380px] mx-auto">
                
                <button onClick={() => { setView('login'); setErrorMsg(''); }} className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-gray-900 mb-8 transition-colors w-fit group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Cancel
                </button>

                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Check your email</h2>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    We've sent a 6-digit secure code to <span className="font-bold text-gray-900">{email}</span>.
                  </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-8">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-3 text-center uppercase tracking-wider">Verification Code</label>
                    <input 
                      type="text" 
                      maxLength="6"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-5 text-3xl font-mono tracking-[0.4em] font-bold text-center outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white text-gray-900" 
                      placeholder="••••••" 
                    />
                  </div>

                  <button 
                    type="submit" disabled={isLoading || otp.length < 6}
                    className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-4 rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Continue'}
                  </button>
                  
                  <div className="text-center text-sm font-medium">
                    {countdown > 0 ? (
                      <p className="text-gray-500 bg-gray-50 py-2 rounded-lg">Resend code in <span className="text-indigo-600 font-bold ml-1">00:{countdown.toString().padStart(2, '0')}</span></p>
                    ) : (
                      <p className="text-gray-500">Didn't receive the code? <button type="button" onClick={handleSendOTP} className="text-indigo-600 font-bold hover:underline transition-all">Click to resend</button></p>
                    )}
                  </div>
                </form>
              </motion.div>
            )}

            {/* VIEW 4: RESET PASSWORD */}
            {view === 'resetPassword' && (
              <motion.div key="resetPassword" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-[380px] mx-auto">
                
                <button onClick={() => { setView('login'); setErrorMsg(''); }} className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-gray-900 mb-8 transition-colors w-fit group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Cancel Reset
                </button>

                <div className="mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 size={26} className="text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Create New Password</h2>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">Please enter a strong password for your administrative account.</p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-start gap-3 font-semibold shadow-sm">
                    <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label className={labelClass}>New Password</label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        required
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={inputClass} 
                        placeholder="••••••••" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Confirm New Password</label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        required
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={inputClass} 
                        placeholder="••••••••" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={isLoading || !newPassword || !confirmPassword}
                    className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-4 rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                  >
                    {isLoading ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : 'Save & Login'}
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}