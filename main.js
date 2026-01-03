// Modal
const modalAjout = document.getElementById('modalAjoutTache');
const form = document.getElementById('formTache');
const zoneSousTache = document.getElementById('zoneSousTache');
const ajouterSousTacheBtn = document.getElementById('ajouterSousTache');

// Listes
const listeAfaire = document.getElementById('listeAfaire');
const listeAfaires = document.getElementById('listeAfaires');
const listeEncours = document.getElementById('listeEncours');
const listeTerminer = document.getElementById('listeTerminer');

let ListesTaches = [];
let id = 0;
let nbrSousTache = 1;

// Chargement des tâches depuis localStorage
window.addEventListener('DOMContentLoaded', () => {
    const tachesSauvegardees = localStorage.getItem('ListesTaches');
    if (tachesSauvegardees) {
        ListesTaches = JSON.parse(tachesSauvegardees);
        const maxId = Math.max(...ListesTaches.map(t => t.id));
        id = maxId + 1;
        afficherTaches();
    }
});

// Ouvrir / Fermer modal
function ouvrirModal() { modalAjout.classList.remove('hidden'); }
function fermerModal() { 
    modalAjout.classList.add('hidden'); 
    form.reset();
    zoneSousTache.innerHTML = '';
    nbrSousTache = 1;
}

// Ajouter sous-tâche dynamique
ajouterSousTacheBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const label = document.createElement('label');
    label.textContent = 'Sous-tâche ' + nbrSousTache;
    label.className = 'block mt-2 text-sm font-medium text-white mb-1';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'rounded h-8 my-3 w-full';

    zoneSousTache.appendChild(label);
    zoneSousTache.appendChild(input);
    nbrSousTache++;
});

// Ajouter tâche
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const sousTaches = [];
    zoneSousTache.querySelectorAll('input').forEach(input => {
        if(input.value.trim() !== '') sousTaches.push(input.value.trim());
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

// Déplacer tâche vers un état
function deplacerTache(idTache, etat) {
    const tache = ListesTaches.find(t => t.id === idTache);
    if(tache) {
        tache.etat = etat;
        localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
        afficherTaches();
    }
}

// Afficher tâches
function afficherTaches() {
    listeAfaire.innerHTML = '';
    listeAfaires.innerHTML = '';
    listeEncours.innerHTML = '';
    listeTerminer.innerHTML = '';

    ListesTaches.forEach(tache => {
        let couleur = tache.priorite === 'P0' ? 'bg-purple-600' :
                      tache.priorite === 'P1' ? 'bg-orange-600' : 'bg-red-600';

        let sousTachesHTML = tache.sousTaches.length ? 
            `<ul class="list-disc ml-4">${tache.sousTaches.map(st => `<li>${st}</li>`).join('')}</ul>` : 
            '<span>Aucune sous-tâche</span>';

        const div = document.createElement('div');
        div.className = 'bg-white rounded shadow p-2 m-2';
        div.innerHTML = `
            <div class="flex justify-between">
                <h3 class="font-bold">${tache.titre}</h3>
                <img src="${tache.url}" class="w-10 h-10 rounded-full"/>
            </div>
            <p class="text-gray-400 mt-2">${tache.description}</p>
            <p class="p-1 ${couleur} mt-2 rounded w-min">${tache.priorite}</p>
            ${sousTachesHTML}
            <div class="flex gap-2 mt-2 justify-end">
                ${tache.etat === 0 ? `<button onclick="deplacerTache(${tache.id},1)"><i class='bx bx-right-arrow-alt text-blue-600'></i></button>` : ''}
                ${tache.etat !== 2 ? `<button onclick="deplacerTache(${tache.id},2)"><i class='bx bx-check-circle text-green-600'></i></button>` : ''}
                <button onclick="supprimerTache(${tache.id})"><i class='bx bx-trash text-red-600'></i></button>
            </div>
        `;

        if(tache.etat === 0) listeAfaire.appendChild(div);
        else if(tache.etat === 1) listeEncours.appendChild(div);
        else if(tache.etat === 2) listeTerminer.appendChild(div);
    });
}