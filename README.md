# mmoors.me — Portfolio

Site personnel de Michel Moors. React + Vite + TypeScript, bilingue FR/EN.

## Stack
- React 18 + Vite + TypeScript
- React Router DOM
- CSS Modules

## Démarrage local
```bash
npm install
npm run dev
```
→ http://localhost:5173

## Build
```bash
npm run build
```
→ dossier `dist/` prêt à déployer

## Déploiement sur Cloudflare Pages

1. Push ce repo sur GitHub
2. Cloudflare Dashboard → Pages → Create a project → connecte le repo
3. Build settings :
   - Framework preset : `Vite`
   - Build command : `npm run build`
   - Build output directory : `dist`
4. Save and Deploy

Chaque `git push` sur `main` redéploie automatiquement.

### Domaine personnalisé
Pages → ton projet → Custom domains → ajoute `mmoors.me`
(DNS déjà sur Cloudflare = configuration automatique)

## Personnalisation
- **Email** → `src/pages/Contact.tsx`
- **Ajouter un projet** → tableau `projects` dans `src/pages/Projects.tsx`
- **CV PDF** → place `cv.pdf` dans `public/` (le bouton pointe déjà sur `/cv.pdf`)
- **Couleurs** → variables CSS dans `src/index.css`
