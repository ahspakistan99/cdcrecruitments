import React, { useState } from 'react';
import { 
  X, 
  Check, 
  UploadCloud, 
  FileText, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Copy, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  User,
  GraduationCap,
  Briefcase,
  FileCheck,
  Plus,
  Trash2,
  Layers,
  Award,
  Clock
} from 'lucide-react';
import { JobPost, JobApplication, EducationEntry, ExperienceEntry, EducationLevel } from '../../types';
import { formatCNIC, formatPhone, getDepartmentInfo } from '../../utils/formatters';

interface ApplicationFormModalProps {
  initialJob: JobPost | null;
  allJobs: JobPost[];
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (appData: Omit<JobApplication, 'id' | 'appliedAt' | 'status' | 'rating' | 'hrNotes' | 'tags'>) => string; // returns generated tracking ID
  onNavigateToTrackerWithId: (id: string) => void;
}

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  initialJob,
  allJobs,
  isOpen,
  onClose,
  onSubmitApplication,
  onNavigateToTrackerWithId,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJob?.id || (allJobs[0]?.id ?? ''));

  // Form fields - Step 1
  const [fullName, setFullName] = useState('');
  const [fatherOrHusbandName, setFatherOrHusbandName] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [dob, setDob] = useState('1996-05-15');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Islamabad');
  const [address, setAddress] = useState('');

  // Step 2: Multi-tier Addable Education & Professional Licensure
  const [educationList, setEducationList] = useState<EducationEntry[]>([
    {
      id: 'edu-1',
      level: 'SSC / Matric',
      degreeName: 'Matriculation (Science)',
      passingYear: '2016',
      boardOrUniversity: 'FBISE Islamabad',
      gradeOrCgpa: 'A+ / 86%'
    },
    {
      id: 'edu-2',
      level: 'HSSC / Intermediate / FSc / FA',
      degreeName: 'F.Sc Pre-Medical',
      passingYear: '2018',
      boardOrUniversity: 'FBISE Islamabad',
      gradeOrCgpa: 'A / 82%'
    },
    {
      id: 'edu-3',
      level: 'BS / 16 Years of Education',
      degreeName: 'BS Medical Laboratory Technology',
      passingYear: '2022',
      boardOrUniversity: 'SZABMU / PIMS Islamabad',
      gradeOrCgpa: '3.75 CGPA'
    }
  ]);
  const [specialization, setSpecialization] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  // Step 3: Multi-tier Addable Experience & Compensation
  const [isFreshGraduate, setIsFreshGraduate] = useState(false);
  const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([
    {
      id: 'exp-1',
      organization: 'Capital Care International Hospital (CCIH)',
      designation: 'Medical Laboratory Technologist',
      department: 'Pathology & Hematology Unit',
      startDate: '2022-07',
      endDate: 'Present',
      isCurrent: true,
      responsibilities: 'Conducted routine diagnostic testing, automated hematology and clinical biochemistry analyzers calibration, and internal quality controls.'
    }
  ]);
  const [totalExperienceYears, setTotalExperienceYears] = useState<number>(2);
  const [currentSalary, setCurrentSalary] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('PKR 85,000');
  const [noticePeriodDays, setNoticePeriodDays] = useState<number>(15);

  // Documents - Step 4
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeFileSize, setResumeFileSize] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [hasCnicCopy, setHasCnicCopy] = useState(true);
  const [hasDegreeCopy, setHasDegreeCopy] = useState(true);
  const [hasLicenseCopy, setHasLicenseCopy] = useState(false);

  // Submission success state
  const [submittedTrackingId, setSubmittedTrackingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const currentJob = allJobs.find(j => j.id === selectedJobId) || allJobs[0];
  const dept = currentJob ? getDepartmentInfo(currentJob.department) : null;

  // Education Helpers
  const handleAddEducation = (presetLevel?: EducationLevel, presetDegree = '') => {
    const newEntry: EducationEntry = {
      id: `edu-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      level: presetLevel || 'BS / 16 Years of Education',
      degreeName: presetDegree,
      passingYear: new Date().getFullYear().toString(),
      boardOrUniversity: '',
      gradeOrCgpa: ''
    };
    setEducationList(prev => [...prev, newEntry]);
  };

  const handleRemoveEducation = (id: string) => {
    if (educationList.length <= 1) return;
    setEducationList(prev => prev.filter(e => e.id !== id));
  };

  const handleUpdateEducation = (id: string, field: keyof EducationEntry, val: string) => {
    setEducationList(prev => prev.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  // Experience Helpers
  const handleAddExperience = () => {
    const newExp: ExperienceEntry = {
      id: `exp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      organization: '',
      designation: '',
      department: '',
      startDate: '',
      endDate: 'Present',
      isCurrent: true,
      responsibilities: ''
    };
    setExperienceList(prev => [...prev, newExp]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperienceList(prev => prev.filter(e => e.id !== id));
  };

  const handleUpdateExperience = (id: string, field: keyof ExperienceEntry, val: any) => {
    setExperienceList(prev => prev.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  // Step Validations
  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!fullName.trim()) errors.fullName = 'Full name is required';
      if (!cnic.trim() || cnic.replace(/\D/g, '').length < 13) {
        errors.cnic = 'Valid 13-digit CNIC is required (e.g. 61101-1234567-1)';
      }
      if (!email.trim() || !email.includes('@')) errors.email = 'Valid email address is required';
      if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Valid phone number is required (e.g. 0300-1234567)';
      }
      if (!city.trim()) errors.city = 'City of residence is required';
    }

    if (currentStep === 2) {
      if (educationList.length === 0) {
        errors.education = 'Please add at least one educational qualification';
      } else {
        const incomplete = educationList.some(e => !e.degreeName.trim() || !e.boardOrUniversity.trim());
        if (incomplete) {
          errors.education = 'Please fill degree name and board/university for all listed qualifications';
        }
      }
      if (currentJob?.licenseRequired && !registrationNumber.trim()) {
        errors.registrationNumber = `Registration number required for this medical role (${currentJob.licenseRequired})`;
      }
    }

    if (currentStep === 3) {
      if (!isFreshGraduate && experienceList.length > 0) {
        const incomplete = experienceList.some(e => !e.organization.trim() || !e.designation.trim());
        if (incomplete) {
          errors.experience = 'Please specify employer/hospital name and job title for each experience entry';
        }
      }
      if (!expectedSalary.trim()) errors.expectedSalary = 'Please state expected monthly salary';
    }

    if (currentStep === 4) {
      if (!resumeFileName) {
        errors.resumeFileName = 'Please attach or select your CV / Resume document';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setResumeFileSize(`${sizeMb} MB`);
      if (formErrors.resumeFileName) {
        setFormErrors(prev => ({ ...prev, resumeFileName: '' }));
      }
    }
  };

  const handleSimulateQuickCV = () => {
    const sanitizedName = fullName.replace(/\s+/g, '_') || 'Applicant';
    setResumeFileName(`${sanitizedName}_CV_CCIH_Islamabad.pdf`);
    setResumeFileSize('1.4 MB');
    if (formErrors.resumeFileName) {
      setFormErrors(prev => ({ ...prev, resumeFileName: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    if (!currentJob) return;

    // Determine highest degree and institute from top qualification entry
    const primaryEdu = educationList[educationList.length - 1] || educationList[0];
    const highestDegreeName = primaryEdu ? `${primaryEdu.degreeName} (${primaryEdu.level})` : 'Undergraduate';
    const institutionName = primaryEdu ? primaryEdu.boardOrUniversity : '';
    const passingYearValue = primaryEdu ? primaryEdu.passingYear : '';

    // Determine current employer and designation
    const activeExp = experienceList.find(e => e.isCurrent) || experienceList[0];
    const employerName = isFreshGraduate ? 'Fresh Graduate' : (activeExp ? activeExp.organization : '');
    const designationName = isFreshGraduate ? 'Entry Level' : (activeExp ? activeExp.designation : '');

    const trackingId = onSubmitApplication({
      jobId: currentJob.id,
      jobTitle: currentJob.title,
      department: currentJob.department,
      fullName,
      fatherOrHusbandName,
      cnic,
      gender,
      dob,
      email,
      phone,
      city,
      address,
      highestDegree: highestDegreeName,
      specialization: specialization || primaryEdu?.degreeName || '',
      institution: institutionName,
      passingYear: passingYearValue,
      registrationNumber,
      educationList,
      totalExperienceYears: isFreshGraduate ? 0 : totalExperienceYears,
      currentEmployer: employerName,
      currentDesignation: designationName,
      currentSalary,
      expectedSalary,
      noticePeriodDays,
      experienceList: isFreshGraduate ? [] : experienceList,
      resumeFileName: resumeFileName || `${fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      resumeFileSize: resumeFileSize || '1.2 MB',
      coverLetter,
      hasCnicCopy,
      hasDegreeCopy,
      hasLicenseCopy,
    });

    setSubmittedTrackingId(trackingId);
  };

  const handleCopyTrackingId = () => {
    if (submittedTrackingId) {
      navigator.clipboard.writeText(submittedTrackingId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Capital Care International Hospital (CCIH)
              </span>
              <span className="text-xs text-slate-400">Islamabad Campus</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit'] mt-0.5">
              {submittedTrackingId ? 'Application Confirmation' : 'Hospital Job Application Form'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close application form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success / Confirmation Screen */}
        {submittedTrackingId ? (
          <div className="p-5 sm:p-8 text-center space-y-5 sm:space-y-6 flex-1 flex flex-col items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1.5 sm:space-y-2 max-w-md">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
                Application Successfully Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Thank you, <strong>{fullName}</strong>. Your job application for{' '}
                <strong>{currentJob?.title}</strong> has been recorded in the Capital Care International Hospital (CCIH) recruitment database.
              </p>
            </div>

            {/* Tracking ID Callout */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl w-full max-w-md space-y-2 border border-slate-800 shadow-lg">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Your Official Application Tracking ID
              </span>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-wider">
                  {submittedTrackingId}
                </span>
                <button
                  onClick={handleCopyTrackingId}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors min-h-[40px] flex items-center justify-center"
                  title="Copy Tracking ID"
                >
                  {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                Please save this Tracking ID to check status or communicate with HR.
              </p>
            </div>

            {/* Next Steps Info */}
            <div className="p-3.5 sm:p-4 bg-emerald-50/70 rounded-2xl text-left text-xs text-emerald-900 border border-emerald-200/80 w-full max-w-md space-y-1.5 sm:space-y-2">
              <h4 className="font-bold flex items-center gap-1.5 text-emerald-950">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                What Happens Next?
              </h4>
              <ul className="space-y-1.5 text-emerald-800 list-disc list-inside">
                <li>The Medical & HR Credentials Board will review your CV and degrees.</li>
                <li>Shortlisted candidates will receive interview call/SMS and scheduling details.</li>
                <li>You can track your live review stage anytime using your Tracking ID or CNIC.</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full max-w-md">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTrackerWithId(submittedTrackingId);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>Track Status Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                Close & Return to Jobs
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Application Form */
          <div className="flex-1 flex flex-col justify-between">
            {/* Step Progress Indicator */}
            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">
                <span className="font-bold text-slate-800 truncate mr-2">
                  Step {step}/4: {' '}
                  {step === 1 && 'Personal Info'}
                  {step === 2 && 'Qualifications & Licensure'}
                  {step === 3 && 'Experience & Pay'}
                  {step === 4 && 'Documents & Submission'}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold shrink-0">{Math.round((step / 4) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
              {/* Step 1: Position & Personal Info */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Position selector */}
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
                    <label className="text-xs font-bold text-emerald-950 uppercase tracking-wide block">
                      Selected Position for Application:
                    </label>
                    <select
                      value={selectedJobId}
                      onChange={e => setSelectedJobId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-sm font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500"
                    >
                      {allJobs.map(j => (
                        <option key={j.id} value={j.id}>
                          {j.title} — {j.subUnit} ({j.salaryRange.split('/')[0]})
                        </option>
                      ))}
                    </select>
                    {dept && (
                      <p className="text-[11px] text-emerald-800">
                        Department: <strong>{dept.name}</strong> • Location: Sector G-8, Islamabad
                      </p>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    Personal & Contact Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Ayesha Farooq / Hamza Abbasi"
                        className={`w-full px-3 py-2 rounded-xl border text-sm ${
                          formErrors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                        } focus:ring-2 focus:ring-emerald-500`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Father / Husband Name
                      </label>
                      <input
                        type="text"
                        value={fatherOrHusbandName}
                        onChange={e => setFatherOrHusbandName(e.target.value)}
                        placeholder="e.g. Muhammad Farooq"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        CNIC Number (13 Digits) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cnic}
                        onChange={e => setCnic(formatCNIC(e.target.value))}
                        placeholder="e.g. 61101-1234567-1"
                        maxLength={15}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-mono ${
                          formErrors.cnic ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                        } focus:ring-2 focus:ring-emerald-500`}
                      />
                      {formErrors.cnic && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.cnic}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={e => setGender(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Mobile Phone <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(formatPhone(e.target.value))}
                        placeholder="e.g. 0300-1234567"
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-mono ${
                          formErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                        } focus:ring-2 focus:ring-emerald-500`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. candidate@example.com"
                        className={`w-full px-3 py-2 rounded-xl border text-sm ${
                          formErrors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                        } focus:ring-2 focus:ring-emerald-500`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City of Current Residence <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="e.g. Islamabad / Rawalpindi"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Postal / Residential Address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="e.g. House No. 24, Street 12, Sector G-9/1, Islamabad"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Multi-tier Addable Qualifications (SSC, HSSC, BS, M.Phil, PhD) */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        Academic Degrees & Qualifications
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Add qualifications from SSC (Matric), HSSC (Intermediate), BS/16-Yr, to M.Phil and PhD.
                      </p>
                    </div>

                    {/* Quick Add Presets */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Add:</span>
                      <button
                        type="button"
                        onClick={() => handleAddEducation('SSC / Matric', 'Matriculation (Science)')}
                        className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                      >
                        + SSC
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddEducation('HSSC / Intermediate / FSc / FA', 'F.Sc Pre-Medical')}
                        className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                      >
                        + HSSC
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddEducation('BS / 16 Years of Education', 'BS / Bachelor')}
                        className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                      >
                        + BS (16-Yr)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddEducation('M.Phil / MS / 18 Years', 'M.Phil / Master')}
                        className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                      >
                        + M.Phil
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddEducation('PhD / Doctorate', 'Doctor of Philosophy (PhD)')}
                        className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                      >
                        + PhD
                      </button>
                    </div>
                  </div>

                  {formErrors.education && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formErrors.education}</span>
                    </div>
                  )}

                  {/* List of Education Cards */}
                  <div className="space-y-4">
                    {educationList.map((edu, idx) => (
                      <div
                        key={edu.id}
                        className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/90 transition-all space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                              {edu.level}
                            </span>
                          </div>
                          {educationList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveEducation(edu.id)}
                              className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1 rounded-md transition-colors text-xs flex items-center gap-1"
                              title="Remove this qualification"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline text-[11px]">Remove</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                          {/* Qualification Level Dropdown */}
                          <div className="sm:col-span-4">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Qualification Level <span className="text-rose-500">*</span>
                            </label>
                            <select
                              value={edu.level}
                              onChange={e => handleUpdateEducation(edu.id, 'level', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="SSC / Matric">SSC / Matric (10 Years)</option>
                              <option value="HSSC / Intermediate / FSc / FA">HSSC / Intermediate / FSc / FA (12 Years)</option>
                              <option value="BS / 16 Years of Education">BS / 16 Years of Education (MBBS/BSc/Pharm-D)</option>
                              <option value="M.Phil / MS / 18 Years">M.Phil / MS / 18 Years (Postgraduate)</option>
                              <option value="PhD / Doctorate">PhD / Doctorate (Terminal Degree)</option>
                              <option value="Diploma / Certification">Diploma / Clinical Certification</option>
                              <option value="Other">Other Academic Certification</option>
                            </select>
                          </div>

                          {/* Degree Name Input */}
                          <div className="sm:col-span-5">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Degree / Certificate Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={edu.degreeName}
                              onChange={e => handleUpdateEducation(edu.id, 'degreeName', e.target.value)}
                              placeholder="e.g. Matric Science, FSc Pre-Medical, BS MLT, MBBS, M.Phil"
                              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>

                          {/* Passing Year */}
                          <div className="sm:col-span-3">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Passing Year <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              maxLength={4}
                              value={edu.passingYear}
                              onChange={e => handleUpdateEducation(edu.id, 'passingYear', e.target.value)}
                              placeholder="e.g. 2021"
                              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>

                          {/* Board / University */}
                          <div className="sm:col-span-8">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Board / University / Institute <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={edu.boardOrUniversity}
                              onChange={e => handleUpdateEducation(edu.id, 'boardOrUniversity', e.target.value)}
                              placeholder="e.g. FBISE Islamabad, BISE Rawalpindi, SZABMU / PIMS, QAU, CPSP"
                              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>

                          {/* Grade / CGPA */}
                          <div className="sm:col-span-4">
                            <label className="block font-semibold text-slate-700 mb-1">
                              Grade / CGPA / Marks %
                            </label>
                            <input
                              type="text"
                              value={edu.gradeOrCgpa || ''}
                              onChange={e => handleUpdateEducation(edu.id, 'gradeOrCgpa', e.target.value)}
                              placeholder="e.g. 3.8 CGPA, A+, 85%"
                              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Qualification Button */}
                  <button
                    type="button"
                    onClick={() => handleAddEducation()}
                    className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Educational Qualification</span>
                  </button>

                  {/* Professional Council Licensure Block */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Regulatory Council Registration Number (PMDC / PMC / PNC / Pharmacy Council / ACCA)
                    </label>
                    <input
                      type="text"
                      value={registrationNumber}
                      onChange={e => setRegistrationNumber(e.target.value)}
                      placeholder="e.g. PMDC-49281-S or PNC-NR-51928 or N/A for administrative roles"
                      className={`w-full px-3 py-2 rounded-xl border text-sm font-mono ${
                        formErrors.registrationNumber ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                      } bg-white focus:ring-2 focus:ring-emerald-500`}
                    />
                    {formErrors.registrationNumber && (
                      <p className="text-[11px] text-rose-500">{formErrors.registrationNumber}</p>
                    )}
                    <p className="text-[11px] text-slate-500">
                      Mandatory for medical doctors, consultants, charge nurses, laboratory technologists, and pharmacists.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Multi-tier Addable Work Experience & Compensation */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-emerald-600" />
                        Employment & Work Experience
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Detail your previous hospital, clinical, laboratory, or administrative roles.
                      </p>
                    </div>

                    {/* Fresh Graduate Toggle */}
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl cursor-pointer select-none text-xs font-semibold text-slate-700 border border-slate-200 transition-colors">
                      <input
                        type="checkbox"
                        checked={isFreshGraduate}
                        onChange={e => setIsFreshGraduate(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Fresh Graduate / No Prior Experience</span>
                    </label>
                  </div>

                  {formErrors.experience && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formErrors.experience}</span>
                    </div>
                  )}

                  {isFreshGraduate ? (
                    <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl text-center space-y-2">
                      <Sparkles className="w-6 h-6 text-blue-600 mx-auto" />
                      <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Applying as Fresh Graduate / Entry Level
                      </h4>
                      <p className="text-xs text-blue-700 max-w-md mx-auto">
                        Prior professional hospital experience is marked as waived. Capital Care International Hospital provides structured on-the-job clinical and administrative orientation for newly qualified professionals.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* List of Addable Experience Cards */}
                      {experienceList.map((exp, idx) => (
                        <div
                          key={exp.id}
                          className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="text-xs font-bold text-slate-800">
                                {exp.organization ? exp.organization : `Experience Record #${idx + 1}`}
                              </span>
                              {exp.isCurrent && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                  Current Role
                                </span>
                              )}
                            </div>
                            {experienceList.length > 0 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveExperience(exp.id)}
                                className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1 rounded-md transition-colors text-xs flex items-center gap-1"
                                title="Remove this experience record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline text-[11px]">Remove</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                Hospital / Clinic / Employer Name <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={exp.organization}
                                onChange={e => handleUpdateExperience(exp.id, 'organization', e.target.value)}
                                placeholder="e.g. PIMS Islamabad, Shifa International, Capital Care International Hospital (CCIH)"
                                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                Designation / Role Title <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={exp.designation}
                                onChange={e => handleUpdateExperience(exp.id, 'designation', e.target.value)}
                                placeholder="e.g. Medical Officer, Charge Nurse, Lab Technologist"
                                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                Department / Specialty
                              </label>
                              <input
                                type="text"
                                value={exp.department || ''}
                                onChange={e => handleUpdateExperience(exp.id, 'department', e.target.value)}
                                placeholder="e.g. Emergency & Trauma, Pathology Lab, ICU"
                                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                Duration / Timeline
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={exp.startDate}
                                  onChange={e => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                                  placeholder="Start (e.g. 2021)"
                                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                                />
                                <input
                                  type="text"
                                  disabled={exp.isCurrent}
                                  value={exp.isCurrent ? 'Present' : exp.endDate}
                                  onChange={e => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                                  placeholder="End (e.g. 2023)"
                                  className={`w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 ${
                                    exp.isCurrent ? 'bg-slate-100 text-slate-500' : 'bg-white'
                                  }`}
                                />
                              </div>
                              <label className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!exp.isCurrent}
                                  onChange={e => {
                                    const checked = e.target.checked;
                                    handleUpdateExperience(exp.id, 'isCurrent', checked);
                                    if (checked) {
                                      handleUpdateExperience(exp.id, 'endDate', 'Present');
                                    }
                                  }}
                                  className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500"
                                />
                                <span>I currently work in this role</span>
                              </label>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block font-semibold text-slate-700 mb-1">
                                Key Clinical / Professional Responsibilities
                              </label>
                              <textarea
                                rows={2}
                                value={exp.responsibilities || ''}
                                onChange={e => handleUpdateExperience(exp.id, 'responsibilities', e.target.value)}
                                placeholder="Summary of duties, equipment operated, surgeries assisted, or patient load managed..."
                                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Experience Button */}
                      <button
                        type="button"
                        onClick={handleAddExperience}
                        className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Another Hospital / Organization Experience</span>
                      </button>
                    </div>
                  )}

                  {/* Compensation and Logistics Grid */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Compensation & Availability
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Total Professional Experience
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={0}
                            max={40}
                            disabled={isFreshGraduate}
                            value={isFreshGraduate ? 0 : totalExperienceYears}
                            onChange={e => setTotalExperienceYears(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                          />
                          <span className="text-xs text-slate-500 font-medium">Years</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Current Monthly Salary (PKR)
                        </label>
                        <input
                          type="text"
                          value={currentSalary}
                          onChange={e => setCurrentSalary(e.target.value)}
                          placeholder="e.g. PKR 70,000"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Expected Monthly Salary (PKR) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={expectedSalary}
                          onChange={e => setExpectedSalary(e.target.value)}
                          placeholder="e.g. PKR 95,000"
                          className={`w-full px-3 py-2 rounded-xl border text-sm ${
                            formErrors.expectedSalary ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                          } focus:ring-2 focus:ring-emerald-500 bg-white`}
                        />
                        {formErrors.expectedSalary && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.expectedSalary}</p>
                        )}
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Required Notice Period (Availability)
                        </label>
                        <select
                          value={noticePeriodDays}
                          onChange={e => setNoticePeriodDays(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option value={0}>Immediate Joining (0 Days)</option>
                          <option value={7}>1 Week (7 Days)</option>
                          <option value={15}>15 Days</option>
                          <option value={30}>1 Month (30 Days)</option>
                          <option value={60}>2 Months (60 Days)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Documents & Final Statement */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    CV / Resume Attachment & Document Checklist
                  </h3>

                  {/* Document Uploader */}
                  <div className="p-5 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center hover:bg-slate-100/60 transition-colors">
                    <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="text-xs font-bold text-slate-800">
                      {resumeFileName ? 'Attached CV Document' : 'Upload your Curriculum Vitae (CV/Resume)'}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-3">
                      Supports PDF, DOC, or DOCX formats (Max 5MB)
                    </p>

                    {resumeFileName ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-emerald-300 text-emerald-800 text-xs font-medium shadow-xs">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>{resumeFileName}</span>
                        {resumeFileSize && <span className="text-[10px] text-slate-400">({resumeFileSize})</span>}
                        <button
                          type="button"
                          onClick={() => {
                            setResumeFileName('');
                            setResumeFileSize('');
                          }}
                          className="ml-1 text-slate-400 hover:text-rose-500"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <label className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs">
                          <span>Browse File</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleFileSimulate}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={handleSimulateQuickCV}
                          className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
                        >
                          Auto-Generate CV Attachment
                        </button>
                      </div>
                    )}

                    {formErrors.resumeFileName && (
                      <p className="text-[11px] text-rose-500 mt-2">{formErrors.resumeFileName}</p>
                    )}
                  </div>

                  {/* Checkbox checklist */}
                  <div className="space-y-2 p-4 bg-white rounded-2xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-800 block mb-1">
                      Available Supporting Documents for Interview:
                    </span>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasCnicCopy}
                        onChange={e => setHasCnicCopy(e.target.checked)}
                        className="rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Valid CNIC Copy available for verification</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasDegreeCopy}
                        onChange={e => setHasDegreeCopy(e.target.checked)}
                        className="rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>HEC / Board Verified Degree & Marksheets Available</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasLicenseCopy}
                        onChange={e => setHasLicenseCopy(e.target.checked)}
                        className="rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>PMDC / PNC / Pharmacy Council License Copy Available</span>
                    </label>
                  </div>

                  {/* Brief Cover Note */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brief Statement / Why you wish to join Capital Care International Hospital (CCIH)
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={e => setCoverLetter(e.target.value)}
                      placeholder="Mention your key diagnostic or clinical proficiencies, availability for shifts, or specific motivations..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Summary preview */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      By clicking submit, I certify that all information provided is accurate and true according to the
                      rules of Capital Care International Hospital (CCIH), Islamabad.
                    </span>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px] justify-center"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
                  >
                    Cancel
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer min-h-[44px] justify-center"
                  >
                    <span>Next: Step {step + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer min-h-[44px] justify-center"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Application</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
