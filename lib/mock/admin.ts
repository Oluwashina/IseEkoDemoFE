export const mockJobseekers = [
  { id: "u001", name: "Adaeze Okonkwo", lga: "Ikeja", age: 27, gender: "Female", disability: false, status: "employed", cvValidated: true, joinedDate: "2026-03-15", skills: ["React", "TypeScript", "Node.js"], education: "BSc Computer Science" },
  { id: "u002", name: "Chukwuemeka Eze", lga: "Surulere", age: 24, gender: "Male", disability: false, status: "seeking", cvValidated: true, joinedDate: "2026-04-02", skills: ["Marketing", "Brand Management"], education: "BSc Marketing" },
  { id: "u003", name: "Fatimah Aliyu", lga: "Mushin", age: 22, gender: "Female", disability: true, status: "seeking", cvValidated: false, joinedDate: "2026-04-10", skills: ["Data Entry", "Excel", "Admin"], education: "OND Business Admin" },
  { id: "u004", name: "Babatunde Fashola", lga: "Agege", age: 30, gender: "Male", disability: false, status: "underemployed", cvValidated: true, joinedDate: "2026-02-28", skills: ["Carpentry", "Furniture Making"], education: "WAEC" },
  { id: "u005", name: "Ngozi Obi", lga: "Kosofe", age: 26, gender: "Female", disability: false, status: "seeking", cvValidated: false, joinedDate: "2026-05-01", skills: ["Nursing", "Patient Care"], education: "BSc Nursing Science" },
  { id: "u006", name: "Seun Adeyemi", lga: "Alimosho", age: 25, gender: "Male", disability: false, status: "seeking", cvValidated: true, joinedDate: "2026-03-22", skills: ["Python", "SQL", "Data Analysis"], education: "BSc Statistics" },
  { id: "u007", name: "Aminat Suleiman", lga: "Badagry", age: 23, gender: "Female", disability: false, status: "training", cvValidated: false, joinedDate: "2026-04-18", skills: ["Tailoring", "Fashion Design"], education: "WAEC" },
  { id: "u008", name: "Emeka Nwosu", lga: "Apapa", age: 29, gender: "Male", disability: true, status: "seeking", cvValidated: true, joinedDate: "2026-03-05", skills: ["Electrical", "Maintenance", "Technical"], education: "HND Electrical Engineering" },
  { id: "u009", name: "Tolu Ajayi", lga: "Eti-Osa", age: 28, gender: "Female", disability: false, status: "employed", cvValidated: true, joinedDate: "2026-01-20", skills: ["Finance", "Accounting", "Excel"], education: "BSc Accounting" },
  { id: "u010", name: "Rasheed Ibrahim", lga: "Shomolu", age: 31, gender: "Male", disability: false, status: "seeking", cvValidated: false, joinedDate: "2026-05-08", skills: ["Plumbing", "Pipe Fitting"], education: "Trade Test Certificate" },
  { id: "u011", name: "Chioma Uzor", lga: "Lagos Island", age: 25, gender: "Female", disability: false, status: "training", cvValidated: true, joinedDate: "2026-04-25", skills: ["Graphic Design", "Illustrator", "Canva"], education: "BSc Fine Arts" },
  { id: "u012", name: "Kayode Olawale", lga: "Oshodi-Isolo", age: 27, gender: "Male", disability: false, status: "seeking", cvValidated: true, joinedDate: "2026-03-30", skills: ["Sales", "Customer Service", "CRM"], education: "BSc Business Admin" },
];

export const mockEmployers = [
  { id: "e001", name: "Flutterwave", sector: "Fintech", lga: "Victoria Island", status: "verified", activeVacancies: 5, registeredDate: "2026-01-15", contact: "hr@flutterwave.com" },
  { id: "e002", name: "Access Bank", sector: "Banking", lga: "Victoria Island", status: "verified", activeVacancies: 12, registeredDate: "2026-02-01", contact: "recruitment@accessbank.com" },
  { id: "e003", name: "MTN Nigeria", sector: "Telecommunications", lga: "Ikoyi", status: "verified", activeVacancies: 8, registeredDate: "2026-01-20", contact: "talent@mtn.ng" },
  { id: "e004", name: "Dangote Group", sector: "Manufacturing", lga: "Marina", status: "verified", activeVacancies: 15, registeredDate: "2026-02-10", contact: "hr@dangote.com" },
  { id: "e005", name: "Jumia Nigeria", sector: "E-Commerce", lga: "Surulere", status: "pending", activeVacancies: 0, registeredDate: "2026-05-10", contact: "jobs@jumia.com.ng" },
  { id: "e006", name: "TechTalent Lagos", sector: "Recruitment", lga: "Yaba", status: "pending", activeVacancies: 0, registeredDate: "2026-05-12", contact: "info@techtalentlagos.com" },
];

