# DragonBall - Interactive Universe Guide

## 1. Project Overview

**Purpose**: Guide website for the Dragon Ball universe - fans can explore characters, planets, and transformations from the anime series.

**Type**: Single Page Application (SPA) built with React 19 + Vite

**API**: [dragonball-api.com](https://dragonball-api.com/api)

---

## 2. Features

| Feature | Description |
|---------|-------------|
| Character Listing | Paginated list with search and filters |
| Character Details | Full info + transformations |
| Planet Listing | Paginated list with search |
| Planet Details | Full planet information |
| Transformation Listing | Paginated list of transformation forms |
| Search | Real-time search across entities |
| Filters | Filter by affiliation, status |
| Pagination | Page navigation with prev/next |
| Image Modal | Full-screen image viewer |
| Loading States | Skeleton/indicator during fetch |
| Error States | User-friendly error messages |

---

## 3. User Personas

| Persona | Description | Use Case |
|---------|-------------|----------|
| Fan Casual | Wants to quickly look up a character | Search by name |
| Fan Devoted | Explores all content extensively | Browse all pages |
| New Viewer | Learns about the series | Landing → Home exploration |

---

## 4. Core Flows

### Flow 1: Landing → Explore
```
Landing → Click "Explorar" → Home → Navigate to any section
```

### Flow 2: Character Search
```
Characters → Type in SearchBar → Filtered results → Click card → CharacterDetail
```

### Flow 3: Planet Exploration
```
Planets → Browse paginated → Click card → PlanetDetail → Back to list
```

### Flow 4: Transformation Lookup
```
Transformations → Browse → Click card → View details
```

---

## 5. UI/UX Specifications

### Layout Structure
- **Header**: Logo + Navigation links (sticky)
- **Main**: Page content area
- **Footer**: Copyright + links

### Responsive Breakpoints
| Breakpoint | Width | Columns |
|------------|-------|---------|
| Mobile | < 768px | 1 column |
| Tablet | 768px-1023px | 2 columns |
| Desktop | ≥ 1024px | 3 columns |

### Color Palette (Bulma-based)
- Primary: `#ffe83d` (Bulma yellow)
- Dark: `#1a1a2e`
- Light: `#f5f5f5`
- Text: `#363636`

### Components

| Component | States | Behavior |
|-----------|--------|----------|
| CharacterCard | default, hover, loading | Click → navigate to detail |
| PlanetCard | default, hover | Click → navigate to detail |
| TransformationCard | default, hover | Shows info on hover |
| SearchBar | empty, typing, results | Debounced search |
| FilterBar | active, inactive | Checkbox filters |
| Pagination | default, active, disabled | Page navigation |
| Loading | spinning | Shows during fetch |
| Error | with message | Retry button |
| ImageModal | open, closed | Click outside to close |

---

## 6. Functionality

### Data Fetching
- All data from `dragonball-api.com/api`
- Fetch on mount + on pagination click
- Cache in Redux store

### State Management (Redux Toolkit)
```
store/
├── index.js          # Store configuration
└── slices/
    ├── charactersSlice.js
    ├── characterDetailSlice.js
    ├── planetsSlice.js
    ├── planetDetailSlice.js
    └── transformationsSlice.js
```

### State Shape (per slice)
```javascript
{
  items: [],
  detail: null,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null
}
```

### Routing (React Router DOM v7)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Welcome page |
| `/home` | Home | Main dashboard |
| `/characters` | Characters | Character list |
| `/characters/:id` | CharacterDetail | Single character |
| `/planets` | Planets | Planet list |
| `/planets/:id` | PlanetDetail | Single planet |
| `/transformations` | Transformations | Transformation list |

---

## 7. Acceptance Criteria

### AC1: Application Loads
- [ ] App builds without errors
- [ ] Dev server starts on `npm run dev`
- [ ] Landing page renders

### AC2: Navigation Works
- [ ] All routes are accessible
- [ ] Back button works
- [ ] Deep linking works

### AC3: Characters Feature
- [ ] List loads with pagination
- [ ] Search filters the list
- [ ] Click card shows detail
- [ ] Detail shows all character info

### AC4: Planets Feature
- [ ] List loads with pagination
- [ ] Click card shows detail
- [ ] Detail shows planet info

### AC5: Transformations Feature
- [ ] List loads with pagination
- [ ] Shows transformation details

### AC6: Error Handling
- [ ] API errors show user message
- [ ] Loading states are visible
- [ ]Retry mechanisms work

### AC7: Responsive Design
- [ ] Mobile: single column
- [ ] Tablet: 2 columns
- [ ] Desktop: 3 columns

---

## 8. Tech Stack

| Category | Technology |
|----------|-------------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | JavaScript (JSX) |
| State | Redux Toolkit + React-Redux |
| Routing | React Router DOM 7 |
| CSS | Bulma |
| API | dragonball-api.com |

---

## 9. Project Structure

```
DragonBall/
├── public/
│   └── assets/
├── src/
│   ├── api/
│   │   └── dragonballApi.js
│   ├── components/
│   │   ├── CharacterCard.jsx
│   │   ├── PlanetCard.jsx
│   │   ├── TransformationCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── Loading.jsx
│   │   ├── Error.jsx
│   │   └── ImageModal.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Home.jsx
│   │   ├── Characters.jsx
│   │   ├── CharacterDetail.jsx
│   │   ├── Planets.jsx
│   │   ├── PlanetDetail.jsx
│   │   └── Transformations.jsx
│   ├── store/
│   │   ├── index.js
│   │   └── slices/
│   │       ├── charactersSlice.js
│   │       ├── characterDetailSlice.js
│   │       ├── planetsSlice.js
│   │       ├── planetDetailSlice.js
│   │       └── transformationsSlice.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── SPEC.md
```