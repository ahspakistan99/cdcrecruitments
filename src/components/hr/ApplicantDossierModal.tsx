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
  Printer,
  Plus,
  Trash2,
  Users,
  CheckCircle
} from 'lucide-react';
import { JobApplication, ApplicationStatus, HRNote, InterviewSchedule, InterviewTeamMember } from '../../types';
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
    application.interviewDetails?.venue || 'Capital Care International Hospital (CCIH) Executive Boardroom, Islamabad'
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

  // Interview Team Members & Remarks state
  const [teamMembers, setTeamMembers] = useState<InterviewTeamMember[]>(() => {
    if (application.interviewDetails?.teamMembers && application.interviewDetails.teamMembers.length > 0) {
      return application.interviewDetails.teamMembers;
    }
    return [
      {
        id: 'tm-1',
        name: 'Dr. Tariq Mahmood',
        designation: 'Medical Superintendent / Panel Chair',
        recommendation: 'Strongly Recommended',
        rating: 9,
        remarks: 'Demonstrated exemplary clinical diagnostic acumen and emergency protocols familiarity. Recommended for appointment.'
      },
      {
        id: 'tm-2',
        name: 'Dr. Ayesha Malik',
        designation: 'Head of Clinical Department',
        recommendation: 'Recommended',
        rating: 8,
        remarks: 'Solid grasp of patient management and hospital reporting. Validated PMDC/PNC council credentials.'
      }
    ];
  });

  const [overallDecision, setOverallDecision] = useState<'Recommended' | 'Shortlisted' | 'Offer Extended' | 'Not Selected' | 'Pending Evaluation'>(
    application.interviewDetails?.overallDecision || 'Recommended'
  );

  const statusInfo = getStatusBadge(application.status);
  const dept = getDepartmentInfo(application.department);

  const handleAddTeamMember = (defaultName = '', defaultRole = '') => {
    const newMember: InterviewTeamMember = {
      id: `tm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: defaultName,
      designation: defaultRole,
      recommendation: 'Recommended',
      rating: 8,
      remarks: '',
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleUpdateTeamMember = (id: string, field: keyof InterviewTeamMember, value: any) => {
    setTeamMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSaveInterview = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPanelNames = teamMembers.length > 0
      ? teamMembers.map(m => m.name ? `${m.name} (${m.designation || 'Member'})` : m.designation).filter(Boolean).join(', ')
      : panelMembers;

    onScheduleInterview(application.id, {
      scheduledDate: interviewDate,
      scheduledTime: interviewTime,
      venue: interviewVenue,
      interviewType,
      panelMembers: formattedPanelNames || 'CCIH Interview Panel',
      teamMembers,
      overallDecision,
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
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 md:col-span-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                      Academic Qualifications & Degrees (SSC to PhD)
                    </span>
                    {application.educationList && application.educationList.length > 0 && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {application.educationList.length} Qualifications Listed
                      </span>
                    )}
                  </h3>

                  {application.educationList && application.educationList.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                            <th className="py-2 px-3 font-semibold">Level</th>
                            <th className="py-2 px-3 font-semibold">Degree / Certificate</th>
                            <th className="py-2 px-3 font-semibold">Passing Year</th>
                            <th className="py-2 px-3 font-semibold">Board / University</th>
                            <th className="py-2 px-3 font-semibold">Marks / CGPA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {application.educationList.map((edu, idx) => (
                            <tr key={edu.id || idx} className="hover:bg-slate-50/50">
                              <td className="py-2.5 px-3">
                                <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md uppercase tracking-wider">
                                  {edu.level}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-bold text-slate-900">{edu.degreeName}</td>
                              <td className="py-2.5 px-3 font-mono text-slate-600">{edu.passingYear}</td>
                              <td className="py-2.5 px-3 text-slate-700">{edu.boardOrUniversity}</td>
                              <td className="py-2.5 px-3 font-medium text-slate-600">{edu.gradeOrCgpa || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
                        <span className="text-slate-900 text-right truncate" title={application.institution}>
                          {application.institution}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Completion Year</span>
                        <span className="text-slate-900">{application.passingYear}</span>
                      </div>
                    </div>
                  )}

                  {/* Registration license badge */}
                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                        Regulatory Council Registration Status (PMDC / PNC / Pharmacy / ACCA)
                      </span>
                      {application.registrationNumber ? (
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="w-4 h-4 text-emerald-600" />
                          <span className="font-mono font-bold text-xs text-emerald-900">
                            {application.registrationNumber}
                          </span>
                          <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded-sm font-semibold">
                            Verified Council Registration
                          </span>
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 mt-0.5">No clinical council registration specified / Not required for this non-clinical role.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Experience & Compensation */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 md:col-span-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      Hospital & Clinical Employment History
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      Total Experience: <strong className="text-slate-900">{application.totalExperienceYears} Year(s)</strong>
                    </span>
                  </h3>

                  {application.experienceList && application.experienceList.length > 0 ? (
                    <div className="space-y-3">
                      {application.experienceList.map((exp, idx) => (
                        <div key={exp.id || idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <strong className="text-slate-900 text-sm">{exp.organization}</strong>
                              {exp.isCurrent && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                  Current Role
                                </span>
                              )}
                            </div>
                            <span className="text-slate-500 font-mono text-[11px]">
                              {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 pt-1 border-t border-slate-200/60">
                            <div>
                              <span className="font-semibold text-slate-700">Designation: </span>
                              <span className="text-slate-900 font-medium">{exp.designation}</span>
                            </div>
                            {exp.department && (
                              <div>
                                <span className="font-semibold text-slate-700">Department: </span>
                                <span>{exp.department}</span>
                              </div>
                            )}
                          </div>

                          {exp.responsibilities && (
                            <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-200/60">
                              "{exp.responsibilities}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Current Employer</span>
                        <span className="font-semibold text-slate-900">{application.currentEmployer || 'Fresh Graduate / No Record'}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Current Role</span>
                        <span className="text-slate-900">{application.currentDesignation || 'Candidate'}</span>
                      </div>
                    </div>
                  )}

                  {/* Compensation Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-500 block">Current Salary</span>
                      <span className="font-semibold text-slate-800">{application.currentSalary || 'Confidential / Fresh'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Expected Salary</span>
                      <span className="font-bold text-emerald-700">{application.expectedSalary}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Notice Period</span>
                      <span className="font-semibold text-slate-900">{application.noticePeriodDays} Days Availability</span>
                    </div>
                  </div>
                </div>

                {/* Interview Team Evaluation & Panel Remarks Summary Card (if scheduled) */}
                {application.interviewDetails && (
                  <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-200/80 space-y-3 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-purple-700" />
                        Interview Team Members & Panel Remarks
                      </h3>
                      {application.interviewDetails.overallDecision && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-200 text-purple-900 border border-purple-300">
                          Verdict: {application.interviewDetails.overallDecision}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-purple-800 space-y-1">
                      <p>
                        <strong>Date & Venue:</strong> {application.interviewDetails.scheduledDate} at {application.interviewDetails.scheduledTime} • {application.interviewDetails.venue}
                      </p>
                    </div>

                    {application.interviewDetails.teamMembers && application.interviewDetails.teamMembers.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {application.interviewDetails.teamMembers.map((member, idx) => (
                          <div key={member.id || idx} className="p-3 bg-white rounded-xl border border-purple-100 shadow-xs space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <div>
                                <strong className="text-slate-900 block">{member.name || `Panel Member #${idx + 1}`}</strong>
                                <span className="text-[11px] text-slate-500">{member.designation}</span>
                              </div>
                              <div className="text-right">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  member.recommendation === 'Strongly Recommended' ? 'bg-emerald-100 text-emerald-800' :
                                  member.recommendation === 'Recommended' ? 'bg-green-100 text-green-800' :
                                  member.recommendation === 'Conditional / Hold' ? 'bg-amber-100 text-amber-800' :
                                  member.recommendation === 'Not Recommended' ? 'bg-rose-100 text-rose-800' :
                                  'bg-slate-100 text-slate-800'
                                }`}>
                                  {member.recommendation || 'Evaluated'}
                                </span>
                                {member.rating && (
                                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                                    Score: {member.rating}/10
                                  </div>
                                )}
                              </div>
                            </div>
                            {member.remarks && (
                              <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 leading-relaxed">
                                <strong>Remarks:</strong> "{member.remarks}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-purple-700 italic">
                        Panel: {application.interviewDetails.panelMembers}
                      </p>
                    )}
                  </div>
                )}

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
                    to contribute to clinical excellence and compassionate patient care at Capital Care International Hospital (CCIH) Islamabad.
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
                  Capital Care International Hospital (CCIH) Interview Call Scheduler
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="In-person">In-person (Capital Care International Hospital - CCIH Islamabad)</option>
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
                    placeholder="e.g. Executive Boardroom, 2nd Floor, Capital Care International Hospital, Islamabad"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </div>

                {/* INTERVIEW TEAM MEMBERS & INDIVIDUAL REMARKS */}
                <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-purple-200/80 pb-3">
                    <div>
                      <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-purple-700" />
                        Interview Panel Members & Evaluation Remarks
                      </h4>
                      <p className="text-[11px] text-purple-800 mt-0.5">
                        Add interview team members and record their individual feedback, scores, and recommendations.
                      </p>
                    </div>

                    {/* Quick Add Presets */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-purple-800">Quick Add:</span>
                      <button
                        type="button"
                        onClick={() => handleAddTeamMember('Dr. Tariq Mahmood', 'Medical Superintendent')}
                        className="px-2 py-0.5 text-[10px] font-medium bg-white hover:bg-purple-100 text-purple-900 rounded-md border border-purple-300 transition-colors"
                      >
                        + Med Supdt
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddTeamMember('Dr. Ayesha Malik', 'Head of Clinical Department')}
                        className="px-2 py-0.5 text-[10px] font-medium bg-white hover:bg-purple-100 text-purple-900 rounded-md border border-purple-300 transition-colors"
                      >
                        + HOD
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddTeamMember('Sister Rubina Kausar', 'Director of Nursing')}
                        className="px-2 py-0.5 text-[10px] font-medium bg-white hover:bg-purple-100 text-purple-900 rounded-md border border-purple-300 transition-colors"
                      >
                        + Nursing Head
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddTeamMember('Imran Yaseen', 'HR & Recruitment Lead')}
                        className="px-2 py-0.5 text-[10px] font-medium bg-white hover:bg-purple-100 text-purple-900 rounded-md border border-purple-300 transition-colors"
                      >
                        + HR Lead
                      </button>
                    </div>
                  </div>

                  {/* Team Member Cards */}
                  <div className="space-y-3">
                    {teamMembers.map((member, idx) => (
                      <div
                        key={member.id}
                        className="p-3.5 bg-white rounded-xl border border-purple-200/90 shadow-xs space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-purple-700 text-white text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-800">
                              {member.name || `Interview Panel Member #${idx + 1}`}
                            </span>
                            {member.designation && (
                              <span className="text-[11px] text-slate-500">
                                • {member.designation}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveTeamMember(member.id)}
                            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1 rounded-md transition-colors text-xs flex items-center gap-1"
                            title="Remove panel member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Remove</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-xs">
                          <div className="sm:col-span-4">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Interviewer Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={e => handleUpdateTeamMember(member.id, 'name', e.target.value)}
                              placeholder="e.g. Dr. Tariq Mahmood"
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Hospital Role / Designation
                            </label>
                            <input
                              type="text"
                              value={member.designation}
                              onChange={e => handleUpdateTeamMember(member.id, 'designation', e.target.value)}
                              placeholder="e.g. Medical Superintendent"
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Recommendation
                            </label>
                            <select
                              value={member.recommendation}
                              onChange={e => handleUpdateTeamMember(member.id, 'recommendation', e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                            >
                              <option value="Strongly Recommended">Strongly Rec.</option>
                              <option value="Recommended">Recommended</option>
                              <option value="Conditional / Hold">Conditional / Hold</option>
                              <option value="Not Recommended">Not Rec.</option>
                              <option value="Pending Review">Pending</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Rating (1-10)
                            </label>
                            <select
                              value={member.rating || 8}
                              onChange={e => handleUpdateTeamMember(member.id, 'rating', Number(e.target.value))}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                            >
                              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
                                <option key={num} value={num}>{num}/10 Score</option>
                              ))}
                            </select>
                          </div>

                          {/* Individual Interviewer Remarks */}
                          <div className="sm:col-span-12">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Interviewer Remarks & Clinical / Technical Assessment <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                              rows={2}
                              value={member.remarks}
                              onChange={e => handleUpdateTeamMember(member.id, 'remarks', e.target.value)}
                              placeholder="Record clinical questions evaluated, diagnostic problem solving, communication bedside manner, and hiring remarks..."
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Member Button */}
                  <button
                    type="button"
                    onClick={() => handleAddTeamMember()}
                    className="w-full py-2 px-3 rounded-xl border border-dashed border-purple-300 hover:border-purple-500 bg-white hover:bg-purple-50 text-purple-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Another Interview Team Member</span>
                  </button>

                  {/* Overall Committee Verdict */}
                  <div className="p-3 bg-white rounded-xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700">
                      Overall Interview Committee Verdict:
                    </label>
                    <select
                      value={overallDecision}
                      onChange={e => setOverallDecision(e.target.value as any)}
                      className="px-3 py-1.5 rounded-lg border border-purple-300 text-xs font-bold bg-purple-50 text-purple-950 focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Recommended">Recommended for Appointment</option>
                      <option value="Shortlisted">Shortlisted for Final Round</option>
                      <option value="Offer Extended">Formal Job Offer Extended</option>
                      <option value="Conditional / Hold">On Hold / Awaiting Verification</option>
                      <option value="Not Selected">Not Selected</option>
                      <option value="Pending Evaluation">Pending Evaluation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instructions / Notes to Candidate</label>
                  <textarea
                    rows={2}
                    value={interviewNotes}
                    onChange={e => setInterviewNotes(e.target.value)}
                    placeholder="e.g. Please bring original PMDC registration, educational degrees, and 2 passport photos."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm, Save Panel Remarks & Dispatch Interview Schedule</span>
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