export const mockCVQueue = [
  { id: "cv001", seekerId: "u003", seekerName: "Fatimah Aliyu", uploadedDate: "2026-05-14", fileType: "PDF", status: "pending", skills: ["Data Entry", "Excel", "Admin"], education: "OND Business Admin" },
  { id: "cv002", seekerId: "u005", seekerName: "Ngozi Obi", uploadedDate: "2026-05-13", fileType: "DOCX", status: "pending", skills: ["Nursing", "Patient Care"], education: "BSc Nursing Science" },
  { id: "cv003", seekerId: "u010", seekerName: "Rasheed Ibrahim", uploadedDate: "2026-05-12", fileType: "PDF", status: "pending", skills: ["Plumbing", "Pipe Fitting"], education: "Trade Test Certificate" },
  { id: "cv004", seekerId: "u007", seekerName: "Aminat Suleiman", uploadedDate: "2026-05-11", fileType: "PDF", status: "reviewed", feedback: "CV is clear but lacks a personal statement. Recommend adding one.", skills: ["Tailoring", "Fashion Design"], education: "WAEC" },
  { id: "cv005", seekerId: "u012", seekerName: "Kayode Olawale", uploadedDate: "2026-05-10", fileType: "PDF", status: "validated", skills: ["Sales", "Customer Service", "CRM"], education: "BSc Business Admin" },
];

export const mockDashboardStats = {
  totalJobseekers: 14782,
  newThisMonth: 1243,
  activeVacancies: 892,
  placementsThisMonth: 318,
  totalEmployers: 634,
  pendingVerifications: 12,
  totalTrainings: 47,
  trainingEnrolments: 3241,
  cvsPendingReview: 89,
  disabilityRegistered: 412,
  femaleJobseekers: 7301,
  maleJobseekers: 7481,
};

export const mockRegistrationTrend = [
  { month: "Nov", count: 620 },
  { month: "Dec", count: 480 },
  { month: "Jan", count: 890 },
  { month: "Feb", count: 1100 },
  { month: "Mar", count: 980 },
  { month: "Apr", count: 1320 },
  { month: "May", count: 1243 },
];

export const mockSectorDemand = [
  { sector: "Technology", demand: 234, supply: 189 },
  { sector: "Banking", demand: 187, supply: 312 },
  { sector: "Construction", demand: 156, supply: 98 },
  { sector: "Healthcare", demand: 143, supply: 87 },
  { sector: "Education", demand: 128, supply: 201 },
  { sector: "Manufacturing", demand: 112, supply: 134 },
  { sector: "Hospitality", demand: 98, supply: 67 },
];

export const mockLGADistribution = [
  { lga: "Alimosho", count: 2341 },
  { lga: "Ikeja", count: 1876 },
  { lga: "Oshodi-Isolo", count: 1543 },
  { lga: "Mushin", count: 1287 },
  { lga: "Agege", count: 1102 },
  { lga: "Surulere", count: 987 },
  { lga: "Kosofe", count: 876 },
  { lga: "Lagos Mainland", count: 743 },
  { lga: "Eti-Osa", count: 698 },
  { lga: "Badagry", count: 456 },
];

export const mockSkillsGap = [
  { skill: "Data Analysis", demand: 450, supply: 178, gap: 272 },
  { skill: "Software Dev", demand: 380, supply: 210, gap: 170 },
  { skill: "Project Mgmt", demand: 290, supply: 145, gap: 145 },
  { skill: "Digital Marketing", demand: 340, supply: 230, gap: 110 },
  { skill: "Electrical Tech", demand: 220, supply: 120, gap: 100 },
  { skill: "Healthcare", demand: 310, supply: 215, gap: 95 },
  { skill: "Plumbing", demand: 180, supply: 89, gap: 91 },
];
