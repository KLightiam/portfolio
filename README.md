# Kingsley Ankomah Asare: portfolio

My personal site, live at [kingsleyasare.netlify.app](https://kingsleyasare.netlify.app). It shows my data science projects with charts drawn from their actual results, plus my software work, experience and skills.

## What's on the page

- **Hero:** drone trajectories from Munich (TUM), drawn as SVG paths. It's the dataset behind my map-matching research.
- **Data science projects:** each one has a summary, approach, headline results, an interactive chart panel and figures from the original notebook.
- **Software, experience, skills and contact.**

## Editing content

Content lives in `src/data/`, so most updates don't touch the components:

| File | What it holds |
| --- | --- |
| `dataScience.js` | Data science case studies: text, results, chart data, notebook figures |
| `projects.js` | Software projects (`featured: true` gives a full row; the rest are listed as smaller builds) |
| `workExperience.js` | Jobs and education, newest first |
| `skills.js` | Skill groups |
| `trajectories.json` | Simplified track paths for the hero drawing |

Chart types available in `dataScience.js`: `line`, `bars`, `grouped`, `confusion` and `table`. Notebook figures live in `public/ds/`.

## Running it

```sh
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint
```

Built with React 19, Vite and Tailwind CSS 4. The Schibsted Grotesk font is bundled with the site rather than loaded from Google Fonts.
