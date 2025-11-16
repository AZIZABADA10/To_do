/* Les vairiables du modal formulaire d'ajoute d'une tache  */
const idModal = document.getElementById('ModelFormAjouteTache');
const masquerModal = document.getElementById('masquerModal');
const form = document.getElementById('formTache');

/*Les listes du tache a faire et a terminer */
const listeAfaire = document.getElementById('listeAfaire');
const listeEncours = document.getElementById('listeEncours');
const listeTerminer = document.getElementById('listeTerminer');


/* La form dynamique d'ajoute sous Tache  */
const AjouterSouTcahe = document.getElementById('AjouterSouTcahe');
const zoneSoutache = document.getElementById('zoneSoutache');



let ListesTaches = [];
let SousTaches = [];
let nbrSousTache = 1;
let id = 0;



/** l'affiche du tache via localStorage **/
window.addEventListener('DOMContentLoaded', () => {
    const LesTacheSauvgarder = localStorage.getItem('ListesTaches');
    if (LesTacheSauvgarder) {
        ListesTaches = JSON.parse(LesTacheSauvgarder);
        const MaxId = Math.max(...ListesTaches.map(t => t.id));
        id = MaxId + 1;
        AfficherTache();
    }
})


/** Modal D'ajout une formulaire  **/
function ModelFormAjouteTache() {
    idModal.classList.remove('hidden');

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputZoneSousTaches = zoneSoutache.querySelectorAll('input');
    const sousTaches = [];

    inputZoneSousTaches.forEach(input => {
        if (input.value.trim() !== '') {
            sousTaches.push(input.value.trim());
        }
    })

    /**La récuperation des donnée a partir les zones des texte */
    const titre = document.getElementById("titre").value;
    const Discription = document.getElementById('Discription').value;
    const priorite = document.getElementById('priorite').value;
    const url = document.getElementById('UrlImageTache').value;

    /**L'objet tache avec ces attributs */
    const tache = {
        id: id,
        titre,
        Discription,
        priorite,
        url,
        etat: 0,
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


function MasquerModal() {
    idModal.classList.add('hidden');
}

/**L'affichage du tache */
function AfficherTache() {

    /**la véréfication  du l'état du tache **/
    const tacheAfaire = ListesTaches.filter(t => t.etat === 0);
    const tacheTerminer = ListesTaches.filter(t => t.etat === 2);
    const tacheEncours = ListesTaches.filter(t => t.etat === 1);


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

    listeEncours.innerHTML = ``;
    tacheEncours.forEach(tache => {

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

        listeEncours.appendChild(carte);
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
        const indexAsupprimer = ListesTaches.findIndex(t => t.id === idAsupprimer);
        ListesTaches.splice(indexAsupprimer, 1);
        localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
    }
    alert('La tache a été bien supprimer !');
    AfficherTache();
}



function DeplaceVersTerminer(idADeplace) {

    let listAdesplase = localStorage.getItem('ListesTaches');
    let listePerteAdeplace = JSON.parse(listAdesplase);
    console.log(listePerteAdeplace);
    let indexAdeplace = listePerteAdeplace.findIndex(item => item.id === idADeplace);
    console.log("Priorité trouvée :", listePerteAdeplace[indexAdeplace].priorite);


    if (indexAdeplace <= -1) {
        alert('Auccun tache avace ce id');
        return;
    } else {
        let p = (listePerteAdeplace[indexAdeplace].priorite || '').toString().trim().toUpperCase();
        if (p === 'P0' || p === 'P1') {
            let tach = listePerteAdeplace[indexAdeplace];
            if (tach.etat === 0 || tach.etat === 1) {

                tach.etat = 2;

            } else if (tach.etat === 2) {

                alert('C est déja Terminer ')
            };

        } else {
            alert('Cette tache doit etre sur la zone en cours !!!');
        }
    }
    ListesTaches = listePerteAdeplace;

    localStorage.setItem('ListesTaches', JSON.stringify(ListesTaches));
    AfficherTache();
}
