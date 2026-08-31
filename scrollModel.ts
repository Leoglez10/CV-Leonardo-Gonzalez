/**
 * Single source of truth for page scroll.
 *
 * ScrollTrigger (App.tsx) is the only thing that reads the scroll position and
 * calls `setScroll`. Everything else — the CSS progress var, the WebGL loop —
 * consumes this state instead of attaching its own scroll listener.
 */

type ScrollListener = () => void;

/** Progress is 0 at the top of the page and 1 at the bottom. Velocity is px/ms. */
export const scrollState = { progress: 0, velocity: 0 };

const listeners = new Set<ScrollListener>();

export function setScroll(progress: number, velocity: number) {
  scrollState.progress = progress;
  scrollState.velocity = velocity;
  listeners.forEach((listener) => listener());
}

export function onScrollChange(listener: ScrollListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
