async function chargerStatsEnseignant() {
    const token = localStorage.getItem('token');
    const enseignant_id = localStorage.getItem('enseignant_id');

    const response = await fetch(`http://localhost:3000/api/etats?enseignant_id=${enseignant_id}`);
    const data = await response.json();

    if (data.length > 0) {
        const stats = data[0];
        document.querySelector('.card-1 .nombre').textContent = stats.total_heures + 'h';
        document.querySelector('.card-2 .nombre').textContent = stats.total_cm + 'h';
        document.querySelector('.card-3 .nombre').textContent = stats.total_td + 'h';
        document.querySelector('.card-4 .nombre').textContent = stats.total_tp + 'h';
    }
}

chargerStatsEnseignant();