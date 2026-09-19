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

export type EducationLevel =
  | 'SSC / Matric'
  | 'HSSC / Intermediate / FSc / FA'
  | 'BS / 16 Years of Education'
  | 'M.Phil / MS / 18 Years'
  | 'PhD / Doctorate'
  | 'Diploma / Certification'
  | 'Other';

export interface EducationEntry {
  id: string;
  level: EducationLevel | string;
  degreeName: string; // e.g. "Matric Science", "FSc Pre-Medical", "BS MLT", "MBBS", "M.Phil Pathology"
  passingYear: string; // e.g. "2018"
  boardOrUniversity: string; // e.g. "FBISE Islamabad", "Quaid-i-Azam University", "SZABMU / PIMS"
  gradeOrCgpa?: string; // e.g. "3.8 CGPA", "A+", "84%"
}

export interface ExperienceEntry {
  id: string;
  organization: string; // e.g. "Capital Care International Hospital", "PIMS Islamabad"
  designation: string; // e.g. "Medical Officer", "Staff Nurse", "Medical Lab Technologist"
  department?: string; // e.g. "Accident & Emergency / ICU"
  startDate: string; // e.g. "2021-02" or "2021"
  endDate: string; // e.g. "2024-05" or "Present"
  isCurrent?: boolean;
  responsibilities?: string;
}

export type InterviewRecommendation =
  | 'Strongly Recommended'
  | 'Recommended'
  | 'Conditional / Hold'
  | 'Not Recommended'
  | 'Pending Review';

export interface InterviewTeamMember {
  id: string;
  name: string; // e.g. "Dr. Tariq Mahmood"
  designation: string; // e.g. "Medical Director / Panel Chair"
  department?: string; // e.g. "Clinical Governance"
  recommendation?: InterviewRecommendation;
  rating?: number; // 1 to 10
  remarks: string; // Detailed member evaluation notes & clinical feedback
  evaluatedAt?: string;
}

export interface InterviewSchedule {
  scheduledDate: string;
  scheduledTime: string;
  venue: string; // e.g. "Capital Care International Hospital Executive Boardroom"
  interviewType: 'In-person' | 'Online Video' | 'Panel Assessment';
  panelMembers: string;
  teamMembers?: InterviewTeamMember[];
  overallDecision?: 'Recommended' | 'Shortlisted' | 'Offer Extended' | 'Not Selected' | 'Pending Evaluation';
  notes?: string;
}

export interface JobApplication {
  id: string; // e.g. CCIH-2026-1045
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
  
  // Qualifications & Multi-tier Education
  highestDegree: string;
  specialization: string;
  institution: string;
  passingYear: string;
  registrationNumber?: string; // PMDC, PNC, Pharmacy Council, etc.
  educationList?: EducationEntry[]; // Addable qualifications: SSC, HSSC, BS, M.Phil, PhD
  
  // Professional Experience
  totalExperienceYears: number;
  currentEmployer?: string;
  currentDesignation?: string;
  currentSalary?: string;
  expectedSalary: string;
  noticePeriodDays: number;
  experienceList?: ExperienceEntry[]; // Addable previous experience history
  
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
