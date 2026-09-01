import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { useGSAP } from '@gsap/react';
import { githubProfile, personalInfo, skillCategories } from '../data';
import type { SkillItem } from '../types';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

/** Level word per `SkillItem.level`. Index 0 is unused so the level is the index. */
const LEVEL_WORDS = ['', 'Fundamentos', 'Intermedio', 'Intermedio alto', 'Avanzado'] as const;

type Row = SkillItem & { category: string };

const ALL_ROWS: Row[] = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({ ...skill, category: category.id })),
);

const FLAGS = ['--all', '--top', ...skillCategories.map((category) => `--${category.id}`)];

/** Title per flag, for the command buttons' accessible names. */
const FLAG_TITLES: Record<string, string> = {
  '--all': 'Todo el stack',
  '--top': 'Lo que mejor manejo',
  ...Object.fromEntries(skillCategories.map((category) => [`--${category.id}`, category.title])),
};

/**
 * Resolve what a visitor typed. A known flag filters by category (or by level,
 * for `--top`); anything else is matched as free text against the skill and
 * category names, so `react`, `sql` and `ia` all land somewhere useful.
 */
function resolve(raw: string): { flag: string | null; rows: Row[] } {
  const query = raw.toLowerCase().replace(/^\s*stack\s*/, '').trim();

  if (query === '' || query === '--all') return { flag: '--all', rows: ALL_ROWS };
  if (query === '--top') return { flag: '--top', rows: ALL_ROWS.filter((row) => row.level === 4) };

  const category = skillCategories.find((item) => query === `--${item.id}`);
  if (category) {
    return { flag: `--${category.id}`, rows: ALL_ROWS.filter((row) => row.category === category.id) };
  }

  const term = query.replace(/^-+/, '');
  return {
    flag: null,
    rows: ALL_ROWS.filter((row) => row.name.includes(term) || row.category.includes(term)),
  };
}

/**
 * The capabilities section as a terminal: instead of five cards listing every
 * skill with its level spelled out, a visitor asks for what they care about.
 * The level stops being a sentence and becomes a four-segment meter.
 */
export default function StackTerminal() {
  const [query, setQuery] = useState('stack --all');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const { flag, rows } = useMemo(() => resolve(query), [query]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        // The readings resolve out of noise the first time the section is read,
        // like an instrument settling.
        const levels = gsap.utils.toArray<HTMLElement>('.stack-row small');
        ScrollTrigger.create({
          trigger: outputRef.current,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            levels.forEach((level, index) => {
              gsap.to(level, {
                duration: 0.8,
                delay: index * 0.03,
                ease: 'none',
                scrambleText: { text: level.textContent ?? '', chars: '01', speed: 0.7 },
              });
            });
          },
        });
      });
    },
    { scope: outputRef },
  );

  // Filtering changes the page height, which invalidates every start/end
  // measured below this section — the plotter and the dog read those.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [rows.length]);

  /** Clicking a command writes it into the prompt: one source of truth. */
  const runCommand = (next: string) => {
    setQuery(`stack ${next}`);
    inputRef.current?.focus();
  };

  return (
    <div className="stack-terminal">
      <nav className="stack-commands" aria-label="Comandos del stack">
        <p>Comandos</p>
        {FLAGS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => runCommand(item)}
            aria-current={item === flag}
            title={FLAG_TITLES[item]}
          >
            <span>stack </span>{item}
          </button>
        ))}
      </nav>

      <div className="stack-output">
        <label className="stack-prompt">
          <span aria-hidden="true">leo@stack</span>
          <span aria-hidden="true">~ $</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="stack --all · o escribí react, docker…"
            aria-label="Consultar el stack por categoría o por nombre"
            spellCheck={false}
            autoComplete="off"
          />
        </label>

        <div ref={outputRef} className="stack-rows">
          {rows.map((row) => (
            <p className="stack-row" key={row.name}>
              <span>{row.name}</span>
              <i aria-hidden="true" data-peak={row.level === 4 ? 'true' : undefined}>
                {'████'.slice(0, row.level)}
                {'····'.slice(0, 4 - row.level)}
              </i>
              <small>{LEVEL_WORDS[row.level]}</small>
            </p>
          ))}
        </div>

        <p className="stack-footer">
          <span aria-live="polite" data-empty={rows.length === 0 ? 'true' : undefined}>
            {rows.length === 0
              ? 'sin resultados · probá --ia, --top o react'
              : `${rows.length} de ${ALL_ROWS.length} · exit 0`}
          </span>
          <a href={personalInfo.github} target="_blank" rel="noreferrer">
            → {githubProfile.handle} · {githubProfile.repositories} repos
          </a>
        </p>
      </div>
    </div>
  );
}
