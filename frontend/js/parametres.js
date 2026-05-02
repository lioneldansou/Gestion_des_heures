async function chargerParametres() {
    const response = await fetch('http://localhost:3000/api/parametres');
    const data = await response.json();

    data.forEach(p => {
        const input = document.getElementById(p.cle);
        if (input) input.value = p.valeur;
    });
}

async function sauvegarder(cle) {
    const valeur = document.getElementById(cle).value;

    if (!valeur) return alert('Entrez une valeur');

    await fetch('http://localhost:3000/api/parametres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cle, valeur })
    });

    alert('Paramètre sauvegardé !');
}

chargerParametres();