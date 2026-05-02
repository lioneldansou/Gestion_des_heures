const modal = document.getElementById('modal');
const tbody = document.querySelector('tbody');

function ouvrirModal() {
    modal.classList.add('active');
}

function fermerModal() {
    modal.classList.remove('active');
}

async function chargerEnseignants() {
    const response = await fetch('http://localhost:3000/api/enseignants');
    const data = await response.json();
    const select = document.getElementById('enseignant_id');

    data.forEach(e => {
        select.innerHTML += `<option value="${e.id}">${e.nom} ${e.prenom}</option>`;
    });
}

async function chargerMatieres() {
    const response = await fetch('http://localhost:3000/api/matieres');
    const data = await response.json();
    const select = document.getElementById('matiere_id');

    data.forEach(m => {
        select.innerHTML += `<option value="${m.id}">${m.intitule}</option>`;
    });
}

async function chargerPeriodes() {
    const response = await fetch('http://localhost:3000/api/periodes');
    const data = await response.json();
    const select = document.getElementById('periode_id');

    data.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.libelle}</option>`;
    });
}

async function chargerHeures() {
    const response = await fetch('http://localhost:3000/api/heures');
    const data = await response.json();

    tbody.innerHTML = '';
    data.forEach(h => {
        const date = new Date(h.date_cours).toLocaleDateString('fr-FR');
        tbody.innerHTML += `
            <tr>
                <td>${h.id}</td>
                <td>${h.enseignant_nom} ${h.enseignant_prenom}</td>
                <td>${h.matiere_nom}</td>
                <td>${date}</td>
                <td>${h.type_heure}</td>
                <td>${h.duree}h</td>
                <td>${h.salle || '-'}</td>
                <td>
                    <button class="btn-supprimer" onclick="supprimer(${h.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </td>
            </tr>
        `;
    });
}

document.getElementById('btnAjouter').addEventListener('click', async () => {
    const enseignant_id = document.getElementById('enseignant_id').value;
    const matiere_id = document.getElementById('matiere_id').value;
    const periode_id = document.getElementById('periode_id').value;
    const date_cours = document.getElementById('date_cours').value;
    const type_heure = document.getElementById('type_heure').value;
    const duree = document.getElementById('duree').value;
    const salle = document.getElementById('salle').value;
    const observations = document.getElementById('observations').value;

    if (!enseignant_id || !matiere_id || !periode_id || !date_cours || !type_heure || !duree) {
        return alert('Remplissez tous les champs obligatoires');
    }

    await fetch('http://localhost:3000/api/heures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enseignant_id, matiere_id, periode_id, date_cours, type_heure, duree, salle, observations })
    });

    fermerModal();
    chargerHeures();
});

async function supprimer(id) {
    if (!confirm('Confirmer la suppression ?')) return;

    await fetch(`http://localhost:3000/api/heures/${id}`, {
        method: 'DELETE'
    });
    chargerHeures();
}

chargerEnseignants();
chargerMatieres();
chargerPeriodes();
chargerHeures();