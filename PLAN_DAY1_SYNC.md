# Plan Day 1 - Suivi synchrone

Objectif: avancer pas a pas avec une branche dediee par objectif.

## Base conservee (setup only)

- Projet Vite + React + TypeScript
- Dependances installees (Tailwind, React Query, OpenAPI fetch, Router)
- Build/Lint disponibles

## Strategie de branches

Note Git: garder en meme temps `day-1` et `day-1/setup` n'est pas possible techniquement.
On utilise donc `day-1-setup` comme equivalent.

- Base: `day-1-setup`
- Puis une branche par etape:
  - `day-1-landing-ui`
  - `day-1-home-ui`
  - `day-1-board-ui`
  - `day-1-boards-api`
  - `day-1-auth-ui`
  - `day-1-tasks-api`
  - `day-1-a11y-responsive`

## To-do du jour (ordre recommande)

- [ ] Etape 1 - Landing page (UI)
- [ ] Etape 2 - Home page (UI)
- [ ] Etape 3 - Board page (UI)
- [ ] Etape 4 - API boards (GET/POST/DELETE + navigation)
- [ ] Etape 5 - Login + Signup (UI)
- [ ] Etape 6 - API tasks (GET/POST/PATCH/DELETE + move left/right)
- [ ] Etape 7 - Responsive 320px + audit accessibilite
- [ ] Etape 8 - Lighthouse et correctifs

## Regle de suivi

- On prend la prochaine etape
- On code uniquement cette etape
- On valide (lint/build/test manuel)
- On coche la case
- On ouvre/merge la PR vers `day-1`
