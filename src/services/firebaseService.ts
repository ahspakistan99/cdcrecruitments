import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { JobPost, JobApplication, ApplicationStatus, HRNote, InterviewSchedule } from '../types';
import { INITIAL_JOB_POSTS, INITIAL_APPLICATIONS } from '../data/mockData';

const JOBS_COLLECTION = 'jobs';
const APPLICATIONS_COLLECTION = 'applications';

/**
 * Seed initial sample hospital vacancies if collection is empty
 */
export async function seedInitialFirestoreData(): Promise<void> {
  try {
    const jobsSnap = await getDocs(collection(db, JOBS_COLLECTION));
    if (jobsSnap.empty) {
      console.log('Seeding initial hospital vacancies to Firestore...');
      for (const job of INITIAL_JOB_POSTS) {
        await setDoc(doc(db, JOBS_COLLECTION, job.id), job);
      }
    }

    const appsSnap = await getDocs(collection(db, APPLICATIONS_COLLECTION));
    if (appsSnap.empty) {
      console.log('Seeding initial applicant records to Firestore...');
      for (const app of INITIAL_APPLICATIONS) {
        await setDoc(doc(db, APPLICATIONS_COLLECTION, app.id), app);
      }
    }
  } catch (error) {
    console.warn('Firestore seeding check failed (will use client state):', error);
  }
}

/**
 * Real-time subscription to Job Vacancies
 */
export function subscribeToJobs(
  onData: (jobs: JobPost[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const colRef = collection(db, JOBS_COLLECTION);
  return onSnapshot(
    colRef,
    snapshot => {
      const jobs: JobPost[] = [];
      snapshot.forEach(docSnap => {
        jobs.push(docSnap.data() as JobPost);
      });
      // Sort by postedDate desc
      jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      onData(jobs);
    },
    error => {
      handleFirestoreError(error, OperationType.LIST, JOBS_COLLECTION);
      onError?.(error);
    }
  );
}

/**
 * Real-time subscription to Candidate Applications
 */
export function subscribeToApplications(
  onData: (applications: JobApplication[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const colRef = collection(db, APPLICATIONS_COLLECTION);
  return onSnapshot(
    colRef,
    snapshot => {
      const apps: JobApplication[] = [];
      snapshot.forEach(docSnap => {
        apps.push(docSnap.data() as JobApplication);
      });
      // Sort by appliedAt desc
      apps.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
      onData(apps);
    },
    error => {
      handleFirestoreError(error, OperationType.LIST, APPLICATIONS_COLLECTION);
      onError?.(error);
    }
  );
}

/**
 * Add a new Job Vacancy to Firestore
 */
export async function addJobToFirestore(job: JobPost): Promise<void> {
  try {
    const docRef = doc(db, JOBS_COLLECTION, job.id);
    await setDoc(docRef, job);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${JOBS_COLLECTION}/${job.id}`);
  }
}

/**
 * Submit a new Candidate Job Application to Firestore
 */
export async function submitApplicationToFirestore(app: JobApplication): Promise<void> {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, app.id);
    await setDoc(docRef, app);

    // Increment applicant count on the job
    try {
      const jobRef = doc(db, JOBS_COLLECTION, app.jobId);
      const jobSnap = await getDoc(jobRef);
      if (jobSnap.exists()) {
        const currentCount = (jobSnap.data() as JobPost).applicantCount || 0;
        await updateDoc(jobRef, { applicantCount: currentCount + 1 });
      }
    } catch {
      // Non-blocking
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${APPLICATIONS_COLLECTION}/${app.id}`);
  }
}

/**
 * Update Application Status
 */
export async function updateApplicationStatusInFirestore(
  applicationId: string,
  newStatus: ApplicationStatus,
  statusNoteText?: string
): Promise<void> {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, applicationId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return;

    const currentData = snap.data() as JobApplication;
    const updatedNotes: HRNote[] = [...(currentData.hrNotes || [])];

    if (statusNoteText) {
      const newNote: HRNote = {
        id: `note-${Date.now()}`,
        author: 'Hospital HR Manager',
        date: new Date().toISOString().split('T')[0],
        text: statusNoteText,
      };
      updatedNotes.unshift(newNote);
    }

    await updateDoc(docRef, {
      status: newStatus,
      hrNotes: updatedNotes,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${APPLICATIONS_COLLECTION}/${applicationId}`);
  }
}

/**
 * Update Candidate Rating (1-5 stars)
 */
export async function updateApplicationRatingInFirestore(
  applicationId: string,
  rating: number
): Promise<void> {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, applicationId);
    await updateDoc(docRef, { rating });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${APPLICATIONS_COLLECTION}/${applicationId}`);
  }
}

/**
 * Add HR Note to Application
 */
export async function addNoteToApplicationInFirestore(
  applicationId: string,
  noteText: string,
  authorName = 'HR Staff'
): Promise<void> {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, applicationId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return;

    const currentData = snap.data() as JobApplication;
    const newNote: HRNote = {
      id: `note-${Date.now()}`,
      author: authorName,
      date: new Date().toISOString().split('T')[0],
      text: noteText,
    };

    await updateDoc(docRef, {
      hrNotes: [newNote, ...(currentData.hrNotes || [])],
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${APPLICATIONS_COLLECTION}/${applicationId}`);
  }
}

/**
 * Schedule Interview in Firestore
 */
export async function scheduleInterviewInFirestore(
  applicationId: string,
  interview: InterviewSchedule
): Promise<void> {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, applicationId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return;

    const currentData = snap.data() as JobApplication;
    const scheduleNote: HRNote = {
      id: `note-${Date.now()}`,
      author: 'Recruitment Committee',
      date: new Date().toISOString().split('T')[0],
      text: `Interview scheduled on ${interview.scheduledDate} at ${interview.scheduledTime} (${interview.interviewType}) at ${interview.venue}.`,
    };

    await updateDoc(docRef, {
      status: 'interview_scheduled',
      interviewDetails: interview,
      hrNotes: [scheduleNote, ...(currentData.hrNotes || [])],
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${APPLICATIONS_COLLECTION}/${applicationId}`);
  }
}

/**
 * Fetch Application by Tracking ID (e.g. CDC-2026-1045)
 */
export async function getApplicationByTrackingId(
  trackingId: string
): Promise<JobApplication | null> {
  try {
    const cleanId = trackingId.trim();
    const docRef = doc(db, APPLICATIONS_COLLECTION, cleanId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as JobApplication;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${APPLICATIONS_COLLECTION}/${trackingId}`);
  }
}
