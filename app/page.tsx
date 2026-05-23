import Link from "next/link";
import {
  ArrowRight,
  Users,
  Briefcase,
  GraduationCap,
  BarChart3,
  Building2,
  FileText,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Award,
} from "lucide-react";
import IseEkoLogo from "@/components/ui/IseEkoLogo";

// ─── Data ──────────────────────────────────────────────────────────────────

const stats = [
  { value: "14,782", label: "Registered Job Seekers", sub: "Active on the platform" },
  { value: "892",    label: "Live Vacancies",          sub: "Across all sectors" },
  { value: "634",    label: "Verified Employers",      sub: "Public & private sector" },
  { value: "318",    label: "Total Placements",   sub: "Confirmed hires" },
];

const howItWorks = [
  {
    step: "01",
    title: "Register & Verify",
    desc: "Create your profile with your NIN for identity verification. Takes less than 5 minutes.",
    color: "bg-[#EEF2FF]",
    textColor: "text-[#1E3FAE]",
  },
  {
    step: "02",
    title: "Build Your Profile",
    desc: "Add your education, work experience, and skills. Upload your CV for Ministry validation.",
    color: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  {
    step: "03",
    title: "Get Matched",
    desc: "Our smart matching engine connects you to the right jobs, training, and opportunities.",
    color: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    step: "04",
    title: "Apply & Grow",
    desc: "Apply directly, track your applications, and upskill through certified training programmes.",
    color: "bg-purple-50",
    textColor: "text-purple-700",
  },
];

const userTypes = [
  {
    icon: Users,
    title: "Job Seekers",
    desc: "Youth aged 18–35 looking for employment opportunities across Lagos State.",
    bg: "bg-[#EEF2FF]",
    iconColor: "text-[#1E3FAE]",
    count: "14,782 registered",
  },
  {
    icon: "🔧",
    title: "Artisans",
    desc: "Skilled tradespeople — tailors, plumbers, electricians — seeking formal recognition and clients.",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    count: "800+ artisans",
  },
  {
    icon: Building2,
    title: "Employers",
    desc: "Public and private sector organisations posting verified vacancies and discovering talent.",
    bg: "bg-green-50",
    iconColor: "text-green-600",
    count: "634 verified employers",
  },
  {
    icon: Briefcase,
    title: "Recruitment Agencies",
    desc: "Licensed recruiters sourcing and placing candidates across industries in Lagos.",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    count: "Coming soon",
  },
  {
    icon: GraduationCap,
    title: "Training Providers",
    desc: "Vocational institutes and digital academies offering certified upskilling programmes.",
    bg: "bg-red-50",
    iconColor: "text-red-500",
    count: "47 programmes",
  },
  {
    icon: BarChart3,
    title: "Researchers",
    desc: "Academic and policy researchers accessing anonymised labour market intelligence data.",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
    count: "Anonymised data access",
  },
];

const features = [
  {
    icon: FileText,
    title: "CV Upload & Ministry Validation",
    desc: "Upload your CV for professional review by the Ministry. Receive an official validation badge that boosts your credibility with employers.",
    badge: "Ministry Validated",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: Zap,
    title: "Smart Job Matching Engine",
    desc: "Our algorithm matches your skills, location, and experience to the most relevant vacancies — showing you a real percentage match score.",
    badge: "AI Powered",
    badgeColor: "bg-[#EEF2FF] text-[#1E3FAE]",
  },
  {
    icon: GraduationCap,
    title: "Training & Skills Acquisition",
    desc: "Access a digital catalogue of government-sponsored and private training programmes. Earn digital certificates and badges on completion.",
    badge: "Free Programmes Available",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: Globe,
    title: "Digital Yellow Pages",
    desc: "A comprehensive directory of corporates, SMEs, startups, and public institutions — searchable by sector and LGA across Lagos State.",
    badge: "Corporate Directory",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    icon: BarChart3,
    title: "Labour Market Intelligence",
    desc: "The Ministry tracks skills gaps, sector demand, and employment outcomes in real time — enabling data-driven workforce policy decisions.",
    badge: "For Policymakers",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    icon: Shield,
    title: "Identity Verification (NIN/LASSRA)",
    desc: "Secure registration using Nigeria's national identity infrastructure. Your data is encrypted and never shared with employers.",
    badge: "NDPR Compliant",
    badgeColor: "bg-red-100 text-red-600",
  },
];

const testimonials = [
  {
    name: "Chukwuemeka Eze",
    role: "Frontend Developer — Hired at Flutterwave",
    lga: "Surulere",
    quote: "I uploaded my CV, got it validated by the Ministry, and within 3 weeks had an interview at Flutterwave. ISE EKO actually works.",
    score: 94,
    initials: "CE",
    color: "#1E3FAE",
  },
  {
    name: "Aminat Suleiman",
    role: "Certified Fashion Artisan",
    lga: "Badagry",
    quote: "I enrolled in the government-sponsored tailoring programme through ISE EKO. I now have my certificate and three regular clients.",
    score: 87,
    initials: "AS",
    color: "#DB2777",
  },
  {
    name: "Seun Adeyemi",
    role: "Data Analyst — Placed via Platform",
    lga: "Alimosho",
    quote: "The match score feature is incredible. I could see exactly which jobs suited my skills before applying. Got shortlisted on my first application.",
    score: 91,
    initials: "SA",
    color: "#16A34A",
  },
];

const sectors = [
  "Technology", "Banking & Finance", "Healthcare", "Education",
  "Construction", "Manufacturing", "Hospitality", "Telecommunications",
  "E-Commerce", "Fintech", "Energy & Utilities", "Logistics",
];

const impactNumbers = [
  { value: "20", label: "Local Governments", sub: "Covered across Lagos State", icon: MapPin },
  { value: "67%", label: "Training Completion Rate", sub: "Of enrolled participants", icon: Award },
  { value: "38 days", label: "Avg. Time to Placement", sub: "From registration to hire", icon: TrendingUp },
  { value: "₦2.4B", label: "Estimated Wages Unlocked", sub: "Through successful placements", icon: TrendingUp },
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* Top colour strip */}
      <div className="fixed top-0 left-0 right-0 h-1 flex z-50">
        <div className="flex-1 bg-red-500" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-green-500" />
        <div className="flex-1 bg-blue-600" />
      </div>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-1 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <IseEkoLogo variant="dark" size="md" />
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how-it-works" className="hover:text-[#0B1D6E] transition">How it works</a>
            <a href="#features" className="hover:text-[#0B1D6E] transition">Features</a>
            <a href="#for-employers" className="hover:text-[#0B1D6E] transition">For Employers</a>
            <a href="#training" className="hover:text-[#0B1D6E] transition">Training</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-[#0B1D6E] transition hidden sm:block">
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-[#0B1D6E] hover:bg-[#071245] text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
            >
              Register Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0B1D6E] relative overflow-hidden pt-1">
        {/* Decorative elements */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full border border-white/10" />
        <div className="absolute top-[-40px] right-[40px] w-[300px] h-[300px] rounded-full border border-white/10" />
        <div className="absolute bottom-[-80px] left-[-80px] w-[380px] h-[380px] rounded-full bg-[#1E3FAE]/30" />
        <div className="absolute top-[30%] right-[10%] w-[180px] h-[180px] rounded-full bg-white/5" />

        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                  Official Lagos State Initiative
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
                Find work.
                <br />
                <span className="text-yellow-400">Build skills.</span>
                <br />
                Grow Lagos.
              </h1>

              <p className="text-white/70 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                ISE EKO is the Lagos State Digital Job Centre — connecting job seekers,
                artisans, employers, and training providers across all 20 Local Governments.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="bg-yellow-400 hover:bg-yellow-300 text-[#0B1D6E] font-bold px-7 py-3.5 rounded-xl text-base transition flex items-center gap-2 justify-center shadow-lg shadow-yellow-400/20"
                >
                  Get Started — It&apos;s Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition flex items-center gap-2 justify-center"
                >
                  Sign In
                </Link>
              </div>

              <p className="text-white/40 text-sm mt-5">
                No fees. Open to all Lagos State residents aged 18–35.
              </p>
            </div>

            {/* Right — Interactive card stack */}
            <div className="shrink-0 flex flex-col gap-3 w-full max-w-xs">
              {/* Job match card */}
              <div className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-green-400 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-sm font-semibold">New job match</span>
                  </div>
                  <span className="text-xs font-bold bg-yellow-400 text-[#0B1D6E] px-2 py-0.5 rounded-full">New</span>
                </div>
                <p className="text-white/60 text-xs mb-3">Frontend Developer · Flutterwave · Ikeja, Lagos</p>
                <p className="text-white/60 text-xs mb-1">Match score</p>
                <p className="text-white font-bold text-3xl">94%</p>
                <div className="flex gap-0.5 mt-1.5 items-end">
                  {[5, 7, 6, 9, 8, 7, 9, 10, 9, 8].map((h, i) => (
                    <div key={i} className="w-2 rounded-sm bg-yellow-400 opacity-80" style={{ height: `${h * 2.5}px` }} />
                  ))}
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "12k+", label: "Job Listings", color: "bg-white/10" },
                  { value: "3.4k+", label: "Employers", color: "bg-yellow-400/20" },
                  { value: "47", label: "Training Programmes", color: "bg-green-400/20" },
                  { value: "800+", label: "Artisans", color: "bg-white/10" },
                ].map(({ value, label, color }) => (
                  <div key={label} className={`${color} border border-white/10 rounded-xl p-3 text-center`}>
                    <p className="text-white font-bold text-lg">{value}</p>
                    <p className="text-white/50 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Ministry badge */}
              <div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#0B1D6E]" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Official Government Platform</p>
                  <p className="text-white/50 text-xs mt-0.5">Lagos State Ministry of Wealth Creation & Employment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-16 -mb-px">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 0C1440 0 1080 64 720 64C360 64 0 0 0 0L0 64Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── STATS STRIP ────────────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label, sub }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-bold text-[#0B1D6E]">{value}</p>
                <p className="text-sm font-semibold text-[#374151] mt-1">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gray-100" />
      </div>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#1E3FAE] uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl font-bold text-[#111827] mt-2 mb-3">How ISE EKO works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From registration to employment in four straightforward steps — designed for every Lagos resident.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map(({ step, title, desc, color, textColor }) => (
              <div key={step} className="relative">
                <div className={`${color} rounded-2xl p-6 h-full`}>
                  <span className={`text-4xl font-black ${textColor} opacity-20`}>{step}</span>
                  <h3 className="font-bold text-[#111827] mt-3 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
                {/* Connector arrow */}
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 bg-white rounded-full border border-gray-200 items-center justify-center last:hidden">
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#0B1D6E] hover:bg-[#071245] text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
            >
              Register now — free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#1E3FAE] uppercase tracking-widest">Inclusive by Design</span>
            <h2 className="text-3xl font-bold text-[#111827] mt-2 mb-3">Built for every Lagos resident</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              ISE EKO is designed to leave no one behind — from fresh graduates to artisans, from employers to researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userTypes.map(({ icon, title, desc, bg, iconColor, count }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-[#1E3FAE]/20 transition-all">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4 text-2xl`}>
                  {typeof icon === "string" ? (
                    <span>{icon}</span>
                  ) : (
                    (() => { const Icon = icon; return <Icon className={`w-6 h-6 ${iconColor}`} />; })()
                  )}
                </div>
                <h3 className="font-bold text-[#111827] mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
                <span className="text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] px-2.5 py-1 rounded-full">
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* Inclusion callout */}
          <div className="mt-6 bg-[#0B1D6E] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <Shield className="w-6 h-6 text-[#0B1D6E]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">Committed to inclusion</h3>
              <p className="text-white/60 text-sm mt-1">
                ISE EKO has dedicated inclusion pathways for persons with disabilities, women, and underserved communities —
                aligned with Lagos State T.H.E.M.E.S+ and the &ldquo;no one is left behind&rdquo; mandate.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-white font-bold text-xl">412</p>
                <p className="text-white/60 text-xs">PWD Registered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#1E3FAE] uppercase tracking-widest">Platform Capabilities</span>
            <h2 className="text-3xl font-bold text-[#111827] mt-2 mb-3">Everything in one place</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Twelve integrated modules covering the full employment lifecycle — from identity to intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, badge, badgeColor }) => (
              <div key={title} className="group border border-gray-100 rounded-2xl p-6 hover:border-[#1E3FAE]/30 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1E3FAE]" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>{badge}</span>
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR EMPLOYERS ──────────────────────────────────────────────────── */}
      <section id="for-employers" className="py-20 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-[#1E3FAE] uppercase tracking-widest">Employer & Recruiter Tools</span>
              <h2 className="text-3xl font-bold text-[#111827] mt-2 mb-4">
                Find verified talent across Lagos State
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Registered employers get access to a pool of identity-verified, Ministry-validated candidates — 
                searchable by skill, LGA, education level, and experience. Post vacancies and receive applications directly.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Post unlimited job vacancies",
                  "Search and shortlist verified candidates",
                  "Access candidate match scores and CV ratings",
                  "Track application pipelines in your dashboard",
                  "Engage recruitment agencies through the platform",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-[#374151]">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-[#0B1D6E] hover:bg-[#071245] text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
              >
                Register your organisation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Employer dashboard preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-[#111827]">Employer Dashboard</p>
                  <p className="text-xs text-gray-400">Flutterwave · Victoria Island, Lagos</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Active Vacancies", value: "5" },
                  { label: "Total Applications", value: "247" },
                  { label: "Shortlisted", value: "31" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F8F9FC] rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-[#111827]">{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Applicants</p>
                {[
                  { name: "Adaeze Okonkwo", role: "Frontend Developer", score: 94, status: "Shortlisted" },
                  { name: "Seun Adeyemi", role: "Data Analyst", score: 86, status: "Under Review" },
                  { name: "Chioma Uzor", role: "UX Designer", score: 79, status: "Applied" },
                ].map(({ name, role, score, status }) => (
                  <div key={name} className="flex items-center gap-3 bg-[#F8F9FC] rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0B1D6E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#111827] truncate">{name}</p>
                      <p className="text-xs text-gray-400">{role}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-[#1E3FAE]">{score}%</p>
                      <p className="text-xs text-gray-400">{status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAINING ───────────────────────────────────────────────────────── */}
      <section id="training" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#1E3FAE] uppercase tracking-widest">Skills Acquisition</span>
            <h2 className="text-3xl font-bold text-[#111827] mt-2 mb-3">
              Government-backed training programmes
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Access free and subsidised skills programmes across technology, vocational trades, business, and more. 
              Earn digital certificates recognised by Lagos State employers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              {
                category: "Technology",
                programmes: ["Full Stack Web Development", "Data Analysis with Python", "UI/UX Design"],
                color: "bg-[#EEF2FF] border-[#1E3FAE]/20",
                badge: "High Demand",
                badgeColor: "bg-[#1E3FAE] text-white",
              },
              {
                category: "Vocational Trades",
                programmes: ["Tailoring & Fashion Design", "Plumbing & Pipe Fitting", "Electrical Installation"],
                color: "bg-yellow-50 border-yellow-200",
                badge: "Free Available",
                badgeColor: "bg-yellow-400 text-[#0B1D6E]",
              },
              {
                category: "Business & Finance",
                programmes: ["Financial Literacy", "Digital Marketing", "Entrepreneurship & SME"],
                color: "bg-green-50 border-green-200",
                badge: "Government Sponsored",
                badgeColor: "bg-green-600 text-white",
              },
            ].map(({ category, programmes, color, badge, badgeColor }) => (
              <div key={category} className={`border rounded-2xl p-5 ${color}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#111827]">{category}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {programmes.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-3 h-3 text-yellow-400 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <Link
                  href="/login"
                  className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#1E3FAE] hover:gap-2 transition-all"
                >
                  View programmes <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-[#0B1D6E] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-bold">Digital Certification & Badges</span>
              </div>
              <p className="text-white/60 text-sm max-w-md">
                Every completed programme earns you a verifiable digital certificate and badge —
                displayed on your ISE EKO profile and trusted by Lagos State employers.
              </p>
            </div>
            <Link
              href="/register"
              className="bg-yellow-400 hover:bg-yellow-300 text-[#0B1D6E] font-bold px-6 py-3 rounded-xl text-sm transition flex items-center gap-2 flex-shrink-0"
            >
              Browse all programmes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── IMPACT NUMBERS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#1E3FAE] uppercase tracking-widest">Platform Impact</span>
            <h2 className="text-3xl font-bold text-[#111827] mt-2 mb-3">Driving real outcomes across Lagos</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {impactNumbers.map(({ value, label, sub, icon: Icon }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-[#1E3FAE]" />
                </div>
                <p className="text-3xl font-bold text-[#0B1D6E]">{value}</p>
                <p className="text-sm font-semibold text-[#374151] mt-1">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#1E3FAE] uppercase tracking-widest">Success Stories</span>
            <h2 className="text-3xl font-bold text-[#111827] mt-2 mb-3">Real results from real Lagosians</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, lga, quote, score, initials, color }) => (
              <div key={name} className="bg-[#F8F9FC] rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827]">{name}</p>
                    <p className="text-xs text-gray-500 truncate">{role}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {lga}, Lagos
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400">Match score</p>
                    <p className="text-lg font-bold text-[#1E3FAE]">{score}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-[#111827]">Jobs across every sector in Lagos</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {sectors.map((sector) => (
              <Link
                key={sector}
                href="/login"
                className="bg-white border border-gray-200 hover:border-[#1E3FAE] hover:bg-[#EEF2FF] text-sm text-gray-600 hover:text-[#1E3FAE] font-medium px-4 py-2 rounded-full transition"
              >
                {sector}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B1D6E] relative overflow-hidden">
        <div className="absolute -top-15 -right-15 w-75 h-75 rounded-full border border-white/10" />
        <div className="absolute -bottom-15 -left-15 w-70 h-70 rounded-full bg-[#1E3FAE]/40" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your next opportunity
            <br />
            <span className="text-yellow-400">starts here.</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8">
            Join 14,000+ Lagos residents already on ISE EKO. Registration is free, fast, and open to all residents aged 18–35.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="bg-yellow-400 hover:bg-yellow-300 text-[#0B1D6E] font-bold px-8 py-4 rounded-xl text-base transition flex items-center gap-2 justify-center shadow-lg shadow-yellow-400/20"
            >
              Create free account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition flex items-center gap-2 justify-center"
            >
              Sign in to your account
            </Link>
          </div>
          <p className="text-white/30 text-sm mt-6">
            An initiative of the Lagos State Ministry of Wealth Creation & Employment
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#071245] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <IseEkoLogo variant="light" size="md" />
              <p className="text-white/50 text-xs mt-3 leading-relaxed max-w-xs">
                The official Lagos State Digital Job Centre — connecting people to opportunities, training, and economic growth.
              </p>
            </div>
            {/* For Job Seekers */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">For Job Seekers</p>
              <div className="flex flex-col gap-2 text-xs text-white/50">
                {["Register / Sign up", "Find Jobs", "Upload your CV", "Browse Training", "Track Applications"].map((l) => (
                  <Link key={l} href="/login" className="hover:text-white transition">{l}</Link>
                ))}
              </div>
            </div>
            {/* For Employers */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">For Employers</p>
              <div className="flex flex-col gap-2 text-xs text-white/50">
                {["Post a Vacancy", "Search Candidates", "Verify Organisation", "Recruitment Agencies", "Corporate Directory"].map((l) => (
                  <Link key={l} href="/login" className="hover:text-white transition">{l}</Link>
                ))}
              </div>
            </div>
            {/* Contact */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Contact</p>
              <div className="flex flex-col gap-2.5 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>The Secretariat, Alausa, Ikeja, Lagos State</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>0800-ISE-EKO (0800-473-3560)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>info@iseeko.lagosstate.gov.ng</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs text-center">
              © 2026 Lagos State Ministry of Wealth Creation & Employment. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-white/30">
              <a href="#" className="hover:text-white/60 transition">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition">Terms of Use</a>
              <a href="#" className="hover:text-white/60 transition">Accessibility</a>
              <a href="#" className="hover:text-white/60 transition">NDPR Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
