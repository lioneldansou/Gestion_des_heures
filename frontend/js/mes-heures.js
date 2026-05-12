// =====================
// CHARGER MES HEURES
// =====================
async function chargerMesHeures() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const enseignant_id = user.enseignant_id || localStorage.getItem('enseignant_id');

    if (!enseignant_id) {
        console.error("Aucun enseignant_id trouvé");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/heures?enseignant_id=${enseignant_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(h => {
            const date = new Date(h.date_cours).toLocaleDateString('fr-FR');
            
            let statutHTML = '';
            let actionsHTML = '';

            if (h.statut === 'en_attente') {
                statutHTML = '<span style="color:#f7c948;font-weight:bold;">En attente</span>';
                actionsHTML = `
                    <button onclick="accepter(${h.id})" class="btn-accept">✅ Accepter</button>
                    <button onclick="refuser(${h.id})" class="btn-refuse">❌ Refuser</button>
                `;
            } else if (h.statut === 'accepte') {
                statutHTML = '<span style="color:#43cea2;font-weight:bold;">Accepté</span>';
                actionsHTML = '—';
            } else if (h.statut === 'refuse') {
                statutHTML = `<span style="color:#ff6b6b;font-weight:bold;">Refusé</span>`;
                actionsHTML = h.motif_refus ? `<small>${h.motif_refus}</small>` : '—';
            }

            tbody.innerHTML += `
                <tr>
                    <td>${h.id}</td>
                    <td>${h.matiere_nom || '-'}</td>
                    <td>${date}</td>
                    <td>${h.type_heure}</td>
                    <td>${h.duree}h</td>
                    <td>${h.salle || '-'}</td>
                    <td>${statutHTML}</td>
                    <td>${actionsHTML}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Erreur chargement heures:", error);
    }
}

// =====================
// ACCEPTER HEURES
// =====================
async function accepter(id) {
    if (!confirm("Confirmer l'acceptation de ces heures ?")) return;

    await fetch(`http://localhost:3000/api/heures/${id}/statut`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut: 'accepte' })
    });

    chargerMesHeures();
}

// =====================
// REFUSER HEURES
// =====================
async function refuser(id) {
    const motif = prompt('Veuillez entrer le motif du refus :');
    if (!motif) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const enseignant_nom = `${user.nom || ''} ${user.prenom || ''}`.trim();

    await fetch(`http://localhost:3000/api/heures/${id}/statut`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            statut: 'refuse', 
            motif_refus: motif,
            enseignant_nom: enseignant_nom 
        })
    });

    chargerMesHeures();
}

// =====================
// EXPORTER PDF (optionnel)
// =====================
function exporterPDF() {
    alert("Fonction PDF en cours de développement...");
    // Tu peux garder ton ancienne fonction si elle marche bien
}

// Initialisation
document.addEventListener('DOMContentLoaded', chargerMesHeures);