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
function exporterPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('TPG - Mon Récapitulatif d\'heures', 14, 15);

    doc.setFontSize(10);
    let y = 30;

    // En-têtes
    doc.setFont(undefined, 'bold');
    doc.text('Matière', 14, y);
    doc.text('Date', 70, y);
    doc.text('Type', 110, y);
    doc.text('Durée', 140, y);
    doc.text('Salle', 165, y);
    y += 8;

    doc.line(14, y - 4, 200, y - 4);
    doc.setFont(undefined, 'normal');

    // Données
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            doc.text(cells[1].textContent, 14, y);
            doc.text(cells[2].textContent, 70, y);
            doc.text(cells[3].textContent, 110, y);
            doc.text(cells[4].textContent, 140, y);
            doc.text(cells[5].textContent, 165, y);
            y += 8;
        }
    });

    doc.save('mes_heures.pdf');
}
chargerMesHeures();