# Secciones del portafolio

Mapa de la página: qué muestra cada sección, de dónde salen sus datos y cómo está construida.

El sitio es **una sola página** con siete anclas. No hay router, no hay backend: `data.ts` es la
única fuente de contenido y todo se renderiza en el cliente desde `App.tsx`.

---

## 1. Cómo se arma la página

```
index.html          → cabeza del documento: meta/OG, JSON-LD (schema.org Person),
                      Google Fonts, GA4, <div id="root">
  └─ index.tsx      → ReactDOM.createRoot + <React.StrictMode>
       └─ App.tsx   → toda la composición: header, 7 <section>, footer, HUD
```

| Archivo | Rol |
|---|---|
| `App.tsx` | Composición completa + coreografía de scroll. Único componente de página. |
| `data.ts` | Contenido: perfil, experiencias, proyectos, skills, formación, idiomas, certificación. |
| `types.ts` | Interfaces `Project`, `SkillItem`, `SkillCategory`, `Education`, `Experience`. |
| `sections.ts` | `SECTION_IDS` (las 7 anclas) y el tipo `SectionId`. |
| `scrollModel.ts` | Estado de scroll compartido (`progress`, `velocity`) con suscripción. |
| `index.css` | Tema y estilos completos. CSS plano, sin preprocesador ni framework. |
| `components/SystemPlotter.tsx` | Plóter SVG de fondo: traza una ruta técnica con la pluma siguiendo el scroll. |
| `components/BlueprintOverlay.tsx` | Cotas acotadas del modo blueprint, medidas del layout real. |
| `components/TimelinePlot.tsx` | Espina y brackets dibujados de la sección de experiencia. |
| `components/systemChoreography.ts` | Sólo el breakpoint compartido: `COMPACT_BREAKPOINT_PX = 820`. |

### Stack real

React 19 · TypeScript 5.8 · Vite 6 · GSAP 3 (ScrollTrigger, DrawSVG, MotionPath, ScrambleText) · lucide-react.

Todos los plugins de GSAP vienen en el paquete público `gsap` y son gratis, también para uso
comercial. No hace falta registro, token ni `.npmrc` privado.

> **Ojo:** el `README.md` está desactualizado. Menciona Tailwind CSS 4, Framer Motion,
> `components/ui`, `hooks/` y `lib/` — nada de eso existe en el repo. Los estilos son CSS
> plano en un solo `index.css` y las animaciones son GSAP.

### Sistema visual

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#f4f0e7` | Fondo base |
| `--paper-deep` | `#e8e1d4` | Fondos hundidos |
| `--ink` | `#10100f` | Texto y bordes duros |
| `--ink-soft` | `#4e4b45` | Texto secundario |
| `--cobalt` | `#1746e0` | Acento primario |
| `--orange` | `#ff4d00` | Acento de progreso e índices |
| `--page` | `min(1440px, 100vw - 56px)` | Ancho del contenedor |

Tipografías: **Bricolage Grotesque** (títulos y cuerpo) e **IBM Plex Mono** (etiquetas,
metadatos, todo lo que va en mayúsculas). Ambas desde Google Fonts.

---

## 2. Capas fijas (fuera del flujo)

Elementos que viven encima o detrás de todas las secciones:

| Capa | z-index | Qué es |
|---|---|---|
| `.skip-link` | 1000 | Salto al contenido. Oculto hasta recibir foco. |
| `.blueprint-hud` | 70 | Panel de diagnóstico del modo blueprint. |
| `.scroll-meter` | 60 | Barra vertical de 5px a la izquierda. Se llena con `--scroll-progress`. |
| `.site-header` | 50 | Header fijo con `backdrop-filter: blur(16px)`. 76px de alto (66 en móvil). |
| `.blueprint-cotas` | 40 | Cotas del modo blueprint. Encima del contenido, debajo del header. |
| `#main-content` / `.site-footer` | 2 | Todo el contenido semántico. |
| `.system-plotter` | 1 | Plóter SVG fijo en la banda derecha (118px). `pointer-events: none`. |
| `.paper-grid` | 0 | Retícula de 48px al 28% de opacidad, desvanecida hacia abajo con `mask-image`. |

El orden importa: el plóter va **encima** del fondo de papel pero **debajo** del contenido —
el trazo pasa por detrás de las tarjetas a propósito, como la retícula. Ambas capas
desaparecen bajo `forced-colors`.

---

## 3. Modelo de scroll compartido

Hay **un solo lector de scroll** en toda la app: un `ScrollTrigger` global en `App.tsx`.

