# Portfolio Template

A clean, single-page portfolio template recreated from a Framer-built site —
rebuilt as plain HTML/CSS/JS with no framework, build step, or dependencies.
All personal content and projects have been stripped; everything is a blank
placeholder ready to fill in.

## Files

| File         | Purpose                                                    |
|--------------|------------------------------------------------------------|
| `index.html` | Home / **Projects** page — hero + project grid             |
| `about.html` | **About** page — hero + Experience + Leadership & Projects |
| `styles.css` | Design system, layout, and all transitions                 |
| `script.js`  | Load sequence, heading word-split, scroll reveals          |

## Run it

It's static — just open `index.html` in a browser, or serve the folder:

```bash
# from this folder
python -m http.server 8000
# then visit http://localhost:8000
```

## What's replicated from the original

- **Navigation** — centered pill bar with a dashed border that slides down on
  load and has an animated underline (active page + hover).
  Tabs: **Projects** and **About** (the original "Contact" tab was removed).
- **Hero** — circular avatar, a heading that reveals **word-by-word with a
  blur-in stagger**, and bio text + buttons that fade up.
- **Projects** — responsive 2-column card grid; cards lift and the thumbnail
  de-saturates → full color on hover.
- **Scroll reveals** — below-the-fold content fades up as it enters the
  viewport (via `IntersectionObserver`), with per-item stagger.
- **Theme & type** — light theme (`#fafafa` canvas, `#262626` text), DM Sans
  for UI and Fragment Mono for years/accents.
- Respects `prefers-reduced-motion`.

## Customize

- **Text** — edit the placeholder copy directly in the HTML.
- **Avatar / thumbnails** — uncomment the `<img>` tags and point them at your
  images (drop the files in this folder).
- **Heading animation** — any `<h1 data-split>` is auto-split into animated
  words. Remove `data-split` to disable.
- **Add a project** — duplicate a `.project-card` block in `index.html`.
- **Add an experience row** — duplicate an `.entry` block in `about.html`.
- **Colors / spacing** — tweak the CSS custom properties in `:root`.
- **Add a page** — copy a page, add a matching `.nav-link`, and set
  `aria-current="page"` on the active one.
