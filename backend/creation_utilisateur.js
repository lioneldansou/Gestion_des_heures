const bcrypt = require('bcrypt');
const db = require('./db');

async function creerUtilisateur() {
  const motDePasse = await bcrypt.hash('admin123', 10);
  
  await db.query(
    'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
    ['Dansou', 'lionel', 'lioneldansou222@gmail.com', motDePasse, 'admin']
  );

  console.log('Utilisateur créé avec succès');
  process.exit();
}

creerUtilisateur();