```
ScrollTrigger.create({ start: 0, end: 'max', onUpdate })
       │
       ├─→ document.documentElement.style --scroll-progress   (barra CSS)
       └─→ setScroll(progress, velocity)                      (scrollModel.ts)
                     │
                     └─→ SystemPlotter lee scrollState en su loop de gsap.ticker
```

Además, por cada sección se crean dos triggers:

| Trigger | Rango | Efecto |
|---|---|---|
| Reveal | `top 85%`, `once: true` | Marca `data-revealed="true"`; el CSS hace la transición. |
| Sección activa | `top 45%` → `bottom 45%` | `onToggle` fija `activeSection` (resalta el nav). |

El reveal usa `onRefresh` además de `onEnter` para cubrir una recarga que caiga por debajo
de la sección (enlace directo o scroll restaurado).

Dos `refresh()` obligatorios porque ScrollTrigger cachea posiciones:
`document.fonts.ready` (las fuentes tardías mueven el layout) y el `onToggle` del
`<details>` del archivo de proyectos (abrirlo cambia la altura de la página).

---

## 4. Las secciones

### 00 — Hero · `#home`

Sin `SectionIndex`; es la única sección con retrato.

| Dato | Origen |
|---|---|
| Ubicación y disponibilidad | Texto fijo en el JSX |
| Nombre (2 líneas) | Texto fijo |
| Tesis | Texto fijo |
| Retrato | `/images/yo.png` (435×574, `fetchPriority="high"`) |

**Construcción.** Grid `minmax(0, 1.05fr) / minmax(300px, 0.95fr)` con `min-height: 100svh`:
copy a la izquierda, `<figure class="hero-portrait">` a la derecha.

«González» se dibuja **sin relleno**: `color: transparent` más `-webkit-text-stroke`. Como
`color` sí es animable, GSAP lo entinta de transparente a `--ink` con `scrub` mientras
recorrés el hero: el apellido se rellena al bajar. Se omite bajo `prefers-reduced-motion`. El marco del retrato (`.portrait-frame`) lleva `aspect-ratio: 435/574`,
`box-shadow: 16px 16px 0 var(--cobalt)`, un aro naranja en `::before` y un borde punteado
interior en `::after`. Dos etiquetas monoespaciadas (`LEGR / 1999`, `GDL · MX`) se
posicionan absolutas en las esquinas.

Si la imagen falla, `onError` activa `portraitFailed` y se pinta `.portrait-fallback`:
una silueta geométrica construida sólo con CSS (`<i>` cabeza, `<b>` torso) sobre cobalto
con una franja naranja diagonal. Tiene `role="img"` y `aria-label` propio.

---

### 01 — Perfil · `#profile`

| Dato | Origen |
|---|---|
| Párrafo de presentación | `personalInfo.about` |
| 4 datos clave | Texto fijo en el JSX |

**Construcción.** `.profile-layout` es un grid `1.2fr / 0.8fr` alineado a `end`. Los cuatro
datos son `.fact-grid`, un grid 2×2 que dibuja sus divisiones con bordes: `border-right` en
los impares y `border-bottom` en todos. Sin cajas, sólo líneas.

---

### 02 — Experiencia · `#experience`

**3 entradas** desde `experiences` (`data.ts`).

| Campo | Se muestra como |
|---|---|
| `period`, `location` | Columna de metadatos monoespaciada |
| `company` | `<h3>` grande |
| `role` | Línea en cobalto |
| `description[]` | Lista con `+` naranja generado en `::before` |

Contenido actual: Preparatoria 15 (UdeG), Nexplea S.A. de C.V., Xignis · Guanajuato Nos Une.

**El registro se dibuja.** Un `<svg class="timeline-plot">` absoluto dentro de
`.timeline-stage` mide el DOM y dibuja dos cosas: la **espina** cobalto que baja por la
columna de marcadores, revelada con `drawSVG` y `scrub` a lo largo de toda la sección, y un
**bracket** naranja junto a los logros de cada empleo, con una marca por viñeta, que se
dibuja una sola vez al entrar ese empleo.

Las coordenadas son locales al timeline, así que no dependen del scroll. La geometría se mide
después de `document.fonts.ready` y se reconstruye al redimensionar. Como esos ScrollTrigger
nacen tarde, hace falta un `ScrollTrigger.refresh()` al terminar de construir: sin él nacen
creyendo que el scroll está en cero y no dibujan nada.

