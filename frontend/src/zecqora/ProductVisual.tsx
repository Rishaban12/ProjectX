import { ArrowUpRight, Check, Code2, Command, FileCode2, Folder, Layers, MoreHorizontal, Plus, Search, Sparkles, Terminal, Wifi } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export type ProductKind = 'student' | 'business' | 'app' | 'learning' | 'career'

/** Illustrative interfaces, rendered as HTML so they stay sharp at every size. */
export function ProductVisual({ kind = 'student', compact = false }: { kind?: ProductKind; compact?: boolean }) {
  const scene = useRef<HTMLDivElement>(null)
  const visible = useInView(scene, { margin: '100px' })
  const isWebsite = kind === 'business'
  const isApp = kind === 'app'
  return (
    <div ref={scene} data-active={visible} className={`product-scene scene-${kind} ${compact ? 'scene-compact' : ''}`} aria-hidden="true">
      <div className="scene-orbit orbit-one" /><div className="scene-orbit orbit-two" />
      {isApp ? <AppComposition /> : (
        <>
          <div className="device-browser">
            <div className="device-toolbar"><span className="traffic-lights"><i /><i /><i /></span><span className="device-address">{isWebsite ? 'morrow.studio' : kind === 'career' ? 'your-story.portfolio' : 'workspace / your-next-idea'}</span><MoreHorizontal size={15} /></div>
            {isWebsite ? <WebsiteScreen /> : kind === 'career' ? <PortfolioScreen /> : <ProjectScreen learning={kind === 'learning'} />}
          </div>
          <div className="device-shadow" />
          <div className="scene-float float-code"><div><Terminal size={13} /><span>{isWebsite ? 'Built for every screen' : 'Your idea, taking shape'}</span><span className="float-light" /></div><code><span>const</span> nextChapter = {'{'}<br />&nbsp; idea: <em>'something great'</em>,<br />&nbsp; possibilities: <em>'endless'</em><br />{'}'}</code></div>
          <div className="scene-float float-success"><span className="success-orb"><Check size={18} /></span><div><strong>{isWebsite ? 'Ready for the world.' : 'It started with your idea.'}</strong><span>{isWebsite ? 'Thoughtfully designed. Beautifully built.' : 'Now look what you can build.'}</span></div></div>
          <div className="scene-cursor"><ArrowUpRight size={24} /><span>You, the builder</span></div>
        </>
      )}
    </div>
  )
}

