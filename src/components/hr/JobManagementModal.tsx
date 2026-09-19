import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Banknote, 
  GraduationCap, 
  Award,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Flame
} from 'lucide-react';
import { JobPost, DepartmentCategory, EmploymentType } from '../../types';
import { DEPARTMENTS } from '../../data/mockData';
import { getDepartmentInfo } from '../../utils/formatters';

interface JobManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: JobPost[];
  onAddNewJob: (newJob: Omit<JobPost, 'id' | 'postedDate' | 'applicantCount'>) => void;
  onToggleJobStatus: (jobId: string, newStatus: 'open' | 'closed' | 'urgent') => void;
}

export const JobManagementModal: React.FC<JobManagementModalProps> = ({
  isOpen,
  onClose,
  jobs,
  onAddNewJob,
  onToggleJobStatus,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  
  // Create Job Form fields
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState<DepartmentCategory>('pathology_lab');
  const [subUnit, setSubUnit] = useState('Histopathology & Molecular Lab');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [location, setLocation] = useState('Capital Care International Hospital (CCIH), Sector G-8, Islamabad');
  const [minExperienceYears, setMinExperienceYears] = useState<number>(2);
  const [experienceLabel, setExperienceLabel] = useState('2+ Years');
  const [minQualification, setMinQualification] = useState('BSc MLT / MBBS');
  const [salaryRange, setSalaryRange] = useState('PKR 80,000 - 120,000 / month');
  const [openings, setOpenings] = useState<number>(2);
  const [deadline, setDeadline] = useState('2026-10-31');
  const [licenseRequired, setLicenseRequired] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  
  const [description, setDescription] = useState(
    'Responsible for high-precision diagnostic investigations, adherence to international quality controls, and collaborative hospital care.'
  );
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    'Carry out clinical investigations and diagnostics with precision\nEnsure daily calibration, controls, and equipment maintenance\nCoordinate directly with clinicians on urgent diagnostic findings'
  );
  const [requirementsText, setRequirementsText] = useState(
    'Relevant degree from recognized HEC university / PMDC recognized institute\nMinimum hands-on clinical or hospital experience\nStrong commitment to patient safety and quality protocols'
  );

  const [formSuccess, setFormSuccess] = useState(false);

  // Quick preset loader based on department
  const handleDeptChange = (newDept: DepartmentCategory) => {
    setDepartment(newDept);
    switch (newDept) {
      case 'pathology_lab':
        setSubUnit('Molecular Diagnostics & Hematology');
        setMinQualification('BSc MLT / M.Phil Pathology');
        setLicenseRequired('Medical Lab Council or PMDC if doctor');
        break;
      case 'radiology_imaging':
        setSubUnit('128-Slice CT & MRI Suite');
        setMinQualification('BS Radiography / FCPS Radiology');
        setLicenseRequired('PNRA / PMDC License');
        break;
      case 'hospital_clinical':
        setSubUnit('Emergency Trauma & Critical Care');
        setMinQualification('MBBS + 1 Year House Job');
        setLicenseRequired('PMDC Active License');
        break;
      case 'hospital_nursing':
        setSubUnit('ICU & Emergency Ward');
        setMinQualification('BSc Nursing (Generic)');
        setLicenseRequired('Pakistan Nursing Council (PNC)');
        break;
      case 'hospital_pharmacy':
        setSubUnit('Inpatient Hospital Pharmacy');
        setMinQualification('Pharm-D (Doctor of Pharmacy)');
        setLicenseRequired('Pharmacy Council Category-A');
        break;
      case 'accounts_finance':
        setSubUnit('Hospital Patient Billing & Insurance Panels');
        setMinQualification('ACCA / M.Com / BBA Finance');
        setLicenseRequired('');
        break;
      case 'hr_team':
        setSubUnit('Hospital HR & Medical Staff Credentialing');
        setMinQualification('BBA / MBA Human Resources');
        setLicenseRequired('');
        break;
      default:
        setSubUnit('Hospital Operations');
        setMinQualification('Bachelor / Master');
        setLicenseRequired('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const responsibilities = responsibilitiesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    onAddNewJob({
      title: title.trim(),
      department,
      subUnit: subUnit.trim(),
      employmentType,
      location: location.trim(),
      minExperienceYears: Number(minExperienceYears),
      experienceLabel: experienceLabel.trim() || `${minExperienceYears}+ Years`,
      minQualification: minQualification.trim(),
      salaryRange: salaryRange.trim(),
      openings: Number(openings),
      deadline,
      description: description.trim(),
      responsibilities,
      requirements,
      status: isUrgent ? 'urgent' : 'open',
      licenseRequired: licenseRequired.trim() || undefined,
    });

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveTab('manage');
      setTitle('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Hospital Admin Console
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit'] mt-0.5">
              Capital Care International Hospital (CCIH) Vacancy Manager
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close vacancy manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-4 sm:px-6 border-b border-slate-100 flex items-center gap-3 sm:gap-4 bg-slate-50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('create')}
            className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
              activeTab === 'create'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>Create New Vacancy</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
              activeTab === 'manage'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span>All Published Posts ({jobs.length})</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          {activeTab === 'create' ? (
            <div className="space-y-6">
              {formSuccess && (
                <div className="p-4 bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  New vacancy posted successfully! It is now live on the public applicant portal.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Department Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hospital Department <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={department}
                      onChange={e => handleDeptChange(e.target.value as DepartmentCategory)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    >
                      {DEPARTMENTS.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sub-Unit */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sub-Unit / Section
                    </label>
                    <input
                      type="text"
                      value={subUnit}
                      onChange={e => setSubUnit(e.target.value)}
                      placeholder="e.g. Molecular Biology, CT Scan, ICU, Corporate Accounts"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Job Title */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Job Position Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g. Senior Medical Lab Technologist, Consultant Radiologist, Accounts Officer"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      value={employmentType}
                      onChange={e => setEmploymentType(e.target.value as EmploymentType)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Rotational">Rotational Shift</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Locum">Locum / Visiting</option>
                      <option value="Night Shift">Night Shift</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="Capital Care International Hospital (CCIH), Islamabad"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Minimum Qualification */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Required Qualification <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={minQualification}
                      onChange={e => setMinQualification(e.target.value)}
                      placeholder="e.g. BS MLT / FCPS / MBBS / ACCA"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* License */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Required Medical / Regulatory License (Optional)
                    </label>
                    <input
                      type="text"
                      value={licenseRequired}
                      onChange={e => setLicenseRequired(e.target.value)}
                      placeholder="e.g. PMDC Active License, PNC, Pharmacy Council Cat-A"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Experience & Salary */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Minimum Experience (Years)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={minExperienceYears}
                      onChange={e => {
                        setMinExperienceYears(Number(e.target.value));
                        setExperienceLabel(`${e.target.value}+ Years`);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Salary Range (PKR)
                    </label>
                    <input
                      type="text"
                      value={salaryRange}
                      onChange={e => setSalaryRange(e.target.value)}
                      placeholder="e.g. PKR 75,000 - 100,000 / month"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Openings & Deadline */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Openings</label>
                    <input
                      type="number"
                      min={1}
                      value={openings}
                      onChange={e => setOpenings(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={e => setDeadline(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Urgent Checkbox */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-800">Mark as Urgent Hiring</span>
                      <p className="text-[11px] text-slate-500">
                        Displays an urgent badge on public vacancy cards
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={e => setIsUrgent(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300"
                  />
                </div>

                {/* Role Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Overview & Scope
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Key Responsibilities */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Key Responsibilities (One item per line)
                  </label>
                  <textarea
                    rows={3}
                    value={responsibilitiesText}
                    onChange={e => setResponsibilitiesText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Eligibility Requirements (One item per line)
                  </label>
                  <textarea
                    rows={3}
                    value={requirementsText}
                    onChange={e => setRequirementsText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Publish Vacancy to Portal</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Manage existing jobs */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
                <span>Manage active postings, close filled roles, or flag urgent vacancies:</span>
                <span className="font-bold text-slate-800">{jobs.length} Total Registered Vacancies</span>
              </div>

              <div className="space-y-3">
                {jobs.map(job => {
                  const dept = getDepartmentInfo(job.department);
                  return (
                    <div
                      key={job.id}
                      className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${dept.badgeColor}`}>
                            {dept.name}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">{job.id}</span>
                          {job.status === 'urgent' && (
                            <span className="px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-sm">
                              Urgent
                            </span>
                          )}
                          {job.status === 'closed' && (
                            <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-sm">
                              Closed
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>
                        <p className="text-xs text-slate-500">
                          {job.subUnit} • {job.experienceLabel} • {job.salaryRange}
                        </p>
                      </div>

                      {/* Status toggle actions */}
                      <div className="flex items-center gap-2">
                        <select
                          value={job.status}
                          onChange={e => onToggleJobStatus(job.id, e.target.value as any)}
                          className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-slate-50 cursor-pointer"
                        >
                          <option value="open">Open (Active)</option>
                          <option value="urgent">Urgent Hiring</option>
                          <option value="closed">Closed / Archived</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