**Construcción.** `<ol class="timeline">` semántico. Cada `<li>` es un grid `90px / 1fr`:
el marcador es un círculo cobalto con el índice (`01`, `02`, `03`) generado con
`padStart(2, '0')` sobre la posición del array, no sobre `experience.id`. El `<article>`
interno se reparte en tres columnas (metadatos / puesto / logros) que colapsan a una en móvil.

---

### 03 — Trabajo · `#work`

Esta sección **no lista proyectos**. Describe a grandes rasgos los frentes de trabajo y
manda a GitHub para ver el código.

| Bloque | Origen | Cantidad |
|---|---|---|
| Frentes de trabajo | `workDomains` | 4 |
| Tarjeta de GitHub | `githubProfile` + `personalInfo.github` | 1 |

Los cuatro frentes son: sistemas internos y de operación · producto web para clientes y
gobierno · IA aplicada a procesos reales · interfaces, juegos y utilidades. Cada línea está
respaldada por una entrada real de `experiences` o `projects`; no hay nada inventado.

**Construcción.** `.domain-list` es una pila vertical separada por reglas, no una grilla de
tarjetas: cada `.work-domain` es un grid de tres columnas (número / título / cuerpo) con los
tags en una segunda fila. Lee como una hoja de especificación, no como un catálogo.

**El rail.** El mismo `<aside class="work-rail">` de antes, ahora contando frentes en vez de
proyectos: `D/01`–`D/04`, el título del frente vigente y la barra que se llena con el scroll.
Se sostiene con `position: sticky; top: 112px` — **no** con `ScrollTrigger.pin`. El pin pone
`position: fixed`, que se rompe dentro de un ancestro con `transform`, y el CSS de reveal
aplica justo eso a `.work-stage`. Sticky funciona ahí y además libera solo al terminar la
fila del grid.

GSAP se queda con lo que el CSS no puede: el relleno de la barra va con `scrub` atado 1:1 al
scroll (`ease: 'none'`) y los bloques suben de `y: 64` a `y: 0` ligados a la posición, no a un
temporizador. Ambas cosas corren sólo por encima de 821px y fuera de `prefers-reduced-motion`,
vía `gsap.matchMedia()`.

El lector del rail elige el bloque cuyo centro está más cerca de una línea al 45% del
viewport, en vez de dejar que gane el último en dispararse.

**La tarjeta de GitHub.** El cierre de la sección: fondo tinta, `box-shadow: 16px 16px 0` en
cobalto, marca de GitHub grande, y el conteo de repos con el mensaje de código abierto. En
hover se desplaza 4px y la sombra crece. El conteo vive en `githubProfile.repositories` y es
manual: nada consulta la API de GitHub en tiempo de ejecución.

### 04 — Capacidades · `#capabilities`

**5 categorías** desde `skillCategories`:

| Categoría | Skills |
|---|---|
| Frontend | 6 — React, Next.js, Tailwind CSS, JavaScript, HTML/CSS, Vite |
| Backend & Cloud | 6 — Python, PHP, Node.js, Supabase, Firebase, C/C++ |
| Datos & DevOps | 5 — PostgreSQL, MySQL, SQLite, Docker, Git/GitHub |
| IA & Automatización | 3 — IA generativa, prompt engineering, automatización |
| Sistemas & Hardware | 4 — Linux, Windows, diagnóstico electrónico, mantenimiento |

**Construcción.** Grid de 6 columnas donde cada tarjeta ocupa `span 2`, salvo la cuarta y la
quinta que ocupan `span 3`. Resultado: tres tarjetas en la primera fila, dos anchas en la
segunda. Las divisiones se dibujan con bordes del contenedor y de cada celda, sin `gap`, para
que lea como una tabla técnica. Cada skill es una fila con el nombre a la izquierda y el nivel
en monoespaciada a la derecha.

**Las lecturas se resuelven desde ruido.** Al entrar cada tarjeta, `ScrambleTextPlugin`
revuelve los niveles con `chars: '01'` y los va fijando escalonados: el grid lee como un
instrumento estabilizando mediciones, no como texto que aparece. Corre una sola vez por
tarjeta (`once: true`) y no corre bajo `prefers-reduced-motion`.

---

### 05 — Formación · `#credentials`

| Bloque | Origen | Cantidad |
|---|---|---|
| Estudios | `education` | 2 |
| Certificación | `certifications[0]` | 1 |
| Idiomas | `languages` | 2 |

Estudios: CUCEI · UdeG (Ingeniería en Computación, en curso) y Colegio Unión México
(bachillerato con honores). Certificación: *Complete Web Development Course*, 82.5 horas.
Idiomas: español nativo, inglés B2.

