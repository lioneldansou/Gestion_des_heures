async function chargerDepartements() {
  const response = await fetch('http://localhost:3000/api/departements');
  const data = await response.json();

  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach(dep => {
    tbody.innerHTML += `
      <tr>
        <td>${dep.id}</td>
        <td>${dep.nom}</td>
        <td>
          <button class="btn-supprimer" onclick="supprimer(${dep.id})">
            <i class="fas fa-trash"></i> Supprimer
          </button>
        </td>
      </tr>
    `;
  });
}

async function supprimer(id) {
  await fetch(`http://localhost:3000/api/departements/${id}`, {
    method: 'DELETE'
  });
  chargerDepartements();
}

document.querySelector('button').addEventListener('click', async () => {
  const nom = document.querySelector('input').value;
  if (!nom) return alert('Entrez un nom de département');

  await fetch('http://localhost:3000/api/departements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom })
  });

  document.querySelector('input').value = '';
  chargerDepartements();
});

chargerDepartements();