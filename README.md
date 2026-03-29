# DragonBall React App

Aplicación web de ejemplo construida con React y Vite para explorar personajes, planetas y transformaciones del universo Dragon Ball.

## Qué hace este proyecto

- Lista personajes de Dragon Ball con paginación.
- Permite buscar personajes por nombre.
- Muestra detalles de cada personaje.
- Presenta planetas y sus detalles.
- Muestra transformaciones asociadas a los personajes.
- Incluye manejo de estado con Redux Toolkit.

## Estructura principal

- `src/main.jsx` - Punto de entrada de la aplicación.
- `src/App.jsx` - Componente raíz con rutas y estructura general.
- `src/pages/` - Vistas principales:
  - `Landing.jsx`
  - `Home.jsx`
  - `Characters.jsx`
  - `CharacterDetail.jsx`
  - `Planets.jsx`
  - `PlanetDetail.jsx`
  - `Transformations.jsx`
- `src/components/` - Componentes reutilizables:
  - `CharacterCard.jsx`
  - `PlanetCard.jsx`
  - `TransformationCard.jsx`
  - `SearchBar.jsx`
  - `FilterBar.jsx`
  - `Pagination.jsx`
  - `Loading.jsx`
  - `Error.jsx`
  - `ImageModal.jsx`
- `src/store/` - Configuración de Redux y slices:
  - `charactersSlice.js`
  - `characterDetailSlice.js`
  - `planetsSlice.js`
  - `planetDetailSlice.js`
  - `transformationsSlice.js`
- `src/api/dragonballApi.js` - Lógica de llamadas a la API.

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir la URL que indica Vite, generalmente `http://localhost:5173`.

## Producción

Para generar una versión de producción:

```bash
npm run build
```

Para previsualizar el build:

```bash
npm run preview
```

## Dependencias clave

- `react`
- `react-dom`
- `react-router-dom`
- `@reduxjs/toolkit`
- `react-redux`
- `vite`

## Notas

- El proyecto está pensado como una demo de consumo de datos y navegación con React + Redux.
- Puedes ampliar la aplicación añadiendo autenticación, filtros avanzados o detalles adicionales de personajes y planetas.
