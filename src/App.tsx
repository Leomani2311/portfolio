import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechMarquee from './components/TechMarquee'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import PersonalProjects from './components/PersonalProjects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechMarquee />
        <Skills />
        <Experience />
        <Projects />
        <PersonalProjects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