function ProjectScreen({ learning }: { learning: boolean }) {
  return <div className="project-app"><aside className="app-sidebar"><div className="app-logo"><Command size={17} /> campus<span>OS</span></div><div className="side-search"><Search size={12} /> Find anything <small>⌘ K</small></div><div className="side-label">YOUR WORKSPACE</div><span className="side-active"><Layers size={13} /> Overview</span><span><Folder size={13} /> My projects <small>03</small></span><span><Code2 size={13} /> Playground</span><span><FileCode2 size={13} /> Resources</span><div className="sidebar-bottom"><span className="avatar-dot">Y</span><span>Your workspace<small>A little more possible, every day.</small></span></div></aside><div className="app-main"><div className="app-breadcrumb">Workspace <span>/</span> {learning ? 'Learning lab' : 'Project overview'}<span className="app-options"><MoreHorizontal size={15} /></span></div><div className="app-heading"><div><small>LET’S BUILD SOMETHING GOOD</small><h4>{learning ? 'A little progress. Every day.' : 'Hello, possibility.'}<span>✳</span></h4><p>{learning ? 'One new skill. A world of new possibilities.' : 'Your next great project starts with a first step.'}</p></div><span className="mini-button"><Plus size={12} /> New idea</span></div><div className="app-metrics"><div><span>YOUR NEXT CHAPTER</span><strong>{learning ? 'Learn' : 'Create'}<ArrowUpRight size={18} /></strong><small>Make something that matters.</small></div><div><span>THE APPROACH</span><strong>Build together</strong><small>Guidance at every step.</small></div></div><div className="app-workspace"><div className="project-progress"><div className="panel-heading"><span>From idea to impact</span><MoreHorizontal size={14} /></div><div className="progress-chart">{[25, 38, 32, 50, 45, 62, 58, 78, 72, 92, 85, 100].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * .085}s` }} />)}</div><div className="chart-labels"><span>First idea</span><span>Your next chapter ↗</span></div></div><div className="project-checklist"><div className="panel-heading">Your build journey</div>{['Find your idea', 'Plan the experience', 'Make it work', 'Make it yours'].map((text, i) => <div className="checklist-row" key={text}><span className={i < 2 ? 'task-done' : ''}>{i < 2 ? <Check size={10} /> : `0${i + 1}`}</span>{text}</div>)}</div></div><div className="app-bottom"><span className="green-light" />Every big thing starts small.<span>Keep building <ArrowUpRight size={12} /></span></div></div></div>
}

function WebsiteScreen() {
  return <div className="website-screen"><div className="store-nav"><strong>morrow<span>®</span></strong><span>Objects &nbsp;&nbsp; Our story &nbsp;&nbsp; Journal</span><span>Bag (0)</span></div><div className="store-content"><div><span className="store-kicker">LESS, BUT BETTER.</span><h4>Space to<br />live a little<br /><em>slower.</em></h4><p>Considered objects.<br />Everyday rituals. Beautifully simple.</p><span className="store-button">Explore the collection <ArrowUpRight size={13} /></span></div><div className="still-life"><div className="sun-disc" /><div className="sculpture sculpture-back" /><div className="sculpture sculpture-front" /><div className="sculpture-shadow" /><span>THE EVERYDAY COLLECTION — 01</span></div></div><div className="store-footer"><span>Thoughtfully made.</span><span>Designed to stay.</span><ArrowUpRight size={15} /></div></div>
}

function PortfolioScreen() {
  return <div className="portfolio-screen"><div className="portfolio-nav"><span>YOUR NAME / PORTFOLIO</span><ArrowUpRight size={16} /></div><div className="portfolio-intro"><span className="portfolio-label">CURIOUS MIND. CREATIVE BUILDER.</span><h4>Good work.<br /><em>Great potential.</em></h4><p>I turn interesting problems into thoughtful digital experiences.</p></div><div className="portfolio-projects"><div><Code2 size={28} /><span>01 / CAMPUS PLATFORM</span></div><div><Layers size={28} /><span>02 / YOUR NEXT IDEA</span></div></div></div>
}

function AppComposition() {
  return <div className="phones"><div className="phone phone-back"><div className="phone-status">9:41 <Wifi size={11} /></div><div className="phone-island" /><div className="phone-screen"><span className="phone-brand">moment<span>✳</span></span><div className="phone-greeting">A LITTLE SPACE FOR YOU</div><h4>Less noise.<br />More focus.</h4><div className="focus-orb"><span>25:00</span><small>ONE THING AT A TIME</small></div><div className="phone-start">Start a moment <ArrowUpRight size={14} /></div><p>Your day. A little more intentional.</p></div></div><div className="phone phone-front"><div className="phone-status">9:41 <Wifi size={11} /></div><div className="phone-island" /><div className="phone-screen"><span className="phone-brand">moment<span>✳</span></span><div className="phone-greeting">MAKE ROOM FOR WHAT MATTERS</div><h4>Good things<br />take focus.</h4><div className="phone-calendar"><span>MON<b>12</b></span><span>TUE<b>13</b></span><span className="today">WED<b>14</b></span><span>THU<b>15</b></span><span>FRI<b>16</b></span></div><div className="phone-task"><span><Code2 size={16} /></span><div>Build something good<small>Your next project</small></div><Check size={13} /></div><div className="phone-task"><span><Sparkles size={16} /></span><div>Learn something new<small>A little curiosity goes far</small></div><Plus size={13} /></div><div className="phone-note">Small steps.<br /><strong>Real progress.</strong><span>↗</span></div></div></div><div className="app-floating-label"><span className="green-light" /> From your idea. To their everyday.</div></div>
}
