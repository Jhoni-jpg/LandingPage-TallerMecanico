🚀 Proyecto Landing Page - Taller Mecánico
Este proyecto es una landing page moderna desarrollada con Astro y React, combinando el rendimiento de Astro con la interactividad de React.

🛠️ Tecnologías Utilizadas
Astro - Framework web para sitios rápidos

React - Biblioteca para componentes interactivos

TypeScript - Tipado estático opcional

Tailwind CSS - Framework de CSS utility-first (si está configurado)

📦 Instalación de Dependencias
Prerrequisitos
Node.js versión 16 o superior

npm o yarn o pnpm

1. Clonar el repositorio
bash
git clone https://github.com/Jhoni-jpg/LandingPage-TallerMecanico.git
cd LandingPage-TallerMecanico
2. Instalar dependencias
bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install
🚀 Inicialización del Proyecto
Desarrollo
Para ejecutar el servidor de desarrollo:

bash
# Con npm
npm run dev

# Con yarn
yarn dev

# Con pnpm
pnpm dev
El sitio estará disponible en: http://localhost:4321

Construcción para Producción
Para generar la versión de producción:

bash
# Build del proyecto
npm run build

# Preview de la build
npm run preview
📁 Estructura del Proyecto
text
LandingPage-TallerMecanico/
├── src/
│   ├── components/     # Componentes React y Astro
│   │   ├── react/     # Componentes React interactivos
│   │   └── astro/     # Componentes Astro estáticos
│   ├── layouts/       # Layouts de las páginas
│   ├── pages/         # Rutas y páginas
│   └── styles/        # Estilos globales
├── public/            # Assets estáticos
├── astro.config.mjs   # Configuración de Astro
├── package.json       # Dependencias y scripts
└── tsconfig.json     # Configuración TypeScript
⚛️ Uso de React en Astro
Componentes React
Los componentes React se ubican en src/components/react/ y pueden ser utilizados en páginas Astro:

astro
---
// Ejemplo en una página .astro
import ReactComponent from '../components/react/MiComponente';
---

<html>
  <body>
    <!-- Componente React interactivo -->
    <ReactComponent client:load />
  </body>
</html>
Directivas de Hidratación
client:load - Carga inmediata (recomendado)

client:idle - Carga cuando el navegador está inactivo

client:visible - Carga cuando el elemento es visible

🎨 Estilos
Tailwind CSS (si está configurado)
bash
# Si necesitas instalar Tailwind
npm install -D @astrojs/tailwind
CSS Personalizado
Los estilos globales se encuentran en src/styles/

📱 Funcionalidades Principales
✅ Diseño responsive

✅ Componentes React interactivos

✅ Optimización de rendimiento con Astro

✅ SEO optimizado

✅ Carga rápida

🚀 Despliegue
GitHub Pages
bash
npm run build
# La carpeta `dist` está lista para desplegar
Netlify/Vercel
Conecta tu repositorio y despliega automáticamente.

📝 Scripts Disponibles
json
{
  "dev": "astro dev",
  "start": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro"
}
🔧 Configuración Adicional
Variables de Entorno
Crea un archivo .env en la raíz:

env
PUBLIC_API_URL=tu_url_api
TypeScript
El proyecto incluye TypeScript configurado. Para tipos de Astro:

bash
npm install @astrojs/check
🤝 Contribución
Fork el proyecto

Crea una rama feature (git checkout -b feature/AmazingFeature)

Commit tus cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abre un Pull Request

📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

👨‍💻 Autor
Jhoni - GitHub
