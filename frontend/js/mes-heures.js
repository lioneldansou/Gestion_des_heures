async function chargerMesHeures() {
    const enseignant_id = localStorage.getItem('enseignant_id');

    const response = await fetch(`http://localhost:3000/api/heures?enseignant_id=${enseignant_id}`);
    const data = await response.json();

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    data.forEach(h => {
        const date = new Date(h.date_cours).toLocaleDateString('fr-FR');
        tbody.innerHTML += `
            <tr>
                <td>${h.id}</td>
                <td>${h.matiere_nom}</td>
                <td>${date}</td>
                <td>${h.type_heure}</td>
                <td>${h.duree}h</td>
                <td>${h.salle || '-'}</td>
            </tr>
        `;
    });
}

chargerMesHeures();