import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import { certifications, education, experiences, languages, personalInfo, projects, skillCategories } from './data';
import { isSectionId, SECTION_IDS, type SectionId } from './sections';

type CanvasStatus = 'loading' | 'ready' | 'unavailable' | 'lost';

function UnavailableCanvas({ onStatusChange }: { onStatusChange?: (status: CanvasStatus) => void }) {
  useEffect(() => {
    onStatusChange?.('unavailable');
  }, [onStatusChange]);
  return null;
}

const SystemCanvas = lazy(() =>
  import('./components/SystemCanvas').catch(() => ({ default: UnavailableCanvas })),
);

const navItems = [
  ['Perfil', 'profile'],
  ['Experiencia', 'experience'],
  ['Proyectos', 'work'],
  ['Capacidades', 'capabilities'],
  ['Formación', 'credentials'],
  ['Contacto', 'contact'],
] as const;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [copied, setCopied] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [canvasStatus, setCanvasStatus] = useState<CanvasStatus>('loading');

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), []);
  const archivedProjects = useMemo(() => projects.filter((project) => !project.featured), []);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress.toString());
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = 'true';
          }
        });
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id && isSectionId(visible.target.id)) setActiveSection(visible.target.id);
      },
      { rootMargin: '-32% 0px -52%', threshold: [0, 0.2, 0.5] },
    );

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        section.dataset.reveal = 'ready';
        observer.observe(section);
      }
    });

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key.toLowerCase() === 'b') setBlueprint((current) => !current);
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.blueprint = blueprint ? 'on' : 'off';
  }, [blueprint]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Suspense fallback={null}>
        <SystemCanvas
          blueprint={blueprint}
          activeSection={activeSection}
          onStatusChange={setCanvasStatus}
        />
      </Suspense>
      <div className="paper-grid" aria-hidden="true" />
      <div className="scroll-meter" aria-hidden="true"><span /></div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Inicio — Leonardo González">
          <span className="brand-mark">LEGR</span>
          <span className="brand-copy">Diseño de sistemas<br />&amp; desarrollo full-stack</span>
        </a>

        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navegación principal">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >{label}</a>
          ))}
          <button
            className="blueprint-toggle"
            type="button"
            aria-pressed={blueprint}
            onClick={() => setBlueprint((current) => !current)}
            title="Activar plano del sistema (atajo: B)"
          >
            <span aria-hidden="true">⌘</span> Plano B
          </button>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <main id="main-content">
        <section className="hero section-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Guadalajara, MX · Disponible para colaborar</p>
            <h1 id="hero-title">
              <span>Leonardo</span>
              <span>González</span>
            </h1>
            <p className="hero-thesis">
              Construyo productos digitales donde la lógica, la interfaz y la infraestructura funcionan como un solo sistema.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explorar proyectos <ArrowDownRight aria-hidden="true" /></a>
              <a className="button button-quiet" href="#contact">Hablemos</a>
            </div>
          </div>
          <figure className="hero-portrait">
            <div className="portrait-frame">
              <span className="portrait-coordinate portrait-coordinate-top" aria-hidden="true">LEGR / 1999</span>
              {portraitFailed ? (
                <div
                  className="portrait-fallback"
                  role="img"
                  aria-label="Retrato ilustrado de Leonardo González"
                >
                  <span className="portrait-silhouette" aria-hidden="true"><i /><b /></span>
                  <strong aria-hidden="true">LG</strong>
                  <small aria-hidden="true">Retrato no disponible</small>
                </div>
              ) : (
                <img
                  src="/images/yo.png"
                  alt="Retrato de Leonardo González sonriendo, con camiseta blanca"
                  width="435"
                  height="574"
                  fetchPriority="high"
                  onError={() => setPortraitFailed(true)}
                />
              )}
              <span className="portrait-coordinate portrait-coordinate-bottom" aria-hidden="true">GDL · MX</span>
            </div>
            <figcaption>El humano detrás del sistema</figcaption>
          </figure>
          <div className="hero-system-note" aria-hidden="true">
            <span>01</span>
            <p>Desplázate para inspeccionar el sistema.</p>
            <i />
          </div>
        </section>

        <section className="content-section section-shell split-section" id="profile" aria-labelledby="profile-title">
          <SectionIndex number="01" label="Perfil" />
          <div className="section-content profile-layout">
            <div>
              <p className="kicker">El sistema detrás del código</p>
              <h2 id="profile-title">Pienso en arquitectura.<br />Construyo para personas.</h2>
            </div>
            <div className="profile-copy">
              <p>{personalInfo.about}</p>
              <div className="fact-grid" aria-label="Datos principales">
                <div><strong>Full-stack</strong><span>Web + escritorio</span></div>
                <div><strong>Español / Inglés B2</strong><span>Comunicación</span></div>
                <div><strong>Software + hardware</strong><span>Visión integral</span></div>
                <div><strong>IA aplicada</strong><span>Automatización</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section section-shell" id="experience" aria-labelledby="experience-title">
          <SectionIndex number="02" label="Experiencia" />
          <div className="section-heading">
            <p className="kicker">Registro de campo</p>
            <h2 id="experience-title">Experiencia que conecta producto y operación.</h2>
          </div>
          <ol className="timeline">
            {experiences.map((experience, index) => (
              <li key={experience.id}>
                <div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
                <article>
                  <div className="timeline-meta">
                    <span>{experience.period}</span>
                    <span>{experience.location}</span>
                  </div>
                  <h3>{experience.company}</h3>
                  <p className="role">{experience.role}</p>
                  <ul>{experience.description.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="content-section section-shell" id="work" aria-labelledby="work-title">
          <SectionIndex number="03" label="Trabajo seleccionado" />
          <div className="section-heading work-heading">
            <div>
              <p className="kicker">Módulos en producción</p>
              <h2 id="work-title">Productos con una razón para existir.</h2>
            </div>
            <p>Una selección de sistemas que resuelven necesidades reales: operación, reclutamiento, servicio público y juego.</p>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <article className={`project-card project-card-${index + 1}`} key={project.id}>
                <div className="project-image">
                  <img src={project.image} alt={`Vista del proyecto ${project.title}`} loading="lazy" width="1024" height="1024" />
                  <span className="project-number">P/{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="project-copy">
                  <div className="tag-list" aria-label="Tecnologías">
                    {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a href={project.url} target="_blank" rel="noreferrer">Abrir proyecto <ArrowUpRight aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>

          <details className="project-archive">
            <summary><span>Archivo de proyectos</span><strong>{archivedProjects.length} módulos adicionales</strong></summary>
            <div className="archive-list">
              {archivedProjects.map((project) => {
                const isPrivate = project.url === '#';
                return (
                  <article key={project.id}>
                    <span>{String(project.id).padStart(2, '0')}</span>
                    <div><h3>{project.title}</h3><p>{project.description}</p></div>
                    <div className="archive-tags">{project.tags.slice(0, 3).join(' · ')}</div>
                    {isPrivate ? <span className="private-label">Caso privado</span> : (
                      <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.title}`}><ArrowUpRight aria-hidden="true" /></a>
                    )}
                  </article>
                );
              })}
            </div>
          </details>
        </section>

        <section className="content-section section-shell" id="capabilities" aria-labelledby="capabilities-title">
          <SectionIndex number="04" label="Capacidades" />
          <div className="section-heading">
            <p className="kicker">Circuitos de trabajo</p>
            <h2 id="capabilities-title">Del píxel a la base de datos.<br />Sin perder la estructura.</h2>
          </div>
          <div className="capability-grid">
            {skillCategories.map((category, index) => (
              <article key={category.id}>
                <span className="capability-number">C{String(index + 1).padStart(2, '0')}</span>
                <h3>{category.title}</h3>
                <ul>{category.skills.map((skill) => <li key={skill.name}><span>{skill.name}</span><small>{skill.level}</small></li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-shell" id="credentials" aria-labelledby="credentials-title">
          <SectionIndex number="05" label="Formación" />
          <div className="section-heading">
            <p className="kicker">Base verificable</p>
            <h2 id="credentials-title">Aprendizaje formal y práctica constante.</h2>
          </div>
          <div className="credentials-layout">
            <div className="education-list">
              {education.map((item, index) => (
                <article key={item.institution}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.institution}</h3><p>{item.degree}</p></div>
                  <p>{item.period}</p>
                </article>
              ))}
            </div>
            <aside className="credential-card">
              <span>CURSO / {certifications[0].hours.toUpperCase()}</span>
              <h3>{certifications[0].title}</h3>
              <p>{certifications[0].description}</p>
              <div className="language-list">
                {languages.map((language) => <p key={language.name}><strong>{language.name}</strong><span>{language.level}</span></p>)}
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <SectionIndex number="06" label="Contacto" />
          <div className="contact-grid">
            <div>
              <p className="kicker">Punto de enlace</p>
              <h2 id="contact-title">¿Construimos algo que funcione de verdad?</h2>
              <p>Estoy abierto a colaborar en productos web, herramientas internas y sistemas donde la claridad técnica importe.</p>
            </div>
            <div className="contact-actions">
              <a className="email-link" href={`mailto:${personalInfo.email}`}>
                <span>Escríbeme</span>{personalInfo.email}<ArrowUpRight aria-hidden="true" />
              </a>
              <button type="button" onClick={copyEmail} aria-live="polite">
                {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copied ? 'Correo copiado' : 'Copiar correo'}
              </button>
              <div className="social-links">
                <a href={personalInfo.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
                <a href={personalInfo.instagram} target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /> Instagram</a>
                <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}><Phone aria-hidden="true" /> {personalInfo.phone}</a>
                <a href={`mailto:${personalInfo.email}`}><Mail aria-hidden="true" /> Email</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <p>Leonardo Elías González Rangel · Guadalajara, México</p>
        <p>Diseñado como un sistema visible · <button type="button" onClick={() => setBlueprint((current) => !current)}>B para inspeccionar</button></p>
        <a href="#home">Volver arriba ↑</a>
      </footer>

      {blueprint && (
        <div className="blueprint-hud" role="status" aria-live="polite" aria-atomic="true">
          <p><span>BLUEPRINT MODE</span> Sistema visible / núcleo LEGR</p>
          <p>SECCIÓN: {activeSection.toUpperCase()} · RENDER: THREE.JS · DOM: SEMÁNTICO</p>
          <p>CANVAS: {canvasStatus === 'ready' ? 'LISTO' : canvasStatus === 'lost' ? 'CONTEXTO PERDIDO' : canvasStatus === 'unavailable' ? 'NO DISPONIBLE' : 'INICIANDO'}</p>
        </div>
      )}
    </div>
  );
}

function SectionIndex({ number, label }: { number: string; label: string }) {
  return <div className="section-index" aria-hidden="true"><span>{number}</span><p>{label}</p><i /></div>;
}

export default App;
