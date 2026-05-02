async function chargerEnseignants() {
    const response = await fetch('http://localhost:3000/api/enseignants');
    const data = await response.json();
    const select = document.getElementById('filtre_enseignant');

    data.forEach(e => {
        select.innerHTML += `<option value="${e.id}">${e.nom} ${e.prenom}</option>`;
    });
}

async function chargerPeriodes() {
    const response = await fetch('http://localhost:3000/api/periodes');
    const data = await response.json();
    const select = document.getElementById('filtre_periode');

    data.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.libelle}</option>`;
    });
}

async function genererEtat() {
    const enseignant_id = document.getElementById('filtre_enseignant').value;
    const periode_id = document.getElementById('filtre_periode').value;

    let url = 'http://localhost:3000/api/etats?';
    if (enseignant_id) url += `enseignant_id=${enseignant_id}&`;
    if (periode_id) url += `periode_id=${periode_id}`;

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    data.forEach(e => {
        tbody.innerHTML += `
            <tr>
                <td>${e.nom} ${e.prenom}</td>
                <td>${e.total_cm}h</td>
                <td>${e.total_td}h</td>
                <td>${e.total_tp}h</td>
                <td>${e.total_heures}h</td>
                <td>${e.taux_horaire} FCFA</td>
                <td class="montant">${e.montant_total} FCFA</td>
            </tr>
        `;
    });
}

chargerEnseignants();
chargerPeriodes();