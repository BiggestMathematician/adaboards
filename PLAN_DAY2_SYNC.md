# Plan Day 2 - Suivi synchrone

Objectif: implementer l'authentification et la protection des routes avec suivi pas a pas.

## To-do du jour (ordre recommande)

- [x] Utiliser la route `/auth/login` pour se connecter
- [x] Sauvegarder le token en `localStorage`
- [x] Utiliser la route `/auth/register` pour creer un compte
- [ ] Creer un context (ou autre state global) pour mettre a jour la connexion sans rafraichir la page
- [ ] Utiliser la route `/auth/logout` pour deconnecter l'utilisateur·ice
- [ ] Proteger les routes `/home` et `/boards/[id]` (redirection vers `/login` si non connecte·e)
- [ ] Rediriger vers `/home` depuis la landing page si l'utilisateur·ice est connecte·e
- [ ] Ecrire en TDD avec Vitest une fonction pour afficher la date relative ("maintenant", "il y a 2 minutes", etc.)
- [ ] Afficher sur la home les informations de date et d'utilisateur·ice pour chaque board (voir Figma)
- [ ] Ajouter une modal pour inviter un·e membre sur une board

## Regle de suivi

- Prendre l'objectif suivant
- Implementer uniquement cet objectif
- Valider (lint/build/tests)
- Cocher la case
