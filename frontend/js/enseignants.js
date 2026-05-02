// =====================
// VARIABLES GLOBALES
// =====================
const modal = document.getElementById('modal');
const tbody = document.querySelector('tbody');

// =====================
// FONCTIONS MODAL
// =====================
function ouvrirModal() {
    modal.classList.add('active');
}

function fermerModal() {
    modal.classList.remove('active');
}

// =====================
// CHARGER LES DÉPARTEMENTS DANS LE SELECT
// =====================
async function chargerDepartements() {
    const response = await fetch('http://localhost:3000/api/departements');
    const data = await response.json();
    const select = document.getElementById('departement');

    data.forEach(dep => {
        select.innerHTML += `<option value="${dep.id}">${dep.nom}</option>`;
    });
}

// =====================
// CHARGER LES ENSEIGNANTS
// =====================
async function chargerEnseignants() {
    const response = await fetch('http://localhost:3000/api/enseignants');
    const data = await response.json();

    tbody.innerHTML = '';
    data.forEach(e => {
        tbody.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.nom}</td>
                <td>${e.prenom}</td>
                <td>${e.grade}</td>
                <td>${e.statut}</td>
                <td>${e.departement_nom}</td>
                <td>${e.taux_horaire}</td>
                <td>${e.heures_contractuelles}</td>
                <td>
                    <button class="btn-supprimer" onclick="supprimer(${e.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </td>
            </tr>
        `;
    });
}

// =====================
// AJOUTER UN ENSEIGNANT
// =====================
document.getElementById('btnAjouter').addEventListener('click', async () => {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const grade = document.getElementById('grade').value;
    const statut = document.getElementById('statut').value;
    const departement_id = document.getElementById('departement').value;
    const taux_horaire = document.getElementById('taux').value;
    const heures_contractuelles = document.getElementById('heures').value;

    if (!nom || !prenom || !grade || !statut || !departement_id || !taux_horaire || !heures_contractuelles) {
        return alert('Remplissez tous les champs');
    }

    await fetch('http://localhost:3000/api/enseignants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, grade, statut, departement_id, taux_horaire, heures_contractuelles })
    });

    fermerModal();
    chargerEnseignants();
});

// =====================
// SUPPRIMER UN ENSEIGNANT
// =====================
async function supprimer(id) {
    if (!confirm('Confirmer la suppression ?')) return;

    await fetch(`http://localhost:3000/api/enseignants/${id}`, {
        method: 'DELETE'
    });
    chargerEnseignants();
}

// =====================
// INITIALISATION
// =====================
chargerEnseignants();
chargerDepartements();