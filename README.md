# Manuel Ferrario Story Site

Single-page storytelling portfolio for Manuel Ferrario, built with Next.js 14 App Router + TypeScript.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase client/auth libraries (kept installed, hidden in home UI)

## Current Product Direction
The home route (`/`) is now a presentation-grade scroll story with 4 full-screen sections:
1. Home
2. San Marcos
3. Di Tella
4. Work Experience (3 cards)

It uses full-bleed layout, scroll snap, right-side progress dots, subtle motion, and a warm orange/purple design system.

## File Tree (Story Pivot)
```txt
src/
  app/
    globals.css
    page.tsx
  components/
    story/
      ExperienceCard.tsx
      ProgressNav.tsx
      Section.tsx
      StoryLanding.tsx
  data/
    sections.ts
```

## Design System
Defined in `src/app/globals.css` using CSS variables:
- Accent colors: `--accent-orange`, `--accent-purple`
- Neutral palette: `--neutral-*`
- Radius scale: `--radius-md`, `--radius-lg`, `--radius-xl`
- Shadow scale: `--shadow-soft`, `--shadow-hover`
- Section gradients: `--panel-grad-home`, `--panel-grad-school`, `--panel-grad-uni`, `--panel-grad-work`
- Global subtle grain/noise overlay via inline SVG background image

## Run Locally
1. Install dependencies:
```bash
npm install
```
2. Start dev server:
```bash
npm run dev
```
3. Open [http://localhost:3000](http://localhost:3000)

## UX Checklist
- Full-page sections snap while scrolling (desktop/mobile).
- Progress dots on right jump to section and track active section.
- First section shows a subtle scroll hint that fades after user scrolls.
- Work section displays 3 consistent experience cards.
- Animations are smooth and reduced if OS uses reduced motion.
- Home page shows no auth/recruiter UI.

## Supabase Note
Supabase setup remains in project (`src/lib/supabase.ts` and related files) for future recruiter/auth flows, but home UI intentionally hides auth actions for this phase.

## Deploy to Vercel
1. Push repository to GitHub.
2. Import the repo into Vercel.
3. Add environment variables in Vercel Project Settings:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
```
4. Deploy.
5. If you use auth callbacks later, add your Vercel domain callback URL in Supabase Auth settings.
