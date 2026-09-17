import { DepartmentInfo, JobPost, JobApplication } from '../types';

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'pathology_lab',
    name: 'Diagnostic Center - Pathology Lab',
    categoryLabel: 'Diagnostic Lab',
    iconName: 'FlaskConical',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'State-of-the-art automated diagnostic laboratory covering Hematology, Chemical Pathology, Histopathology, Microbiology & PCR Molecular Diagnostics.'
  },
  {
    id: 'radiology_imaging',
    name: 'Diagnostic Center - Radiology & Imaging',
    categoryLabel: 'Radiology',
    iconName: 'Scan',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description: 'Advanced medical imaging suite equipped with 128-Slice CT, 1.5T MRI, Color Doppler 4D Ultrasound, Digital X-Ray, and Mammography.'
  },
  {
    id: 'hospital_clinical',
    name: 'Hospital Clinical & Emergency Services',
    categoryLabel: 'Medical / Clinical',
    iconName: 'Stethoscope',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: '24/7 Emergency trauma care, ICU/CCU, Inpatient wards, and Specialized Outpatient Consultations at CDC/CCIH Hospital Islamabad.'
  },
  {
    id: 'hospital_nursing',
    name: 'Hospital Nursing & Critical Care',
    categoryLabel: 'Nursing Care',
    iconName: 'HeartPulse',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'PNC registered nursing staff providing round-the-clock intensive care, general wards, step-down, and pre/post-operative patient monitoring.'
  },
  {
    id: 'hospital_pharmacy',
    name: 'Hospital Pharmacy & Drug Formulary',
    categoryLabel: 'Pharmacy',
    iconName: 'Pill',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    description: 'Inpatient and outpatient retail pharmacy maintaining cold-chain integrity, emergency crash-cart stock, and prescription dispensation.'
  },
  {
    id: 'hr_team',
    name: 'HR Team & Talent Acquisition',
    categoryLabel: 'Human Resources',
    iconName: 'Users',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    description: 'Hospital human capital management, medical staff credentialing, onboarding, training, and employee welfare at CDC/CCIH.'
  },
  {
    id: 'accounts_finance',
    name: 'Accounts, Billing & Insurance',
    categoryLabel: 'Finance & Accounts',
    iconName: 'ReceiptText',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Patient billing, corporate panel approvals (Sehat Sahulat, insurance claims), payroll accounting, and hospital financial governance.'
  },
  {
    id: 'admin_support',
    name: 'Hospital Admin, IT & Biomedical',
    categoryLabel: 'Admin & IT',
    iconName: 'Building2',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    description: 'Hospital Information Management System (HMIS), medical equipment maintenance, patient front desk, and hospital hospitality.'
  }
];

