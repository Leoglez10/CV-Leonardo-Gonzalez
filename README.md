<div align="center">

<img src="public/images/yo.png" alt="Leonardo González" width="180" />

# Portafolio de Leonardo González

Portafolio profesional interactivo de Leonardo Elías González Rangel, enfocado en desarrollo full-stack, arquitectura de software, automatización e infraestructura.

[Ver sitio publicado](https://leonardogonzalezcv.netlify.app/)

</div>

## Qué contiene

La página organiza el perfil en siete secciones:

| Sección | Contenido |
|---|---|
| Inicio | Presentación, disponibilidad y accesos al trabajo y contacto. |
| Perfil | Resumen profesional y áreas de experiencia. |
| Experiencia | Trayectoria en Preparatoria 15 UdeG, Nexplea y Xignis. |
| Trabajo | Cuatro dominios de trabajo y acceso a los repositorios públicos. |
| Capacidades | Tecnologías agrupadas por frontend, backend, datos, IA y sistemas. |
| Formación | Ingeniería en Computación, certificación e idiomas. |
| Contacto | Correo, teléfono, GitHub, LinkedIn e Instagram. |

El contenido profesional se mantiene en [`data.ts`](data.ts); la composición y las interacciones viven principalmente en [`App.tsx`](App.tsx).

## Experiencia interactiva

La versión actual utiliza **SVG y GSAP**, no Three.js.

- `ScrollTrigger` mantiene una única lectura global del desplazamiento.
- [`SystemPlotter.tsx`](components/SystemPlotter.tsx) dibuja una ruta técnica según el progreso de la página mediante DrawSVG y mueve un indicador con MotionPath.
- [`TimelinePlot.tsx`](components/TimelinePlot.tsx) traza la experiencia laboral mientras entra en pantalla.
- El modo **Plano B** —botón en la navegación o tecla `B`— superpone cotas y mediciones SVG sobre la sección activa.
- Las tarjetas de trabajo se coordinan con un riel lateral y un indicador de progreso.
- Los niveles de capacidades usan ScrambleText al aparecer.
- La animación respeta `prefers-reduced-motion`; los elementos de dibujo complejos se desactivan hasta `820px` de ancho.

> El retrato principal referencia actualmente `/images/foto-leo.webp`, pero ese archivo no está versionado. La interfaz muestra su fallback con iniciales cuando la imagen no está disponible.

## Desarrollo local

### Requisitos

- Node.js y npm. El repositorio no fija versiones mínimas en `package.json`.

No se requieren variables de entorno ni backend para ejecutar el portafolio.

### Inicio rápido

```bash
git clone https://github.com/Leoglez10/CV-Leonardo-Gonzalez.git
cd CV-Leonardo-Gonzalez
npm ci
npm run dev
```

Vite escucha en `http://localhost:3000` y en las interfaces de red disponibles.

### Scripts disponibles

| Comando | Función |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo. |
| `npm run build` | Genera el sitio de producción en `dist/`. |
| `npm run preview` | Sirve localmente el contenido de `dist/`. |

El repositorio también contiene `bun.lock`, pero está desactualizado: aún registra Three.js y `bun install --frozen-lockfile` detecta cambios pendientes. Usa el `package-lock.json` actual con npm hasta regenerar y revisar el lockfile de Bun.

## Arquitectura

```text
App.tsx                         Página, secciones e interacciones GSAP
data.ts                        Perfil, experiencia, capacidades y proyectos
sections.ts                    Identificadores y orden de las secciones
scrollModel.ts                 Estado compartido de desplazamiento
components/
├── SystemPlotter.tsx          Ruta SVG vinculada al scroll
├── TimelinePlot.tsx           Dibujo SVG de la experiencia
├── BlueprintOverlay.tsx       Cotas del modo Plano B
└── systemChoreography.ts      Breakpoint compartido de animación
public/
├── images/                    Retrato y capturas de proyectos
├── favicon.svg
├── robots.txt
└── sitemap.xml
index.css                      Sistema visual responsive
index.html                     SEO, datos estructurados, GA4 y entrada Vite
```

## Stack verificado

- React 19
- TypeScript 5.8
- Vite 6
- GSAP 3 con React, ScrollTrigger, DrawSVG, MotionPath y ScrambleText
- Lucide React
- CSS propio, sin Tailwind CSS ni Framer Motion

## Actualizar el contenido

1. Modifica los datos profesionales en `data.ts`.
2. Agrega o reemplaza recursos en `public/images/`.
3. Ajusta la estructura en `App.tsx` solo si cambia la composición de las secciones.
4. Ejecuta `npm run build` antes de publicar.
5. Comprueba enlaces, texto alternativo, navegación con teclado y reducción de movimiento.

[`SECCIONES.md`](SECCIONES.md) documenta con mayor detalle la composición, los datos y las animaciones de cada sección.

## SEO, analítica y servicios externos

`index.html` incluye:

- metadatos Open Graph, Twitter y JSON-LD;
- canonical hacia el sitio de Netlify;
- `robots.txt` y `sitemap.xml`;
- Google Analytics 4;
- fuentes de Google Fonts.

El portafolio no almacena datos en una base propia, pero las visitas pueden generar solicitudes a Google Analytics y Google Fonts. Los enlaces de contacto abren servicios externos o el cliente de correo del visitante.

## Estado de verificación

- `npm ci`: correcto.
- `npm run build`: correcto; Vite transformó 1705 módulos y generó HTML, CSS y JavaScript en `dist/`.
- Sitio publicado: respondió HTTP 200 y su bundle contiene los marcadores `RENDER: SVG + GSAP` y `plot-guide`.
- `npm audit --omit=dev`: sin vulnerabilidades de producción reportadas durante esta revisión.
- El repositorio no incluye pruebas automatizadas, scripts de lint ni workflows de CI/CD.

## Créditos

Diseñado y desarrollado por **Leonardo Gonzalez**.

## Licencia

El repositorio no incluye una licencia pública para el portafolio. Las licencias incluidas dentro de `.agents/skills/` pertenecen a esas herramientas y no licencian automáticamente el sitio ni sus recursos.
