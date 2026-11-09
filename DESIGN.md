---
name: "ОРБИТА — ВЕБ СТУДИЯ"
description: "Dark editorial studio with red lacquer, chrome forms, and a long scroll."
colors:
  bg: "#111012"
  text: "#f5eee9"
  muted: "#bbaeb4"
  accent: "#df2432"
  line: "#413338"
  surface: "#271e22"
  scene-bg: "#0b0b0d"
  contact-bg: "#b91829"
  focus: "#ff7b89"
  lacquer: "#d9202e"
  vermilion: "#ff402f"
  chrome: "#a4a0a0"
  wine: "#460c15"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(3.4rem, 6.6vw, 6rem)"
    fontWeight: 650
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(3rem, 6.6vw, 6rem)"
    fontWeight: 550
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 650
    letterSpacing: "0.06em"
rounded:
  study-mobile: "12px"
  study: "16px"
  planet-mobile: "20px"
  planet: "26px"
  control: "30px"
  choice: "50px"
  circle: "50%"
spacing:
  gutter: "clamp(1.25rem, 5vw, 6rem)"
  compact: "0.75rem"
  inline: "1rem"
  cluster: "1.5rem"
  row: "2rem"
  group: "3rem"
  section: "10rem"
  section-end: "12rem"
components:
  button-contact:
    backgroundColor: "{colors.accent}"
    textColor: "#fff"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.15rem"
  button-menu:
    backgroundColor: "#242225"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.15rem"
  text-link:
    textColor: "{colors.text}"
  navigation-panel:
    backgroundColor: "#201a1c"
    textColor: "{colors.text}"
    rounded: "{rounded.study}"
    padding: "1.5rem 2rem"
  planet-choice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.choice}"
    padding: "1rem 1.5rem"
  planet-choice-selected:
    backgroundColor: "{colors.accent}"
    textColor: "#fff"
    rounded: "{rounded.choice}"
  chapter-step:
    backgroundColor: "#21171bd9"
    textColor: "#f4e9ec"
    rounded: "{rounded.circle}"
  scene-control:
    backgroundColor: "#171215ed"
    textColor: "#f8f0eb"
    rounded: "{rounded.control}"
    padding: "0.65rem 0.9rem"
---

# Design System: ОРБИТА — ВЕБ СТУДИЯ

## Overview

**Creative North Star: "The Lacquer Orbit"**

A dark editorial web studio: oversized Russian typography, generous pauses, and abstract red lacquer and chrome forms. The visual reference is the immersive, long-scroll character of lusion.co; the implementation uses its own orbital mark, geometry, copy, and composition.

The scene is the primary visual material. Compact controls and quiet supporting text frame it, while the red contact field gives the scroll a clear destination. ОРБИТА remains the brand; ВЕБ СТУДИЯ is the header descriptor. Earth, Mars, and Saturn remain an interactive atlas within this world.

**Key Characteristics:**

- Near-black stages, warm text, and a single red UI accent.
- Large editorial headings with small, precise controls.
- Real-time lacquer and chrome geometry with a static poster alternative.
- Asymmetric, spacious sections that collapse into a clear mobile sequence.

This is a source-derived record of the current implementation. It does not certify rendered appearance or browser interaction testing.

## Colors

The palette combines warm near-black surfaces, ivory text, and saturated red; chrome is a material in the artwork rather than a second UI accent. Frontmatter is the normative palette.

### Primary

- **Signal Red** (accent): primary contact actions, selected planet, current chapter, progress, and selected text.
- **Contact Red** (contact-bg): the large closing contact field.
- **Lacquer / Vermilion / Wine** (lacquer, vermilion, wine): the recurring red materials in the real-time scene.

### Neutral

- **Studio Black** (bg): document canvas.
- **Stage Black** (scene-bg): uninterrupted scene and experiment backgrounds.
- **Warm Ivory** (text): primary reading and navigation.
- **Muted Rose Grey** (muted): body copy, captions, and metadata.
- **Burgundy Charcoal** (surface): unselected atlas controls.
- **Warm Divider** (line): process rows, facts, and footer separation.
- **Chrome Grey** (chrome): reflective scene objects.
- **Focus Rose** (focus): keyboard outline, distinct from selection.

**The Material Rule.** Use red for primary actions, selection, and the scene material; retain warm neutrals for reading and structure.

## Typography

**Display and body font:** local variable Manrope, with a sans-serif fallback. The file public/assets/fonts/Manrope-Variable.ttf is loaded by next/font/local through --font-manrope and --font-sans.

One family spans strong headlines and restrained metadata. Large text has tight negative tracking; paragraph copy uses generous leading. There is no separate mono face or mathematical scale ratio.

- **Display:** frontmatter display role; hero headings use a short measure (13–15ch). Below 600px the size becomes clamp(2.7rem, 10.4vw, 4rem) and the measure is 12ch.
- **Headline:** frontmatter headline role for studio, experiments, and process; below 700px these use clamp(2.5rem, 9vw, 4.4rem).
- **Title:** study captions use the title role. Process titles are fluid (clamp(1.8rem, 3vw, 3rem)).
- **Body:** studio paragraphs use the body role, capped at 48ch. Other descriptions use 0.85–0.95rem with 1.65–1.8 leading.
- **Label:** compact header descriptors and controls. Captions can be smaller. Uppercase is reserved for short metadata and controls.
- **Atlas:** its retained heading uses weight 400, leading 0.96, and clamp(3rem, 6.2vw, 6rem); detail titles also use weight 400.

