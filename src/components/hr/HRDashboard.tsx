import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  Calendar, 
  Star, 
  Eye, 
  Users, 
  CheckCircle2, 
  Clock, 
  CalendarCheck, 
  Award, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Layers, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Flame,
  FileSpreadsheet
} from 'lucide-react';
import { 
  JobApplication, 
  JobPost, 
  ApplicationStatus, 
  DepartmentCategory, 
  InterviewSchedule 
} from '../../types';
import { DEPARTMENTS } from '../../data/mockData';
import { getDepartmentInfo, getStatusBadge, exportApplicationsToCSV } from '../../utils/formatters';

interface HRDashboardProps {
  applications: JobApplication[];
  jobs: JobPost[];
  onSelectApplication: (app: JobApplication) => void;
  onOpenNewJobModal: () => void;
  onUpdateStatus: (appId: string, newStatus: ApplicationStatus) => void;
  onUpdateRating: (appId: string, rating: number) => void;
  onScheduleInterviewForApp: (app: JobApplication) => void;
}

export const HRDashboard: React.FC<HRDashboardProps> = ({
  applications,
  jobs,
  onSelectApplication,
  onOpenNewJobModal,
  onUpdateStatus,
  onUpdateRating,
  onScheduleInterviewForApp,
}) => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMinExp, setSelectedMinExp] = useState<string>('all');
  const [selectedQualification, setSelectedQualification] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date_desc' | 'rating_desc' | 'exp_desc' | 'name_asc'>('date_desc');

  // KPI Metrics Calculation
  const metrics = useMemo(() => {
    const total = applications.length;
    const newApps = applications.filter(a => a.status === 'new' || a.status === 'under_review').length;
    const shortlisted = applications.filter(a => a.status === 'shortlisted').length;
    const interviews = applications.filter(a => a.status === 'interview_scheduled').length;
    const hired = applications.filter(a => a.status === 'hired' || a.status === 'offer_extended').length;
    const openPosts = jobs.filter(j => j.status !== 'closed').length;

    return { total, newApps, shortlisted, interviews, hired, openPosts };
  }, [applications, jobs]);

  // Department counts for applications
  const deptAppCounts = useMemo(() => {
    const map: Record<string, number> = {};
    applications.forEach(a => {
      map[a.department] = (map[a.department] || 0) + 1;
    });
    return map;
  }, [applications]);

  // Filtering Engine
  const filteredApplications = useMemo(() => {
    return applications
      .filter(app => {
        // Search filter
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          app.fullName.toLowerCase().includes(query) ||
          app.id.toLowerCase().includes(query) ||
          app.cnic.toLowerCase().includes(query) ||
          app.jobTitle.toLowerCase().includes(query) ||
          app.email.toLowerCase().includes(query) ||
          app.phone.toLowerCase().includes(query) ||
          app.highestDegree.toLowerCase().includes(query) ||
          (app.registrationNumber && app.registrationNumber.toLowerCase().includes(query)) ||
          (app.currentEmployer && app.currentEmployer.toLowerCase().includes(query));

        // Dept filter
        const matchesDept = selectedDept === 'all' || app.department === selectedDept;

        // Specific Job filter
        const matchesJob = selectedJobId === 'all' || app.jobId === selectedJobId;

        // Status filter
        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;

        // Experience filter
        let matchesExp = true;
        if (selectedMinExp === '0') matchesExp = app.totalExperienceYears <= 1;
        else if (selectedMinExp === '1') matchesExp = app.totalExperienceYears >= 1;
        else if (selectedMinExp === '3') matchesExp = app.totalExperienceYears >= 3;
        else if (selectedMinExp === '5') matchesExp = app.totalExperienceYears >= 5;
        else if (selectedMinExp === '10') matchesExp = app.totalExperienceYears >= 10;

        // Qualification tier filter
        let matchesQual = true;
        const degreeLower = (app.highestDegree + ' ' + (app.specialization || '')).toLowerCase();
        if (selectedQualification === 'doctor') {
          matchesQual =
            degreeLower.includes('mbbs') ||
            degreeLower.includes('fcps') ||
            degreeLower.includes('frcr') ||
            degreeLower.includes('m.phil');
        } else if (selectedQualification === 'diagnostic_mlt') {
          matchesQual =
            degreeLower.includes('mlt') ||
            degreeLower.includes('radiography') ||
            degreeLower.includes('imaging') ||
            degreeLower.includes('laboratory');
        } else if (selectedQualification === 'nursing_pharmacy') {
          matchesQual =
            degreeLower.includes('nurs') ||
            degreeLower.includes('pharm') ||
            degreeLower.includes('bscn');
        } else if (selectedQualification === 'finance_hr') {
          matchesQual =
            degreeLower.includes('acca') ||
            degreeLower.includes('mba') ||
            degreeLower.includes('bba') ||
            degreeLower.includes('m.com') ||
            degreeLower.includes('ca');
        }

        return matchesSearch && matchesDept && matchesJob && matchesStatus && matchesExp && matchesQual;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') return b.appliedAt.localeCompare(a.appliedAt);
        if (sortBy === 'rating_desc') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'exp_desc') return b.totalExperienceYears - a.totalExperienceYears;
        if (sortBy === 'name_asc') return a.fullName.localeCompare(b.fullName);
        return 0;
      });
  }, [
    applications,
    searchQuery,
    selectedDept,
    selectedJobId,
    selectedStatus,
    selectedMinExp,
    selectedQualification,
    sortBy,
  ]);

  // Active filter counter
  const activeFiltersCount = [
    selectedDept !== 'all',
    selectedJobId !== 'all',
    selectedStatus !== 'all',
    selectedMinExp !== 'all',
    selectedQualification !== 'all',
    Boolean(searchQuery.trim()),
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDept('all');
    setSelectedJobId('all');
    setSelectedStatus('all');
    setSelectedMinExp('all');
    setSelectedQualification('all');
    setSortBy('date_desc');
  };

  // Scheduled interviews for quick glance
  const upcomingInterviews = useMemo(() => {
    return applications
      .filter(a => a.status === 'interview_scheduled' && a.interviewDetails)
      .slice(0, 3);
  }, [applications]);

  return (
    <div className="space-y-8 pb-20">
      {/* Dashboard Top Greeting & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-0.5 rounded-md">
              Hospital Executive HR
            </span>
            <span className="text-xs text-slate-500">CDC/CCIH Islamabad Campus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
            Recruitment & Credentials Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage candidates across Diagnostic Lab, Radiology, Inpatient Hospital, Nursing, Pharmacy, HR, and Accounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportApplicationsToCSV(filteredApplications)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            title="Export currently filtered candidates as CSV spreadsheet"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenNewJobModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Vacancy</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div 
          onClick={() => { setSelectedStatus('all'); }}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-400 cursor-pointer transition-all"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Applications</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{metrics.total}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Active</span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedStatus('under_review')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs hover:border-blue-400 cursor-pointer transition-all bg-blue-50/20"
        >
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Under Review</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-900">{metrics.newApps}</span>
            <span className="text-[11px] text-blue-600 font-semibold">Pending</span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedStatus('shortlisted')}
          className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs hover:border-emerald-400 cursor-pointer transition-all bg-emerald-50/20"
        >
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Shortlisted</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900">{metrics.shortlisted}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Vetted</span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedStatus('interview_scheduled')}
          className="bg-white p-4 rounded-2xl border border-purple-200/80 shadow-xs hover:border-purple-400 cursor-pointer transition-all bg-purple-50/20"
        >
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">Interviews</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-900">{metrics.interviews}</span>
            <span className="text-[11px] text-purple-600 font-semibold">Scheduled</span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedStatus('hired')}
          className="bg-white p-4 rounded-2xl border border-teal-200/80 shadow-xs hover:border-teal-400 cursor-pointer transition-all bg-teal-50/20"
        >
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">Hired / Offered</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-900">{metrics.hired}</span>
            <span className="text-[11px] text-teal-600 font-semibold">Selected</span>
          </div>
        </div>

        <div 
          onClick={onOpenNewJobModal}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 cursor-pointer transition-all"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Open Positions</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{metrics.openPosts}</span>
            <span className="text-[11px] text-slate-500 font-semibold">Vacancies</span>
          </div>
        </div>
      </div>

      {/* Upcoming Scheduled Interviews Preview Widget (if any) */}
      {upcomingInterviews.length > 0 && (
        <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-purple-300" />
              <h3 className="text-sm font-bold font-['Outfit'] tracking-wide">
                Upcoming Panel Interviews (CDC Boardroom, Islamabad)
              </h3>
            </div>
            <span className="text-xs text-purple-200 font-semibold">
              {upcomingInterviews.length} Candidate(s) Scheduled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {upcomingInterviews.map(cand => (
              <div
                key={cand.id}
                onClick={() => onSelectApplication(cand)}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300">{cand.fullName}</span>
                  <span className="text-[11px] text-purple-200 font-mono">{cand.id}</span>
                </div>
                <p className="text-xs text-slate-300 truncate mt-0.5">{cand.jobTitle}</p>
                <div className="flex items-center justify-between text-[11px] text-purple-200 mt-2 pt-2 border-t border-white/10">
                  <span>📅 {cand.interviewDetails?.scheduledDate}</span>
                  <span>⏰ {cand.interviewDetails?.scheduledTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hospital Departments Distribution Filter Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Quick Filter by Hospital Department:
          </span>
          {selectedDept !== 'all' && (
            <button
              onClick={() => setSelectedDept('all')}
              className="text-xs text-emerald-600 hover:text-emerald-800 font-semibold"
            >
              Show All ({applications.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {DEPARTMENTS.map(dept => {
            const count = deptAppCounts[dept.id] || 0;
            const isSelected = selectedDept === dept.id;

            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(isSelected ? 'all' : dept.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] font-bold truncate block ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {dept.categoryLabel}
                </span>
                <span className="text-xs font-bold line-clamp-1 leading-tight">
                  {dept.name.replace('Diagnostic Center - ', '').replace('Hospital ', '')}
                </span>
                <div className="flex items-center justify-between text-[11px] font-semibold mt-1">
                  <span className={isSelected ? 'text-slate-300' : 'text-slate-400'}>Applications:</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Row 1: Search & Major Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Free Text Search */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search candidate, tracking ID, CNIC, degree, skills..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Specific Vacancy / Job Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedJobId}
              onChange={e => setSelectedJobId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-700 bg-slate-50/50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Applied Positions ({jobs.length})</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>
                  {j.title} ({j.department.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Experience Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedMinExp}
              onChange={e => setSelectedMinExp(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-700 bg-slate-50/50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Any Experience</option>
              <option value="0">Fresh / 0-1 Year</option>
              <option value="1">1+ Years</option>
              <option value="3">3+ Years</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years (Senior)</option>
            </select>
          </div>

          {/* Qualification Tier Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedQualification}
              onChange={e => setSelectedQualification(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-700 bg-slate-50/50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Academic Qualifications</option>
              <option value="doctor">Doctors (MBBS / FCPS / M.Phil)</option>
              <option value="diagnostic_mlt">Diagnostic (BS MLT / Radiography)</option>
              <option value="nursing_pharmacy">Nursing (BScN) & Pharmacy (Pharm-D)</option>
              <option value="finance_hr">HR & Accounts (ACCA / MBA / M.Com)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Status Pills & Sorting */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Statuses' },
              { id: 'new', label: 'New' },
              { id: 'under_review', label: 'Under Review' },
              { id: 'shortlisted', label: 'Shortlisted' },
              { id: 'interview_scheduled', label: 'Interview' },
              { id: 'hired', label: 'Hired' },
              { id: 'rejected', label: 'Not Selected' },
            ].map(st => {
              const isSelected = selectedStatus === st.id;
              const count =
                st.id === 'all'
                  ? applications.length
                  : applications.filter(a => a.status === st.id).length;

              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatus(st.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{st.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-slate-700 text-emerald-300' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort & Reset Actions */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
              >
                <option value="date_desc">Newest Applied</option>
                <option value="rating_desc">Highest Rated</option>
                <option value="exp_desc">Most Experienced</option>
                <option value="name_asc">Name (A-Z)</option>
              </select>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Applications List / Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
              Hospital Candidate Applications
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredApplications.length} of {applications.length} total applicant records
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Click candidate to view full dossier & schedule interview
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="text-center py-16 p-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No applicants match the selected filters</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Try relaxing your search query, department, or experience filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Applicant & Tracking ID</th>
                  <th className="py-3 px-4">Applied Role & Department</th>
                  <th className="py-3 px-4">Qualification & Council Reg</th>
                  <th className="py-3 px-4">Experience & Hospital</th>
                  <th className="py-3 px-4">Expected Salary</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredApplications.map(app => {
                  const dept = getDepartmentInfo(app.department);
                  const statusInfo = getStatusBadge(app.status);

                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                      onClick={() => onSelectApplication(app)}
                    >
                      {/* Name & ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-emerald-600 transition-colors">
                            {app.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                              {app.fullName}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                              <span className="font-mono text-emerald-700 font-semibold">{app.id}</span>
                              <span>•</span>
                              <span>{app.city}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Applied Role */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{app.jobTitle}</div>
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold border mt-1 ${dept.badgeColor}`}>
                          {dept.name}
                        </span>
                      </td>

                      {/* Qualification & Registration */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <div className="font-semibold text-slate-800 truncate" title={app.highestDegree}>
                          {app.highestDegree}
                        </div>
                        {app.registrationNumber ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-sm border border-emerald-200 mt-1">
                            <Award className="w-3 h-3 text-emerald-600" />
                            {app.registrationNumber}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Class of {app.passingYear}</span>
                        )}
                      </td>

                      {/* Experience */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">
                          {app.totalExperienceYears} Year(s)
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[150px]" title={app.currentEmployer}>
                          {app.currentEmployer || 'Fresh / Private'}
                        </div>
                      </td>

                      {/* Expected Salary */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-emerald-700">{app.expectedSalary}</span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{app.noticePeriodDays}d Notice</div>
                      </td>

                      {/* Interactive Rating */}
                      <td className="py-3.5 px-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              onClick={() => onUpdateRating(app.id, star)}
                              className="cursor-pointer hover:scale-110 transition-transform"
                              title={`Rate ${star} Stars`}
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  star <= app.rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </td>

                      {/* Status quick select & actions */}
                      <td className="py-3.5 px-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <select
                            value={app.status}
                            onChange={e => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${statusInfo.color}`}
                          >
                            <option value="new">New</option>
                            <option value="under_review">Under Review</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview_scheduled">Interview Scheduled</option>
                            <option value="offer_extended">Offer Extended</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Not Selected</option>
                          </select>

                          <button
                            onClick={() => onSelectApplication(app)}
                            className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="View Full Candidate Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
