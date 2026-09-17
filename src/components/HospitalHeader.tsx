import React from 'react';
import { 
  Building2, 
  Stethoscope, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  FileText, 
  RotateCcw,
  Sparkles,
  Phone,
  MapPin,
  Cloud,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { User } from 'firebase/auth';

interface HospitalHeaderProps {
  currentView: 'applicant' | 'tracker' | 'hr_dashboard';
  onNavigate: (view: 'applicant' | 'tracker' | 'hr_dashboard') => void;
  onOpenPostJobModal: () => void;
  totalOpenJobs: number;
  totalApplications: number;
  onResetDemoData: () => void;
  currentUser: User | null;
  onLoginWithGoogle: () => void;
  onLogout: () => void;
  isFirebaseSyncing: boolean;
}

export const HospitalHeader: React.FC<HospitalHeaderProps> = ({
  currentView,
  onNavigate,
  onOpenPostJobModal,
  totalOpenJobs,
  totalApplications,
  onResetDemoData,
  currentUser,
  onLoginWithGoogle,
  onLogout,
  isFirebaseSyncing,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Official Careers & E-Recruitment Portal
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Main Campus: Sector G-8 Markaz & Blue Area, Islamabad
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-slate-400">
            {/* Developer Credit */}
            <a 
              href="tel:03027563119"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 px-2.5 py-0.5 rounded-md text-[11px] transition-colors"
              title="Developer: Imran Yaseen 0302-7563119"
            >
              <span className="text-slate-400">Dev:</span>
              <span className="font-semibold text-slate-100">Imran Yaseen</span>
              <span className="text-emerald-400 font-mono">0302-7563119</span>
            </a>

            {/* Firebase Live Cloud indicator */}
            <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-md font-mono">
              <Cloud className={`w-3 h-3 ${isFirebaseSyncing ? 'animate-bounce text-emerald-400' : 'text-emerald-400'}`} />
              <span>Firestore Live</span>
            </span>

            {/* Auth control */}
            {currentUser ? (
              <div className="flex items-center gap-2 text-[11px] bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                <span className="text-slate-200 font-medium truncate max-w-[130px]" title={currentUser.email || currentUser.displayName || 'Admin'}>
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Sign out of HR Admin"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginWithGoogle}
                className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                title="Sign in with Google (HR Portal)"
              >
                <LogIn className="w-3 h-3 text-emerald-400" />
                <span>HR Sign In</span>
              </button>
            )}

            <button
              onClick={onResetDemoData}
              title="Reset initial demo applications and jobs"
              className="hover:text-white flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Hospital Brand & Identity */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('applicant')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 font-['Outfit']">
                    CDC / CCIH
                  </span>
                  <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Islamabad
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Capital Diagnostic Centre & Capital Care International Hospital
                </p>
              </div>
            </button>

            {/* Mobile quick actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenPostJobModal}
                className="p-2 text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 text-xs font-semibold"
                title="Post New Vacancy"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center w-full lg:w-auto gap-2">
            <nav className="grid grid-cols-3 w-full lg:w-auto lg:flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => onNavigate('applicant')}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-2.5 rounded-lg transition-all min-h-[44px] cursor-pointer ${
                  currentView === 'applicant'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">
                  <span className="hidden sm:inline">Open </span>Jobs
                </span>
                <span className="ml-0.5 sm:ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700 shrink-0">
                  {totalOpenJobs}
                </span>
              </button>

              <button
                onClick={() => onNavigate('tracker')}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-2.5 rounded-lg transition-all min-h-[44px] cursor-pointer ${
                  currentView === 'tracker'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Search className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">Track<span className="hidden sm:inline"> Status</span></span>
              </button>

              <button
                onClick={() => onNavigate('hr_dashboard')}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-2.5 rounded-lg transition-all min-h-[44px] cursor-pointer ${
                  currentView === 'hr_dashboard'
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="truncate">HR<span className="hidden sm:inline"> Portal</span></span>
                <span className={`ml-0.5 sm:ml-1 px-1.5 py-0.5 rounded-full text-[10px] shrink-0 ${
                  currentView === 'hr_dashboard' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {totalApplications}
                </span>
              </button>
            </nav>

            {/* Admin Add Post Button */}
            <button
              onClick={onOpenPostJobModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer min-h-[44px] shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Vacancy</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
