import { ApplicationStatus, DepartmentCategory } from '../types';
import { DEPARTMENTS } from '../data/mockData';

export function getDepartmentInfo(deptId: DepartmentCategory) {
  return DEPARTMENTS.find(d => d.id === deptId) || {
    id: deptId,
    name: deptId,
    categoryLabel: 'General',
    iconName: 'Building2',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    description: ''
  };
}

export function getStatusBadge(status: ApplicationStatus): { label: string; color: string; dotColor: string } {
  switch (status) {
    case 'new':
      return { label: 'New Application', color: 'bg-blue-50 text-blue-700 border-blue-200', dotColor: 'bg-blue-500' };
    case 'under_review':
      return { label: 'Under Review', color: 'bg-amber-50 text-amber-700 border-amber-200', dotColor: 'bg-amber-500' };
    case 'shortlisted':
      return { label: 'Shortlisted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dotColor: 'bg-emerald-500' };
    case 'interview_scheduled':
      return { label: 'Interview Scheduled', color: 'bg-purple-50 text-purple-700 border-purple-200', dotColor: 'bg-purple-500' };
    case 'offer_extended':
      return { label: 'Offer Extended', color: 'bg-teal-50 text-teal-700 border-teal-200', dotColor: 'bg-teal-500' };
    case 'hired':
      return { label: 'Hired & Onboarded', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', dotColor: 'bg-emerald-600' };
    case 'rejected':
      return { label: 'Not Selected', color: 'bg-rose-50 text-rose-700 border-rose-200', dotColor: 'bg-rose-500' };
    default:
      return { label: status, color: 'bg-slate-100 text-slate-700 border-slate-200', dotColor: 'bg-slate-400' };
  }
}

export function formatCNIC(val: string): string {
  // Clean digits only
  const digits = val.replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
}

export function formatPhone(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}

export function exportApplicationsToCSV(applications: any[], filename = 'CDC_CCIH_Hospital_Applications.csv') {
  const headers = [
    'Tracking ID',
    'Full Name',
    'Applied Job',
    'Department',
    'Status',
    'Rating',
    'CNIC',
    'Phone',
    'Email',
    'City',
    'Highest Qualification',
    'Specialization',
    'Total Experience (Years)',
    'Current Employer',
    'Expected Salary',
    'Applied Date'
  ];

  const rows = applications.map(app => [
    `"${app.id}"`,
    `"${app.fullName}"`,
    `"${app.jobTitle}"`,
    `"${app.department}"`,
    `"${app.status}"`,
    app.rating || 0,
    `"${app.cnic}"`,
    `"${app.phone}"`,
    `"${app.email}"`,
    `"${app.city}"`,
    `"${app.highestDegree}"`,
    `"${app.specialization || ''}"`,
    app.totalExperienceYears,
    `"${app.currentEmployer || ''}"`,
    `"${app.expectedSalary}"`,
    `"${app.appliedAt}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
