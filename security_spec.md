# Security Specification: CDC/CCIH Islamabad Recruitment Portal

## 1. Data Invariants
- **Public Jobs Readability**: All visitors can view open hospital vacancies across Pathology Lab, Radiology, Inpatient Care, Nursing, Pharmacy, and Corporate departments.
- **Job Creation & Edits**: Only authorized HR administrators can publish new vacancies, edit details, or change job statuses.
- **Job Application Submission**: Applicants can create an application document with valid tracking ID, contact details, qualification credentials, and matching job reference.
- **Application Privacy & PII**: Applications contain personal data (CNIC, phone, residential address). Single document lookup via tracking ID is permitted for status tracking by the applicant, while full directory listing and status transitions (Shortlist, Interview, Offer, Hire) are restricted to HR administrators.
- **Data Integrity & Volumetric Limits**: String fields must be bound by maximum length constraints (e.g. max 150 chars for names, max 5000 chars for job descriptions) to guard against resource exhaustion attacks.

## 2. The "Dirty Dozen" Threat Payloads
1. **Unauthenticated Job Mutation**: Malicious anonymous client attempting to delete or alter a job vacancy description.
2. **Oversized String Bomb**: Injection of a 2MB string into `fullName` or `description` to trigger client-side or database memory exhaustion.
3. **Application ID Poisoning**: Document ID containing directory traversal characters or non-alphanumeric tokens (`../../evil`).
4. **Missing Required Fields**: Submitting an application without a valid `jobId`, `fullName`, or `email`.
5. **Self-Promotion Injection**: Applicant injecting an `admin` role or attempting to grant themselves access in `/admins/`.
6. **Mass Application Exfiltration**: Attempting a blanket query across all applications without HR authorization.
7. **Malformed CNIC**: Attempting to inject script tags or malformed data into the Pakistani National Identity Card field.
8. **Invalid Rating Boundary**: Setting candidate rating to 999 instead of integer 1-5.
9. **Direct Admin Record Write**: Attempting to write into `/admins/{uid}` from unverified client credentials.
10. **Unbounded Array Flooding**: Injecting an array of 5,000 tags into `tags` or `requirements`.
11. **Negative Experience Fraud**: Submitting an application with `-10` years of experience.
12. **Status Bypass Attempt**: Direct write updating applicant status to 'hired' without authorized HR access.

## 3. Test Scenarios
- `test_unauthenticated_job_write_denied()`: Verify `create`, `update`, `delete` on `/jobs/{id}` returns `PERMISSION_DENIED` without HR admin privileges.
- `test_valid_application_submission_allowed()`: Verify candidate can submit a valid application payload with required fields.
- `test_application_oversized_payload_denied()`: Verify payload exceeding length boundaries is rejected.
- `test_admin_privilege_escalation_denied()`: Verify non-admin cannot write to `/admins/{uid}`.
