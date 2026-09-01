import { useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { certifications, education, languages } from '../data';

gsap.registerPlugin(useGSAP);

/** Start of the degree — the origin of the numbered scale. */
const START = new Date(2023, 0, 1);
/** Where the origin and "today" sit across the axis width, as percentages. */
const ORIGIN_PCT = 26;
const TODAY_PCT = 86;
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * The scale is derived from the clock rather than fixed, so "today" always
 * lands at TODAY_PCT and the axis can never outgrow its own frame.
 * ponytail: year labels get tight past ~15 years; widen the frame if it ever matters.
 */
function scale(now: number) {
  const elapsed = Math.max((now - START.getTime()) / MS_PER_YEAR, 0.5);
  const perYear = (TODAY_PCT - ORIGIN_PCT) / elapsed;
  const years = Array.from({ length: Math.floor(elapsed) + 1 }, (_, index) => ({
    label: String(START.getFullYear() + index),
    at: ORIGIN_PCT + index * perYear,
  }));
  const quarters = Array.from({ length: Math.ceil(elapsed * 4) }, (_, index) => ORIGIN_PCT + (index * perYear) / 4)
    .filter((at) => at <= TODAY_PCT && !years.some((year) => Math.abs(year.at - at) < 0.2));
  return { years, quarters };
}

/**
 * Plots the education record on one time axis: a dashed stretch for what is
 * closed, a continuous cobalt run for the degree still going, and an end that
 * never arrives — because there is always more to learn.
 */
export default function EducationAxis() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const { years, quarters } = scale(Date.now());
  const [degree, school] = education;
  const course = certifications[0];

  useGSAP(() => {
    const stage = stageRef.current;
    const ghost = ghostRef.current;
    if (!stage || !ghost) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Chasing it stretches the line: the goal moves, the trajectory grows, and
    // the 6% of runway kept to its right is why it never leaves the frame.
    let escapes = 0;
    let settleId = 0;

    const flee = () => {
      window.clearTimeout(settleId);
      escapes = Math.min(escapes + 1, 3);
      gsap.to(stage, { '--flee': `${escapes * 22}px`, duration: 0.45, ease: 'power3.out' });
      settleId = window.setTimeout(() => {
        escapes = 0;
        gsap.to(stage, { '--flee': '0px', duration: 1.1, ease: 'elastic.out(1, 0.5)' });
      }, 900);
    };

    ghost.addEventListener('pointerenter', flee);
    return () => {
      window.clearTimeout(settleId);
      ghost.removeEventListener('pointerenter', flee);
    };
  });

  return (
    <div className="education-axis">
      <div
        className="axis-stage"
        ref={stageRef}
        style={{ '--origin': `${ORIGIN_PCT}%`, '--today': `${TODAY_PCT}%` } as CSSProperties}
      >
        <div className="axis-rules" aria-hidden="true">
          <i className="axis-live" />
          {quarters.map((at) => (
            <i key={at} className="axis-tick axis-tick-minor" style={{ left: `${at}%` }} />
          ))}
          {years.map((year) => (
            <i key={year.label} className="axis-tick" style={{ left: `${year.at}%` }} />
          ))}
          <i className="axis-drop axis-drop-honor" />
          <i className="axis-drop axis-drop-degree" />
          <i className="axis-drop axis-drop-today" />
          <i className="axis-cross" />
          <i className="axis-node axis-node-start" />
          <i className="axis-node axis-node-today" />
          <i className="axis-gap" />
          <i className="axis-bracket axis-bracket-previous" />
          <i className="axis-bracket axis-bracket-parallel" />
          <div className="axis-years">
            {years.map((year) => (
              <span key={year.label} style={{ left: `${year.at}%` }}>{year.label}</span>
            ))}
          </div>
        </div>

        <div className="axis-item axis-item-honor">
          <p className="axis-flag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="9" r="6" />
              <path d="M8.5 14.5 7 22l5-2.6L17 22l-1.5-7.5" />
            </svg>
            Graduado con honores
          </p>
          <p className="axis-honor">Presea al mejor estudiante de la generación</p>
        </div>

        <div className="axis-item axis-item-degree">
          <p className="axis-stamp">Ene 2023 · Inicio</p>
          <h3>Ingeniería en Computación</h3>
          <p className="axis-meta">{degree.institution}</p>
        </div>

        <div className="axis-item axis-item-today">
          <p className="axis-stamp axis-stamp-live">Hoy · en curso</p>
          <p className="axis-meta">El trazo no cierra:<br />sigue fuera del cuadro</p>
        </div>

        <div className="axis-item axis-item-previous">
          <p className="axis-label">Tramo previo</p>
          <h3>Bachillerato</h3>
          <p className="axis-meta">{school.institution} · {school.period}</p>
        </div>

        <div className="axis-item axis-item-course">
          <p className="axis-label">En paralelo · {course.hours}</p>
          <h3>{course.title}</h3>
          <p className="axis-note">{course.description}</p>
        </div>

        <div className="axis-ghost" ref={ghostRef}>
          <p>…y miles de cosas aún por aprender</p>
          <i className="axis-node axis-node-ghost" aria-hidden="true" />
        </div>
      </div>

      <div className="axis-languages">
        <p className="axis-label">Idiomas</p>
        <div>
          {languages.map((language) => (
            <div key={language.name} className="axis-language">
              <h3>{language.name}</h3>
              <i data-fill={language.level === 'Nativo' ? 'full' : 'partial'} />
              <p className="axis-meta">{language.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
