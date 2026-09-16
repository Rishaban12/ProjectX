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
  label: string
  title: string
  headline: string
  accentWord: string
  description: string
  points: string[]
  video: string
  accentBg: string
  accentIcon: string
  accentSoft: string
  to: string
}

export const SERVICES: Service[] = [
  {
    icon: Globe2,
    label: 'Websites',
    title: 'Websites for Growing Businesses',
    headline: 'Fast sites that look bigger than your budget.',
    accentWord: 'budget',
    description:
      'Fast, conversion-ready websites for small and growing industries — built to look bigger than your budget.',
    points: ['Custom UI/UX design', 'E-commerce & booking', 'SEO + performance tuned', 'Ongoing support'],
    video: '/videos/websites.mp4',
    accentBg: 'border border-line bg-transparent',
    accentIcon: 'text-ink-soft',
    accentSoft: 'bg-ink/5',
    to: '/services#business',
  },
  {
    icon: Boxes,
    label: 'Student Projects',
    title: 'Student Tech Projects',
    headline: 'Projects you can actually stand up and defend.',
    accentWord: 'defend',
    description:
      'Mini, major & final-year projects across web, AI/ML, IoT and app development — built with you, not just for you.',
    points: ['1:1 mentorship', 'Report & documentation', 'Viva / demo prep', 'Source code walkthrough'],
    video: '/videos/student-projects.mp4?v=2',
    accentBg: 'border border-line bg-transparent',
    accentIcon: 'text-ink-soft',
    accentSoft: 'bg-ink/5',
    to: '/services#students',
  },
  {
    icon: BrainCircuit,
    label: 'Learning Sessions',
    title: 'Tech Learning Sessions',
    headline: 'Skills that keep you ahead of the tools.',
    accentWord: 'tools',
    description:
      'Live sessions on coding foundations, AI adoption & adaptiveness — for students, teams and institutions.',
    points: ['Coding bootcamps', 'AI invasion workshops', 'Hands-on labs', 'Certificates of completion'],
    video: '/videos/learning.mp4',
    accentBg: 'border border-line bg-transparent',
    accentIcon: 'text-ink-soft',
    accentSoft: 'bg-ink/5',
    to: '/learning',
  },
  {
    icon: FileText,
    label: 'Career Studio',
    title: 'Resume & Career Studio',
    headline: 'Resumes built for the job you want next.',
    accentWord: 'next',
    description:
      'ATS-optimized resumes and career positioning built around the technology you are adapting to.',
    points: ['ATS-friendly design', 'LinkedIn optimization', 'Mock interviews', '48-hour turnaround'],
    video: '/videos/career.mp4',
    accentBg: 'border border-line bg-transparent',
    accentIcon: 'text-ink-soft',
    accentSoft: 'bg-ink/5',
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
  id: number
  name: string
  role: string
  company: string
  quote: string
  rating: number
  avatar: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Ananya R.',
    role: 'Founder',
    company: 'Saffron Threads',
    quote:
      'ProjectX rebuilt our store in three weeks. Orders went up the same month the new site launched.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 2,
    name: 'Mohit Verma',
    role: 'Final-year CSE student',
    company: 'Campus Lab',
    quote:
      'They didn’t just hand me a project — I understood every module well enough to defend it in my viva.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 3,
    name: 'Kavya S.',
    role: 'Ops Lead',
    company: 'Freightline',
    quote:
      'The AI adaptiveness session finally made "using AI at work" concrete for our whole team, not just buzzwords.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 4,
    name: 'Rehan Öztürk',
    role: 'Career switcher',
    company: 'Ex-mechanical engineer',
    quote:
      'New resume, new LinkedIn, and a coding roadmap — I had three interviews lined up within a month.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
  },
]

export type Track = {
  icon: LucideIcon
  title: string
  level: string
  description: string
  topics: string[]
  image: string
  imageAlt: string
}

export const LEARNING_TRACKS: Track[] = [
  {
    icon: Code2,
    title: 'Coding Foundations',
    level: 'Beginner → Intermediate',
    description: 'Programming fundamentals, data structures, and web development from first principles.',
    topics: ['Python & JavaScript', 'DSA problem solving', 'Git & GitHub', 'Full-stack basics'],
    image: '/images/track-coding.png',
    imageAlt: 'Laptop showing a coding lesson with Python, JavaScript, and a yellow Git commit',
  },
  {
    icon: BrainCircuit,
    title: 'AI Invasion & Adaptiveness',
    level: 'All levels',
    description: 'Understand where AI is disrupting work, and build the habits to adapt faster than it moves.',
    topics: ['Prompting & AI tools', 'AI in your workflow', 'Responsible AI use', 'Building with AI APIs'],
    image: '/images/track-ai.png',
    imageAlt: 'Laptop and tablet showing an AI prompt lab with a yellow Run prompt button',
  },
  {
    icon: Globe2,
    title: 'Modern Web & Cloud',
    level: 'Intermediate',
    description: 'Ship real applications with the stacks companies actually use in production.',
    topics: ['React & TypeScript', 'APIs & databases', 'Cloud deployment', 'Performance & security'],
    image: '/images/track-web.png',
    imageAlt: 'Laptop and phone showing a React app with a yellow Deploy button',
  },
  {
    icon: Users,
    title: 'Campus & Team Workshops',
    level: 'Custom',
    description: 'On-site or virtual sessions tailored to your institution or company’s tech maturity.',
    topics: ['Custom curriculum', 'Hands-on labs', 'Assessments', 'Completion certificates'],
    image: '/images/track-workshop.png',
    imageAlt: 'Campus workshop kit with laptops, lab booklet, and a yellow completion certificate',
  },
]

export const FORMATS = [
  { icon: Clock, title: 'Live Cohorts', description: '4–8 week structured batches with weekly live sessions.' },
  { icon: Users, title: '1:1 Mentorship', description: 'Personalized pace, direct feedback, flexible scheduling.' },
  { icon: GraduationCap, title: 'College Workshops', description: 'Full-day or multi-day sessions run on your campus.' },
]
