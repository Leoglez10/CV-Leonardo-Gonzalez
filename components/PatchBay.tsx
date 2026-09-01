import { useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import { Check, Copy, FileDown, Github, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../data';

gsap.registerPlugin(useGSAP, Draggable);

type Channel = {
  id: string;
  label: string;
  value: string;
  icon: ReactNode;
  /** Absent on the copy channel, which acts instead of navigating. */
  href?: string;
  external?: boolean;
  download?: boolean;
};

const handle = (url: string) => url.replace(/\/$/, '').split('/').pop() ?? url;

const CHANNELS: Channel[] = [
  {
    id: 'mail',
    label: 'Correo',
    value: personalInfo.email,
    icon: <Mail aria-hidden="true" />,
    href: `mailto:${personalInfo.email}`,
  },
  { id: 'copy', label: 'Copiar correo', value: 'Al portapapeles', icon: <Copy aria-hidden="true" /> },
  {
    id: 'github',
    label: 'GitHub',
    value: handle(personalInfo.github),
    icon: <Github aria-hidden="true" />,
    href: personalInfo.github,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: handle(personalInfo.linkedin),
    icon: <Linkedin aria-hidden="true" />,
    href: personalInfo.linkedin,
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: `@${handle(personalInfo.instagram)}`,
    icon: <Instagram aria-hidden="true" />,
    href: personalInfo.instagram,
    external: true,
  },
  {
    id: 'phone',
    label: 'Teléfono',
    value: personalInfo.phone,
    icon: <Phone aria-hidden="true" />,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
  },
  {
    id: 'cv',
    label: 'CV en PDF',
    value: 'LeoCV.pdf',
    icon: <FileDown aria-hidden="true" />,
    href: '/LeoCV.pdf',
    download: true,
  },
];

/** How close the plug has to land for a socket to take it, in pixels. */
const CATCH_RADIUS = 62;

/**
 * The contact section as a patch bay: every channel is a socket, and the plug
 * is dragged into the one you want. Dragging is the flourish, not the door —
 * each socket is a real link or button, so a tap or the keyboard opens the same
 * channel without ever touching the cable.
 */
export default function PatchBay() {
  const stageRef = useRef<HTMLDivElement>(null);
  const plugRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const cableRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);
  const socketsRef = useRef<(HTMLElement | null)[]>([]);
  const [live, setLive] = useState<Channel | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  const announce = (channel: Channel) => {
    setLive(channel);
    window.setTimeout(() => setLive((current) => (current === channel ? null : current)), 2600);
  };

  useGSAP(
    () => {
      const stage = stageRef.current;
      const plug = plugRef.current;
      const anchor = anchorRef.current;
      const cable = cableRef.current;
      const ghost = ghostRef.current;
      if (!stage || !plug || !anchor || !cable || !ghost) return;

      type Point = { x: number; y: number };
      type Target = { control: HTMLElement; port: Point };

      let origin: Point = { x: 0, y: 0 };
      let home: Point = { x: 0, y: 0 };
      let targets: Target[] = [];

      /** Centre of `element` in stage coordinates, ignoring any live transform. */
      const centre = (element: Element, offset: Point = { x: 0, y: 0 }): Point => {
        const base = stage.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left - base.left + rect.width / 2 - offset.x,
          y: rect.top - base.top + rect.height / 2 - offset.y,
        };
      };

      const measure = () => {
        origin = centre(anchor);
        home = centre(plug, {
          x: Number(gsap.getProperty(plug, 'x')),
          y: Number(gsap.getProperty(plug, 'y')),
        });
        targets = socketsRef.current.flatMap((control) => {
          const port = control?.querySelector('.patch-port');
          return control && port ? [{ control, port: centre(port) }] : [];
        });
      };

      /** A cable hangs: the further it reaches, the deeper it sags. */
      const curve = (to: Point) => {
        const sag = Math.min(96, 26 + Math.abs(to.x - origin.x) * 0.34);
        return `M ${origin.x} ${origin.y} C ${origin.x + 34} ${origin.y + sag}, ${to.x - 46} ${to.y + sag}, ${to.x} ${to.y}`;
      };

      const draw = () => {
        cable.setAttribute('d', curve({
          x: home.x + Number(gsap.getProperty(plug, 'x')),
          y: home.y + Number(gsap.getProperty(plug, 'y')),
        }));
      };

      measure();
      draw();

      const observer = new ResizeObserver(() => {
        measure();
        draw();
      });
      observer.observe(stage);

      // Hovering a socket previews the cable it would take, without moving the plug.
      const previews = targets.map(({ control }, index) => {
        const show = () => {
          measure();
          // Read the port after measuring: a resize rebuilds every target.
          ghost.setAttribute('d', curve(targets[index].port));
          gsap.to(ghost, { opacity: 1, duration: 0.2 });
        };
        const hide = () => gsap.to(ghost, { opacity: 0, duration: 0.2 });
        control.addEventListener('pointerenter', show);
        control.addEventListener('focus', show);
        control.addEventListener('pointerleave', hide);
        control.addEventListener('blur', hide);
        return () => {
          control.removeEventListener('pointerenter', show);
          control.removeEventListener('focus', show);
          control.removeEventListener('pointerleave', hide);
          control.removeEventListener('blur', hide);
        };
      });

      const media = gsap.matchMedia();

      // Below the site's rail breakpoint the panel is a tap target, not a
      // workbench: dragging there would fight the page scroll for the same
      // gesture, and the cable is hidden anyway.
      media.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
        let armed = -1;

        const arm = (index: number) => {
          if (index === armed) return;
          targets[armed]?.control.removeAttribute('data-armed');
          if (index >= 0) targets[index].control.setAttribute('data-armed', 'true');
          armed = index;
        };

        const nearest = () => {
          const tip = {
            x: home.x + Number(gsap.getProperty(plug, 'x')),
            y: home.y + Number(gsap.getProperty(plug, 'y')),
          };
          let best = -1;
          let bestDistance = CATCH_RADIUS;
          targets.forEach(({ port }, index) => {
            const distance = Math.hypot(port.x - tip.x, port.y - tip.y);
            if (distance < bestDistance) {
              bestDistance = distance;
              best = index;
            }
          });
          return best;
        };

        const dragger = Draggable.create(plug, {
          type: 'x,y',
          bounds: stage,
          onPress: measure,
          onDrag: () => {
            draw();
            arm(nearest());
          },
          onDragEnd: () => {
            const hit = armed;
            arm(-1);

            if (hit < 0) {
              gsap.to(plug, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)', onUpdate: draw });
              return;
            }

            const { control, port } = targets[hit];
            // Fired inside the pointerup handler so the browser still counts the
            // navigation as user-initiated.
            control.click();
            gsap
              .timeline({ onUpdate: draw })
              .to(plug, { x: port.x - home.x, y: port.y - home.y, duration: 0.2, ease: 'power3.out' })
              .to(plug, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.55)' }, '+=0.7');
          },
        });

        stage.setAttribute('data-draggable', 'true');
        return () => {
          arm(-1);
          stage.removeAttribute('data-draggable');
          dragger.forEach((instance) => instance.kill());
          gsap.set(plug, { x: 0, y: 0 });
          draw();
        };
      });

      return () => {
        observer.disconnect();
        previews.forEach((remove) => remove());
        media.revert();
      };
    },
    { scope: stageRef },
  );

  const status = copied
    ? 'Correo copiado'
    : live
      ? `Canal ${live.label} · abierto`
      : 'Sin conectar';

  return (
    <div className="patch-bay">
      <div className="patch-head">
        <p>Panel de enlace · LEGR</p>
        <p aria-live="polite">{status}</p>
      </div>

      <div className="patch-stage" ref={stageRef}>
        <svg className="patch-cable" aria-hidden="true">
          <path className="patch-ghost" ref={ghostRef} />
          <path className="patch-line" ref={cableRef} />
        </svg>

        <div className="patch-jack">
          <span className="patch-anchor" ref={anchorRef} aria-hidden="true" />
          <button className="patch-plug" ref={plugRef} type="button" tabIndex={-1} aria-hidden="true" />
          <small>Conector</small>
        </div>

        <ul className="patch-sockets">
          {CHANNELS.map((channel, index) => {
            const content = (
              <>
                <i className="patch-port" aria-hidden="true" />
                {channel.id === 'copy' && copied ? <Check aria-hidden="true" /> : channel.icon}
                <span>{channel.label}</span>
                <small>{channel.id === 'copy' && copied ? 'Listo' : channel.value}</small>
              </>
            );

            return (
              <li key={channel.id}>
                {channel.href ? (
                  <a
                    className="patch-socket"
                    ref={(element) => { socketsRef.current[index] = element; }}
                    href={channel.href}
                    onClick={() => announce(channel)}
                    {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    {...(channel.download ? { download: '' } : {})}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    className="patch-socket"
                    ref={(element) => { socketsRef.current[index] = element; }}
                    type="button"
                    onClick={copyEmail}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <p className="patch-hint">
        <span>Arrastra el conector hasta un canal</span> — o abre el que quieras directamente.
      </p>
    </div>
  );
}
