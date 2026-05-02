const modal = document.getElementById('modal');
const tbody = document.querySelector('tbody');

function ouvrirModal() {
    modal.classList.add('active');
}

function fermerModal() {
    modal.classList.remove('active');
}

async function chargerDepartements() {
    const response = await fetch('http://localhost:3000/api/departements');
    const data = await response.json();
    const select = document.getElementById('departement_id');

    data.forEach(dep => {
        select.innerHTML += `<option value="${dep.id}">${dep.nom}</option>`;
    });
}

async function chargerMatieres() {
    const response = await fetch('http://localhost:3000/api/matieres');
    const data = await response.json();

    tbody.innerHTML = '';
    data.forEach(m => {
        tbody.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.intitule}</td>
                <td>${m.filiere}</td>
                <td>${m.niveau}</td>
                <td>${m.volume_horaire_prevu}</td>
                <td>${m.departement_nom}</td>
                <td>
                    <button class="btn-supprimer" onclick="supprimer(${m.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </td>
            </tr>
        `;
    });
}

document.getElementById('btnAjouter').addEventListener('click', async () => {
    const intitule = document.getElementById('intitule').value;
    const filiere = document.getElementById('filiere').value;
    const niveau = document.getElementById('niveau').value;
    const volume_horaire_prevu = document.getElementById('volume_horaire_prevu').value;
    const departement_id = document.getElementById('departement_id').value;

    if (!intitule || !filiere || !niveau || !volume_horaire_prevu || !departement_id) {
        return alert('Remplissez tous les champs');
    }

    await fetch('http://localhost:3000/api/matieres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intitule, filiere, niveau, volume_horaire_prevu, departement_id })
    });

    fermerModal();
    chargerMatieres();
});

async function supprimer(id) {
    if (!confirm('Confirmer la suppression ?')) return;

    await fetch(`http://localhost:3000/api/matieres/${id}`, {
        method: 'DELETE'
    });
    chargerMatieres();
}

chargerMatieres();
chargerDepartements();