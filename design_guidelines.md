# Design Guidelines: Mood-Based Walking Route Generator

## Design Approach
**Reference-Based Approach** drawing inspiration from wellness applications like Calm, Headspace, and Apple Health, combined with the clean data presentation of Linear. This creates a supportive, trustworthy experience that reduces cognitive load while guiding users through emotional wellness.

**Core Principle:** Create a serene, uncluttered interface that feels like a supportive companion, not a demanding app.

## Typography
- **Primary Font:** Inter or SF Pro Display (Google Fonts) - clean, highly legible
- **Headings:** 
  - H1: text-4xl md:text-5xl, font-semibold, tracking-tight
  - H2: text-2xl md:text-3xl, font-medium
  - H3: text-xl, font-medium
- **Body Text:** text-base md:text-lg, font-normal, leading-relaxed for comfort
- **Labels/UI:** text-sm, font-medium, uppercase tracking-wide for clarity
- **Micro-text:** text-xs for secondary information

## Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 24 (p-2, m-4, gap-6, etc.)
- Generous breathing room throughout (py-12 to py-24 for sections)
- Single-column centered layouts with max-w-4xl for main content
- max-w-prose for text-heavy sections (route descriptions)
- Full-width map visualization with subtle container padding

## Core Components

### 1. Hero Section (Minimal, Purposeful)
- Soft gradient background (NOT an image - keep it calming)
- Centered layout with max-w-3xl
- Large heading explaining the purpose: "Find Your Peace, One Step at a Time"
- Subtitle with emotional benefit statement
- Single prominent CTA: "Start Your Journey"
- Height: h-screen md:h-[85vh] for impact without feeling trapped

### 2. Mood Input Interface
**Layout:** Card-based form with generous spacing (p-8 md:p-12)
- **Current Mood Selector:** 
  - Horizontal emoji/icon grid (5-7 mood states)
  - Large touch targets (w-16 h-16 md:w-20 h-20)
  - Rounded-full elements with subtle hover lift
  - Active state: ring-4 treatment
- **Desired State:** Similar visual pattern, positioned below
- **Activity Level:** Segmented control (3 options: Low/Medium/High) with pill-shaped buttons
- **Time Available:** Radio buttons styled as large, tappable cards (grid-cols-2 md:grid-cols-4)
  - Each card: p-6, rounded-2xl, text-center
  - Display time + brief description (e.g., "15 min - Quick Reset")
- **Location Input:** Single input field with geolocation button (absolute right-3)
- Form spacing: space-y-8 between sections, space-y-4 within sections

### 3. Route Results Display
**Structure:** Two-column on desktop (md:grid-cols-2), single on mobile
- **Left Column: Route Details**
  - Summary card (p-6, rounded-xl, space-y-4)
  - Step-by-step waypoints (numbered list with custom markers)
  - Each waypoint: pl-8, relative positioning for custom number circles
  - Micro-recommendations as expandable accordions (not all visible at once)
- **Right Column: Map Visualization**
  - Sticky positioning (md:sticky top-24)
  - Interactive map with route polyline
  - Point markers with subtle pulse animation (only on map points)
  - Height: min-h-[500px] md:min-h-screen for proper viewing

### 4. Waypoint Cards
- Stacked vertically with connecting line visual (border-l-2 on container)
- Each card: ml-6, p-4, rounded-lg, space-y-2
- Icon + Title + Description structure
- "Why this helps" micro-explanation in smaller text
- Suggested action as a pill button (inline-flex, rounded-full, px-4, py-2)

### 5. Emotional Benefit Display
- Prominent callout card near route summary
- Large icon/illustration (size-12 md:size-16)
- Benefit statement in text-lg md:text-xl
- Expected time to feel effect in smaller text

### 6. Navigation
- Minimal top nav: Logo left, "New Route" button right
- Sticky positioning (sticky top-0, z-50)
- py-4, subtle bottom border
- Container max-w-7xl mx-auto px-4

### 7. Action Buttons
Primary CTA: px-8 py-4, rounded-full, text-lg, font-semibold, shadow-lg
Secondary: px-6 py-3, rounded-full, border-2, font-medium
Micro-actions: px-4 py-2, rounded-lg, text-sm

## Component Library
- **Form Inputs:** rounded-xl, px-4 py-3, border-2, focus:ring-4 treatment
- **Cards:** rounded-2xl, p-6 md:p-8, shadow-sm, hover:shadow-md transition
- **Dividers:** my-8, opacity-20 for subtle separation
- **Icons:** Heroicons (outline style for UI, solid for emphasis) - size-5 for inline, size-6 for standalone

## Accessibility Standards
- All interactive elements: min-h-12 touch targets
- Focus visible states on all inputs/buttons
- ARIA labels for mood selectors
- High contrast text (minimum WCAG AA)
- Screen reader announcements for route generation
- Keyboard navigation throughout

## Animation Strategy
**Minimal, Purposeful Only:**
- Gentle fade-in for route results (opacity + translateY)
- Micro-pulse on map markers (scale 1 to 1.1, slow)
- Smooth scroll to sections
- NO scroll-triggered animations, parallax, or decorative motion
- Form validation: subtle shake on error

## Images
**NO hero image** - use soft gradient instead for calm feeling
**Route waypoint images:** Optional small thumbnails (w-20 h-20, rounded-lg) showing the location type (park, café, etc.) - only if they enhance understanding
**Mood state icons:** Use icon library, not images

## Responsive Behavior
- Mobile: Single column, stack all content, full-width cards
- Tablet: Begin two-column layouts for forms, sticky map appears
- Desktop: Full layout with generous margins, max-w-7xl containers

**Critical UX Note:** Entire experience should feel like a gentle guide, not a demanding interface. Every interaction should reduce stress, not add to it.