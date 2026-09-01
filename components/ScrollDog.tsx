import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { onScrollChange, scrollState } from '../scrollModel';

gsap.registerPlugin(useGSAP);

/** Drawing width of the dog, in px. Must match `.scroll-dog` in index.css. */
const WIDTH = 40;
/** How far the dog travels before its legs complete one full stride. */
const STRIDE = 46;
/** Duration of one stride in the walk timeline, in seconds. */
const CYCLE = 0.56;

/**
 * A small dog that walks along the header rule as the page scrolls: it stands
 * at the left edge at the top of the document and reaches the right edge at the
 * bottom. Its legs are driven by distance travelled, not by time, so it only
 * moves when the page does, and it turns around when the reader scrolls back up.
 */
export default function ScrollDog() {
  const svgRef = useRef<SVGSVGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const tailRef = useRef<SVGPathElement>(null);
  const legsRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const svg = svgRef.current;
    const body = bodyRef.current;
    const tail = tailRef.current;
    const legsGroup = legsRef.current;
    if (!svg || !body || !tail || !legsGroup) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const legs = Array.from(legsGroup.querySelectorAll('line')) as SVGLineElement[];
    // Diagonal pairs move together, the way a real dog trots.
    const pairA = [legs[0], legs[3]];
    const pairB = [legs[1], legs[2]];

    let walk: gsap.core.Timeline | null = null;
    let ticking = false;
    let travelled = 0;
    let placed = -1;

    // The header rule starts after the plotter gutter, so the walk does too.
    const rail = () =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rail')) || 0;
    const span = () => Math.max(0, window.innerWidth - rail() - WIDTH);
    const place = (progress: number) => gsap.set(svg, { x: progress * span() });

    const buildWalk = () => {
      const q = CYCLE / 4;
      // SVG needs its own origin: a <line> has no box for CSS transform-origin
      // to hang off, so the joints are given in user units.
      legs.forEach((leg) => gsap.set(leg, { svgOrigin: `${leg.getAttribute('x1')} 17.6` }));
      gsap.set(tail, { svgOrigin: '8.4 10' });

      return gsap
        .timeline({ paused: true, defaults: { duration: q, ease: 'sine.inOut' } })
        .fromTo(pairA, { rotation: 0 }, { rotation: 24 }, 0)
        .fromTo(pairB, { rotation: 0 }, { rotation: -24 }, 0)
        .fromTo(tail, { rotation: 0 }, { rotation: 12 }, 0)
        .fromTo(body, { y: 0 }, { y: -0.8 }, 0)
        .to(pairA, { rotation: 0 }, q)
        .to(pairB, { rotation: 0 }, q)
        .to(tail, { rotation: 0 }, q)
        .to(body, { y: 0 }, q)
        .to(pairA, { rotation: -24 }, q * 2)
        .to(pairB, { rotation: 24 }, q * 2)
        .to(tail, { rotation: -12 }, q * 2)
        .to(body, { y: -0.8 }, q * 2)
        .to(pairA, { rotation: 0 }, q * 3)
        .to(pairB, { rotation: 0 }, q * 3)
        .to(tail, { rotation: 0 }, q * 3)
        .to(body, { y: 0 }, q * 3);
    };

    const loop = () => {
      const target = scrollState.progress;
      if (placed < 0) placed = target;
      const delta = (target - placed) * 0.16;
      if (Math.abs(target - placed) < 0.0004) {
        placed = target;
        place(placed);
        gsap.ticker.remove(loop);
        ticking = false;
        return;
      }
      placed += delta;
      place(placed);

      const moved = delta * span();
      travelled += Math.abs(moved);
      // Face the direction of travel; a 1px step is noise, not a turn.
      if (Math.abs(moved) > 0.4) gsap.set(svg, { scaleX: moved < 0 ? -1 : 1 });
      walk?.time(gsap.utils.wrap(0, CYCLE, (travelled / STRIDE) * CYCLE));
    };

    const start = () => {
      if (ticking || !walk) return;
      gsap.ticker.add(loop);
      ticking = true;
    };

    const stop = () => {
      if (!ticking) return;
      gsap.ticker.remove(loop);
      ticking = false;
    };

    const build = () => {
      stop();
      walk?.kill();
      walk = null;
      placed = scrollState.progress;
      gsap.set(svg, { scaleX: 1, transformOrigin: '50% 50%' });
      place(placed);

      // Reduced motion: the dog still marks the reading position, it just
      // stops walking to get there.
      if (motion.matches) return;
      walk = buildWalk();
      walk.time(0);
    };

    build();

    const onResize = () => place(placed);
    const onVisibility = () => (document.hidden ? stop() : start());
    const unsubscribe = onScrollChange(() => (motion.matches ? place(scrollState.progress) : start()));

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', build);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', build);
      stop();
      walk?.kill();
    };
  });

  return (
    <svg
      ref={svgRef}
      className="scroll-dog"
      viewBox="0 0 40 26"
      aria-hidden="true"
      focusable="false"
    >
      <g ref={legsRef} className="dog-legs">
        <line x1="11" y1="17.6" x2="11" y2="25" />
        <line x1="13.4" y1="17.6" x2="13.4" y2="25" />
        <line x1="21.4" y1="17.6" x2="21.4" y2="25" />
        <line x1="23.8" y1="17.6" x2="23.8" y2="25" />
      </g>
      <g ref={bodyRef}>
        <path ref={tailRef} className="dog-tail" d="M8.4 10 C 5.4 8.6 4.2 6 4.6 3.4" />
        {/* Ear and muzzle are drawn first so the filled head hides where they meet it. */}
        <path className="dog-solid" d="M28.4 5.2 l1.2 -3.8 l3 2.6" />
        <path className="dog-solid" d="M33.4 7 h2.8 a1.5 1.5 0 0 1 0 3 h-2.8 z" />
        <path className="dog-solid" d="M9 18 h14 a4.5 4.5 0 0 0 4.5 -4.5 v-1 a3.5 3.5 0 0 0 -3.5 -3.5 h-15 a3.5 3.5 0 0 0 -3.5 3.5 v2 a3.5 3.5 0 0 0 3.5 3.5 z" />
        <circle className="dog-solid" cx="30.4" cy="8.2" r="4.2" />
        <path className="dog-collar" d="M26.7 7.6 l-1.2 3.9" />
        <circle className="dog-eye" cx="31.9" cy="7.2" r="0.85" />
      </g>
    </svg>
  );
}
