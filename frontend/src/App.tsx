import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Glow from './components/Glow'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Learning from './pages/Learning'
import Manifesto from './pages/Manifesto'
import NotFound from './pages/NotFound'
import ProjectLearning from './pages/ProjectLearning'
import Resume from './pages/Resume'
import ServiceDetail from './pages/ServiceDetail'
import Services from './pages/Services'
import WallOfVoices from './pages/WallOfVoices'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Glow />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/project-learning" element={<ProjectLearning />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wall-of-voices" element={<WallOfVoices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
