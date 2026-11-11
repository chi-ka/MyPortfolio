import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import { Nav, About, Skills, Experience, Certs, Contact, Footer } from './components/Sections'

export default function App() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    try { if (localStorage.getItem('theme') === 'light') setDark(false) } catch { /* ignore */ }
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch { /* ignore */ }
  }, [dark])
  return (
    <>
      <Nav dark={dark} toggle={() => setDark((d) => !d)} />
      <main>
        <Hero /><Projects /><About /><Skills /><Experience /><Certs /><Contact />
      </main>
      <Footer />
    </>
  )
}
