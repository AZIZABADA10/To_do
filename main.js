const form = document.getElementById('formTache');
const listeAfaire = document.getElementById('listeAfaire');
const listeTerminer = document.getElementById('listeTerminer');

const AjouterSouTcahe = document.getElementById('AjouterSouTcahe');
const zoneSoutache = document.getElementById('zoneSoutache');

const idModal = document.getElementById('ModelFormAjouteTache');
const masquerModal = document.getElementById('masquerModal');

let ListesTaches = [];
let SousTaches = [];
let nbrSousTache = 1;
let id = 0;


window.addEventListener('DOMContentLoaded', () => {
    const LesTacheSauvgarder = localStorage.getItem('ListesTaches');
    if (LesTacheSauvgarder) {
        ListesTaches = JSON.parse(LesTacheSauvgarder);
        AfficherTache();
    }
})

function ModelFormAjouteTache() {
    idModal.classList.remove('hidden');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputZoneSousTaches = zoneSoutache.querySelectorAll('input');
        const sousTaches = [];

        inputZoneSousTaches.forEach(input => {
            if (input.value.trim() !== '') {
                sousTaches.push(input.value.trim());
            }
        })


        const titre = document.getElementById("titre").value;
        const Discription = document.getElementById('Discription').value;
        const priorite = document.getElementById('priorite').value;
        const url = document.getElementById('UrlImageTache').value;

        const tache = {
            id: id,
            titre,
            Discription,
            priorite,
            url,
            etat: false,
            sousTaches
        }

        ListesTaches.push(tache);
        localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
        idModal.classList.add('hidden');
        AfficherTache();

        form.reset();
        zoneSoutache.innerHTML = '';
        nbrSousTache = 1;
        id++;
    });
}

function MasquerModal() {
    idModal.classList.add('hidden');
}


function AfficherTache() {

    const tacheAfaire = ListesTaches.filter(t => !t.etat);
    const tacheTerminer = ListesTaches.filter(t => t.etat);



    listeAfaire.innerHTML = ``;
    tacheAfaire.forEach(tache => {

        const carte = document.createElement('div');
        carte.classList.add('bg-white', 'rounded', 'shadow');

        let colorPreorete = '';
        if (tache.priorite == 'P0') {
            colorPreorete = 'bg-purple-600';
        } else if (tache.priorite == 'P1') {
            colorPreorete = 'bg-orange-600';
        } else {
            colorPreorete = 'bg-red-600';
        }


        let sousTachesHTML = ``
        if (tache.sousTaches.length === 0) {
            sousTachesHTML = `<span>Aucune sous-tâche</span>`;
        } else {
            sousTachesHTML = `<ul class="list-disc ml-4">`;
            tache.sousTaches.forEach(St => {
                sousTachesHTML += `<li>${St}</li>`;
            });
            sousTachesHTML += `</ul>`;
        }

        carte.innerHTML = `
                            <div class="p-2 m-2">
                            <div class="flex justify-between">
                            <h3 class="text-black font-bold mt-2">${tache.titre}</h3>
                            <img src="${tache.url}" class="w-10 h-10 rounded-full mt-2"/>
                            </div>
                                
                                <p class="text-gray-400 mt-2">${tache.Discription}</p>
                                <p class="p-1 ${colorPreorete} mt-2 rounded w-min">${tache.priorite}</p>
                                    ${sousTachesHTML}
                                <div class="flex gap-2 mt-2 justify-end">
                                    <button >
                                        <img class="w-6" src="../image/arrow.png" />
                                    </button>
                                    <button onclick="DeplaceVersTerminer(${tache.id})"  ><i class='bx bx-check-circle text-green-600'></i></button>
                                    <button><i class='bx bx-trash text-red-600' onclick="supprimerTache(${tache.id})" ></i></button>
                                </div>
                            </div>
        `;

        listeAfaire.appendChild(carte);
    });


    listeTerminer.innerHTML = ``;
    tacheTerminer.forEach(tache => {

        const carte = document.createElement('div');
        carte.classList.add('bg-white', 'rounded', 'shadow');

        let colorPreorete = '';
        if (tache.priorite == 'P0') {
            colorPreorete = 'bg-purple-600';
        } else if (tache.priorite == 'P1') {
            colorPreorete = 'bg-orange-600';
        } else {
            colorPreorete = 'bg-red-600';
        }


        let sousTachesHTML = ``
        if (tache.sousTaches.length === 0) {
            sousTachesHTML = `<span>Aucune sous-tâche</span>`;
        } else {
            sousTachesHTML = `<ul class="list-disc ml-4">`;
            tache.sousTaches.forEach(St => {
                sousTachesHTML += `<li>${St}</li>`;
            });
            sousTachesHTML += `</ul>`;
        }

        carte.innerHTML = `
                            <div class="p-2 m-2">
                            <div class="flex justify-between">
                            <h3 class="text-black font-bold mt-2">${tache.titre}</h3>
                            <img src="${tache.url}" class="w-10 h-10 rounded-full mt-2"/>
                            </div>
                                
                                <p class="text-gray-400 mt-2">${tache.Discription}</p>
                                <p class="p-1 ${colorPreorete} mt-2 rounded w-min">${tache.priorite}</p>
                                    ${sousTachesHTML}
                                <div class="flex gap-2 mt-2 justify-end">
                                    <button >
                                        <img class="w-6" src="../image/arrow.png" />
                                    </button>
                                    <button onclick="DeplaceVersTerminer(${tache.id})"  ><i class='bx bx-check-circle text-green-600'></i></button>
                                    <button><i class='bx bx-trash text-red-600' onclick="supprimerTache(${tache.id})" ></i></button>
                                </div>
                            </div>
        `;

        listeTerminer.appendChild(carte);
    });
}


AjouterSouTcahe.addEventListener('click', (e) => {
    e.preventDefault();

    const label = document.createElement('label');
    label.textContent = 'Sous tache ' + nbrSousTache;
    label.classList.add('block', 'mt-2', 'block', 'text-sm', 'font-medium', 'text-white', 'mb-1');

    const zone = document.createElement('input');
    zone.type = 'text';
    zone.classList.add('rounded', 'h-8', 'my-3');

    zoneSoutache.appendChild(label);
    zoneSoutache.appendChild(zone);
    nbrSousTache++;
})


function supprimerTache(idAsupprimer) {
    const lesTaches = localStorage.getItem('ListesTaches');
    
    if (lesTaches) {
        ListesTaches = JSON.parse(lesTaches);
        ListesTaches.splice(idAsupprimer, 1);
        localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
    }
    alert('La tache a été bien supprimer !');
    AfficherTache();
}



function DeplaceVersTerminer(idADeplace) {

    let listAdesplase = localStorage.getItem('ListesTaches');
    let listePerteAdeplace = JSON.parse(listAdesplase);
    let indexAdeplace = listePerteAdeplace.findIndex(item => item.id === idADeplace);

    if (ListesTaches[indexAdeplace].etat === true) {
        alert('C est déja Terminer ');
    } else (
        ListesTaches[indexAdeplace].etat = true
    );
    localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
    AfficherTache();
}
