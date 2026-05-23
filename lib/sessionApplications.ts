// Module-level store — persists across client-side navigation within the session.
// Any "Apply Now" click on the jobs page writes here; the applications page reads it.

export type SessionApplication = {
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "applied";
};

const store: SessionApplication[] = [];

export function sessionApply(app: SessionApplication) {
  if (!store.find((a) => a.jobId === app.jobId)) store.push(app);
}

export function getSessionApplications(): SessionApplication[] {
  return store;
}

export function isSessionApplied(jobId: string): boolean {
  return store.some((a) => a.jobId === jobId);
}
