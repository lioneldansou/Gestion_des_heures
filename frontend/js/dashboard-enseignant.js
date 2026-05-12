// =====================
// CHARGER LES STATISTIQUES ENSEIGNANT
// =====================
async function chargerStatsEnseignant() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
        console.error("Utilisateur non connecté");
        return;
    }

    const user = JSON.parse(userStr);
    const enseignant_id = user.enseignant_id || localStorage.getItem('enseignant_id');

    if (!enseignant_id) {
        console.error("Aucun enseignant_id trouvé");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/etats?enseignant_id=${enseignant_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data && data.length > 0) {
            const stats = data[0];
            document.querySelector('.card-1 .nombre').textContent = parseFloat(stats.total_heures || 0).toFixed(2) + 'h';
            document.querySelector('.card-2 .nombre').textContent = parseFloat(stats.total_cm || 0).toFixed(2) + 'h';
            document.querySelector('.card-3 .nombre').textContent = parseFloat(stats.total_td || 0).toFixed(2) + 'h';
            document.querySelector('.card-4 .nombre').textContent = parseFloat(stats.total_tp || 0).toFixed(2) + 'h';
        }
    } catch (error) {
        console.error("Erreur stats enseignant:", error);
    }
}

// =====================
// CHARGER MATIÈRES ATTRIBUÉES
// =====================
async function chargerMatieresAttribuees() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const enseignant_id = user.enseignant_id || localStorage.getItem('enseignant_id');

    if (!enseignant_id) return;

    try {
        const response = await fetch(`http://localhost:3000/api/matieres/enseignant/${enseignant_id}`);
        const data = await response.json();

        const conteneur = document.getElementById('matieres-attribuees');
        conteneur.innerHTML = '';

        if (data.length === 0) {
            conteneur.innerHTML = '<p style="color:#888; grid-column: 1 / -1;">Aucune matière attribuée pour le moment.</p>';
            return;
        }

        data.forEach(m => {
            conteneur.innerHTML += `
                <div style="background:white;padding:15px;border-radius:8px;border-left:4px solid #1e3c72;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin:0 0 8px 0;color:#1e3c72;">${m.intitule}</h4>
                    <p style="margin:5px 0;"><strong>${m.filiere} - ${m.niveau}</strong></p>
                    <small style="color:#555;">Volume prévu : ${m.volume_horaire_prevu}h</small>
                </div>
            `;
        });
    } catch (error) {
        console.error("Erreur chargement matières:", error);
    }
}

// =====================
// INITIALISATION — ✅ Un seul DOMContentLoaded
// =====================
document.addEventListener('DOMContentLoaded', () => {
    chargerStatsEnseignant();
    chargerMatieresAttribuees();
});