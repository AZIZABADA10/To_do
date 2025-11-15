const form = document.getElementById('formTache');

let ListesTaches = [];


form.addEventListener('submit',(e)=>{

    e.preventDefault();

    const titre = document.getElementById("titre").value;
    const Discription = document.getElementById('Discription').value;
    const priorite = document.getElementById('priorite').value;
    const url = document.getElementById('UrlImageTache').value;

    const tache = {
        titre,
        Discription,
        priorite,
        url
    }

    ListesTaches.push(tache);


    form.reset();

});

