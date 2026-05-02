const modal = document.getElementById('modal');
const tbody = document.querySelector('tbody');

function ouvrirModal() {
    modal.classList.add('active');
}

function fermerModal() {
    modal.classList.remove('active');
}

async function chargerUtilisateurs() {
    const response = await fetch('http://localhost:3000/api/utilisateurs');
    const data = await response.json();

    tbody.innerHTML = '';
    data.forEach(u => {
        tbody.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.nom}</td>
                <td>${u.prenom}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>
                    <button class="btn-supprimer" onclick="supprimer(${u.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </td>
            </tr>
        `;
    });
}

document.getElementById('btnAjouter').addEventListener('click', async () => {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const mot_de_passe = document.getElementById('mot_de_passe').value;
    const role = document.getElementById('role').value;

    if (!nom || !prenom || !email || !mot_de_passe || !role) {
        return alert('Remplissez tous les champs');
    }

    await fetch('http://localhost:3000/api/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, email, mot_de_passe, role })
    });

    fermerModal();
    chargerUtilisateurs();
});

async function supprimer(id) {
    if (!confirm('Confirmer la suppression ?')) return;

    await fetch(`http://localhost:3000/api/utilisateurs/${id}`, {
        method: 'DELETE'
    });
    chargerUtilisateurs();
}

chargerUtilisateurs();