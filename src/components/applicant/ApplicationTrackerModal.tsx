import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  UserCheck, 
  AlertCircle, 
  Award, 
  FileText, 
  Phone,
  Building2,
  XCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { JobApplication } from '../../types';
import { getStatusBadge, getDepartmentInfo } from '../../utils/formatters';
import { getApplicationByTrackingId } from '../../services/firebaseService';

interface ApplicationTrackerModalProps {
  applications: JobApplication[];
  defaultSearchId?: string;
  onApplyForOtherPosition: () => void;
}

export const ApplicationTrackerModal: React.FC<ApplicationTrackerModalProps> = ({
  applications,
  defaultSearchId = '',
  onApplyForOtherPosition,
}) => {
  const [query, setQuery] = useState(defaultSearchId);
  const [isSearchingCloud, setIsSearchingCloud] = useState(false);
  const [searchedApp, setSearchedApp] = useState<JobApplication | null>(() => {
    if (defaultSearchId) {
      return applications.find(a => a.id.toLowerCase() === defaultSearchId.toLowerCase()) || null;
    }
    return applications[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setHasSearched(true);
    const clean = query.trim();
    if (!clean) {
      setSearchedApp(null);
      return;
    }

    const cleanLower = clean.toLowerCase();
    const foundLocal = applications.find(
      app =>
        app.id.toLowerCase() === cleanLower ||
        app.cnic.toLowerCase().includes(cleanLower) ||
        app.phone.toLowerCase().includes(cleanLower) ||
        app.email.toLowerCase() === cleanLower
    );

    if (foundLocal) {
      setSearchedApp(foundLocal);
      return;
    }

    // Try live Cloud Firestore lookup
    setIsSearchingCloud(true);
    try {
      const cloudApp = await getApplicationByTrackingId(clean.toUpperCase());
      setSearchedApp(cloudApp);
    } catch {
      setSearchedApp(null);
    } finally {
      setIsSearchingCloud(false);
    }
  };

  const statusInfo = searchedApp ? getStatusBadge(searchedApp.status) : null;
  const dept = searchedApp ? getDepartmentInfo(searchedApp.department) : null;

  // Review Steps calculation
  const getTimelineStep = (status: string) => {
    switch (status) {
      case 'new':
        return 1;
      case 'under_review':
        return 2;
      case 'shortlisted':
        return 3;
      case 'interview_scheduled':
        return 4;
      case 'offer_extended':
      case 'hired':
        return 5;
      case 'rejected':
        return -1;
      default:
        return 1;
    }
  };

  const currentStep = searchedApp ? getTimelineStep(searchedApp.status) : 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Capital Care International Hospital (CCIH) Applicant Service
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Track Your Job Application Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Enter your Application Tracking ID (e.g. <code>CCIH-2026-1081</code>) or your registered 13-digit CNIC to view
          current review progress and interview calls.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto px-1">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
          <div className="flex items-center flex-1">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter Tracking ID (CCIH-2026-...) or CNIC..."
              className="flex-1 px-2 py-2.5 text-base sm:text-sm focus:outline-none bg-transparent min-h-[44px]"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs min-h-[44px] flex items-center justify-center"
          >
            Check Status
          </button>
        </div>
      </form>

      {/* Quick Demo Tracker Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-slate-500 px-2">
        <span className="font-semibold text-slate-400 text-[11px] sm:text-xs">Quick Demo IDs:</span>
        {applications.slice(0, 4).map(app => (
          <button
            key={app.id}
            onClick={() => {
              setQuery(app.id);
              setSearchedApp(app);
              setHasSearched(true);
            }}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-mono text-[11px] transition-colors min-h-[32px]"
          >
            {app.id} ({app.fullName.split(' ')[0]})
          </button>
        ))}
      </div>

      {/* Search Result */}
      {searchedApp ? (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md overflow-hidden space-y-4 sm:space-y-6">
          {/* Status Header */}
          <div className="p-4 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-400 text-xs sm:text-sm font-bold tracking-wider">
                  {searchedApp.id}
                </span>
                <span className="text-xs text-slate-400">• Applied {searchedApp.appliedAt}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold font-['Outfit']">{searchedApp.fullName}</h2>
              <p className="text-xs text-slate-300 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span>Applied For: <strong>{searchedApp.jobTitle}</strong></span>
                <span>•</span>
                <span className="text-emerald-300">{dept?.name}</span>
              </p>
            </div>

            <div className="sm:text-right w-full sm:w-auto">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${statusInfo?.color}`}>
                <span className={`w-2 h-2 rounded-full ${statusInfo?.dotColor}`}></span>
                {statusInfo?.label}
              </span>
            </div>
          </div>

          {/* Review Process Stepper */}
          <div className="p-4 sm:p-8 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 sm:mb-6">
              Recruitment Process Progress
            </h3>

            {currentStep === -1 ? (
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                <div className="text-xs">
                  <strong className="block font-bold">Application Status: Not Selected</strong>
                  <p className="text-rose-700/90 mt-0.5">
                    Thank you for your interest in Capital Care International Hospital (CCIH). On this occasion, other applicants more closely matched the specific criteria. Your resume remains in our talent pool for future vacancies.
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative">
                {/* Mobile Vertical Timeline (hidden on sm+) */}
                <div className="block sm:hidden space-y-3">
                  {[
                    { num: 1, label: 'Application Received', desc: 'Recorded in database' },
                    { num: 2, label: 'Under HR Review', desc: 'Credentials verification' },
                    { num: 3, label: 'Shortlisted', desc: 'Recommended by department' },
                    { num: 4, label: 'Interview Scheduled', desc: 'Panel assessment' },
                    { num: 5, label: 'Final Offer / Hired', desc: 'Joining formalities' },
                  ].map((stepItem, idx, arr) => {
                    const isDone = currentStep >= stepItem.num;
                    const isCurrent = currentStep === stepItem.num;

                    return (
                      <div
                        key={stepItem.num}
                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                          isCurrent
                            ? 'bg-emerald-50/80 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                            : isDone
                            ? 'bg-slate-50 border-emerald-300/80'
                            : 'bg-white border-slate-200 opacity-60'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                            isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isDone ? '✓' : stepItem.num}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 flex items-center justify-between">
                            <span>{stepItem.label}</span>
                            {isCurrent && (
                              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-100 px-1.5 py-0.2 rounded-sm">
                                Current
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{stepItem.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tablet/Desktop Horizontal Grid (hidden on mobile) */}
                <div className="hidden sm:grid sm:grid-cols-5 gap-3">
                  {[
                    { num: 1, label: 'Application Received', desc: 'Recorded in database' },
                    { num: 2, label: 'Under HR Review', desc: 'Credentials verification' },
                    { num: 3, label: 'Shortlisted', desc: 'Recommended by department' },
                    { num: 4, label: 'Interview Scheduled', desc: 'Panel assessment' },
                    { num: 5, label: 'Final Offer / Hired', desc: 'Joining formalities' },
                  ].map(stepItem => {
                    const isDone = currentStep >= stepItem.num;
                    const isCurrent = currentStep === stepItem.num;

                    return (
                      <div
                        key={stepItem.num}
                        className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                          isCurrent
                            ? 'bg-emerald-50/80 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                            : isDone
                            ? 'bg-slate-50 border-emerald-300/80'
                            : 'bg-white border-slate-200 opacity-60'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-xs font-bold ${
                            isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isDone ? '✓' : stepItem.num}
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">{stepItem.label}</h4>
                        <p className="text-[10px] text-slate-500">{stepItem.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Interview Details Card if Scheduled */}
          {searchedApp.interviewDetails && (
            <div className="mx-6 sm:mx-8 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-700" />
                <h4 className="text-sm font-bold text-purple-950 font-['Outfit']">
                  Interview Call Details Confirmed
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-purple-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Interview Date & Time</span>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {searchedApp.interviewDetails.scheduledDate} at {searchedApp.interviewDetails.scheduledTime}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-purple-100 sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Venue / Room</span>
                  <p className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    {searchedApp.interviewDetails.venue}
                  </p>
                </div>
              </div>

              <div className="text-xs text-purple-900/90 pt-1">
                <strong>Interview Panel:</strong> {searchedApp.interviewDetails.panelMembers}
                {searchedApp.interviewDetails.notes && (
                  <p className="text-[11px] text-purple-800 mt-1 italic">
                    Note: {searchedApp.interviewDetails.notes}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Applicant Profile Summary */}
          <div className="p-6 sm:p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Applicant Demographics
              </h4>
              <div className="space-y-1 text-slate-600">
                <p>CNIC: <strong className="font-mono text-slate-900">{searchedApp.cnic}</strong></p>
                <p>Phone: <strong className="font-mono text-slate-900">{searchedApp.phone}</strong></p>
                <p>Email: <strong className="text-slate-900">{searchedApp.email}</strong></p>
                <p>City: <strong className="text-slate-900">{searchedApp.city}</strong></p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Professional Summary
              </h4>
              <div className="space-y-1 text-slate-600">
                <p>Degree: <strong className="text-slate-900">{searchedApp.highestDegree}</strong></p>
                <p>Institute: <strong className="text-slate-900">{searchedApp.institution}</strong></p>
                <p>Experience: <strong className="text-slate-900">{searchedApp.totalExperienceYears} Year(s)</strong></p>
                {searchedApp.registrationNumber && (
                  <p>Registration No: <strong className="font-mono text-emerald-700">{searchedApp.registrationNumber}</strong></p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No application found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn't locate an application matching <strong>"{query}"</strong>. Please verify the Tracking ID or CNIC and try again.
          </p>
        </div>
      ) : null}
    </div>
  );
};