export const INITIAL_JOB_POSTS: JobPost[] = [
  {
    id: 'CDC-JOB-101',
    title: 'Consultant Histopathologist',
    department: 'pathology_lab',
    subUnit: 'Histopathology & Molecular Lab',
    employmentType: 'Full-time',
    location: 'CDC/CCIH Main Campus, Sector G-8, Islamabad',
    minExperienceYears: 4,
    experienceLabel: '4+ Years Post-FCPS',
    minQualification: 'FCPS / M.Phil / MRCPath in Histopathology',
    salaryRange: 'PKR 250,000 - 350,000 / month',
    openings: 1,
    deadline: '2026-10-15',
    description: 'Leading the Histopathology diagnostic section at CDC Diagnostic Center Islamabad. Responsible for gross examination, micro-slide evaluations, biopsy reporting, frozen sections, and immunohistochemistry (IHC).',
    responsibilities: [
      'Evaluate biopsy and resection specimens with precision and prompt turn-around times (TAT)',
      'Perform and interpret Immunohistochemistry (IHC) and special stains for oncology cases',
      'Supervise lab technologists and grossing technicians in laboratory safety and quality protocols',
      'Participate in hospital Tumor Board multidisciplinary consultations'
    ],
    requirements: [
      'FCPS or recognized Level-IV qualification in Histopathology',
      'Active PMDC / PMC valid specialist registration',
      'Proven expertise in digital pathology and quality control (RIQAS / CAP accreditation standards)',
      'Excellent verbal and written communication skills'
    ],
    status: 'urgent',
    postedDate: '2026-09-01',
    applicantCount: 5,
    licenseRequired: 'PMDC / PMC Specialist License'
  },
  {
    id: 'CDC-JOB-102',
    title: 'Senior Medical Lab Technologist (MLT)',
    department: 'pathology_lab',
    subUnit: 'Hematology & Chemical Pathology',
    employmentType: 'Rotational',
    location: 'CDC Diagnostic Center, Islamabad',
    minExperienceYears: 2,
    experienceLabel: '2-4 Years',
    minQualification: 'BS Medical Laboratory Technology (BSc MLT 4 Years)',
    salaryRange: 'PKR 65,000 - 90,000 / month',
    openings: 3,
    deadline: '2026-10-10',
    description: 'Operation and calibration of automated hematology (Sysmex) and chemistry analyzers (Roche/Cobas), running daily QC controls, and conducting manual validations.',
    responsibilities: [
      'Operate automated analyzers and perform routine preventive maintenance',
      'Run standard controls, Westgard rules checks, and document Levey-Jennings charts',
      'Conduct peripheral blood film reviews and manual differential counts',
      'Ensure strict sample chain of custody and immediate critical alert reporting to clinicians'
    ],
    requirements: [
      'BSc (Hons) / BS MLT from a recognized HEC institution',
      'Minimum 2 years hands-on bench experience in a high-volume diagnostic lab or tertiary care hospital',
      'Familiarity with Laboratory Information Systems (LIS) and barcode workflow'
    ],
    status: 'open',
    postedDate: '2026-09-05',
    applicantCount: 14
  },
  {
    id: 'CDC-JOB-103',
    title: 'Phlebotomist & Sample Collection Officer',
    department: 'pathology_lab',
    subUnit: 'Patient Reception & Blood Draw Section',
    employmentType: 'Full-time',
    location: 'CDC Islamabad & Rawalpindi Satellite Labs',
    minExperienceYears: 1,
    experienceLabel: '1+ Year',
    minQualification: 'Diploma in Lab Technology / Phlebotomy Certification',
    salaryRange: 'PKR 40,000 - 55,000 / month',
    openings: 4,
    deadline: '2026-09-30',
    description: 'Patient-centric blood sampling, pediatric and geriatric venipuncture, swab collections, sample accessioning, and temperature-controlled storage.',
    responsibilities: [
      'Draw blood samples using aseptic vacuum tube techniques with minimal patient discomfort',
      'Verify patient identity, label tubes accurately with barcoded LIS tags',
      'Instruct patients on fasting and 24-hour urine collection requirements',
      'Maintain hygiene, safety disposal (yellow/red sharps containers) per infection control guidelines'
    ],
    requirements: [
      'FSc Medical Laboratory or Recognized Phlebotomy Diploma',
      'Gentle bedside manner and calm communication for anxious patients and children',
      'Shift flexibility (Morning / Evening)'
    ],
    status: 'open',
    postedDate: '2026-09-08',
    applicantCount: 9
  },
  {
    id: 'CDC-JOB-104',
    title: 'Consultant Radiologist',
    department: 'radiology_imaging',
    subUnit: 'MRI & CT Scan Division',
    employmentType: 'Full-time',
    location: 'CDC/CCIH Main Hospital, Islamabad',
    minExperienceYears: 3,
    experienceLabel: '3+ Years Post-Fellowship',
    minQualification: 'FCPS / FRCR / Diplomat American Board in Radiology',
    salaryRange: 'PKR 300,000 - 450,000 / month',
    openings: 2,
    deadline: '2026-10-20',
    description: 'Comprehensive cross-sectional imaging reporting (128-Slice CT, 1.5T MRI neuro/body/musculoskeletal), ultrasound, and emergency trauma scans.',
    responsibilities: [
      'Report CT and MRI examinations with structured PACS diagnostic templates',
      'Conduct advanced Doppler ultrasound studies, guided biopsies, and non-vascular interventions',
      'Consult with referring hospital clinicians regarding complex surgical cases',
      'Guide imaging technologists on contrast protocols and radiation safety'
    ],
    requirements: [
      'FCPS or equivalent in Diagnostic Radiology',
      'Valid PMDC / PMC registration certificate',
      'Proficiency with high-volume PACS/RIS systems',
      'Dedication to diagnostic turnaround benchmarks'
    ],
    status: 'urgent',
    postedDate: '2026-09-02',
    applicantCount: 4,
    licenseRequired: 'PMDC / PMC Valid Specialist License'
  },
  {
    id: 'CDC-JOB-105',
    title: 'Diagnostic Radiographer (CT / MRI Technologist)',
    department: 'radiology_imaging',
    subUnit: 'Medical Imaging Suite',
    employmentType: 'Full-time',
    location: 'CDC Diagnostic Center, Islamabad',
    minExperienceYears: 2,
    experienceLabel: '2-5 Years',
    minQualification: 'BS Medical Imaging Technology (BS MIT / Radiography)',
    salaryRange: 'PKR 70,000 - 95,000 / month',
    openings: 2,
    deadline: '2026-10-12',
    description: 'Patient positioning and scanning execution on multi-slice CT and high-field MRI systems, ensuring contrast safety and radiation dose optimization.',
    responsibilities: [
      'Position patients and configure optimal imaging protocols for CT and MRI procedures',
      'Administer IV non-ionic contrast media under radiologist supervision, checking renal labs',
      'Perform routine daily QA phantom calibrations',
      'Maintain strict MRI safety screening protocols for metallic foreign bodies'
    ],
    requirements: [
      'BS Radiography / Imaging Technology or 2-Year Diploma from a recognized institute',
      'Minimum 2 years dedicated experience operating CT/MRI machines',
      'Knowledge of radiation protection (PNRA standards)'
    ],
    status: 'open',
    postedDate: '2026-09-06',
    applicantCount: 8
  },
  {
    id: 'CDC-JOB-106',
    title: 'Medical Officer - Emergency & ICU',
    department: 'hospital_clinical',
    subUnit: 'Accident & Emergency / Critical Care Unit',
    employmentType: 'Rotational',
    location: 'CCIH Hospital, Islamabad',
    minExperienceYears: 1,
    experienceLabel: '1-3 Years Post-House Job',
    minQualification: 'MBBS + Completed House Job (BLS/ACLS Certified)',
    salaryRange: 'PKR 95,000 - 130,000 / month',
    openings: 4,
    deadline: '2026-10-05',
    description: 'Frontline medical management of acute medical and trauma patients arriving at CDC/CCIH Emergency and monitoring admitted critical patients in ICU/HDU.',
    responsibilities: [
      'Initial clinical triage, resuscitation, IV lines, intubations, and emergency stabilizing care',
      'Carry out night and weekend duty rounds with comprehensive patient notes',
      'Coordinate urgent laboratory and radiological orders with diagnostic departments',
      'Liaise directly with on-call specialty consultants'
    ],
    requirements: [
      'MBBS with recognized 1-year house job completion',
      'Valid PMDC registration card',
      'Valid BLS or ACLS certification preferred',
      'Ready for night shift duty rotations'
    ],
    status: 'urgent',
    postedDate: '2026-09-04',
    applicantCount: 16,
    licenseRequired: 'PMDC Permanent Registration'
  },
  {
    id: 'CDC-JOB-107',
    title: 'Head Staff Nurse - Critical Care / ICU',
    department: 'hospital_nursing',
    subUnit: 'Intensive Care & High Dependency Unit',
    employmentType: 'Full-time',
    location: 'CCIH Hospital, Islamabad',
    minExperienceYears: 3,
    experienceLabel: '3+ Years ICU Nursing',
    minQualification: 'BSc Nursing (Generic) or Post-RN BScN',
    salaryRange: 'PKR 75,000 - 100,000 / month',
    openings: 5,
    deadline: '2026-10-08',
    description: 'Direct bedside critical nursing care, invasive arterial/CVP line monitoring, ventilator patient care, infusion pump drug titrations, and shift handovers.',
    responsibilities: [
      'Monitor vital signs, central venous pressures, GCS scores, and ventilator parameters',
      'Administer high-alert emergency medications, inotropes, and IV antibiotics with double-checks',
      'Lead nursing handovers and assist doctors during central line placements and resuscitations',
      'Adhere to strict hospital-acquired infection (HAI) prevention protocols'
    ],
    requirements: [
      'BSc Nursing with valid Pakistan Nursing Council (PNC) card',
      'Minimum 3 years demonstrated experience in a tertiary care ICU/CCU',
      'Compassionate, dedicated, and vigilant clinical demeanor'
    ],
    status: 'open',
    postedDate: '2026-09-03',
    applicantCount: 12,
    licenseRequired: 'Pakistan Nursing Council (PNC) Active Registration'
  },
  {
    id: 'CDC-JOB-108',
    title: 'Hospital Pharmacist & Formulary Specialist',
    department: 'hospital_pharmacy',
    subUnit: 'Inpatient Pharmacy & Narcotic Vault',
    employmentType: 'Full-time',
    location: 'CDC/CCIH Main Hospital, Islamabad',
    minExperienceYears: 2,
    experienceLabel: '2+ Years Hospital Experience',
    minQualification: 'Doctor of Pharmacy (Pharm-D)',
    salaryRange: 'PKR 70,000 - 95,000 / month',
    openings: 2,
    deadline: '2026-10-18',
    description: 'Reviewing physician medication orders, screening for drug-drug interactions, managing cold-chain biologicals, antibiotic stewardship, and hospital formulary control.',
    responsibilities: [
      'Dispense inpatient medication doses, double checking allergies and contraindications',
      'Maintain rigorous narcotic and controlled drug logs in compliance with DRAP regulations',
      'Monitor floor stock, crash carts, and pharmacy inventory turnover',
      'Provide patient discharge medication counseling'
    ],
    requirements: [
      'Pharm-D degree from an HEC recognized university',
      'Active registration with the Pharmacy Council of Pakistan (Category-A)',
      'Experience with hospital ERP/electronic prescribing systems'
    ],
    status: 'open',
    postedDate: '2026-09-07',
    applicantCount: 11,
    licenseRequired: 'Pharmacy Council Category-A License'
  },
  {
    id: 'CDC-JOB-109',
    title: 'HR Officer - Talent Acquisition & Credentialing',
    department: 'hr_team',
    subUnit: 'Hospital Human Resources Department',
    employmentType: 'Full-time',
    location: 'CDC/CCIH Executive Offices, Islamabad',
    minExperienceYears: 2,
    experienceLabel: '2-4 Years in Hospital/Corporate HR',
    minQualification: 'BBA / MBA / MS in Human Resource Management',
    salaryRange: 'PKR 65,000 - 90,000 / month',
    openings: 1,
    deadline: '2026-10-14',
    description: 'Managing recruitment lifecycle for medical and non-medical positions, verifying PMDC/PNC credentials, conducting initial screenings, and coordinating interview panels.',
    responsibilities: [
      'Post vacancies across job portals, social media, and medical professional networks',
      'Screen applicant profiles, verify degrees and medical council registrations',
      'Organize interview schedules with department heads and hospital management',
      'Issue offer letters, conduct background checks, and lead orientation sessions'
    ],
    requirements: [
      'Bachelor’s or Master’s degree in HR or relevant field',
      'Hands-on experience in healthcare recruitment or corporate talent acquisition',
      'Excellent interpersonal communication and documentation proficiency'
    ],
    status: 'open',
    postedDate: '2026-09-09',
    applicantCount: 18
  },
  {
    id: 'CDC-JOB-110',
    title: 'Assistant Manager Accounts & Patient Billing',
    department: 'accounts_finance',
    subUnit: 'Finance & Insurance Panel Section',
    employmentType: 'Full-time',
    location: 'CDC/CCIH Finance Wing, Islamabad',
    minExperienceYears: 3,
    experienceLabel: '3-6 Years in Healthcare Accounting',
    minQualification: 'ACCA / CA Inter / M.Com / BBA Finance',
    salaryRange: 'PKR 85,000 - 120,000 / month',
    openings: 1,
    deadline: '2026-10-16',
    description: 'Overseeing daily hospital patient billing, diagnostic center cash reconciliations, corporate panel insurance claims, vendor invoicing, and tax filings.',
    responsibilities: [
      'Supervise billing counters and ensure daily cash and card reconciliations with bank deposits',
      'Process corporate insurance panels and Sehat Card claim verifications and ledger updates',
      'Prepare monthly financial statements, staff payroll, and tax deductions (Withholding / Sales Tax)',
      'Conduct internal audit of pharmacy and lab inventory consumption'
    ],
    requirements: [
      'ACCA qualified/finalist, CA-Inter, or M.Com / MBA Finance',
      'Proven experience in hospital billing software and QuickBooks / SAP',
      'Thorough knowledge of Pakistani tax regulations and insurance claim cycles'
    ],
    status: 'open',
    postedDate: '2026-09-04',
    applicantCount: 15
  },
  {
    id: 'CDC-JOB-111',
    title: 'Patient Care & Front Desk Coordinator',
    department: 'admin_support',
    subUnit: 'Main Reception & Customer Experience',
    employmentType: 'Full-time',
    location: 'CDC/CCIH Main Lobby, Islamabad',
    minExperienceYears: 1,
    experienceLabel: '1+ Year Hospitality / Clinic Front Desk',
    minQualification: 'Bachelor Degree (BA / BSc / BBA)',
    salaryRange: 'PKR 45,000 - 60,000 / month',
    openings: 3,
    deadline: '2026-09-28',
    description: 'Greeting patients, scheduling consultant clinic appointments, guiding walk-ins to pathology sample collection and radiology counters with empathy.',
    responsibilities: [
      'Receive patients warmly and register their demographics accurately in HMIS',
      'Coordinate lab and imaging report delivery via counter and online portals',
      'Handle patient queries and telephone appointments with polite bedside manners',
      'Maintain reception seating, wheelchair availability, and queue management'
    ],
    requirements: [
      'Graduate degree in any discipline',
      'Polished appearance, fluent Urdu and English communication',
      'Basic computer literacy and fast typing skills'
    ],
    status: 'open',
    postedDate: '2026-09-08',
    applicantCount: 22
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'CDC-2026-1081',
    jobId: 'CDC-JOB-101',
    jobTitle: 'Consultant Histopathologist',
    department: 'pathology_lab',
    appliedAt: '2026-09-12 11:30',
    fullName: 'Dr. Ayesha Farooq',
    fatherOrHusbandName: 'Muhammad Farooq Cheema',
    cnic: '61101-2948192-4',
    gender: 'Female',
    dob: '1989-04-14',
    email: 'dr.ayesha.farooq@outlook.com',
    phone: '0333-5182941',
    city: 'Islamabad',
    address: 'House 42, Street 18, Sector F-11/2, Islamabad',
    highestDegree: 'FCPS Histopathology',
    specialization: 'Surgical Pathology & Immunohistochemistry',
    institution: 'College of Physicians & Surgeons Pakistan (CPSP) / PIMS',
    passingYear: '2021',
    registrationNumber: 'PMDC-49281-S',
    totalExperienceYears: 5,
    currentEmployer: 'Islamabad Diagnostic Center',
    currentDesignation: 'Senior Registrar Pathology',
    currentSalary: 'PKR 240,000',
    expectedSalary: 'PKR 300,000',
    noticePeriodDays: 30,
    resumeFileName: 'Dr_Ayesha_Farooq_FCPS_CV.pdf',
    resumeFileSize: '2.4 MB',
    coverLetter: 'I am applying for the Consultant Histopathologist position at CDC Diagnostic Center. With 5 years of post-graduate experience in gastrointestinal, gynecological biopsies, and digital telepathology, I can contribute directly to rapid turnaround times and CAP accreditation standards.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: true,
    status: 'shortlisted',
    rating: 5,
    hrNotes: [
      {
        id: 'n1',
        author: 'Dr. Tariq (Head of Lab)',
        date: '2026-09-13',
        text: 'Strong academic portfolio. Verified PMDC active license. Published 4 papers in indexed journals. Recommended for panel interview.'
      }
    ],
    interviewDetails: {
      scheduledDate: '2026-09-22',
      scheduledTime: '11:00 AM',
      venue: 'CDC Boardroom, 2nd Floor, Sector G-8, Islamabad',
      interviewType: 'Panel Assessment',
      panelMembers: 'Dr. Tariq (Head of Lab), Medical Director, HR Manager',
      notes: 'Please bring original PMDC registration and FCPS degree certificates.'
    },
    tags: ['FCPS', 'High Priority', 'IHC Expert']
  },
  {
    id: 'CDC-2026-1082',
    jobId: 'CDC-JOB-102',
    jobTitle: 'Senior Medical Lab Technologist (MLT)',
    department: 'pathology_lab',
    appliedAt: '2026-09-14 14:15',
    fullName: 'Hamza Noman Abbasi',
    fatherOrHusbandName: 'Noman Riaz Abbasi',
    cnic: '37405-8172940-1',
    gender: 'Male',
    dob: '1997-08-20',
    email: 'hamza.abbasi.mlt@gmail.com',
    phone: '0304-9821455',
    city: 'Rawalpindi',
    address: 'Flat 3, Gulshan-e-Dadan, Murree Road, Rawalpindi',
    highestDegree: 'BS Medical Laboratory Technology',
    specialization: 'Chemical Pathology & Hematology',
    institution: 'University of Health Sciences (UHS) Lahore',
    passingYear: '2021',
    registrationNumber: 'MLT-PCP-8842',
    totalExperienceYears: 3,
    currentEmployer: 'Benazir Bhutto Hospital, Rawalpindi',
    currentDesignation: 'Medical Lab Technologist',
    currentSalary: 'PKR 65,000',
    expectedSalary: 'PKR 85,000',
    noticePeriodDays: 15,
    resumeFileName: 'Hamza_Abbasi_BS_MLT_CV.pdf',
    resumeFileSize: '1.2 MB',
    coverLetter: 'I have 3 years practical experience handling Sysmex XN series and Roche Cobas 6000 analyzers, performing daily IQC and calibrating assays.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: false,
    status: 'under_review',
    rating: 4,
    hrNotes: [
      {
        id: 'n2',
        author: 'HR Recruitment',
        date: '2026-09-15',
        text: 'Good experience with Roche Cobas analyzers. Available with 15 days notice.'
      }
    ],
    tags: ['Sysmex', 'Cobas', 'Rotational Duty']
  },
  {
    id: 'CDC-2026-1083',
    jobId: 'CDC-JOB-104',
    jobTitle: 'Consultant Radiologist',
    department: 'radiology_imaging',
    appliedAt: '2026-09-11 09:40',
    fullName: 'Dr. Shahzad Mir',
    fatherOrHusbandName: 'Mir Alam Khan',
    cnic: '13101-7294819-3',
    gender: 'Male',
    dob: '1986-11-05',
    email: 'dr.shahzad.radiology@yahoo.com',
    phone: '0321-5558912',
    city: 'Islamabad',
    address: 'House 19, Street 4, Sector I-8/3, Islamabad',
    highestDegree: 'FCPS Radiology',
    specialization: 'Cross Sectional Imaging & MRI Body',
    institution: 'Shifa International Hospital / CPSP',
    passingYear: '2019',
    registrationNumber: 'PMDC-38192-S',
    totalExperienceYears: 6,
    currentEmployer: 'Ali Medical Centre, F-8 Islamabad',
    currentDesignation: 'Consultant Radiologist',
    currentSalary: 'PKR 320,000',
    expectedSalary: 'PKR 400,000',
    noticePeriodDays: 30,
    resumeFileName: 'Dr_Shahzad_Mir_Radiologist_CV.pdf',
    resumeFileSize: '3.1 MB',
    coverLetter: 'I have over six years of comprehensive post-fellowship diagnostic radiology experience with extensive focus on 128-slice CT coronary/body and 1.5T MRI neuro and musculoskeletal scans.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: true,
    status: 'interview_scheduled',
    rating: 5,
    hrNotes: [
      {
        id: 'n3',
        author: 'Medical Director',
        date: '2026-09-13',
        text: 'Top candidate. Has previous experience with our exact GE MRI and Siemens CT console models. Interview scheduled.'
      }
    ],
    interviewDetails: {
      scheduledDate: '2026-09-24',
      scheduledTime: '03:30 PM',
      venue: 'Executive Meeting Room, CCIH Hospital Islamabad',
      interviewType: 'In-person',
      panelMembers: 'Medical Director, Head of Radiology, COO',
      notes: 'Candidate requested afternoon slot after clinical hours.'
    },
    tags: ['FCPS', 'MRI Expert', 'Top Tier']
  },
  {
    id: 'CDC-2026-1084',
    jobId: 'CDC-JOB-106',
    jobTitle: 'Medical Officer - Emergency & ICU',
    department: 'hospital_clinical',
    appliedAt: '2026-09-15 16:20',
    fullName: 'Dr. Bilal Qureshi',
    fatherOrHusbandName: 'Tariq Javed Qureshi',
    cnic: '61101-8172901-7',
    gender: 'Male',
    dob: '1998-02-17',
    email: 'dr.bilal.qureshi@gmail.com',
    phone: '0345-5129482',
    city: 'Islamabad',
    address: 'Apartment 402, G-11 Markaz, Islamabad',
    highestDegree: 'MBBS',
    specialization: 'Emergency Medicine & Critical Care Trainee',
    institution: 'Rawalpindi Medical University (RMU)',
    passingYear: '2023',
    registrationNumber: 'PMDC-109281-P',
    totalExperienceYears: 2,
    currentEmployer: 'Holy Family Hospital, Emergency Ward',
    currentDesignation: 'Medical Officer',
    currentSalary: 'PKR 85,000',
    expectedSalary: 'PKR 110,000',
    noticePeriodDays: 7,
    resumeFileName: 'Dr_Bilal_Qureshi_MBBS_CV.pdf',
    resumeFileSize: '1.5 MB',
    coverLetter: 'Eager to contribute to CDC/CCIH Emergency care. Trained in BLS, ACLS, rapid trauma triage, ultrasound-guided venous access, and endotracheal intubations.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: true,
    status: 'shortlisted',
    rating: 4,
    hrNotes: [
      {
        id: 'n4',
        author: 'HR Recruitment',
        date: '2026-09-16',
        text: 'Active PMDC registration verified. Very keen on rotational night shifts.'
      }
    ],
    tags: ['BLS/ACLS', 'Emergency Room', 'Immediate Joiner']
  },
  {
    id: 'CDC-2026-1085',
    jobId: 'CDC-JOB-107',
    jobTitle: 'Head Staff Nurse - Critical Care / ICU',
    department: 'hospital_nursing',
    appliedAt: '2026-09-13 18:00',
    fullName: 'Sister Maryam Bibi',
    fatherOrHusbandName: 'Muhammad Sadiq',
    cnic: '37405-1928374-2',
    gender: 'Female',
    dob: '1993-06-11',
    email: 'maryam.nursing.icu@gmail.com',
    phone: '0312-5819234',
    city: 'Rawalpindi',
    address: 'House 112, Chaklala Scheme 3, Rawalpindi',
    highestDegree: 'BSc Nursing (Generic 4-Years)',
    specialization: 'Critical Care & Ventilator Nursing',
    institution: 'Shaheed Zulfiqar Ali Bhutto Medical University (SZABMU) / PIMS',
    passingYear: '2018',
    registrationNumber: 'PNC-NR-51928',
    totalExperienceYears: 6,
    currentEmployer: 'Maroof International Hospital, Islamabad',
    currentDesignation: 'Senior ICU Staff Nurse',
    currentSalary: 'PKR 78,000',
    expectedSalary: 'PKR 95,000',
    noticePeriodDays: 20,
    resumeFileName: 'Sister_Maryam_BScN_ICU.pdf',
    resumeFileSize: '980 KB',
    coverLetter: 'Dedicated critical care nurse with 6 years experience caring for ventilated patients, administering vasopressors, handling arterial lines, and mentoring junior nursing trainees.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: true,
    status: 'hired',
    rating: 5,
    hrNotes: [
      {
        id: 'n5',
        author: 'Nursing Director',
        date: '2026-09-15',
        text: 'Outstanding interview and clinical simulation test. Offer accepted. Joining scheduled for 1st of next month.'
      }
    ],
    tags: ['PNC Verified', 'ICU Experienced', 'Offer Accepted']
  },
  {
    id: 'CDC-2026-1086',
    jobId: 'CDC-JOB-110',
    jobTitle: 'Assistant Manager Accounts & Patient Billing',
    department: 'accounts_finance',
    appliedAt: '2026-09-10 12:45',
    fullName: 'Zubair Ahmed Khan',
    fatherOrHusbandName: 'Muhammad Saeed Khan',
    cnic: '61101-7391024-5',
    gender: 'Male',
    dob: '1992-09-25',
    email: 'zubair.ahmed.acca@gmail.com',
    phone: '0300-5847291',
    city: 'Islamabad',
    address: 'House 55, Street 9, Sector G-10/4, Islamabad',
    highestDegree: 'ACCA Member / M.Com',
    specialization: 'Financial Accounting & Hospital Billing ERPs',
    institution: 'Association of Chartered Certified Accountants (UK)',
    passingYear: '2019',
    registrationNumber: 'ACCA-MEM-318492',
    totalExperienceYears: 5,
    currentEmployer: 'Kulsum International Hospital, Blue Area',
    currentDesignation: 'Senior Accounts Officer',
    currentSalary: 'PKR 90,000',
    expectedSalary: 'PKR 115,000',
    noticePeriodDays: 30,
    resumeFileName: 'Zubair_Ahmed_ACCA_Accounts_CV.pdf',
    resumeFileSize: '1.8 MB',
    coverLetter: 'Experienced hospital accounts lead skilled in managing daily patient collections, corporate panel credit invoicing, and FBR withholding tax compliance.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: false,
    status: 'shortlisted',
    rating: 5,
    hrNotes: [
      {
        id: 'n6',
        author: 'Finance Director',
        date: '2026-09-12',
        text: 'Strong hospital accounting background. Knows Sehat Card panel recovery workflows. Call for 2nd round interview.'
      }
    ],
    interviewDetails: {
      scheduledDate: '2026-09-23',
      scheduledTime: '02:00 PM',
      venue: 'Finance Conference Room, CDC Islamabad',
      interviewType: 'In-person',
      panelMembers: 'CFO, Head of Accounts, HR Director',
      notes: 'Bring previous panel reconciliation portfolio and tax certificates.'
    },
    tags: ['ACCA', 'Hospital Billing', 'Tax & Audit']
  },
  {
    id: 'CDC-2026-1087',
    jobId: 'CDC-JOB-109',
    jobTitle: 'HR Officer - Talent Acquisition & Credentialing',
    department: 'hr_team',
    appliedAt: '2026-09-14 10:10',
    fullName: 'Sana Batool',
    fatherOrHusbandName: 'Syed Raza Hussain',
    cnic: '37405-9018294-6',
    gender: 'Female',
    dob: '1996-03-30',
    email: 'sana.batool.hr@gmail.com',
    phone: '0331-5920144',
    city: 'Rawalpindi',
    address: 'Lane 5, Peshawar Road, Rawalpindi',
    highestDegree: 'MBA in Human Resource Management',
    specialization: 'Talent Acquisition & Employee Relations',
    institution: 'National University of Sciences & Technology (NUST)',
    passingYear: '2021',
    totalExperienceYears: 3,
    currentEmployer: 'Quaid-e-Azam International Hospital',
    currentDesignation: 'HR Executive',
    currentSalary: 'PKR 65,000',
    expectedSalary: 'PKR 85,000',
    noticePeriodDays: 15,
    resumeFileName: 'Sana_Batool_MBA_HR_CV.pdf',
    resumeFileSize: '1.1 MB',
    coverLetter: 'Passionate HR professional with direct experience recruiting medical staff, verifying PMDC certificates, managing payroll inputs, and organizing staff orientations.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: false,
    status: 'under_review',
    rating: 4,
    hrNotes: [
      {
        id: 'n7',
        author: 'HR Lead',
        date: '2026-09-15',
        text: 'Good NUST graduate profile. Healthcare HR experience matches requirements.'
      }
    ],
    tags: ['NUST MBA', 'Credentialing', 'Hospital HR']
  },
  {
    id: 'CDC-2026-1088',
    jobId: 'CDC-JOB-103',
    jobTitle: 'Phlebotomist & Sample Collection Officer',
    department: 'pathology_lab',
    appliedAt: '2026-09-16 08:50',
    fullName: 'Muhammad Usman',
    fatherOrHusbandName: 'Abdul Rasheed',
    cnic: '61101-4458190-9',
    gender: 'Male',
    dob: '2000-01-12',
    email: 'usman.phlebotomy@yahoo.com',
    phone: '0315-9928172',
    city: 'Islamabad',
    address: 'Street 7, Khanna Dak, Islamabad',
    highestDegree: 'Diploma in Medical Laboratory Technology',
    specialization: 'Phlebotomy & Sample Accessioning',
    institution: 'National Institute of Health (NIH) Islamabad',
    passingYear: '2023',
    totalExperienceYears: 1,
    currentEmployer: 'Chughtai Lab, Rawalpindi Branch',
    currentDesignation: 'Phlebotomist',
    currentSalary: 'PKR 38,000',
    expectedSalary: 'PKR 50,000',
    noticePeriodDays: 7,
    resumeFileName: 'Usman_Phlebotomy_Resume.pdf',
    resumeFileSize: '650 KB',
    coverLetter: 'Skilled in pediatric and adult venous puncture, handling vacutainers with zero hemolysis, and greeting walk-in patients with courtesy.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: false,
    status: 'new',
    rating: 3,
    hrNotes: [],
    tags: ['Fresh/1 Yr', 'NIH Diploma', 'Fast Punctures']
  },
  {
    id: 'CDC-2026-1089',
    jobId: 'CDC-JOB-108',
    jobTitle: 'Hospital Pharmacist & Formulary Specialist',
    department: 'hospital_pharmacy',
    appliedAt: '2026-09-15 11:15',
    fullName: 'Dr. Faiza Tariq',
    fatherOrHusbandName: 'Tariq Mehmood',
    cnic: '37405-6671829-8',
    gender: 'Female',
    dob: '1995-10-18',
    email: 'faiza.tariq.pharmd@gmail.com',
    phone: '0322-8172934',
    city: 'Islamabad',
    address: 'House 88, Street 14, Sector E-11/3, Islamabad',
    highestDegree: 'Doctor of Pharmacy (Pharm-D)',
    specialization: 'Clinical Pharmacy & Inpatient Formularies',
    institution: 'Quaid-i-Azam University (QAU) Islamabad',
    passingYear: '2020',
    registrationNumber: 'PCP-CatA-19284',
    totalExperienceYears: 4,
    currentEmployer: 'Islamabad Medical & Surgical Hospital',
    currentDesignation: 'Clinical Pharmacist',
    currentSalary: 'PKR 75,000',
    expectedSalary: 'PKR 95,000',
    noticePeriodDays: 30,
    resumeFileName: 'Faiza_Tariq_PharmD_CV.pdf',
    resumeFileSize: '1.4 MB',
    coverLetter: 'Pharm-D graduate with 4 years experience in hospital medicine reconciliation, crash cart drug management, and checking antibiotic doses.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: true,
    status: 'shortlisted',
    rating: 4,
    hrNotes: [
      {
        id: 'n8',
        author: 'Chief Pharmacist',
        date: '2026-09-16',
        text: 'QAU graduate with active Pharmacy Council license. Good knowledge of cold chain monitoring.'
      }
    ],
    tags: ['Pharm-D', 'Category-A', 'Hospital Inpatient']
  },
  {
    id: 'CDC-2026-1090',
    jobId: 'CDC-JOB-111',
    jobTitle: 'Patient Care & Front Desk Coordinator',
    department: 'admin_support',
    appliedAt: '2026-09-16 15:50',
    fullName: 'Amina Sheikh',
    fatherOrHusbandName: 'Sheikh Muhammad Aslam',
    cnic: '61101-3819204-6',
    gender: 'Female',
    dob: '1999-07-04',
    email: 'amina.sheikh99@gmail.com',
    phone: '0334-9182371',
    city: 'Islamabad',
    address: 'Flat 12, Executive Heights, Sector F-10 Markaz, Islamabad',
    highestDegree: 'BS Media & Communications',
    specialization: 'Public Relations & Customer Care',
    institution: 'Bahria University Islamabad',
    passingYear: '2022',
    totalExperienceYears: 2,
    currentEmployer: 'MaxHealth Hospital, G-8 Islamabad',
    currentDesignation: 'Front Desk Executive',
    currentSalary: 'PKR 45,000',
    expectedSalary: 'PKR 55,000',
    noticePeriodDays: 10,
    resumeFileName: 'Amina_Sheikh_FrontDesk_Resume.pdf',
    resumeFileSize: '820 KB',
    coverLetter: 'Proficient in handling patient registration, telephone appointment systems, and coordinating between doctors and lab counters with utmost professionalism.',
    hasCnicCopy: true,
    hasDegreeCopy: true,
    hasLicenseCopy: false,
    status: 'new',
    rating: 4,
    hrNotes: [],
    tags: ['Customer Care', 'HMIS User', 'Fluent English/Urdu']
  }
];

const JOBS_STORAGE_KEY = 'cdc_ccih_job_posts_v1';
const APPLICATIONS_STORAGE_KEY = 'cdc_ccih_applications_v1';

export function getStoredJobs(): JobPost[] {
  try {
    const saved = localStorage.getItem(JOBS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored jobs:', e);
  }
  return INITIAL_JOB_POSTS;
}

export function saveStoredJobs(jobs: JobPost[]): void {
  try {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  } catch (e) {
    console.error('Error saving jobs:', e);
  }
}

export function getStoredApplications(): JobApplication[] {
  try {
    const saved = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored applications:', e);
  }
  return INITIAL_APPLICATIONS;
}

export function saveStoredApplications(apps: JobApplication[]): void {
  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
  } catch (e) {
    console.error('Error saving applications:', e);
  }
}

export function resetToDemoData(): { jobs: JobPost[]; applications: JobApplication[] } {
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOB_POSTS));
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
  return { jobs: INITIAL_JOB_POSTS, applications: INITIAL_APPLICATIONS };
}
