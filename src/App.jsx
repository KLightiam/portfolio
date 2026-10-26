import { useEffect, useId, useState } from 'react';
import { Github, Linkedin, Mail, Menu, X, GraduationCap, Briefcase, ArrowUpRight, MapPin } from 'lucide-react';
import dataScience from './data/dataScience';
import projects from './data/projects';
import workExperience from './data/workExperience';
import skills from './data/skills';
import TrajectoryHero from './components/TrajectoryHero';
import FigureGallery from './components/FigureGallery';
import { Chart } from './components/Charts';

const NAV = [
  { id: 'data-science', label: 'Data science' },
  { id: 'software', label: 'Software' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const LINKS = {
  github: 'https://github.com/KLightiam',
  linkedin: 'https://www.linkedin.com/in/kingsleyankomahasare',
  email: 'mailto:kingsleyasareankomah@gmail.com',
};

function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));

  useEffect(() => {
    const close = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-20 bg-paper/85 backdrop-blur-md border-b border-rule/70">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
        <a href="#top" className="font-semibold tracking-tight text-[1.05rem]">
          Kingsley Asare
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'true' : undefined}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  active === n.id ? 'bg-ink text-white' : 'text-slate hover:text-ink hover:bg-faint'
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <IconLink href={LINKS.github} label="GitHub"><Github className="w-[18px] h-[18px]" /></IconLink>
          <IconLink href={LINKS.linkedin} label="LinkedIn"><Linkedin className="w-[18px] h-[18px]" /></IconLink>
          <IconLink href={LINKS.email} label="Email"><Mail className="w-[18px] h-[18px]" /></IconLink>
          <button
            type="button"
            className="md:hidden ml-1 p-2 rounded-md hover:bg-faint"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <ul id="mobile-menu" className="md:hidden border-t border-rule bg-paper px-5 py-3 space-y-1">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block py-2 text-lg">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

function IconLink({ href, label, children }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="p-2 rounded-md text-slate hover:text-ink hover:bg-faint transition-colors"
    >
      {children}
    </a>
  );
}

function Hero() {
  return (
    <header id="top" className="pt-28 sm:pt-36">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="font-semibold tracking-[-0.035em] leading-[0.95] text-[clamp(2.9rem,8.5vw,6.25rem)]">
          Kingsley Ankomah
          <br />
          Asare
        </h1>
        <p className="mt-7 max-w-[38rem] text-lg sm:text-xl leading-relaxed text-ink/85">
          I’m a data science master’s student in Potsdam with a background in actuarial science. I build models, test them
          honestly, and explain what the results mean for the people who have to act on them.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#data-science" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-2.5 font-medium hover:bg-violet transition-colors">
            See my projects
          </a>
          <a href={LINKS.email} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium hover:border-ink transition-colors">
            <Mail className="w-4 h-4" /> Email me
          </a>
        </div>
      </div>

      <figure className="mt-12 sm:mt-16 lg:-mt-28 max-w-7xl mx-auto px-2 sm:px-5">
        <TrajectoryHero />
        <figcaption className="max-w-6xl mx-auto px-3 sm:px-5 mt-4">
          <p className="max-w-[44rem] text-sm text-slate leading-relaxed">
            Every car (in colour) and pedestrian, cyclist or other road user (grey) on 700 m of road in Munich, recorded by
            drone. It’s the data behind my map-matching research below.
          </p>
        </figcaption>
      </figure>
    </header>
  );
}

function SectionHeading({ id, title, intro }) {
  return (
    <div className="max-w-[44rem]">
      <h2 id={`${id}-title`} className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em]">
        {title}
      </h2>
      {intro && <p className="mt-3 text-lg text-slate leading-relaxed">{intro}</p>}
    </div>
  );
}

