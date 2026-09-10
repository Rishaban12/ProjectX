import type { LucideIcon } from 'lucide-react'
import {
  Code2,
  GraduationCap,
  Sparkles,
  FileText,
  Rocket,
  Globe2,
  Boxes,
  BrainCircuit,
  Users,
  Award,
  Clock,
  MessageSquareText,
} from 'lucide-react'

export type NavLink = { label: string; to: string }

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Learning Hub', to: '/learning' },
  { label: 'Resume Studio', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

export type Service = {
  icon: LucideIcon
  title: string
  description: string
  points: string[]
  accentBg: string
  accentIcon: string
  accentSoft: string
  to: string
}

export const SERVICES: Service[] = [
  {
    icon: Globe2,
    title: 'Websites for Growing Businesses',
    description:
      'Fast, conversion-ready websites for small and growing industries — built to look bigger than your budget.',
    points: ['Custom UI/UX design', 'E-commerce & booking', 'SEO + performance tuned', 'Ongoing support'],
    accentBg: 'bg-blue',
    accentIcon: 'text-white',
    accentSoft: 'bg-blue/25',
    to: '/services#business',
  },
  {
    icon: Boxes,
    title: 'Student Tech Projects',
    description:
      'Mini, major & final-year projects across web, AI/ML, IoT and app development — built with you, not just for you.',
    points: ['1:1 mentorship', 'Report & documentation', 'Viva / demo prep', 'Source code walkthrough'],
    accentBg: 'bg-green',
    accentIcon: 'text-white',
    accentSoft: 'bg-green/25',
    to: '/services#students',
  },
  {
    icon: BrainCircuit,
    title: 'Tech Learning Sessions',
    description:
      'Live sessions on coding foundations, AI adoption & adaptiveness — for students, teams and institutions.',
    points: ['Coding bootcamps', 'AI invasion workshops', 'Hands-on labs', 'Certificates of completion'],
    accentBg: 'bg-orange',
    accentIcon: 'text-white',
    accentSoft: 'bg-orange/25',
    to: '/learning',
  },
  {
    icon: FileText,
    title: 'Resume & Career Studio',
    description:
      'ATS-optimized resumes and career positioning built around the technology you are adapting to.',
    points: ['ATS-friendly design', 'LinkedIn optimization', 'Mock interviews', '48-hour turnaround'],
    accentBg: 'bg-yellow',
    accentIcon: 'text-ink',
    accentSoft: 'bg-yellow/25',
    to: '/resume',
  },
]

export type Stat = { label: string; value: string; icon: LucideIcon }

export const STATS: Stat[] = [
  { label: 'Projects delivered', value: '120+', icon: Rocket },
  { label: 'Students mentored', value: '400+', icon: GraduationCap },
  { label: 'Learning sessions run', value: '80+', icon: BrainCircuit },
  { label: 'Client satisfaction', value: '98%', icon: Award },
]

export type ProcessStep = { title: string; description: string; icon: LucideIcon }

export const PROCESS: ProcessStep[] = [
  {
    title: 'Discover',
    description: 'We learn your goals, audience and constraints — no templates copy-pasted blindly.',
    icon: MessageSquareText,
  },
  {
    title: 'Design',
    description: 'Wireframes and visual direction you approve before a single line of code is written.',
    icon: Sparkles,
  },
  {
    title: 'Build',
    description: 'Agile development with weekly check-ins, using modern, maintainable tech stacks.',
    icon: Code2,
  },
  {
    title: 'Launch & Grow',
    description: 'Deployment, training and a support window so your project keeps improving.',
    icon: Rocket,
  },
]

export type Testimonial = {
  name: string
  role: string
  quote: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ananya R.',
    role: 'Founder, Saffron Threads (D2C Textiles)',
    quote:
      'ProjectX rebuilt our store in three weeks. Orders went up the same month the new site launched.',
  },
  {
    name: 'Mohit Verma',
    role: 'Final-year CSE student',
    quote:
      'They didn’t just hand me a project — I understood every module well enough to defend it in my viva.',
  },
  {
    name: 'Kavya S.',
    role: 'Ops Lead, a growing logistics startup',
    quote:
      'The AI adaptiveness session finally made "using AI at work" concrete for our whole team, not just buzzwords.',
  },
  {
    name: 'Rehan Öztürk',
    role: 'Career switcher, ex-mechanical engineer',
    quote:
      'New resume, new LinkedIn, and a coding roadmap — I had three interviews lined up within a month.',
  },
]

export type Track = {
  icon: LucideIcon
  title: string
  level: string
  description: string
  topics: string[]
}

export const LEARNING_TRACKS: Track[] = [
  {
    icon: Code2,
    title: 'Coding Foundations',
    level: 'Beginner → Intermediate',
    description: 'Programming fundamentals, data structures, and web development from first principles.',
    topics: ['Python & JavaScript', 'DSA problem solving', 'Git & GitHub', 'Full-stack basics'],
  },
  {
    icon: BrainCircuit,
    title: 'AI Invasion & Adaptiveness',
    level: 'All levels',
    description: 'Understand where AI is disrupting work, and build the habits to adapt faster than it moves.',
    topics: ['Prompting & AI tools', 'AI in your workflow', 'Responsible AI use', 'Building with AI APIs'],
  },
  {
    icon: Globe2,
    title: 'Modern Web & Cloud',
    level: 'Intermediate',
    description: 'Ship real applications with the stacks companies actually use in production.',
    topics: ['React & TypeScript', 'APIs & databases', 'Cloud deployment', 'Performance & security'],
  },
  {
    icon: Users,
    title: 'Campus & Team Workshops',
    level: 'Custom',
    description: 'On-site or virtual sessions tailored to your institution or company’s tech maturity.',
    topics: ['Custom curriculum', 'Hands-on labs', 'Assessments', 'Completion certificates'],
  },
]

export const FORMATS = [
  { icon: Clock, title: 'Live Cohorts', description: '4–8 week structured batches with weekly live sessions.' },
  { icon: Users, title: '1:1 Mentorship', description: 'Personalized pace, direct feedback, flexible scheduling.' },
  { icon: GraduationCap, title: 'College Workshops', description: 'Full-day or multi-day sessions run on your campus.' },
]
