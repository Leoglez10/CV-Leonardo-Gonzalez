import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Menu,
  X,
} from 'lucide-react';
import { experiences, githubProfile, personalInfo, workDomains } from './data';
import { SECTION_IDS, type SectionId } from './sections';
import { setScroll } from './scrollModel';
import SystemPlotter from './components/SystemPlotter';
import ScrollDog from './components/ScrollDog';
import BlueprintOverlay from './components/BlueprintOverlay';
import TimelinePlot from './components/TimelinePlot';
import StackTerminal from './components/StackTerminal';
import EducationAxis from './components/EducationAxis';
import PatchBay from './components/PatchBay';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navItems = [
  ['Perfil', 'profile'],
  ['Experiencia', 'experience'],
  ['Trabajo', 'work'],
  ['Capacidades', 'capabilities'],
  ['Formación', 'credentials'],
  ['Contacto', 'contact'],
] as const;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [activeDomain, setActiveDomain] = useState(0);
  const [portraitFailed, setPortraitFailed] = useState(false);

  const activeIndex = useMemo(() => SECTION_IDS.indexOf(activeSection), [activeSection]);

  useGSAP(() => {
    // The only scroll reader on the page: it feeds the shared model the
    // plotter and rails consume.
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setScroll(self.progress, self.getVelocity() / 1000),
    });

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      section.dataset.reveal = 'ready';

      const reveal = () => {
        section.dataset.revealed = 'true';
      };

      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        once: true,
        onEnter: reveal,
        // Covers a reload that lands past this section (deep link, restored scroll).
        onRefresh: (self) => {
          if (self.progress > 0) reveal();
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
        },
      });
    });

    // Late-loading fonts shift the layout, which invalidates every start/end.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  });

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      // "González" is drawn as an outline (color: transparent + text-stroke).
      // Scrolling through the hero inks it in.
      gsap.fromTo(
        '.hero h1 span:last-child',
        { color: 'rgba(16, 16, 15, 0)' },
        {
          color: 'rgba(16, 16, 15, 1)',
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
        },
      );
    });
  });

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add(
      { isWide: '(min-width: 821px)', reduced: '(prefers-reduced-motion: reduce)' },
      (context) => {
        const { isWide, reduced } = context.conditions as { isWide: boolean; reduced: boolean };
        // Below the rail breakpoint there is no second column to track.
        if (!isWide) return;

        const cards = gsap.utils.toArray<HTMLElement>('.work-domain');
        // Everything in the rail is measured against this one line.
        const readLine = () => window.innerHeight * 0.45;

        // Two blocks can straddle the line at once. Pick the closest one
        // instead of letting the last toggle win.
        const nearestCard = () => {
          const line = readLine();
          let nearest = 0;
          let shortest = Infinity;
          cards.forEach((card, index) => {
            const box = card.getBoundingClientRect();
            const distance = Math.abs(box.top + box.height / 2 - line);
            if (distance < shortest) {
              shortest = distance;
              nearest = index;
            }
          });
          return nearest;
        };

        // The readout is observation, not motion, so it runs either way.
        ScrollTrigger.create({
          trigger: '.domain-list',
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: () => setActiveDomain(nearestCard()),
          onRefresh: () => setActiveDomain(nearestCard()),
        });

        if (reduced) return;

        // The only true scrub here: the fill tracks the grid across the same
        // line the readout uses, 1:1 with scroll and no easing.
        gsap.fromTo(
          '.work-rail-track span',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.domain-list',
              start: 'top 45%',
              end: 'bottom 45%',
              scrub: 0.4,
            },
          },
        );

        // Cards rise with the scroll position instead of on a fixed timer.
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 64 },
            {
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top 62%',
                scrub: 0.6,
              },
            },
          );
        });
      },
    );
  });

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

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <SystemPlotter activeIndex={activeIndex} />
      <BlueprintOverlay active={blueprint} sectionId={activeSection} />
      <div className="paper-grid" aria-hidden="true" />
      <ScrollDog />

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
              <a className="button button-primary" href="#work">Explorar el trabajo <ArrowDownRight aria-hidden="true" /></a>
              <a className="button button-quiet" href="#contact">Hablemos</a>
            </div>
          </div>
          <figure className="hero-portrait">
            <div className="portrait-frame">
              <span className="portrait-coordinate portrait-coordinate-top" aria-hidden="true">LEGR / 2005</span>
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
                  src="/images/foto-leo.webp"
                  alt="Retrato de Leonardo González en una calle empedrada de Guanajuato"
                  width="768"
                  height="1024"
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
          <div className="timeline-stage">
            <TimelinePlot />
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
          </div>
        </section>

        <section className="content-section section-shell" id="work" aria-labelledby="work-title">
          <SectionIndex number="03" label="Trabajo" />
          <div className="section-heading work-heading">
            <div>
              <p className="kicker">A grandes rasgos</p>
              <h2 id="work-title">Construyo cosas que alguien usa.</h2>
            </div>
            <p>No colecciono demos. Cada cosa que construyo salió de una necesidad concreta: una preparatoria que llevaba su inventario en papel, un proceso de selección que tardaba días, un gobierno que necesitaba escuchar a sus ciudadanos.</p>
          </div>

          <div className="work-stage">
            <aside className="work-rail" aria-hidden="true">
              <span className="work-rail-count">D/{String(activeDomain + 1).padStart(2, '0')}</span>
              <p className="work-rail-title">{workDomains[activeDomain]?.title}</p>
              <div className="work-rail-track"><span /></div>
              <span className="work-rail-total">{workDomains.length} frentes de trabajo</span>
            </aside>

            <div className="domain-list">
              {workDomains.map((domain, index) => (
                <article className="work-domain" key={domain.id}>
                  <span className="domain-number">D/{String(index + 1).padStart(2, '0')}</span>
                  <h3>{domain.title}</h3>
                  <p>{domain.body}</p>
                  <div className="tag-list" aria-label="Tecnologías">
                    {domain.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <a className="github-card" href={personalInfo.github} target="_blank" rel="noreferrer">
            <span className="github-mark" aria-hidden="true"><Github /></span>
            <div className="github-copy">
              <p className="github-eyebrow">{githubProfile.repositories} repositorios públicos · código abierto</p>
              <strong>{githubProfile.headline}</strong>
              <p className="github-body">{githubProfile.body}</p>
            </div>
            <span className="github-cta">
              <em>{githubProfile.handle}</em>
              <span>Ver en GitHub <ArrowUpRight aria-hidden="true" /></span>
            </span>
          </a>
        </section>

        <section className="content-section section-shell" id="capabilities" aria-labelledby="capabilities-title">
          <SectionIndex number="04" label="Capacidades" />
          <div className="section-heading">
            <p className="kicker">Consulta el stack</p>
            <h2 id="capabilities-title">Pregúntale<br />a la terminal.</h2>
          </div>
          <StackTerminal />
        </section>

        <section className="content-section section-shell" id="credentials" aria-labelledby="credentials-title">
          <SectionIndex number="05" label="Formación" />
          <div className="section-heading">
            <p className="kicker">Trayectoria trazada</p>
            <h2 id="credentials-title">La formación no terminó: sigue corriendo.</h2>
          </div>
          <EducationAxis />
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <SectionIndex number="06" label="Contacto" />
          <div className="section-heading contact-heading">
            <p className="kicker">Punto de enlace</p>
            <h2 id="contact-title">¿Construimos algo que funcione de verdad?</h2>
            <p>Estoy abierto a colaborar en productos web, herramientas internas y sistemas donde la claridad técnica importe.</p>
          </div>
          <PatchBay />
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
          <p>SECCIÓN: {activeSection.toUpperCase()} · RENDER: SVG + GSAP · DOM: SEMÁNTICO</p>
        </div>
      )}
    </div>
  );
}

function SectionIndex({ number, label }: { number: string; label: string }) {
  return <div className="section-index" aria-hidden="true"><span>{number}</span><p>{label}</p><i /></div>;
}

export default App;
