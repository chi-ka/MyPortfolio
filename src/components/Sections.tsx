import { useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Award, Download, GraduationCap, Github, Linkedin, Mail, Menu, Moon, Send, Sun, X } from 'lucide-react'
import { certs, education, experience, profile, skillGroups } from '../data'

const links = ['Projects', 'About', 'Skills', 'Experience', 'Certifications', 'Contact']
const id = (l: string) => (l === 'Certifications' ? 'certs' : l.toLowerCase())

export function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-lg font-bold">{profile.name}</a>
        <ul className="hidden items-center gap-6 text-sm text-mute md:flex">
          {links.map((l) => <li key={l}><a href={`#${id(l)}`} className="hover:text-ink">{l}</a></li>)}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className="rounded-lg p-2 text-mute hover:text-ink">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu" className="rounded-lg p-2 md:hidden">{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {open && <ul className="border-t border-line bg-bg px-5 py-3 md:hidden">{links.map((l) => <li key={l}><a onClick={() => setOpen(false)} href={`#${id(l)}`} className="block py-2 text-mute">{l}</a></li>)}</ul>}
    </header>
  )
}

const Section = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section id={id} className="mx-auto max-w-6xl px-5 py-20">
    <h2 className="font-display text-4xl font-bold md:text-5xl">{title}</h2>
    <div className="mt-8">{children}</div>
  </section>
)

export function About() {
  const pts = ['Enterprise RPA development', 'UiPath and Blue Prism expertise', 'Python automation and console applications', 'AI-powered workflow development', 'LangChain and LLM application development', 'React and front-end development', 'SQL and enterprise database integration', 'Business process optimization']
  return (
    <Section id="about" title="About me">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-mute">
          <p>I am a software developer and automation engineer with around four years of experience designing, developing and deploying automation solutions for business processes.</p>
          <p>I specialize in turning manual, repetitive processes into intelligent, scalable and efficient digital solutions. My day-to-day work is in financial operations, where accuracy and reliability matter.</p>
          <p>My path started with RPA, grew into Python and database integration, and now leads into AI engineering: RAG, AI agents and intelligent enterprise automation. I also build web front-ends, so I can take a solution from workflow to interface.</p>
        </div>
        <ul className="grid gap-2 self-start">
          {pts.map((p) => <li key={p} className="flex items-center gap-3 rounded-lg border border-line bg-surface/60 px-4 py-2.5 text-sm"><Icons.Check size={16} className="text-c" />{p}</li>)}
        </ul>
      </div>
    </Section>
  )
}

export function Skills() {
  return (
    <Section id="skills" title="Technical skills">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[g.icon] ?? Icons.Code2
          return (
            <motion.div key={g.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-line bg-surface/70 p-6 transition hover:-translate-y-1 hover:border-a">
              <Icon className="text-a" />
              <h3 className="mt-3 font-display text-lg font-bold">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">{g.items.map((s) => <span key={s} className="rounded-md border border-line px-2.5 py-1 text-xs text-mute transition hover:border-c hover:text-c">{s}</span>)}</div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

export function Experience() {
  const e = experience
  return (
    <Section id="experience" title="Professional experience">
      <div className="relative border-l border-line pl-8">
        <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-c" />
        <h3 className="font-display text-2xl font-bold">{e.role} — {e.company}</h3>
        <p className="text-sm text-mute">{e.period}</p>
        <ul className="mt-4 space-y-2 text-mute">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </Section>
  )
}

export function Certs() {
  return (
    <Section id="certs" title="Certifications & education">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((c) => (
          <div key={c.name} className="flex gap-3 rounded-xl border border-line bg-surface/70 p-5 transition hover:border-b">
            <Award className="shrink-0 text-b" /><div><p className="font-medium">{c.name}</p><p className="text-sm text-mute">{c.year}</p></div>
          </div>
        ))}
        <div className="flex gap-3 rounded-xl border border-a/50 bg-surface p-5">
          <GraduationCap className="shrink-0 text-a" /><div><p className="font-medium">{education.degree}</p><p className="text-sm text-mute">{education.school} · {education.honours}</p></div>
        </div>
      </div>
    </Section>
  )
}

export function Contact() {
  const [err, setErr] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const name = String(d.get('name') ?? '').trim(), email = String(d.get('email') ?? '').trim(), msg = String(d.get('message') ?? '').trim()
    const x: Record<string, string> = {}
    if (name.length < 2) x.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(email)) x.email = 'Enter a valid email address.'
    if (msg.length < 10) x.message = 'Write at least 10 characters.'
    setErr(x); setSent(false)
    if (Object.keys(x).length) return
    // Opens the visitor's mail app. Swap for Formspree/EmailJS/your API for in-page sending.
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + name)}&body=${encodeURIComponent(msg + '\n\n' + name + ' (' + email + ')')}`
    setSent(true); e.currentTarget.reset()
  }
  const field = 'mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm'
  return (
    <Section id="contact" title="Have a process to automate or an AI idea to build?">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-mute">Let's collaborate to build intelligent solutions that solve real-world business problems.</p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <a href={`mailto:${profile.email}`} className="btn-g"><Mail size={16} />{profile.email}</a>
            <a href={profile.linkedin} className="btn-g"><Linkedin size={16} />LinkedIn</a>
            <a href={profile.github} className="btn-g"><Github size={16} />GitHub</a>
            <a href={profile.resume} download className="btn-p"><Download size={16} />Download CV</a>
          </div>
        </div>
        <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border border-line bg-surface/70 p-6">
          {(['name', 'email', 'message'] as const).map((f) => (
            <div key={f}>
              <label htmlFor={f} className="text-sm font-medium capitalize">{f}</label>
              {f === 'message' ? <textarea id={f} name={f} rows={5} className={field} aria-invalid={!!err[f]} /> : <input id={f} name={f} type={f === 'email' ? 'email' : 'text'} className={field} aria-invalid={!!err[f]} />}
              {err[f] && <p role="alert" className="mt-1 text-xs text-red-400">{err[f]}</p>}
            </div>
          ))}
          <button className="btn-p" type="submit"><Send size={16} />Send message</button>
          <p aria-live="polite" className="text-sm text-c">{sent && 'Opening your email app with the message ready to send.'}</p>
        </form>
      </div>
    </Section>
  )
}

export const Footer = () => <footer className="border-t border-line py-8 text-center text-sm text-mute">© {new Date().getFullYear()} {profile.name}</footer>
