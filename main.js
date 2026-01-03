// Modal & Form
const modalAjout = document.getElementById('modalAjoutTache');
const form = document.getElementById('formTache');
const zoneSousTache = document.getElementById('zoneSousTache');
const ajouterSousTacheBtn = document.getElementById('ajouterSousTache');

// Colonnes
const listeAfaire = document.getElementById('listeAfaire');
const listeAfaires = document.getElementById('listeAfaires');
const listeEncours = document.getElementById('listeEncours');
const listeTerminer = document.getElementById('listeTerminer');

let ListesTaches = [];
let id = 0;
let nbrSousTache = 1;

// Charger depuis localStorage
window.addEventListener('DOMContentLoaded', () => {
    const tachesSauvegardees = localStorage.getItem('ListesTaches');
    if (tachesSauvegardees) {
        ListesTaches = JSON.parse(tachesSauvegardees);
        const maxId = Math.max(...ListesTaches.map(t => t.id));
        id = maxId + 1;
        afficherTaches();
    }
});

// Modal functions
function ouvrirModal() { modalAjout.classList.remove('hidden'); }
function fermerModal() {
    modalAjout.classList.add('hidden');
    form.reset();
    zoneSousTache.innerHTML = '';
    nbrSousTache = 1;
}

// Ajouter sous-tâche
ajouterSousTacheBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const label = document.createElement('label');
    label.textContent = 'Sous-Tâche ' + nbrSousTache;
    label.className = 'block mt-2 text-sm font-medium text-gray-700';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400';
    zoneSousTache.appendChild(label);
    zoneSousTache.appendChild(input);
    nbrSousTache++;
});

// Ajouter tâche
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sousTaches = [];
    zoneSousTache.querySelectorAll('input').forEach(input => {
        if (input.value.trim() !== '') sousTaches.push(input.value.trim());
    });

    const tache = {
        id,
        titre: document.getElementById('titre').value,
        description: document.getElementById('description').value,
        priorite: document.getElementById('priorite').value,
        url: document.getElementById('urlImageTache').value,
        etat: 0,
        sousTaches
    };

    ListesTaches.push(tache);
    localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
    id++;
    fermerModal();
    afficherTaches();
});

// Supprimer tâche
function supprimerTache(idTache) {
    ListesTaches = ListesTaches.filter(t => t.id !== idTache);
    localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
    afficherTaches();
}

// Déplacer tâche
function deplacerTache(idTache, etat) {
    const tache = ListesTaches.find(t => t.id === idTache);
    if (tache) {
        tache.etat = etat;
        localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
        afficherTaches();
    }
}

// Affichage des tâches
function afficherTaches() {
    [listeAfaire, listeAfaires, listeEncours, listeTerminer].forEach(col => col.innerHTML = '');

    ListesTaches.forEach(tache => {
        const couleur = tache.priorite === 'P0' ? 'bg-purple-500' :
                        tache.priorite === 'P1' ? 'bg-orange-500' : 'bg-red-500';
        const sousTachesHTML = tache.sousTaches.length ? 
            `<ul class="list-disc ml-4">${tache.sousTaches.map(st => `<li>${st}</li>`).join('')}</ul>` : 
            '<span class="text-gray-400 text-sm">Aucune sous-tâche</span>';

        const div = document.createElement('div');
        div.className = 'bg-white p-3 rounded-lg shadow hover:shadow-md transition';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-gray-800">${tache.titre}</h3>
                <img src="${tache.url}" class="w-10 h-10 rounded-full"/>
            </div>
            <p class="text-gray-500 mb-1">${tache.description}</p>
            <p class="inline-block ${couleur} text-white text-xs px-2 py-1 rounded-full mb-2">${tache.priorite}</p>
            ${sousTachesHTML}
            <div class="flex justify-end gap-2 mt-2">
                ${tache.etat === 0 ? `<button onclick="deplacerTache(${tache.id},1)" class="text-blue-600 hover:text-blue-400"><i class='bx bx-right-arrow-alt'></i></button>` : ''}
                ${tache.etat !== 2 ? `<button onclick="deplacerTache(${tache.id},2)" class="text-green-600 hover:text-green-400"><i class='bx bx-check-circle'></i></button>` : ''}
                <button onclick="supprimerTache(${tache.id})" class="text-red-600 hover:text-red-400"><i class='bx bx-trash'></i></button>
            </div>
        `;

        if (tache.etat === 0) listeAfaire.appendChild(div);
        else if (tache.etat === 1) listeEncours.appendChild(div);
        else if (tache.etat === 2) listeTerminer.appendChild(div);
    });
}