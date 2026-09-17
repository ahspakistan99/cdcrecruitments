export type DepartmentCategory =
  | 'pathology_lab'
  | 'radiology_imaging'
  | 'hospital_clinical'
  | 'hospital_nursing'
  | 'hospital_pharmacy'
  | 'hr_team'
  | 'accounts_finance'
  | 'admin_support';

export interface DepartmentInfo {
  id: DepartmentCategory;
  name: string;
  categoryLabel: string;
  iconName: string;
  badgeColor: string;
  description: string;
}

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Locum' | 'Night Shift' | 'Rotational';

export interface JobPost {
  id: string;
  title: string;
  department: DepartmentCategory;
  subUnit: string; // e.g. "Histopathology & Molecular", "CT / MRI Section", "ICU / Emergency", "Talent Acquisition"
  employmentType: EmploymentType;
  location: string;
  minExperienceYears: number;
  experienceLabel: string;
  minQualification: string;
  salaryRange: string;
  openings: number;
  deadline: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: 'open' | 'closed' | 'urgent';
  postedDate: string;
  applicantCount: number;
  licenseRequired?: string; // e.g. "PMDC / PMC Valid License", "Pakistan Nursing Council (PNC)"
}

export type ApplicationStatus =
  | 'new'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'offer_extended'
  | 'hired'
  | 'rejected';

export interface HRNote {
  id: string;
  author: string;
  date: string;
  text: string;
}

export interface InterviewSchedule {
  scheduledDate: string;
  scheduledTime: string;
  venue: string; // e.g. "CDC Executive Board Room, Sector G-8, Islamabad"
  interviewType: 'In-person' | 'Online Video' | 'Panel Assessment';
  panelMembers: string;
  notes?: string;
}

export interface JobApplication {
  id: string; // e.g. CDC-2026-1045
  jobId: string;
  jobTitle: string;
  department: DepartmentCategory;
  appliedAt: string;
  
  // Personal Info
  fullName: string;
  fatherOrHusbandName: string;
  cnic: string; // 13-digit Pakistani CNIC e.g. 61101-1234567-1
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  
  // Qualifications
  highestDegree: string;
  specialization: string;
  institution: string;
  passingYear: string;
  registrationNumber?: string; // PMDC, PNC, Pharmacy Council, etc.
  
  // Experience
  totalExperienceYears: number;
  currentEmployer?: string;
  currentDesignation?: string;
  currentSalary?: string;
  expectedSalary: string;
  noticePeriodDays: number;
  
  // Documents & Cover Note
  resumeFileName: string;
  resumeFileSize?: string;
  coverLetter?: string;
  hasCnicCopy: boolean;
  hasDegreeCopy: boolean;
  hasLicenseCopy: boolean;
  
  // HR Workflow State
  status: ApplicationStatus;
  rating: number; // 1 - 5 stars
  hrNotes: HRNote[];
  interviewDetails?: InterviewSchedule;
  tags: string[];
}

export interface ApplicationFilterState {
  search: string;
  department: string; // 'all' or DepartmentCategory
  jobId: string; // 'all' or specific Job ID
  status: string; // 'all' or ApplicationStatus
  minExperience: string; // 'all' | '0' | '1' | '3' | '5' | '10'
  qualification: string; // 'all' | 'doctor' | 'master' | 'bachelor' | 'diploma'
  sortBy: 'date_desc' | 'date_asc' | 'rating_desc' | 'exp_desc' | 'name_asc';
}
