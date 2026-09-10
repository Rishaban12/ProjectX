import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Glow from './components/Glow'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Learning from './pages/Learning'
import NotFound from './pages/NotFound'
import Resume from './pages/Resume'
import Services from './pages/Services'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Glow />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
