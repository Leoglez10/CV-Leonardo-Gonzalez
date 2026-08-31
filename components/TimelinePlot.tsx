import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPACT_MEDIA_QUERY } from './systemChoreography';

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger);

const SVG_NS = 'http://www.w3.org/2000/svg';

function path(parent: SVGGElement, cls: string, d: string) {
  const element = document.createElementNS(SVG_NS, 'path');
  element.setAttribute('class', cls);
  element.setAttribute('d', d);
  element.setAttribute('fill', 'none');
  parent.appendChild(element);
  return element;
}

/**
 * Draws the spine that runs down the experience markers and, for each job, a
 * bracket alongside its achievements — the record being plotted as you read it.
 */
export default function TimelinePlot() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const svg = svgRef.current;
    const timeline = document.querySelector<HTMLElement>('.timeline');
    if (!svg || !timeline) return;

    const compact = window.matchMedia(COMPACT_MEDIA_QUERY);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let triggers: ScrollTrigger[] = [];

    const teardown = () => {
      triggers.forEach((trigger) => trigger.kill());
      triggers = [];
      svg.replaceChildren();
    };

    const build = () => {
      teardown();
      if (compact.matches) {
        svg.dataset.plot = 'off';
        return;
      }
      svg.dataset.plot = 'on';

      const box = timeline.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      // Coordinates are local to the timeline, so nothing depends on scroll.
      const localX = (value: number) => value - box.left;
      const localY = (value: number) => value - box.top;

      const items = Array.from(timeline.querySelectorAll<HTMLElement>(':scope > li'));
      const markers = items
        .map((item) => item.querySelector<HTMLElement>('.timeline-marker span'))
        .filter((marker): marker is HTMLElement => Boolean(marker));
      if (markers.length < 2) return;

      const group = document.createElementNS(SVG_NS, 'g');
      svg.appendChild(group);

      const first = markers[0].getBoundingClientRect();
      const last = markers[markers.length - 1].getBoundingClientRect();
      const spineX = localX(first.left + first.width / 2);
      const spine = path(
        group,
        'plot-spine',
        `M ${spineX} ${localY(first.bottom)} L ${spineX} ${localY(last.top)}`,
      );

      const reduced = motion.matches;
      if (reduced) {
        gsap.set(spine, { drawSVG: '0% 100%' });
      } else {
        gsap.fromTo(
          spine,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            ease: 'none',
            scrollTrigger: { trigger: timeline, start: 'top 62%', end: 'bottom 72%', scrub: 0.5 },
          },
        );
      }

      items.forEach((item) => {
        const bullets = Array.from(item.querySelectorAll<HTMLElement>('article > ul > li'));
        if (bullets.length < 2) return;

        const rects = bullets.map((bullet) => bullet.getBoundingClientRect());
        const bracketX = localX(Math.min(...rects.map((rect) => rect.left)) - 13);
        const top = localY(rects[0].top + 9);
        const bottom = localY(rects[rects.length - 1].top + 9);

        let d = `M ${bracketX} ${top} L ${bracketX} ${bottom}`;
        rects.forEach((rect) => {
          const y = localY(rect.top + 9);
          d += ` M ${bracketX} ${y} L ${bracketX + 7} ${y}`;
        });
        const bracket = path(group, 'plot-bracket', d);

        if (reduced) {
          gsap.set(bracket, { drawSVG: '0% 100%' });
          return;
        }
        gsap.fromTo(
          bracket,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 68%', once: true },
          },
        );
      });

      triggers = ScrollTrigger.getAll().filter((trigger) => {
        const element = trigger.trigger;
        return element === timeline || items.includes(element as HTMLElement);
      });

      // These are created after fonts settle, so they start out unaware of the
      // current scroll position.
      ScrollTrigger.refresh();
    };

    // Measured geometry: wait for fonts, then rebuild whenever layout can shift.
    document.fonts.ready.then(build);

    let resizeId = 0;
    const onResize = () => {
      window.clearTimeout(resizeId);
      resizeId = window.setTimeout(build, 200);
    };
    window.addEventListener('resize', onResize);
    compact.addEventListener('change', build);
    motion.addEventListener('change', build);

    return () => {
      window.clearTimeout(resizeId);
      window.removeEventListener('resize', onResize);
      compact.removeEventListener('change', build);
      motion.removeEventListener('change', build);
      teardown();
    };
  });

  return <svg ref={svgRef} className="timeline-plot" aria-hidden="true" data-plot="off" />;
}
