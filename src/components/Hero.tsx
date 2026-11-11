
import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import {  ArrowRight,  Download,  Github,  Linkedin,  Mail,  User,  Sparkles,} from 'lucide-react'
import { profile, stats } from '../data'

const steps = [
  { t: 'Inbox', s: 'Outlook · Graph API' },
  { t: 'Extract', s: 'Clean HTML, parse' },
  { t: 'Decide', s: 'Rules + LLM' },
  { t: 'Act', s: 'SQL · UiPath · API' },
]

function Pipeline() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI(n => (n + 1) % steps.length), 1400)
    return () => clearInterval(id)
  }, [reduce])

  return (

    
    <div className="relative  justify-end p-3" aria-label="Animated automation pipeline" >
      <div className="mb-2 flex items-center gap-2 text-xs text-mute">
        <span className="h-2 w-2 rounded-full bg-c" />
        process.run() — live
      </div>

      <ol className="space-y-1">
        {steps.map((s, k) => (
          <li key={s.t}>
            <motion.div
              animate={{
                borderColor: k === i ? 'rgb(var(--c))' : 'rgb(var(--line))',
                x: k === i ? 4 : 0,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="flex items-center justify-between rounded-lg rounded-l-[6rem] rounded-r-[6rem] border bg-bg/60 px-2 py-2"
            >
              <div>
                <p className="font-display text-sm font-bold">{s.t}</p>
                <p className="text-[10px] text-mute">{s.s}</p>
              </div>

              <motion.span
                animate={{
                  opacity: k === i ? 1 : 0.25,
                  scale: k === i ? 1 : 0.8,
                }}
                className="h-2 w-2 rounded-full bg-c"
              />
            </motion.div>
          </li>
        ))}
      </ol>


    </div>
  )
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration: 1.2,
      onUpdate: x => setV(Math.round(x)),
    })
    return () => c.stop()
  }, [inView, to])

  return <span ref={ref}>{v}{suffix}</span>
}

export default function Hero() {
  return (

    <section id="top"  className="mx-auto max-w-6xl px-5 pb-20  pt-28 md:px-8 md:pt-36">
      <div className="grid items-stretch gap-16 lg:grid-cols-[1.1fr_0.9fr]">

        {/* LEFT: INTRODUCTION */}
        <div className="max-w-2xl" mb-8 pb-6>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-mute"
          >
            <Sparkles size={15} className="text-a" />
            {profile.title}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl font-bold leading-[1.08] tracking-tight md:text-6xl xl:text-7xl"
          >
            Building intelligent automation.

            <span className="mt-2 block bg-gradient-to-r from-a via-b to-c bg-clip-text text-transparent">
              Engineering AI-powered solutions.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-mute"
          >
            I design intelligent automation systems that eliminate
            repetitive work, streamline business operations, and
            connect enterprise processes with the power of AI.
          </motion.p>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-p">
              View my projects <ArrowRight size={16} />
            </a>

            <a href={profile.resume} download className="btn-g">
              <Download size={16} /> Download resume
            </a>

            <a href="#contact" className="btn-g">
              <Mail size={16} /> Contact me
            </a>
          </div>

          {/* SOCIAL LINKS */}
          <div className="mt-7 flex gap-5 text-mute">
            <a href={profile.linkedin} aria-label="LinkedIn"
              className="transition hover:text-a">
              <Linkedin size={21} />
            </a>
            <a href={profile.github} aria-label="GitHub"
              className="transition hover:text-a">
              <Github size={21} />
            </a>
          </div>

          {/* STATISTICS */}
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-line pt-7">
            {stats.map(s => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-bold md:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 text-xs leading-relaxed text-mute">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* RIGHT: PROFILE PHOTO + PIPELINE */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto flex w-full max-w-[480px] flex-col justify-between"
        >
          {/* BACKGROUND GLOW */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-a/20 via-b/20 to-c/20 blur-[90px]" />

          {/* PROFILE IMAGE */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-[24rem] border border-line bg-surface shadow-2xl">

            {profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-mute">
                <User size={100} />
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-2xl font-bold">{profile.name}</p>
              <p className="mt-1 text-sm text-white/80">
                Automation Engineer
              </p>
            </div>
          </div>

          {/* PIPELINE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative z-20 mt-6 mx-auto w-[80%] max-w-[400px]"
          >
            <Pipeline />
          </motion.div>

        </motion.div>
      </div>
    </section>
  ) 
}