**Construcción.** Grid `1.25fr / 0.75fr`. A la izquierda, lista de estudios con líneas
divisorias. A la derecha, `.credential-card`: una tarjeta cobalto **rotada 1.4°** con
`box-shadow: 16px 16px 0 var(--orange)` que contiene la certificación y, debajo, los idiomas.
La rotación se anula por debajo de 820px.

Sólo se renderiza `certifications[0]`; el array está tipado `as const` y hoy tiene un
único elemento.

---

### 06 — Contacto · `#contact`

| Dato | Origen |
|---|---|
| Correo | `personalInfo.email` |
| Teléfono | `personalInfo.phone` |
| GitHub / LinkedIn / Instagram | `personalInfo.*` |

**Construcción.** Grid `1.1fr / 0.9fr` alineado a `end`, con el `<h2>` en cobalto. La columna
derecha apila el enlace de correo, un botón «Copiar correo» y los enlaces sociales con iconos
de lucide-react.

El botón de copiar usa `navigator.clipboard.writeText`; si falla, cae a `mailto:`. Muestra
confirmación durante 1800 ms y el contenedor tiene `aria-live="polite"` para anunciarla.
El teléfono se limpia con `replace(/\s/g, '')` antes de armar el `tel:`.

---

### Footer

Tres columnas: nombre y ubicación, un botón que alterna el modo blueprint, y «Volver arriba».

---

## 5. Modo blueprint

Un modo de inspección que se activa con la tecla **B**, el botón «Plano B» del header o el
botón del footer. Escribe `data-blueprint="on"` en el `<html>`, lo que dibuja un contorno
punteado sobre cada `.section-shell`, y muestra el `.blueprint-hud` abajo a la derecha con
sección activa, motor de render y estado del canvas WebGL (`LISTO` / `CONTEXTO PERDIDO` /
`NO DISPONIBLE` / `INICIANDO`).

El atajo se ignora si el foco está en un `input`, `textarea`, `select` o `contenteditable`.
`Escape` cierra el menú móvil.

### Las cotas

`components/BlueprintOverlay.tsx` dibuja las medidas acotadas de la sección activa, como en
un plano técnico de verdad: líneas de extensión, el tramo medido con marcas de 45° en las
puntas, y el valor en monoespaciada.

**De dónde salen los números.** No son inventados. El overlay busca dentro de la sección
activa el primer elemento con grid real (`.work-stage`, `.capability-grid`, `.profile-layout`,
`.credentials-layout`, `.contact-grid`, `.timeline > li`, `.hero`) y lee su
`gridTemplateColumns` **ya resuelto por el navegador**, que devuelve píxeles. En proyectos
eso da `190px 1186px`; la cota general da `1440px` y la altura `1576px`. Son las medidas
reales del layout.

Si el grid tiene más de 4 columnas se dibujan las marcas pero no las etiquetas por columna:
a partir de ahí no entran y sólo queda la cota general.

**Dos grupos, dos comportamientos.** Las cotas de ancho se fijan dentro del viewport, porque
si siguieran al elemento se irían de pantalla apenas entrás en una sección alta. La cota de
altura sí sigue al elemento libremente: fijarla dejaría de describirlo. La geometría se mide
una sola vez; el scroll sólo desplaza los grupos.

Las líneas entran con `drawSVG` escalonado y las etiquetas después. Bajo
`prefers-reduced-motion` se dibujan de golpe. Por debajo de 820px no se dibujan.

---

## 6. Responsive

| Breakpoint | Cambios principales |
|---|---|
| `1100px` | `--page` a `100vw - 40px`; se oculta el texto del logo; el retrato encoge. |
| `820px` | Menú hamburguesa a pantalla completa; casi todos los grids colapsan a una columna; se oculta el rail de proyectos; la tarjeta de credencial pierde la rotación. |
| `520px` | Ajustes finos de tipografía y del sumario del archivo. |

`820px` es el mismo valor que `COMPACT_BREAKPOINT_PX`, que usan tanto el plóter como el
`matchMedia` de GSAP en la sección de proyectos. Es un único número compartido a propósito.

---

## 7. Accesibilidad

- Enlace de salto al contenido, visible sólo con foco.
- HTML semántico: `<header>`, `<main>`, `<section aria-labelledby>`, `<ol>`, `<figure>`.
- `aria-current="location"` en el enlace de navegación activo.
- `aria-expanded` / `aria-pressed` en los botones de menú y blueprint.
- Todo lo decorativo lleva `aria-hidden` (índices de sección, rail de proyectos, HUD del hero).
- `:focus-visible` con contorno naranja de 3px.
- `@media (prefers-reduced-motion: reduce)` anula transiciones, transforms de tarjetas y el
  scrub de GSAP; la barra del rail se oculta en lugar de quedarse vacía.
