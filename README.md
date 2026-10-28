# Manoj Kulakarni — 3D Portfolio

Responsive React + TypeScript portfolio with a Three.js animated hero, projects, skills, education, certifications, and contact links.

## Run locally
1. Install Node.js LTS.
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev` and open the local URL printed by Vite.

## Build for publishing
Run `npm run build`. Upload the generated `dist/` folder to your preferred static host.

## Personalise it
- Content and project details: `src/App.tsx`
- Colors, layout, and responsive styling: `src/styles.css`
- Three.js scene: `src/Scene3D.tsx`
- Replace `public/resume.pdf` with your updated résumé.

Your résumé did not include actual LinkedIn, LeetCode, or HackerRank URLs, so these are not guessed. Add them to the constants in `src/App.tsx` when you have them. Add project links only when public repos/demos are available.
