# mmoors.me — Portfolio

Site personnel de Michel Moors. React + Vite + TypeScript, bilingue FR/EN.

## Stack
- React 19 + Vite + TypeScript
- React Router DOM
- CSS Modules

## Structure
```
index.html                     → point d'entrée (charge src/apps/portfolio/main.tsx)
src/
  apps/portfolio/
    App_pi.tsx                 → routing (Home, Projects, Adaline, About, Notes, Contact)
    Home.tsx / Projects.tsx / AdalineCaseStudy.tsx
    About.tsx / Notes.tsx / Contact.tsx
    notesData.ts                → contenu du journal de notes
    index.css                   → styles globaux
  components/                   → Nav, Footer
  i18n/LangContext.tsx           → provider FR/EN
```

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

Le repo contient un `wrangler.jsonc` (assets statiques servis depuis `dist/`, fallback SPA activé).

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
- **Email** → `src/apps/portfolio/Contact.tsx`
- **Ajouter un projet** → tableau `projects` dans `src/apps/portfolio/Projects.tsx`
- **Notes / journal** → `src/apps/portfolio/notesData.ts`
- **CV PDF** → place `cv.pdf` dans `public/` (le bouton pointe déjà sur `/cv.pdf`)
- **Couleurs** → variables CSS dans `src/apps/portfolio/index.css`
- **Langues** → `src/i18n/LangContext.tsx`
