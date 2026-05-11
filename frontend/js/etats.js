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
    const montantNormal = (e.heures_normales * e.taux_horaire).toFixed(0);
    const montantComplementaire = (e.heures_complementaires * e.taux_horaire).toFixed(0);
    tbody.innerHTML += `
        <tr>
            <td>${e.nom} ${e.prenom}</td>
            <td>${e.total_cm}h</td>
            <td>${e.total_td}h</td>
            <td>${e.total_tp}h</td>
            <td>${e.total_heures}h</td>
            <td>${e.heures_normales}h</td>
            <td class="complementaire">${e.heures_complementaires}h</td>
            <td>${e.taux_horaire} FCFA</td>
            <td>${montantNormal} FCFA</td>
            <td class="montant">${montantComplementaire} FCFA</td>
        </tr>
    `;
});
}
function exporterPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');

    doc.setFontSize(14);
    doc.text('TPG - États de Paiement', 14, 15);

    doc.setFontSize(8);
    let y = 30;

    doc.setFont(undefined, 'bold');
    doc.text('Enseignant', 14, y);
    doc.text('CM', 55, y);
    doc.text('TD', 75, y);
    doc.text('TP', 95, y);
    doc.text('Total H.', 110, y);
    doc.text('H. Normales', 130, y);
    doc.text('H. Complem.', 158, y);
    doc.text('Taux', 188, y);
    doc.text('Mt. Normales', 210, y);
    doc.text('Mt. Complem.', 248, y);
    y += 6;

    doc.line(14, y - 2, 290, y - 2);
    doc.setFont(undefined, 'normal');

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            doc.text(cells[0].textContent, 14, y);
            doc.text(cells[1].textContent, 55, y);
            doc.text(cells[2].textContent, 75, y);
            doc.text(cells[3].textContent, 95, y);
            doc.text(cells[4].textContent, 110, y);
            doc.text(cells[5].textContent, 130, y);
            doc.text(cells[6].textContent, 158, y);
            doc.text(cells[7].textContent, 188, y);
            doc.text(cells[8].textContent, 210, y);
            doc.text(cells[9].textContent, 248, y);
            y += 8;
        }
    });

    doc.save('etats_paiement.pdf');
}

function exporterExcel() {
    const wb = XLSX.utils.book_new();

    const data = [[
        'Enseignant', 'Total CM', 'Total TD', 'Total TP',
        'Total Heures', 'Heures Normales', 'Heures Complémentaires',
        'Taux Horaire', 'Montant Heures Normales', 'Montant Heures Complémentaires'
    ]];

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            data.push([
                cells[0].textContent,
                cells[1].textContent,
                cells[2].textContent,
                cells[3].textContent,
                cells[4].textContent,
                cells[5].textContent,
                cells[6].textContent,
                cells[7].textContent,
                cells[8].textContent,
                cells[9].textContent
            ]);
        }
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'États de paiement');
    XLSX.writeFile(wb, 'etats_paiement.xlsx');
}
chargerEnseignants();
chargerPeriodes();