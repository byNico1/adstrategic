# Niche Site Template

Config-driven, multilingual landing page template for ADDSTRATEGIC industry niches (electricians, plumbers, HVAC, roofers, etc.). One shared component set — a new niche is content + config, not new UI code.

## Live example

Electrician niche (fully wired):

- English: `/en/niches/electrician` (or `/niches/electrician` — locale middleware rewrites)
- Spanish: `/es/niches/electrician`

## Architecture

```
src/
  config/niches/           ← per-niche site config (phone, images, stats, nav, reviews metadata)
  dictionary/niches/       ← per-niche locale JSON (all copy)
  styles/niche-themes.css  ← per-niche semantic color overrides (shadcn CSS vars)
  components/NicheTemplate/← shared sections (do not fork per niche)
  app/[lang]/(niches)/niches/[niche]/  ← route that renders a niche
```

Theme colors use shadcn’s CSS-variable model: each niche gets a `.theme-*` class that overrides `--primary`, `--brand`, `--ring`, etc. Components keep using `bg-primary` / `text-brand` — no niche-specific Tailwind tokens.

## How to spin up a new niche

### 1. Add theme tokens

Edit [`src/styles/niche-themes.css`](src/styles/niche-themes.css). Copy `.theme-electrician` and rename (e.g. `.theme-plumber`). Override only the semantic vars that change:

```css
.theme-plumber {
  --primary: 217 70% 50%;
  --primary-foreground: 0 0% 100%;
  --brand: #3b82f6;
  --accent: 217 25% 18%;
  --accent-foreground: 0 0% 100%;
  --ring: 217 70% 50%;
}
```

HSL tokens (`--primary`, `--ring`, …) must be space-separated components **without** `hsl()`. `--brand` is a hex/CSS color (matches existing ADDSTRATEGIC usage).

### 2. Add config

Copy [`src/config/niches/electrician.ts`](src/config/niches/electrician.ts) → `plumber.ts`. Update:

- `slug`, `industryName`, `themeClass`
- Phone, logo, hero / split / explainer images + alts
- Trust badges, stat values, nav / services / footer links
- Reviews metadata (`name`, `rating`, `role`, `textIndex`)

Register it in [`src/config/niches/index.ts`](src/config/niches/index.ts):

```ts
import { plumberConfig } from "./plumber"

const nicheRegistry = {
  [electricianConfig.slug]: electricianConfig,
  [plumberConfig.slug]: plumberConfig,
}
```

### 3. Add locale JSON

Create:

- `src/dictionary/niches/plumber/en.json`
- `src/dictionary/niches/plumber/es.json`

Copy the electrician files and replace all copy. Keep the same key structure (`hero.h1`, `whySection.cards`, etc.).

Register loaders in [`src/get-niche-dictionary.ts`](src/get-niche-dictionary.ts).

### 4. Add images

Put niche-specific assets under:

```
public/assets/niches/plumber/
```

Point config `*Src` / badge paths at those files. Always set meaningful `alt` text in config.

### 5. Done

Visit `/niches/plumber`. No component or Tailwind config changes required.

---

## What NOT to touch

| Leave alone | Why |
| --- | --- |
| `src/components/NicheTemplate/*` | Shared layout — edit only for template-wide UX changes |
| `src/styles/globals.css` base `:root` / `.dark` tokens | Main ADDSTRATEGIC brand; niche overrides live in `niche-themes.css` |
| `tailwind.config.js` color map | Already maps semantic vars; do not add `--niche-*` utilities |
| Main site under `src/app/[lang]/(main)/` | Unrelated marketing site |

## Component inventory

| Component | Role |
| --- | --- |
| `TopBar` | Sticky phone CTA + tagline |
| `NicheHeader` | Logo, nav, Services dropdown, Book a Call, Contact CTA, mobile menu |
| `NicheHero` | Trust badges, H1, 3-stat proof bar, CTA |
| `SplitFeature` | Image + copy + bullets + CTA (left/right; stacks on mobile) |
| `BenefitGrid` | “Why [industry] needs…” / Key Factors 3-card grids |
| `CtaBanner` | Mid-page conversion band (heading + body + CTA) |
| `NicheTestimonials` | Carousel with stars, role tag, arrows, dot pagination |
| `NicheFooter` | Links, phone, social, legal |
| `AccessibilityWidget` | Floating a11y button (focus-outline stub; swap for a real tool later) |

## i18n notes

- Locales match the main site (`en`, `es`) via [`src/i18n-config.ts`](src/i18n-config.ts).
- All user-facing strings come from niche locale JSON — never hardcode copy in components.
- Stat labels and review bodies are arrays in the dictionary; config holds values / indices so numbers stay language-agnostic.
