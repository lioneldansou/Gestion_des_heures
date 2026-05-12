// =====================
// CHARGER STATISTIQUES
// =====================
async function chargerStats() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:3000/api/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        document.querySelector('.card-1 .nombre').textContent = data.enseignants || 0;
        document.querySelector('.card-2 .nombre').textContent = data.matieres || 0;
        document.querySelector('.card-3 .nombre').textContent = data.heures || 0;
    } catch (error) {
        console.error("Erreur stats:", error);
    }
}

// =====================
// CHARGER NOTIFICATIONS
// =====================
async function chargerNotifications() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:3000/api/notifications', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        const nonLues = data.filter(n => !n.lu);
        const conteneur = document.getElementById('notifications');

        if (nonLues.length === 0) {
            conteneur.innerHTML = '<p style="color:#888;font-style:italic;">Aucune nouvelle notification</p>';
            return;
        }

        conteneur.innerHTML = '';
        nonLues.forEach(n => {
            const date = new Date(n.created_at).toLocaleDateString('fr-FR');
            conteneur.innerHTML += `
                <div style="background:#fff3cd;border-left:4px solid #f7c948;padding:12px 15px;border-radius:8px;margin-bottom:10px;">
                    <p style="color:#333;margin-bottom:5px;">${n.message}</p>
                    <small style="color:#888;">${date}</small>
                    <button onclick="marquerLu(${n.id})" style="float:right;background:#7c6af7;color:white;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
                        Marquer comme lu
                    </button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Erreur notifications:", error);
        document.getElementById('notifications').innerHTML = '<p style="color:red;">Erreur de chargement des notifications</p>';
    }
}

// =====================
// MARQUER NOTIFICATION COMME LUE
// =====================
async function marquerLu(id) {
    const token = localStorage.getItem('token');
    
    await fetch(`http://localhost:3000/api/notifications/${id}/lu`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    chargerNotifications();
}

// =====================
// INITIALISATION
// =====================
document.addEventListener('DOMContentLoaded', () => {
    chargerStats();
    chargerNotifications();
});