- `@media (forced-colors: active)` refuerza bordes en tarjetas.

---

## 8. El plóter

`components/SystemPlotter.tsx` es la capa de fondo que sustituyó a la escena Three.js.

**Qué dibuja.** Una banda fija de 118px en el borde derecho con cuatro elementos:

| Elemento | Qué es |
|---|---|
| `.plot-guide` | La ruta planeada, punteada y tenue. Siempre visible. |
| `.plot-ink` | El mismo trazo en naranja, revelado con `drawSVG` según el progreso de scroll. |
| `.plot-pen` | La pluma: una cruz con punto naranja que recorre la ruta con `MotionPath`. |
| `.plot-tick` | Siete marcas, una por sección. La de la sección activa se pone cobalto. |

La ruta se genera en JS (`buildRoute`) a partir de la altura del viewport: baja recta, se
desvía al lado en la tercera parada y vuelve a la espina en la quinta, siempre con
diagonales de 45° exactos. Se regenera al redimensionar, con 200 ms de rebote.

**Cómo se mueve.** No crea ningún ScrollTrigger propio. Construye un timeline **pausado**
con las dos animaciones (`drawSVG` y `motionPath`) y un loop en `gsap.ticker` que interpola
`timeline.progress()` hacia `scrollState.progress`. Es decir: sigue habiendo **un solo
lector de scroll** en toda la app.

Dos detalles que costaron encontrarse:

- El tween de `motionPath` necesita `immediateRender: true`. Sin eso la pluma se queda en el
  origen del SVG hasta el primer scroll, porque un `.to()` no renderiza su estado inicial.
- `scrollState.velocity` sólo se actualiza mientras hay scroll, así que nunca vuelve a cero
  por sí sola. El loop guarda una copia local y la amortigua (`velocity *= 0.9`); si no, la
  pluma se quedaría inclinada para siempre al frenar.

El loop se detiene solo cuando la escena está en reposo y con la pestaña oculta.

**Estados.** Bajo `prefers-reduced-motion` se dibuja el trazo completo, se esconde la pluma y
no arranca el loop. En modo blueprint todo pasa a cobalto y la guía deja de ser punteada.
Por debajo de 820px la banda se oculta entera.

---

> **Por qué no hay Flip acá.** La idea original era animar el cambio con `Flip.getState()`
> → toggle → `Flip.from()`. Al implementarlo quedó claro que el modo blueprint **no cambia el
> layout**: sólo cambia colores, la retícula y añade el overlay. Flip anima entre dos estados
> de layout, así que no tenía nada que animar. Se descartó en lugar de inventar un cambio de
> layout para justificar la herramienta.

---

## 9. Cabos sueltos

Cosas que están en el repo pero no conectadas, o pendientes de reemplazar:

1. **`public/LeoCV.pdf` no se usa.** El archivo existe pero ningún componente lo enlaza. No
   hay botón de descarga de CV en la página.
2. **GA4 sin configurar.** `index.html` tiene el snippet con el placeholder `G-XXXXXXXXXX`
   sin reemplazar, así que no se está midiendo nada.
3. **`Archivo Black` no se carga.** `index.css` la usa en `.portrait-fallback strong`, pero
   el `<link>` de Google Fonts sólo trae Bricolage Grotesque e IBM Plex Mono. Cae al
   `sans-serif` del sistema. Sólo se nota si falla el retrato.
4. **El README describe otro proyecto.** Ver la nota en la sección 1.
5. El plóter se oculta por debajo de 820px. En móvil no hay banda lateral que valga la pena.
6. **`projects` en `data.ts` ya no se renderiza.** Al cambiar `#work` por frentes de trabajo
   más GitHub, los 19 proyectos, las reglas CSS de `.project-grid` / `.project-card` /
   `.archive-list` y las 9 imágenes de `public/images/projects/` quedaron sin uso. Se
   conservan por si se quiere volver atrás; borrarlos es una decisión pendiente.
7. **La mayoría de los repos no tienen descripción ni README.** Como la sección de trabajo
   ahora manda a GitHub, esa es la primera impresión: una lista de nombres como `somehow`,
   `healty-card` o `xignis` sin explicación. Poner una descripción de una línea en cada repo
   vale más que cualquier animación de este documento.
