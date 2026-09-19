import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from '../../i18n/LangContext'
import Nav from '../../components/Nav'
import Home from './Home'
import Projects from './Projects'
import AdalineCaseStudy from './AdalineCaseStudy'
import About from './About'
import Notes from './Notes'
import Contact from './Contact'
import './index.css'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/adaline" element={<AdalineCaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
