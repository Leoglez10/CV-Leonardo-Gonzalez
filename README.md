# Portafolio de Leonardo González

Portafolio web personal desarrollado con React + TypeScript + Vite, enfocado en mostrar perfil profesional, proyectos, habilidades, certificaciones y testimonios con una experiencia visual moderna y responsive.

## Demo

- Repositorio: https://github.com/Leoglez10/CV-Leonardo-Gonzalez
- Entorno local: `http://localhost:5173`

## Stack tecnológico

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Framer Motion / GSAP (animaciones)
- Lucide React (iconografía)

## Características principales

- Secciones de landing: Hero, Perfil, Contadores, Proyectos, Skills, Certificaciones, Testimonios y CTA final.
- Navegación por anclas con scroll suave.
- Diseño responsive (móvil, tablet, desktop).
- Componentes visuales reutilizables en `components/ui`.
- Menú de accesibilidad y cursor interactivo personalizado.
- Botón flotante de “volver arriba”.

## Estructura del proyecto

```txt
.
├── components/          # Secciones principales y componentes UI
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades compartidas
├── public/images/       # Imágenes estáticas (proyectos)
├── App.tsx              # Composición principal de la página
├── data.ts              # Datos de perfil, proyectos, skills, etc.
├── index.css            # Tema y estilos globales
└── package.json         # Scripts y dependencias
```

## Requisitos

- Node.js 18+
- npm 9+

## Instalación y ejecución local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Leoglez10/CV-Leonardo-Gonzalez.git
   cd CV-Leonardo-Gonzalez
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre en tu navegador:

   ```txt
   http://localhost:5173
   ```

## Scripts disponibles

- `npm run dev`: inicia el proyecto en modo desarrollo.
- `npm run build`: genera build de producción en `dist/`.
- `npm run preview`: sirve localmente la build de producción.

## Personalización rápida

Si quieres adaptar el portafolio sin tocar mucha lógica:

- Edita `data.ts` para actualizar:
  - información personal
  - proyectos
  - habilidades
  - certificaciones
  - testimonios
- Cambia imágenes en `public/images/projects/`.
- Ajusta colores y tokens en `index.css` y `tailwind.config.js`.

## Build de producción

```bash
npm run build
npm run preview
```

## Notas

- El proyecto no requiere backend para funcionar como portafolio estático.
- Existe compatibilidad de variables en `vite.config.ts`, pero para el flujo actual del portafolio no necesitas configurar API keys.

## Próximas mejoras sugeridas

- Añadir tests de componentes críticos.
- Optimizar imágenes con generación de formatos modernos.
- Configurar despliegue automático con GitHub Actions.

## Autor

Leonardo González  
GitHub: https://github.com/Leoglez10