function ChartPanel({ project }) {
  const [tab, setTab] = useState(0);
  const base = useId();
  const chart = project.charts[tab];
  const many = project.charts.length > 1;

  const onKey = (e) => {
    const n = project.charts.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const next = (tab + (e.key === 'ArrowRight' ? 1 : n - 1)) % n;
      setTab(next);
      document.getElementById(`${base}-tab-${next}`)?.focus();
    }
  };

  return (
    <div className="min-w-0 rounded-2xl bg-white border border-rule p-5 sm:p-7">
      {many && (
        <div role="tablist" aria-label={`${project.title} charts`} className="flex flex-wrap gap-1 mb-6 -ml-1" onKeyDown={onKey}>
          {project.charts.map((c, i) => (
            <button
              key={c.tab}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={tab === i}
              aria-controls={`${base}-panel`}
              tabIndex={tab === i ? 0 : -1}
              onClick={() => setTab(i)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                tab === i ? 'bg-violet text-white' : 'text-slate hover:text-ink hover:bg-faint'
              }`}
            >
              {c.tab}
            </button>
          ))}
        </div>
      )}
      <figure id={`${base}-panel`} role={many ? 'tabpanel' : undefined} aria-labelledby={many ? `${base}-tab-${tab}` : undefined}>
        <h4 className="font-semibold mb-4">{chart.title}</h4>
        <Chart {...chart} />
        <figcaption className="mt-5 text-sm text-slate leading-relaxed">{chart.caption}</figcaption>
      </figure>

      {project.figures?.length > 0 && (
        <div className="mt-7 pt-5 border-t border-rule">
          <p className="text-sm font-medium mb-3">From the analysis</p>
          <FigureGallery figures={project.figures} title={project.title} />
        </div>
      )}
    </div>
  );
}

function CaseStudy({ project }) {
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 py-14 sm:py-16 border-t border-rule first:border-t-0 first:pt-10"
    >
      <div>
        <p className="text-sm text-slate">{project.context}</p>
        <h3 id={`${project.slug}-title`} className="mt-2 text-2xl sm:text-[1.75rem] leading-tight font-semibold tracking-[-0.02em]">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-ink/85">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-3 gap-4 py-5 border-y border-rule">
          {project.results.map((r) => (
            <div key={r.label}>
              <dt className="sr-only">{r.label}</dt>
              <dd className="text-xl sm:text-2xl font-semibold tracking-tight text-violet">{r.value}</dd>
              <dd className="mt-1 text-xs sm:text-sm text-slate leading-snug">{r.label}</dd>
            </div>
          ))}
        </dl>

        <h4 className="mt-6 font-semibold">How I approached it</h4>
        <ul className="mt-2 space-y-2 text-[0.95rem] leading-relaxed text-ink/85">
          {project.approach.map((a) => (
            <li key={a} className="pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-cyan">
              {a}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tools used">
          {project.tech.map((t) => (
            <li key={t} className="px-2.5 py-1 rounded-full bg-faint text-xs text-ink/80">{t}</li>
          ))}
        </ul>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-violet"
        >
          <Github className="w-4 h-4" /> Code and notebook on GitHub
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
      <ChartPanel project={project} />
    </article>
  );
}

function DataScience() {
  return (
    <section id="data-science" aria-labelledby="data-science-title" className="max-w-6xl mx-auto px-5 pt-24 sm:pt-32">
      <SectionHeading
        id="data-science"
        title="Data science projects"
        intro="Each project starts from a real question, checks its own results, and reports what didn’t work as well as what did. Charts use the numbers from my notebooks."
      />
      <div className="mt-6">
        {dataScience.map((p) => (
          <CaseStudy key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

function Software() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <section id="software" aria-labelledby="software-title" className="bg-white border-y border-rule mt-16">
      <div className="max-w-6xl mx-auto px-5 py-20 sm:py-24">
        <SectionHeading
          id="software"
          title="Software"
          intro="I also build the systems data lives in: APIs, databases and the apps people use."
        />
        <div className="mt-10 divide-y divide-rule">
          {featured.map((p) => (
            <article key={p.title} className="py-8 first:pt-0 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 md:gap-10">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/85">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools used">
                  {p.tech.map((t) => (
                    <li key={t} className="px-2.5 py-1 rounded-full bg-faint text-xs text-ink/80">{t}</li>
                  ))}
                </ul>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-violet"
                >
                  <Github className="w-4 h-4" /> View code <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              {p.src ? (
                <ul className="flex gap-3 overflow-x-auto pb-2 self-start" aria-label={`${p.title} screenshots`}>
                  {p.src.map((img, i) => (
                    <li key={img} className="shrink-0">
                      <a href={img} target="_blank" rel="noopener noreferrer" className="block">
                        <img
                          src={img}
                          alt={`${p.title} screenshot ${i + 1}`}
                          loading="lazy"
                          className="w-40 h-28 object-cover object-top rounded-md border border-rule"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                p.highlights && (
                  <ul className="self-start grid grid-cols-3 gap-4 md:pt-1">
                    {p.highlights.map((h) => {
                      const [num, ...rest] = h.split(' ');
                      return (
                        <li key={h} className="border-t-2 border-violet pt-3">
                          <span className="block text-2xl font-semibold tracking-tight">{num}</span>
                          <span className="block mt-1 text-sm text-slate leading-snug">{rest.join(' ')}</span>
                        </li>
                      );
                    })}
                  </ul>
                )
              )}
            </article>
          ))}
        </div>

        <h3 className="mt-14 text-lg font-semibold">Smaller builds</h3>
        <ul className="mt-4 grid sm:grid-cols-2 gap-x-10">
          {others.map((p) => (
            <li key={p.title} className="py-4 border-t border-rule">
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-medium">
                <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-violet">{p.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate" />
              </a>
              <p className="mt-1 text-sm text-slate leading-relaxed">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="max-w-6xl mx-auto px-5 pt-24 sm:pt-28">
      <SectionHeading id="experience" title="Experience and education" />
      <ol className="mt-10 border-l border-rule ml-2">
        {workExperience.map((job) => {
          const Icon = job.kind === 'education' ? GraduationCap : Briefcase;
          return (
            <li key={job.title} className="relative pl-8 sm:pl-10 pb-10 last:pb-0">
              <span className="absolute -left-[13px] top-0 grid place-items-center w-[26px] h-[26px] rounded-full bg-paper border border-rule text-violet">
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <div className="grid md:grid-cols-[11rem_minmax(0,1fr)] gap-x-8 gap-y-1">
                <p className="text-sm text-slate tabular pt-0.5">{job.period}</p>
                <div>
                  <h3 className="text-lg font-semibold leading-snug">{job.title}</h3>
                  <p className="text-ink/80">
                    {job.company}
                    <span className="text-slate">, {job.location}</span>
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[0.95rem] text-ink/80 leading-relaxed max-w-[42rem]">
                    {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="max-w-6xl mx-auto px-5 pt-24 sm:pt-28">
      <SectionHeading id="skills" title="Skills" />
      <dl className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
        {skills.map((s) => (
          <div key={s.group} className="border-t-2 border-ink pt-3">
            <dt className="font-semibold">{s.group}</dt>
            <dd className="mt-2 text-ink/80 leading-relaxed">{s.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="max-w-6xl mx-auto px-5 pt-24 sm:pt-28 pb-24">
      <div className="grid md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] gap-8 md:gap-14 items-start">
        <img
          src="./profile.webp"
          alt="Portrait of Kingsley Ankomah Asare"
          width="900"
          height="1000"
          loading="lazy"
          className="w-40 md:w-full rounded-2xl object-cover aspect-[9/10]"
        />
        <div className="max-w-[40rem]">
          <h2 id="contact-title" className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em]">
            Let’s talk
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/85">
            Before data science I worked in research and IT support for Ghana’s AfCFTA coordination office, and I still build
            web apps on the side. I’m looking for data science and machine learning roles in Germany, and I’m always happy to talk
            about map data, NLP or a messy dataset.
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-slate">
            <MapPin className="w-4 h-4" /> Potsdam, Germany. English fluent, German basic.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={LINKS.email} className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-2.5 font-medium hover:bg-violet transition-colors">
              <Mail className="w-4 h-4" /> kingsleyasareankomah@gmail.com
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium hover:border-ink transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium hover:border-ink transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a href="#data-science" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30 focus:bg-white focus:px-3 focus:py-2 focus:rounded-md">
        Skip to projects
      </a>
      <Nav />
      <main>
        <Hero />
        <DataScience />
        <Software />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-5 py-8 text-sm text-slate flex flex-wrap justify-between gap-3">
          <p>© {new Date().getFullYear()} Kingsley Ankomah Asare</p>
          <p>Built with React and Tailwind CSS. Charts drawn from my own results.</p>
        </div>
      </footer>
    </>
  );
}