**The Scale Rule.** Let headlines supply emphasis through size and tight tracking; keep supporting text quieter and comfortably spaced.

## Layout

The shared container is centered and capped at 1680px, with the fluid gutter in frontmatter. Large sections commonly use 10rem top and 12rem bottom space. Studio and process pair unequal columns with an 8% gap; process rows use number, title, and description columns with thin dividers.

The header has three columns: orbital brand at left, ВЕБ СТУДИЯ centered, contact and menu at right. Below 900px it becomes two columns, hides the center descriptor, and makes contact an icon action. Its height changes from 110px to 94px, then 88px below 480px.

The hero fills at least max(790px, calc(100svh - 110px)). Experiment stages are tall (76svh, 520–900px) with captions below; the second study is offset to the right at 82% width. Below 1000px it becomes 90%; below 700px it returns to full width and captions stack.

The journey spans 380svh around a sticky 100svh scene (minimum 620px); below 800px it spans 340svh. Scroll moves the composition through cluster, orbit, and helix chapters. Reduced motion makes the journey flow normally and exposes all three chapter texts below a static stage.

The atlas retains three equal-width selection controls and a two-column image/detail panel (1.15fr / 1fr). Below 700px the panel stacks; selection remains three columns with smaller padding. Most section headers, studio content, process copy, and footer switch to a single-column reading order around 700px. These are implemented breakpoints, not a record of visual QA.

## Elevation & Depth

The interface uses flat tonal surfaces and thin dividers. Artwork supplies depth through reflective physical materials, warm and red lighting, overlap, and movement. The open menu is the sole floating interface panel with a broad shadow (0 24px 60px #0008). Atlas globes use inset shading (inset -35px -10px 50px 10px #010203, inset 3px 0 7px #dfebf766) to model volume.

Lacquer and chrome share clearcoat (0.65) and clearcoat roughness (0.14). Chrome uses metalness 1 and roughness 0.14; red forms use metalness 0.65 and roughness 0.22. Torus knots, rings, capsules, and spheres repeat across field, ribbon, orbit, and journey variants.

**The Stage Rule.** Create depth through the artwork and tonal separation. Reserve interface shadows for the open navigation panel.

## Shapes

Controls are rounded pills; chapter selectors and directional contact accents are circles. Large experiment windows have restrained corners, while atlas visuals are softer. Use component-specific radii in frontmatter rather than one radius everywhere. Orbit ellipses recur in the logo and studio mark. Rules and dividers stay thin (1px).

## Components

### Buttons and links

The contact pill is a compact red action with a diagonal arrow (minimum height 46px); hover deepens it to #b6181f. The menu pill uses charcoal, brightens on hover, and swaps menu/close wording and icon. Both use 0.7rem, weight 650, and the control radius. The text link remains an underlined inline action with an arrow, a 44px minimum height, and a rose hover state.

The global keyboard focus is a 3px rose outline, offset 5px. Scene controls use a white outline offset 3px. Disabled loading controls use the global wait cursor and opacity 0.65.

### Navigation

A right-aligned dropdown sits below the header, capped at 440px, with warm dark fill, a 1px border, and the menu shadow. Links are large (1.35rem), separated by rules, and at least 68px tall; below 480px they become 1.2rem and 60px. Escape, outside pointer interaction, a destination click, and the toggle close it; Escape returns focus to the toggle.

### Atlas selection

Three broad pills carry number, planet name, and arrow. Selection uses red and white, represented by aria-pressed. Hover uses the same red treatment. Desktop minimum height is 68px; below 700px it is 60px. Selecting Earth, Mars, or Saturn updates the illustration, description, facts, and NASA link; the description is a polite live region.

### Scene and chapter controls

Scene controls are small bordered dark pills at the bottom-right of each stage, for pause/resume, mobile start, and composition change. Keep 44px minimum targets, explicit accessible labels, and text where room permits. Below 700px the composition-change text is hidden. At widths up to 800px animation starts only on request; reduced motion or unavailable WebGL2 keeps the poster. The poster is public/assets/images/abstract-studio.webp.

Three numbered circular chapter buttons sit at the top-right of the journey. The current step is red and exposed with aria-current=step; a click scrolls to that chapter. A thin red progress line follows scroll at the bottom.

### Experiment windows and process rows

Experiment windows present one large scene with a ruled caption rather than a raised card. The offset second window supplies rhythm. Process rows use a number, generous title, concise description, and dividers. Keep caption and row typography subordinate to the scene and section heading. No input or form pattern is implemented.

## Do's and Don'ts

### Do:

- **Do** keep the dark red-and-black studio direction, orbital mark, and ВЕБ СТУДИЯ descriptor.
- **Do** give the abstract forms generous space and alternate full-width and offset compositions.
- **Do** use local Manrope, visible keyboard focus, and the existing 44px-or-larger control targets.
- **Do** preserve the static poster, mobile opt-in, and reduced-motion reading path.
- **Do** retain the three-planet atlas and the Telegram contact @webdiz3d.

### Don't:

- **Don't** substitute a generic card grid for the large scene-led editorial rhythm.
- **Don't** replace the lacquer and chrome material language with unrelated visual effects.
- **Don't** hide essential copy behind an animation or require WebGL to reach content.
- **Don't** invent client work, testimonials, or commercial proof to fill the layout.
