import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Banknote, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Flame, 
  Building, 
  Sparkles,
  Award,
  Layers
} from 'lucide-react';
import { JobPost, DepartmentCategory } from '../../types';
import { DEPARTMENTS } from '../../data/mockData';
import { getDepartmentInfo } from '../../utils/formatters';

interface JobListProps {
  jobs: JobPost[];
  onSelectJobForDetails: (job: JobPost) => void;
  onApplyForJob: (job: JobPost) => void;
  onNavigateToTracker: () => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  onSelectJobForDetails,
  onApplyForJob,
  onNavigateToTracker,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Must be open or urgent
      if (job.status === 'closed') return false;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.subUnit.toLowerCase().includes(query) ||
        job.minQualification.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query);

      // Dept match
      const matchesDept = selectedDept === 'all' || job.department === selectedDept;

      // Type match
      const matchesType = selectedType === 'all' || job.employmentType === selectedType;

      return matchesSearch && matchesDept && matchesType;
    });
  }, [jobs, searchQuery, selectedDept, selectedType]);

  // Dept counts
  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = { all: jobs.filter(j => j.status !== 'closed').length };
    jobs.forEach(j => {
      if (j.status !== 'closed') {
        counts[j.department] = (counts[j.department] || 0) + 1;
      }
    });
    return counts;
  }, [jobs]);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-900 text-white p-5 sm:p-8 md:p-12 shadow-xl border border-teal-800/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Healthcare Careers in Islamabad
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] leading-tight">
            Build Your Clinical & Diagnostic Career at <span className="text-emerald-400">Capital Care International Hospital (CCIH)</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Join the capital’s premier healthcare network. We are inviting qualified Medical Specialists, 
            Pathologists, Radiologists, Lab Technologists, Critical Care Nurses, Pharmacists, and Healthcare 
            Finance & HR professionals to apply for immediate openings at our Islamabad setup.
          </p>

          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-emerald-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Diagnostic Center (Pathology & 128-Slice CT/MRI)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>24/7 Hospital Setup & Emergency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Competitive Packages & Provident Fund</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Stats Card */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-teal-800/60">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 border border-white/10">
            <span className="text-xl sm:text-2xl font-bold text-white block">{jobs.length}</span>
            <span className="text-[11px] sm:text-xs text-teal-200">Total Positions</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 border border-white/10">
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 block">
              {jobs.filter(j => j.department.includes('pathology') || j.department.includes('radiology')).length}
            </span>
            <span className="text-[11px] sm:text-xs text-teal-200">Diagnostic & Lab Openings</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 border border-white/10">
            <span className="text-xl sm:text-2xl font-bold text-teal-300 block">
              {jobs.filter(j => j.department.includes('hospital')).length}
            </span>
            <span className="text-[11px] sm:text-xs text-teal-200">Hospital & Nursing Posts</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 border border-white/10">
            <span className="text-xl sm:text-2xl font-bold text-amber-300 block">
              {jobs.filter(j => j.department.includes('hr') || j.department.includes('accounts')).length}
            </span>
            <span className="text-[11px] sm:text-xs text-teal-200">HR & Finance Vacancies</span>
          </div>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by job title, qualification (e.g. FCPS, MLT, Pharm-D, ACCA)..."
              className="w-full pl-10 pr-10 py-2.5 sm:py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-xs text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Employment Type Dropdown */}
          <div className="w-full md:w-56">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-700"
            >
              <option value="all">All Employment Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Rotational">Rotational Shift</option>
              <option value="Part-time">Part-time</option>
              <option value="Locum">Locum / Visiting</option>
              <option value="Night Shift">Night Shift</option>
            </select>
          </div>
        </div>

        {/* Department Chips Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Filter by Hospital Department:
            </span>
            {(selectedDept !== 'all' || selectedType !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDept('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="text-xs text-emerald-600 hover:text-emerald-800 font-semibold p-1"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[38px] ${
                selectedDept === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Departments ({deptCounts['all'] || 0})
            </button>

            {DEPARTMENTS.map(dept => {
              const count = deptCounts[dept.id] || 0;
              const isSelected = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{dept.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jobs Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit']">
            Available Positions at Capital Care International Hospital (CCIH), Islamabad
          </h2>
          <p className="text-xs text-slate-500">
            Showing {filteredJobs.length} active vacancies matching your criteria
          </p>
        </div>

        <button
          onClick={onNavigateToTracker}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 underline underline-offset-4 py-1 self-start sm:self-auto"
        >
          Already applied? Track your status
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Jobs Cards Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching vacancies found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            We couldn't find any active job openings matching your search criteria or filters.
          </p>
          <button
            onClick={() => {
              setSelectedDept('all');
              setSelectedType('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map(job => {
            const dept = getDepartmentInfo(job.department);
            const isUrgent = job.status === 'urgent';

            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Header & Dept Badge */}
                <div className="p-5 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${dept.badgeColor}`}>
                      {dept.name}
                    </span>
                    {isUrgent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-wider animate-pulse">
                        <Flame className="w-3 h-3" />
                        Urgent
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {job.subUnit}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Attributes Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    <div className="flex items-center gap-1.5" title="Required Experience">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.experienceLabel}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Salary Range">
                      <Banknote className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate font-medium text-emerald-700">{job.salaryRange.split('/')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2" title="Required Qualification">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.minQualification}</span>
                    </div>
                  </div>

                  {job.licenseRequired && (
                    <div className="bg-amber-50 text-amber-800 border border-amber-200/80 rounded-lg px-2.5 py-1 text-[11px] font-medium flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">Required: {job.licenseRequired}</span>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Deadline: {job.deadline}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectJobForDetails(job)}
                      className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold transition-colors cursor-pointer min-h-[38px] flex items-center justify-center"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onApplyForJob(job)}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1 min-h-[38px] justify-center"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
