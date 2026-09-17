import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  Banknote, 
  GraduationCap, 
  Briefcase, 
  CheckCircle, 
  Award, 
  Share2, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { JobPost } from '../../types';
import { getDepartmentInfo } from '../../utils/formatters';

interface JobDetailModalProps {
  job: JobPost | null;
  onClose: () => void;
  onApply: (job: JobPost) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose, onApply }) => {
  if (!job) return null;

  const dept = getDepartmentInfo(job.department);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${dept.badgeColor}`}>
              {dept.name}
            </span>
            {job.status === 'urgent' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 uppercase">
                Urgent Opening
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {job.subUnit}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
              {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-400" />
                {job.employmentType}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                Deadline: <strong className="text-slate-800">{job.deadline}</strong>
              </span>
            </div>
          </div>

          {/* Key Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Offered Compensation</span>
              <p className="text-sm font-bold text-emerald-700">{job.salaryRange}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Minimum Experience</span>
              <p className="text-sm font-semibold text-slate-800">{job.experienceLabel}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Open Vacancies</span>
              <p className="text-sm font-semibold text-slate-800">{job.openings} Position(s)</p>
            </div>
          </div>

          {/* Required License / Regulatory registration */}
          {job.licenseRequired && (
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">Mandatory Regulatory License</h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  Applicants must hold a valid registration certificate ({job.licenseRequired}) with verified registration number.
                </p>
              </div>
            </div>
          )}

          {/* Job Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">About the Role</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Key Responsibilities</h3>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements & Qualification */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Qualifications & Eligibility</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></div>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hospital Facilities Note */}
          <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 text-xs text-teal-900 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5 text-teal-950">
              <Building2 className="w-4 h-4 text-teal-700" />
              CDC/CCIH Islamabad Work Environment
            </h4>
            <p className="text-teal-800/90 leading-relaxed">
              Equipped with international standard diagnostic instruments, sterile operating theaters, 
              electronic medical records (HMIS), and a supportive peer environment. On-call allowances, 
              hospital medical coverage, and career growth pathways are extended to all permanent team members.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Back to Vacancies
          </button>

          <button
            onClick={() => {
              onClose();
              onApply(job);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Application Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
