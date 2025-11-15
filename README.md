```md
# Système de Gestion des Tâches (To-Do App)

Ce projet est une application web permettant d’ajouter, afficher et supprimer des tâches avec sous-tâches.  
Les données sont sauvegardées dans **localStorage** et l’interface est construite avec **HTML, TailwindCSS et JavaScript**.

---

##  Lien du site en ligne (GitHub Pages)

**https://azizabada10.github.io/To_do/**

## Fonctionnalités

- Ajouter une tâche  
- Ajouter plusieurs sous-tâches dynamiquement  
- Priorité (P0, P1, P2)  
- URL d'image pour chaque tâche  
- Affichage des tâches sous forme de cartes  
- Suppression des tâches  
- Stockage automatique dans **localStorage**  
- Interface responsive  
- Formulaire affiché dans une modale  

---

## Technologies utilisées

- **HTML5**
- **TailwindCSS**
- **JavaScript Vanilla**
- **LocalStorage**
- **Boxicons**

---

## Structure du projet

/project
│── index.html
│── main.js
│── README.md
└── /image
└── arrow.png

---

## Utilisation

1. Ouvrir **index.html** dans le navigateur  
2. Cliquer sur **“Ajouter Tache”**  
3. Remplir le formulaire  
4. Ajouter des sous-tâches si nécessaire  
5. Valider  
6. Les tâches apparaissent automatiquement dans la colonne **Backlog**

---

##  Fonction principale : Ajouter une tâche

Le formulaire récupère :

- titre  
- description  
- priorité  
- url  
- sous-tâches

---

## Responsive Design

* La page utilise une grille Tailwind : `grid-cols-10`
* Les colonnes changent selon la taille :
  `col-span-10 md:col-span-2`
* Le formulaire est affiché dans une **modale responsive**

---

## Améliorations possibles

* Déplacement des tâches vers "En cours" et "Terminée"
* Modification d’une tâche
* Drag & Drop
* Thème sombre
* Recherche / filtrage

---

## Auteur

Projet créé pour pratiquer JavaScript, DOM, LocalStorage et TailwindCSS.

```
