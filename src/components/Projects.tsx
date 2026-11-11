import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, FlaskConical, Github, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react'
import { projects, type Group, type Project } from '../data'

const filters: ('All' | Group)[] = ['All', 'Enterprise RPA', 'Python & Data', 'Generative AI']

function Status({ p }: { p: Project }) {
  return p.status === 'completed'
    ? <span className="inline-flex items-center gap-1 rounded-full bg-c/10 px-2.5 py-1 text-xs font-medium text-c"><CheckCircle2 size={12} />Delivered</span>
    : <span className="inline-flex items-center gap-1 rounded-full bg-b/10 px-2.5 py-1 text-xs font-medium text-b"><FlaskConical size={12} />In development · concept</span>
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label="Workflow">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span className="rounded-lg border border-line bg-bg px-3 py-1.5 text-xs">{s}</span>
          {i < steps.length - 1 && <ChevronRight size={14} className="text-a" />}
        </li>
      ))}
    </ol>
  )
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])

  const planned = p.status === 'planned'
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => e.stopPropagation()}
        initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-line bg-surface p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><Status p={p} /><h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{p.title}</h3><p className="mt-1 text-sm text-mute">{p.category}</p></div>
          <button onClick={onClose} aria-label="Close project details" className="rounded-lg p-2 text-mute hover:text-ink"><X /></button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div><h4 className="font-semibold">{planned ? 'Opportunity' : 'Business problem'}</h4><p className="mt-1 text-sm text-mute">{p.problem}</p></div>
          <div><h4 className="font-semibold">{planned ? 'Planned approach' : 'Solution implemented'}</h4><p className="mt-1 text-sm text-mute">{p.solution}</p></div>
        </div>
        <h4 className="mb-2 mt-6 font-semibold">{planned ? 'Planned architecture' : 'Workflow'}</h4>

        <Flow steps={p.flow} />
        <h4 className="mb-2 mt-6 font-semibold">{planned ? 'Intended features' : 'Key features'}</h4>
        <ul className="grid gap-x-6 gap-y-1.5 text-sm text-mute sm:grid-cols-2">{p.features.map((f) => <li key={f} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-a" />{f}</li>)}</ul>

        
        <div className="mt-6 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="rounded-md border border-line px-2.5 py-1 text-xs">{t}</span>)}</div>

        {/* Automation Architecture */}
        {p.components && p.components.length > 0 && (
          <div className="mt-8">
            <div className="mb-4">
              <h4 className="font-semibold text-lg">Automation Architecture</h4>
              <p className="mt-1 text-sm text-mute">The solution is divided into  {p.components.length} independent but coordinated automation components.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {p.components.map((component, index) => (
                <div key={component.name} className="rounded-xl border border-line bg-bg/60 p-4">              
                  {/* Component heading */}
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-a/10 text-sm font-bold text-a">
                      {index + 1}
                    </span>
                    <h5 className="font-semibold">
                      {component.name}
                    </h5>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-mute">
                    {component.description}
                  </p>

                  {/* Responsibilities */}
                  <h6 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide">
                    Responsibilities
                  </h6>

                  <ul className="space-y-2 text-xs text-mute">
                    {component.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2
                          size={13}
                          className="mt-0.5 shrink-0 text-c"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Input */}
                  <div className="mt-4 border-t border-line pt-3">
                    <span className="text-xs font-semibold text-mute">
                      INPUT
                    </span>

                    <p className="mt-1 text-xs">
                      {component.input}
                    </p>
                  </div>

                  {/* Output */}
                  <div className="mt-3">
                    <span className="text-xs font-semibold text-mute">
                      OUTPUT
                    </span>

                    <p className="mt-1 text-xs text-c">
                      {component.output}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}



        {/* PROJECT MEDIA */}
        <h4 className="mb-3 mt-8 font-semibold">{planned ? 'Prototype Preview' : 'Screenshots & Demo'}</h4>

        {p.media && p.media.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">

            {p.media.map((item, index) => (
              <div key={index} className="group overflow-hidden rounded-xl border border-line bg-bg">

                {/* IMAGE */}
                {item.type === 'image' && (
                  <button
                    type="button"
                    onClick={() => setSelectedImage(item.src)}
                    className="relative block aspect-video w-full overflow-hidden"
                  >
                    <img
                      src={item.src}
                      alt={item.alt || item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 grid place-items-center bg-black/0 transition group-hover:bg-black/30">
                      <ImageIcon
                        className="text-white opacity-0 transition group-hover:opacity-100"
                        size={28}
                      />
                    </div>
                  </button>
                )}

                {/* VIDEO */}
                {item.type === 'video' && (
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    className="aspect-video w-full bg-black object-contain"
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                )}

                {/* MEDIA TITLE */}
                <div className="p-3">
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-mute">
                    {item.type === 'video'
                      ? 'Video demonstration'
                      : 'Project screenshot'}
                  </p>
                </div>

              </div>
            ))}

          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-mute">
            <ImageIcon className="mx-auto mb-2" />
            No project media available yet.
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white"
                aria-label="Close image preview"
              >
                <X size={24} />
              </button>

              <motion.img
                src={selectedImage}
                alt="Expanded project screenshot"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-full rounded-xl object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>



        {p.github && <a href={p.github} className="btn-g mt-6"><Github size={16} /> View on GitHub</a>}
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [f, setF] = useState<'All' | Group>('All')
  const [open, setOpen] = useState<Project | null>(null)
  const list = projects.filter((p) => f === 'All' || p.group === f)
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="font-display text-4xl font-bold md:text-5xl">Featured projects</h2>
      <p className="mt-3 max-w-2xl text-mute">Four delivered automation systems, and two AI projects I am currently designing. Concepts are labelled as such.</p>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} aria-pressed={f === x}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${f === x ? 'border-a bg-a/10 text-a' : 'border-line text-mute hover:text-ink'}`}>{x}</button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article layout key={p.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              className={`group flex flex-col rounded-2xl border bg-surface/70 p-6 transition hover:border-a ${p.status === 'planned' ? 'border-dashed border-b/50' : 'border-line'}`}>
              <div className="flex items-center justify-between gap-2"><Status p={p} /><span className="text-xs text-mute">{p.category.split(' / ')[0]}</span></div>
              <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-mute">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="rounded-md bg-bg px-2 py-0.5 text-xs text-mute">{t}</span>)}</div>
              <div className="mt-5 flex items-center gap-3">
                <button onClick={() => setOpen(p)} className="btn-p">View details</button>
                {p.github && <a href={p.github} aria-label={`${p.title} on GitHub`} className="text-mute hover:text-a"><Github size={20} /></a>}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
