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
                <td>${e.heures_normales}h</td>
                <td class="complementaire">${e.heures_complementaires}h</td>
                <td>${e.taux_horaire} FCFA</td>
                <td class="montant">${e.montant_total} FCFA</td>
            </tr>
        `;
    });
}
function exporterPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('TPG - États de Paiement', 14, 15);

    doc.setFontSize(10);
    let y = 30;

    // En-têtes
    doc.setFont(undefined, 'bold');
    doc.text('Enseignant', 14, y);
    doc.text('CM', 70, y);
    doc.text('TD', 90, y);
    doc.text('TP', 110, y);
    doc.text('Total', 130, y);
    doc.text('Montant (FCFA)', 150, y);
    y += 8;

    // Ligne séparatrice
    doc.setFont(undefined, 'normal');
    doc.line(14, y - 4, 200, y - 4);

    // Données du tableau
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            doc.text(cells[0].textContent, 14, y);
            doc.text(cells[1].textContent, 70, y);
            doc.text(cells[2].textContent, 90, y);
            doc.text(cells[3].textContent, 110, y);
            doc.text(cells[4].textContent, 130, y);
            doc.text(cells[6].textContent, 150, y);
            y += 8;
        }
    });

    doc.save('etats_paiement.pdf');
}

function exporterExcel() {
    const wb = XLSX.utils.book_new();

    const data = [['Enseignant', 'Total CM', 'Total TD', 'Total TP', 'Total Heures', 'Taux Horaire', 'Montant Total']];

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
                cells[6].textContent
            ]);
        }
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'États de paiement');
    XLSX.writeFile(wb, 'etats_paiement.xlsx');
}
chargerEnseignants();
chargerPeriodes();