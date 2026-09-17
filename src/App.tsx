import React, { useState, useEffect } from 'react';
import { 
  JobPost, 
  JobApplication, 
  ApplicationStatus, 
  InterviewSchedule 
} from './types';
import { 
  getStoredJobs, 
  saveStoredJobs, 
  getStoredApplications, 
  saveStoredApplications, 
  resetToDemoData,
  INITIAL_JOB_POSTS,
  INITIAL_APPLICATIONS
} from './data/mockData';
import { HospitalHeader } from './components/HospitalHeader';
import { JobList } from './components/applicant/JobList';
import { JobDetailModal } from './components/applicant/JobDetailModal';
import { ApplicationFormModal } from './components/applicant/ApplicationFormModal';
import { ApplicationTrackerModal } from './components/applicant/ApplicationTrackerModal';
import { HRDashboard } from './components/hr/HRDashboard';
import { ApplicantDossierModal } from './components/hr/ApplicantDossierModal';
import { JobManagementModal } from './components/hr/JobManagementModal';
import { 
  Building2, 
  Stethoscope, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [jobs, setJobs] = useState<JobPost[]>(() => getStoredJobs());
  const [applications, setApplications] = useState<JobApplication[]>(() => getStoredApplications());

  // Views & Modals
  const [currentView, setCurrentView] = useState<'applicant' | 'tracker' | 'hr_dashboard'>('applicant');
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<JobPost | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState<JobPost | null>(null);
  const [selectedAppForDossier, setSelectedAppForDossier] = useState<JobApplication | null>(null);
  const [isJobManageModalOpen, setIsJobManageModalOpen] = useState(false);
  const [trackerSearchId, setTrackerSearchId] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state changes with localStorage
  useEffect(() => {
    saveStoredJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    saveStoredApplications(applications);
  }, [applications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Applicant Actions
  const handleApplyClick = (job: JobPost) => {
    setJobToApply(job);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = (
    appData: Omit<JobApplication, 'id' | 'appliedAt' | 'status' | 'rating' | 'hrNotes' | 'tags'>
  ): string => {
    // Generate tracking ID e.g. CDC-2026-1095
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `CDC-2026-${randomNum}`;
    const now = new Date();
    const appliedAt = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;

    const newApp: JobApplication = {
      ...appData,
      id: trackingId,
      appliedAt,
      status: 'new',
      rating: 3,
      hrNotes: [
        {
          id: `note-${Date.now()}`,
          author: 'System E-Recruitment Portal',
          date: now.toISOString().split('T')[0],
          text: `Application received online for ${appData.jobTitle}. Credentials queued for HR verification.`
        }
      ],
      tags: [appData.highestDegree.split(' ')[0], 'Online Applicant']
    };

    setApplications(prev => [newApp, ...prev]);

    // Increment applicant count on job
    setJobs(prev =>
      prev.map(j => (j.id === appData.jobId ? { ...j, applicantCount: j.applicantCount + 1 } : j))
    );

    showToast(`Application successfully registered! Tracking ID: ${trackingId}`);
    return trackingId;
  };

  // HR Actions
  const handleAddNewJob = (
    newJobData: Omit<JobPost, 'id' | 'postedDate' | 'applicantCount'>
  ) => {
    const randomId = Math.floor(120 + Math.random() * 880);
    const newJob: JobPost = {
      ...newJobData,
      id: `CDC-JOB-${randomId}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantCount: 0,
    };

    setJobs(prev => [newJob, ...prev]);
    showToast(`Vacancy "${newJob.title}" published successfully!`);
  };

  const handleToggleJobStatus = (jobId: string, newStatus: 'open' | 'closed' | 'urgent') => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    showToast(`Vacancy status updated to: ${newStatus}`);
  };

  const handleUpdateAppStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const updated = { ...app, status: newStatus };
          // If dossier is currently open, keep it in sync
          if (selectedAppForDossier?.id === appId) {
            setSelectedAppForDossier(updated);
          }
          return updated;
        }
        return app;
      })
    );
    showToast(`Candidate ${appId} status changed to ${newStatus.replace('_', ' ')}`);
  };

  const handleUpdateAppRating = (appId: string, rating: number) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const updated = { ...app, rating };
          if (selectedAppForDossier?.id === appId) {
            setSelectedAppForDossier(updated);
          }
          return updated;
        }
        return app;
      })
    );
  };

  const handleAddHRNote = (appId: string, noteText: string, author: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      author: author || 'HR Lead',
      date: new Date().toISOString().split('T')[0],
      text: noteText,
    };

    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const updated = { ...app, hrNotes: [newNote, ...app.hrNotes] };
          if (selectedAppForDossier?.id === appId) {
            setSelectedAppForDossier(updated);
          }
          return updated;
        }
        return app;
      })
    );
    showToast('Internal HR review note recorded.');
  };

  const handleScheduleInterview = (appId: string, schedule: InterviewSchedule) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const interviewNote = {
            id: `note-int-${Date.now()}`,
            author: 'Interview Coordinator',
            date: new Date().toISOString().split('T')[0],
            text: `Interview scheduled on ${schedule.scheduledDate} at ${schedule.scheduledTime} (${schedule.venue}). Panel: ${schedule.panelMembers}`,
          };

          const updated: JobApplication = {
            ...app,
            status: 'interview_scheduled',
            interviewDetails: schedule,
            hrNotes: [interviewNote, ...app.hrNotes],
          };

          if (selectedAppForDossier?.id === appId) {
            setSelectedAppForDossier(updated);
          }
          return updated;
        }
        return app;
      })
    );
    showToast('Interview confirmed and invite logged.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset applications and jobs to the original CDC/CCIH hospital demo dataset?')) {
      const reset = resetToDemoData();
      setJobs(reset.jobs);
      setApplications(reset.applications);
      showToast('Demo data restored to initial state.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hospital Navigation Header */}
      <HospitalHeader
        currentView={currentView}
        onNavigate={view => setCurrentView(view)}
        onOpenPostJobModal={() => setIsJobManageModalOpen(true)}
        totalOpenJobs={jobs.filter(j => j.status !== 'closed').length}
        totalApplications={applications.length}
        onResetDemoData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentView === 'applicant' && (
          <JobList
            jobs={jobs}
            onSelectJobForDetails={job => setSelectedJobForDetails(job)}
            onApplyForJob={handleApplyClick}
            onNavigateToTracker={() => setCurrentView('tracker')}
          />
        )}

        {currentView === 'tracker' && (
          <ApplicationTrackerModal
            applications={applications}
            defaultSearchId={trackerSearchId}
            onApplyForOtherPosition={() => setCurrentView('applicant')}
          />
        )}

        {currentView === 'hr_dashboard' && (
          <HRDashboard
            applications={applications}
            jobs={jobs}
            onSelectApplication={app => setSelectedAppForDossier(app)}
            onOpenNewJobModal={() => setIsJobManageModalOpen(true)}
            onUpdateStatus={handleUpdateAppStatus}
            onUpdateRating={handleUpdateAppRating}
            onScheduleInterviewForApp={app => setSelectedAppForDossier(app)}
          />
        )}
      </main>

      {/* MODALS */}

      {/* 1. Job Details Modal */}
      <JobDetailModal
        job={selectedJobForDetails}
        onClose={() => setSelectedJobForDetails(null)}
        onApply={job => {
          setSelectedJobForDetails(null);
          handleApplyClick(job);
        }}
      />

      {/* 2. Applicant Multi-Step Application Form */}
      <ApplicationFormModal
        isOpen={isApplyModalOpen}
        initialJob={jobToApply}
        allJobs={jobs.filter(j => j.status !== 'closed')}
        onClose={() => {
          setIsApplyModalOpen(false);
          setJobToApply(null);
        }}
        onSubmitApplication={handleSubmitApplication}
        onNavigateToTrackerWithId={id => {
          setTrackerSearchId(id);
          setCurrentView('tracker');
        }}
      />

      {/* 3. HR Candidate Dossier & Interview Scheduler */}
      <ApplicantDossierModal
        application={selectedAppForDossier}
        onClose={() => setSelectedAppForDossier(null)}
        onUpdateStatus={handleUpdateAppStatus}
        onUpdateRating={handleUpdateAppRating}
        onAddHRNote={handleAddHRNote}
        onScheduleInterview={handleScheduleInterview}
      />

      {/* 4. Admin Job Vacancy Post & Manager */}
      <JobManagementModal
        isOpen={isJobManageModalOpen}
        onClose={() => setIsJobManageModalOpen(false)}
        jobs={jobs}
        onAddNewJob={handleAddNewJob}
        onToggleJobStatus={handleToggleJobStatus}
      />

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1 */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-white font-extrabold text-lg tracking-tight font-['Outfit']">
                  CDC / CCIH Islamabad
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                Capital Diagnostic Centre & Comprehensive Care International Hospital (CDC/CCIH), Sector G-8 & Blue Area Islamabad. 
                Equipped with automated Pathology Lab, 128-Slice CT, 1.5T MRI, 24/7 Emergency, ICU, and Outpatient Specialties.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-emerald-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PMDC & PNC Recognized Facility
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ISO & RIQAS Calibrated Lab
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Vercel SPA Compatible
                </span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Hospital Departments</h4>
              <ul className="space-y-1.5 text-xs">
                <li>Diagnostic Pathology Laboratory</li>
                <li>Radiology, CT & MRI Imaging</li>
                <li>Emergency & Critical Care ICU</li>
                <li>Inpatient Nursing & Surgery</li>
                <li>Hospital Pharmacy & Formulary</li>
                <li>Accounts, Billing & HR Team</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Contact Recruitment</h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Sector G-8 Markaz, Islamabad, Pakistan
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  +92 (51) 228-4001 / +92 (51) 228-4002
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  careers@cdc-ccih.hospital.pk
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© 2026 Capital Diagnostic Centre & CCIH Hospital Islamabad. All rights reserved.</p>
            <p>E-Recruitment System • Secure Hospital Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
