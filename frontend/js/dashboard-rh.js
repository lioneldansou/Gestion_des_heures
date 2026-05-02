async function chargerStats() {
    const response = await fetch('http://localhost:3000/api/stats');
    const data = await response.json();

    document.querySelector('.card-1 .nombre').textContent = data.enseignants;
    document.querySelector('.card-2 .nombre').textContent = data.matieres || 0;
    document.querySelector('.card-3 .nombre').textContent = data.heures;
}

chargerStats();