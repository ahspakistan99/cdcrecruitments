import React, { useState } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Download, 
  Star, 
  ShieldCheck, 
  Award, 
  MessageSquare, 
  Send, 
  CalendarCheck, 
  Building2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Banknote,
  Printer
} from 'lucide-react';
import { JobApplication, ApplicationStatus, HRNote, InterviewSchedule } from '../../types';
import { getStatusBadge, getDepartmentInfo } from '../../utils/formatters';

interface ApplicantDossierModalProps {
  application: JobApplication | null;
  onClose: () => void;
  onUpdateStatus: (appId: string, newStatus: ApplicationStatus) => void;
  onUpdateRating: (appId: string, rating: number) => void;
  onAddHRNote: (appId: string, noteText: string, author: string) => void;
  onScheduleInterview: (appId: string, schedule: InterviewSchedule) => void;
}

export const ApplicantDossierModal: React.FC<ApplicantDossierModalProps> = ({
  application,
  onClose,
  onUpdateStatus,
  onUpdateRating,
  onAddHRNote,
  onScheduleInterview,
}) => {
  if (!application) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'cv_preview' | 'interview' | 'notes'>('profile');
  const [newNoteText, setNewNoteText] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('HR Recruitment Officer');

  // Interview Schedule Form state
  const [interviewDate, setInterviewDate] = useState(
    application.interviewDetails?.scheduledDate || '2026-09-24'
  );
  const [interviewTime, setInterviewTime] = useState(
    application.interviewDetails?.scheduledTime || '11:30 AM'
  );
  const [interviewVenue, setInterviewVenue] = useState(
    application.interviewDetails?.venue || 'CDC Executive Boardroom, 2nd Floor, Sector G-8 Markaz, Islamabad'
  );
  const [interviewType, setInterviewType] = useState<'In-person' | 'Online Video' | 'Panel Assessment'>(
    application.interviewDetails?.interviewType || 'In-person'
  );
  const [panelMembers, setPanelMembers] = useState(
    application.interviewDetails?.panelMembers || 'Head of Department, Medical Superintendent, HR Lead'
  );
  const [interviewNotes, setInterviewNotes] = useState(
    application.interviewDetails?.notes || 'Please bring original CNIC, verified degrees and PMDC/PNC registration.'
  );
  const [interviewSavedMessage, setInterviewSavedMessage] = useState(false);

  const statusInfo = getStatusBadge(application.status);
  const dept = getDepartmentInfo(application.department);

  const handleSaveInterview = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleInterview(application.id, {
      scheduledDate: interviewDate,
      scheduledTime: interviewTime,
      venue: interviewVenue,
      interviewType,
      panelMembers,
      notes: interviewNotes,
    });
    setInterviewSavedMessage(true);
    setTimeout(() => setInterviewSavedMessage(false), 3000);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddHRNote(application.id, newNoteText.trim(), noteAuthor);
    setNewNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Top Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
              {application.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit']">{application.fullName}</h2>
                <span className="font-mono text-[11px] sm:text-xs text-slate-500 font-semibold">{application.id}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">
                Applied for <strong>{application.jobTitle}</strong> ({dept.name})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
            {/* Quick Status Dropdown */}
            <select
              value={application.status}
              onChange={e => onUpdateStatus(application.id, e.target.value as ApplicationStatus)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer min-h-[38px] ${statusInfo.color}`}
            >
              <option value="new">New Application</option>
              <option value="under_review">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="offer_extended">Offer Extended</option>
              <option value="hired">Hired & Onboarded</option>
              <option value="rejected">Not Selected (Rejected)</option>
            </select>

            <button
              onClick={() => window.print()}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="Print Application Dossier"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-3 sm:px-6 border-b border-slate-100 flex items-center gap-1 sm:gap-2 bg-slate-50/70 overflow-x-auto scrollbar-thin">
          {[
            { id: 'profile', label: 'Dossier', fullLabel: 'Full Dossier & Credentials', icon: User },
            { id: 'cv_preview', label: 'CV / Resume', fullLabel: 'CV / Resume Document', icon: FileText },
            { 
              id: 'interview', 
              label: application.interviewDetails ? 'Interview (✓)' : 'Schedule', 
              fullLabel: application.interviewDetails ? 'Interview Scheduled (✓)' : 'Schedule Interview', 
              icon: CalendarCheck 
            },
            { id: 'notes', label: `HR Notes (${application.hrNotes.length})`, fullLabel: `HR Review Notes (${application.hrNotes.length})`, icon: MessageSquare },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-2.5 sm:px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap min-h-[44px] ${
                  isActive
                    ? 'border-emerald-600 text-emerald-800 font-bold bg-white -mb-px'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="sm:hidden">{tab.label}</span>
                <span className="hidden sm:inline">{tab.fullLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {/* TAB 1: Profile & Credentials */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Star Rating & Quick Banner */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Candidate Evaluation:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => onUpdateRating(application.id, star)}
                        className="cursor-pointer transition-transform hover:scale-110"
                        title={`Rate ${star} Stars`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= application.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700 ml-1">
                    ({application.rating}/5 Stars)
                  </span>
                </div>

                <div className="text-xs text-slate-500">
                  Application Logged: <strong className="text-slate-800">{application.appliedAt}</strong>
                </div>
              </div>

              {/* Grid of Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Demographics */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    Personal & Contact Record
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Full Name</span>
                      <span className="font-semibold text-slate-900">{application.fullName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Father / Husband</span>
                      <span className="font-semibold text-slate-900">{application.fatherOrHusbandName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">CNIC (Verified)</span>
                      <span className="font-mono font-bold text-slate-900">{application.cnic}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Gender / DOB</span>
                      <span className="text-slate-900">{application.gender} • {application.dob}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Contact Phone</span>
                      <a href={`tel:${application.phone}`} className="font-mono font-bold text-emerald-600 hover:underline">
                        {application.phone}
                      </a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Email Address</span>
                      <a href={`mailto:${application.email}`} className="text-blue-600 hover:underline truncate max-w-[200px]">
                        {application.email}
                      </a>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">City & Address</span>
                      <span className="text-slate-900 text-right max-w-[220px] truncate" title={application.address}>
                        {application.city} ({application.address || 'Capital Area'})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic & Licensure */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    Qualifications & Licensure
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Highest Degree</span>
                      <span className="font-bold text-slate-900">{application.highestDegree}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Specialization</span>
                      <span className="font-semibold text-slate-900">{application.specialization || 'Clinical'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Institute / University</span>
                      <span className="text-slate-900 text-right max-w-[200px] truncate" title={application.institution}>
                        {application.institution}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Completion Year</span>
                      <span className="text-slate-900">{application.passingYear}</span>
                    </div>

                    {/* Registration license badge */}
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 mt-2">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                        Council Licensure Status
                      </span>
                      {application.registrationNumber ? (
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="w-4 h-4 text-emerald-600" />
                          <span className="font-mono font-bold text-xs text-emerald-900">
                            {application.registrationNumber}
                          </span>
                          <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded-sm font-semibold">
                            Registered
                          </span>
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 mt-1">No clinical council registration specified.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Experience & Compensation */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    Employment & Compensation
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Total Experience</span>
                      <span className="font-bold text-slate-900">{application.totalExperienceYears} Year(s)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Current Employer</span>
                      <span className="font-semibold text-slate-900">{application.currentEmployer || 'Not Specified'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Current Role</span>
                      <span className="text-slate-900">{application.currentDesignation || 'Active Practitioner'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Current Salary</span>
                      <span className="text-slate-700">{application.currentSalary || 'Confidential'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Expected Salary</span>
                      <span className="font-bold text-emerald-700">{application.expectedSalary}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Notice Period</span>
                      <span className="font-semibold text-slate-900">{application.noticePeriodDays} Days</span>
                    </div>
                  </div>
                </div>

                {/* Supporting Documents & Verification */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Credentials Checklist
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-700">Curriculum Vitae (CV)</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Attached
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-700">CNIC Copy</span>
                      <span className={`font-semibold flex items-center gap-1 ${
                        application.hasCnicCopy ? 'text-emerald-700' : 'text-slate-400'
                      }`}>
                        {application.hasCnicCopy ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : 'Pending'}
                        {application.hasCnicCopy ? 'Verified' : 'To Bring'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-700">Degree & Transcripts</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified HEC
                      </span>
                    </div>
                  </div>

                  {application.tags && application.tags.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
                        Tags & Attributes
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {application.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter / Statement */}
              {application.coverLetter && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Applicant Statement / Cover Note
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{application.coverLetter}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CV / Resume Preview */}
          {activeTab === 'cv_preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-100 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{application.resumeFileName}</h4>
                    <p className="text-[11px] text-slate-500">
                      Size: {application.resumeFileSize || '1.4 MB'} • Uploaded by candidate
                    </p>
                  </div>
                </div>

                <a
                  href="#download"
                  onClick={e => {
                    e.preventDefault();
                    alert(`Simulated download for: ${application.resumeFileName}`);
                  }}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>
              </div>

              {/* Clean simulated document viewer */}
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 max-w-2xl mx-auto shadow-inner space-y-6 text-slate-800">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-2xl font-bold font-['Outfit'] text-slate-900">{application.fullName}</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {application.email} • {application.phone} • {application.city}, Pakistan
                  </p>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">CNIC: {application.cnic}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    Professional Objective
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dedicated healthcare professional with {application.totalExperienceYears} years of hands-on expertise seeking
                    to contribute to clinical excellence and compassionate patient care at CDC/CCIH Hospital Islamabad.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    Academic Qualifications
                  </h3>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900">{application.highestDegree}</p>
                    <p className="text-slate-600">{application.institution} (Class of {application.passingYear})</p>
                    {application.specialization && (
                      <p className="text-slate-500">Major: {application.specialization}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    Experience Record
                  </h3>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900">
                      {application.currentDesignation || 'Practitioner'} — {application.currentEmployer || 'Healthcare Center'}
                    </p>
                    <p className="text-slate-500">Total Duration: {application.totalExperienceYears} Year(s)</p>
                  </div>
                </div>

                {application.registrationNumber && (
                  <div>
                    <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      Professional Medical Licensure
                    </h3>
                    <p className="text-xs font-mono font-bold text-emerald-900">{application.registrationNumber}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Interview Scheduling */}
          {activeTab === 'interview' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                <h3 className="text-sm font-bold text-purple-950 font-['Outfit'] flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-purple-700" />
                  CDC/CCIH Hospital Interview Call Scheduler
                </h3>
                <p className="text-xs text-purple-800 mt-1">
                  Schedule or modify the candidate’s interview call. The status will automatically transition to{' '}
                  <strong>Interview Scheduled</strong> and display on the candidate's tracking portal.
                </p>
              </div>

              {interviewSavedMessage && (
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Interview scheduled successfully! Candidate record updated.
                </div>
              )}

              <form onSubmit={handleSaveInterview} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Interview Date</label>
                    <input
                      type="date"
                      value={interviewDate}
                      onChange={e => setInterviewDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Interview Time</label>
                    <input
                      type="text"
                      value={interviewTime}
                      onChange={e => setInterviewTime(e.target.value)}
                      placeholder="e.g. 11:30 AM or 03:00 PM"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interview Format</label>
                  <select
                    value={interviewType}
                    onChange={e => setInterviewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="In-person">In-person (CDC Campus Islamabad)</option>
                    <option value="Panel Assessment">Panel Assessment & Clinical Viva</option>
                    <option value="Online Video">Online Video Consultation (Zoom / Teams)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interview Venue / Room</label>
                  <input
                    type="text"
                    value={interviewVenue}
                    onChange={e => setInterviewVenue(e.target.value)}
                    placeholder="e.g. Executive Boardroom, 2nd Floor, Sector G-8 Markaz, Islamabad"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interview Panel Members</label>
                  <input
                    type="text"
                    value={panelMembers}
                    onChange={e => setPanelMembers(e.target.value)}
                    placeholder="e.g. Head of Pathology, Medical Superintendent, HR Director"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instructions / Notes to Candidate</label>
                  <textarea
                    rows={2}
                    value={interviewNotes}
                    onChange={e => setInterviewNotes(e.target.value)}
                    placeholder="e.g. Please bring original PMDC registration and original degree transcripts."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Confirm & Dispatch Interview Schedule
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: HR Review Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Internal HR Review & Interview Remarks
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Internal team notes are confidential and visible only to HR and Hospital Management.
                </p>
              </div>

              {/* Notes List */}
              <div className="space-y-3">
                {application.hrNotes.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No HR notes recorded yet for this applicant. Add the first review below.
                  </div>
                ) : (
                  application.hrNotes.map(note => (
                    <div key={note.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-slate-900">{note.author}</strong>
                        <span className="text-slate-400">{note.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{note.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleCreateNote} className="space-y-3 p-4 bg-white rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Add New Review Note</span>
                  <input
                    type="text"
                    value={noteAuthor}
                    onChange={e => setNoteAuthor(e.target.value)}
                    placeholder="Your Name / Designation"
                    className="px-2 py-1 text-xs border border-slate-200 rounded-lg text-slate-700"
                  />
                </div>
                <textarea
                  rows={3}
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  placeholder="Record credentials verification feedback, clinical assessment score, or salary recommendation..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                />
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
