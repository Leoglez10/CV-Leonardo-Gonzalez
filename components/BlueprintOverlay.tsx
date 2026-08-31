import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { COMPACT_MEDIA_QUERY } from './systemChoreography';
import { onScrollChange } from '../scrollModel';
import type { SectionId } from '../sections';

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const SVG_NS = 'http://www.w3.org/2000/svg';

/** First match wins: the element whose grid best describes each section. */
const GRID_TARGETS = [
  '.work-stage',
  '.capability-grid',
  '.profile-layout',
  '.credentials-layout',
  '.contact-grid',
  '.timeline > li',
  '.hero',
];

/** Past this many tracks the per-track labels stop fitting, so only ticks are drawn. */
const MAX_LABELLED_TRACKS = 4;

const px = (value: number) => `${Math.round(value)}px`;

function line(parent: SVGGElement, cls: string, x1: number, y1: number, x2: number, y2: number) {
  const element = document.createElementNS(SVG_NS, 'line');
  element.setAttribute('class', cls);
  element.setAttribute('x1', String(x1));
  element.setAttribute('y1', String(y1));
  element.setAttribute('x2', String(x2));
  element.setAttribute('y2', String(y2));
  parent.appendChild(element);
  return element;
}

function label(parent: SVGGElement, text: string, x: number, y: number, anchor = 'middle') {
  const element = document.createElementNS(SVG_NS, 'text');
  element.setAttribute('class', 'cota-label');
  element.setAttribute('x', String(x));
  element.setAttribute('y', String(y));
  element.setAttribute('text-anchor', anchor);
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

/**
 * Draws one dimension: two extension lines, the measured span with 45° end
 * ticks, and the value. Mirrors how a span is annotated on a real drawing.
 */
function dimension(
  parent: SVGGElement,
  from: number,
  to: number,
  y: number,
  reach: number,
  text: string | null,
) {
  const group = document.createElementNS(SVG_NS, 'g');
  parent.appendChild(group);
  line(group, 'cota-ext', from, y, from, y + reach);
  line(group, 'cota-ext', to, y, to, y + reach);
  const span = line(group, 'cota-line', from, y, to, y);
  line(group, 'cota-tick', from - 4, y + 4, from + 4, y - 4);
  line(group, 'cota-tick', to - 4, y + 4, to + 4, y - 4);
  if (text) label(group, text, (from + to) / 2, y - 7);
  return span;
}

/** Same annotation rotated onto the vertical axis, for heights. */
function dimensionVertical(
  parent: SVGGElement,
  from: number,
  to: number,
  x: number,
  reach: number,
  text: string,
) {
  const group = document.createElementNS(SVG_NS, 'g');
  parent.appendChild(group);
  line(group, 'cota-ext', x, from, x + reach, from);
  line(group, 'cota-ext', x, to, x + reach, to);
  const span = line(group, 'cota-line', x, from, x, to);
  line(group, 'cota-tick', x - 4, from + 4, x + 4, from - 4);
  line(group, 'cota-tick', x - 4, to + 4, x + 4, to - 4);
  const text_ = label(group, text, x - 7, (from + to) / 2);
  text_.setAttribute('transform', `rotate(-90 ${x - 7} ${(from + to) / 2})`);
  return span;
}

export default function BlueprintOverlay({
  active,
  sectionId,
}: {
  active: boolean;
  sectionId: SectionId;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      svg.replaceChildren();
      if (!active || window.matchMedia(COMPACT_MEDIA_QUERY).matches) return;

      const section = document.getElementById(sectionId);
      if (!section) return;

      // Find the element whose resolved grid actually describes this section.
      let target: HTMLElement | null = null;
      let tracks: number[] = [];
      for (const selector of GRID_TARGETS) {
        const candidate = section.querySelector<HTMLElement>(selector);
        if (!candidate) continue;
        const columns = getComputedStyle(candidate).gridTemplateColumns;
        if (!columns || columns === 'none') continue;
        const parsed = columns.split(' ').map(Number.parseFloat).filter((n) => !Number.isNaN(n));
        if (parsed.length < 1) continue;
        target = candidate;
        tracks = parsed;
        break;
      }
      if (!target) return;

      const rect = target.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);

      const group = document.createElementNS(SVG_NS, 'g');
      group.setAttribute('class', 'cota-group');
      svg.appendChild(group);

      // Width chains stay pinned inside the viewport; the height dimension has
      // to track the element freely or it would stop describing it.
      const widthGroup = document.createElementNS(SVG_NS, 'g');
      const heightGroup = document.createElementNS(SVG_NS, 'g');
      group.append(widthGroup, heightGroup);

      const spans: SVGLineElement[] = [];
      const gap = tracks.length > 1 ? (rect.width - tracks.reduce((a, b) => a + b, 0)) / (tracks.length - 1) : 0;

      // Per-track chain, then the overall width above it.
      let cursor = rect.left;
      const labelled = tracks.length <= MAX_LABELLED_TRACKS;
      tracks.forEach((width) => {
        spans.push(
          dimension(widthGroup, cursor, cursor + width, rect.top - 26, 20, labelled ? px(width) : null),
        );
        cursor += width + gap;
      });
      spans.push(dimension(widthGroup, rect.left, rect.right, rect.top - 56, 50, px(rect.width)));

      // Height on the left flank.
      spans.push(
        dimensionVertical(heightGroup, rect.top, rect.bottom, rect.left - 30, 22, px(rect.height)),
      );

      const labels = group.querySelectorAll('.cota-label');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced) {
        gsap.set(spans, { drawSVG: '0% 100%' });
        gsap.set(labels, { autoAlpha: 1 });
      } else {
        gsap.fromTo(
          spans,
          { drawSVG: '0% 0%' },
          { drawSVG: '0% 100%', duration: 0.5, stagger: 0.06, ease: 'power2.out' },
        );
        gsap.fromTo(labels, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, delay: 0.28, stagger: 0.05 });
      }

      // Geometry is measured once; scrolling only slides the whole annotation
      // so it stays pinned to the element it describes.
      const measured = target;
      const measuredTop = rect.top;
      // Highest line of the width chain, in group-local coordinates.
      const chainTop = measuredTop - 56;
      const follow = () => {
        const delta = measured.getBoundingClientRect().top - measuredTop;
        gsap.set(heightGroup, { y: delta });
        const parked = gsap.utils.clamp(118, window.innerHeight - 70, chainTop + delta);
        gsap.set(widthGroup, { y: parked - chainTop });
      };
      follow();
      const unsubscribeScroll = onScrollChange(follow);
      window.addEventListener('resize', follow);

      return () => {
        unsubscribeScroll();
        window.removeEventListener('resize', follow);
      };
    },
    { dependencies: [active, sectionId] },
  );

  return (
    <svg
      ref={svgRef}
      className="blueprint-cotas"
      aria-hidden="true"
      data-active={active ? 'on' : 'off'}
    />
  );
}
