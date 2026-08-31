import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { COMPACT_MEDIA_QUERY } from './systemChoreography';
import { onScrollChange, scrollState } from '../scrollModel';
import { SECTION_IDS } from '../sections';

gsap.registerPlugin(useGSAP, DrawSVGPlugin, MotionPathPlugin);

/** Width of the fixed band the plotter draws inside, in px. */
const BAND = 118;
const TOP = 104;
const BOTTOM_GAP = 88;

type Stop = { x: number; y: number };

/**
 * Builds the route the pen follows: a vertical trace that steps sideways
 * twice on the way down, the way a routed line dodges an obstacle on a
 * technical drawing. One stop per page section.
 */
function buildRoute(height: number) {
  const spine = BAND * 0.62;
  const jog = BAND * 0.3;
  const bottom = Math.max(TOP + 160, height - BOTTOM_GAP);
  const step = (bottom - TOP) / (SECTION_IDS.length - 1);

  const stops: Stop[] = [{ x: spine, y: TOP }];
  let x = spine;
  let d = `M ${spine} ${TOP}`;

  for (let i = 1; i < SECTION_IDS.length; i += 1) {
    const y = TOP + step * i;
    // Step out on the third stop, back onto the spine on the fifth.
    const next = i === 2 ? spine - jog : i === 4 ? spine : x;
    if (next !== x) {
      // Approach on a true 45° diagonal so it lands exactly on the stop.
      d += ` L ${x} ${y - Math.abs(next - x)} L ${next} ${y}`;
      x = next;
    } else {
      d += ` L ${x} ${y}`;
    }
    stops.push({ x, y });
  }

  d += ` L ${x} ${bottom}`;
  return { d, stops };
}

export default function SystemPlotter({ activeIndex }: { activeIndex: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const guideRef = useRef<SVGPathElement>(null);
  const inkRef = useRef<SVGPathElement>(null);
  const penRef = useRef<SVGGElement>(null);
  const tiltRef = useRef<SVGGElement>(null);
  const stopsRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const svg = svgRef.current;
    const guide = guideRef.current;
    const ink = inkRef.current;
    const pen = penRef.current;
    const tilt = tiltRef.current;
    const stopsGroup = stopsRef.current;
    if (!svg || !guide || !ink || !pen || !tilt || !stopsGroup) return;

    const compact = window.matchMedia(COMPACT_MEDIA_QUERY);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let timeline: gsap.core.Timeline | null = null;
    let ticking = false;
    let drawn = 0;
    let velocity = 0;
    let tiltAngle = 0;

    const loop = () => {
      const target = scrollState.progress;
      velocity *= 0.9;
      const settled = Math.abs(target - drawn) < 0.0002 && Math.abs(velocity) < 0.002;
      if (settled) {
        velocity = 0;
        return;
      }
      drawn += (target - drawn) * 0.13;
      timeline?.progress(gsap.utils.clamp(0, 1, drawn));
      // A fast scroll leans the pen; it rights itself as the page settles.
      tiltAngle += (gsap.utils.clamp(-1, 1, velocity * 0.5) * 18 - tiltAngle) * 0.13;
      gsap.set(tilt, { rotation: tiltAngle });
    };

    const stopLoop = () => {
      if (!ticking) return;
      gsap.ticker.remove(loop);
      ticking = false;
    };

    const startLoop = () => {
      if (ticking) return;
      gsap.ticker.add(loop);
      ticking = true;
    };

    const teardown = () => {
      stopLoop();
      timeline?.kill();
      timeline = null;
    };

    const build = () => {
      teardown();

      if (compact.matches) {
        svg.dataset.plotter = 'off';
        return;
      }
      svg.dataset.plotter = 'on';

      const height = window.innerHeight;
      const { d, stops } = buildRoute(height);
      svg.setAttribute('viewBox', `0 0 ${BAND} ${height}`);
      guide.setAttribute('d', d);
      ink.setAttribute('d', d);

      stopsGroup.replaceChildren();
      stops.forEach((stop, index) => {
        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', String(stop.x - 9));
        tick.setAttribute('x2', String(stop.x + 9));
        tick.setAttribute('y1', String(stop.y));
        tick.setAttribute('y2', String(stop.y));
        tick.setAttribute('class', 'plot-tick');
        tick.dataset.index = String(index);
        stopsGroup.appendChild(tick);
      });
      syncActive();

      if (motion.matches) {
        // No pen, no loop: show the finished plot and leave it alone.
        gsap.set(ink, { drawSVG: '0% 100%' });
        gsap.set(pen, { autoAlpha: 0 });
        return;
      }

      gsap.set(pen, { autoAlpha: 1 });
      drawn = scrollState.progress;
      timeline = gsap
        .timeline({ paused: true })
        .fromTo(ink, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 1, ease: 'none' }, 0)
        .to(
          pen,
          {
            duration: 1,
            ease: 'none',
            // Without this the pen renders at the SVG origin until the first scroll.
            immediateRender: true,
            motionPath: { path: ink, align: ink, alignOrigin: [0.5, 0.5], autoRotate: true },
          },
          0,
        );
      timeline.progress(gsap.utils.clamp(0, 1, drawn));
      startLoop();
    };

    function syncActive() {
      const current = svg?.dataset.activeIndex ?? '0';
      stopsGroup?.querySelectorAll('.plot-tick').forEach((tick) => {
        const element = tick as SVGLineElement;
        element.classList.toggle('is-active', element.dataset.index === current);
      });
    }

    build();

    let resizeId = 0;
    const onResize = () => {
      window.clearTimeout(resizeId);
      resizeId = window.setTimeout(build, 200);
    };

    const onVisibility = () => (document.hidden ? stopLoop() : timeline && startLoop());
    const unsubscribeScroll = onScrollChange(() => {
      velocity = scrollState.velocity;
      if (timeline) startLoop();
    });

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    compact.addEventListener('change', build);
    motion.addEventListener('change', build);

    return () => {
      window.clearTimeout(resizeId);
      unsubscribeScroll();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      compact.removeEventListener('change', build);
      motion.removeEventListener('change', build);
      teardown();
    };
  });

  // The active stop is published through a data attribute so the imperative
  // tick nodes can read it without rebuilding the route on every section change.
  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.dataset.activeIndex = String(activeIndex);
    svg.querySelectorAll('.plot-tick').forEach((tick) => {
      const element = tick as SVGLineElement;
      element.classList.toggle('is-active', element.dataset.index === String(activeIndex));
    });
  }, [activeIndex]);

  return (
    <svg
      ref={svgRef}
      className="system-plotter"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMin meet"
      data-plotter="off"
    >
      <path ref={guideRef} className="plot-guide" fill="none" />
      <g ref={stopsRef} className="plot-stops" />
      <path ref={inkRef} className="plot-ink" fill="none" />
      <g ref={penRef} className="plot-pen">
        <g ref={tiltRef} className="plot-pen-tilt">
          <line x1="-11" y1="0" x2="11" y2="0" />
          <line x1="0" y1="-11" x2="0" y2="11" />
          <circle r="3.6" />
        </g>
      </g>
    </svg>
  );
}
