const db = require('../db');
const bcrypt = require('bcrypt');

// Récupérer tous les utilisateurs
exports.getTous = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nom, prenom, email, role, created_at FROM utilisateurs');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Ajouter un utilisateur
exports.ajouter = async (req, res) => {
  const { nom, prenom, email, mot_de_passe, role } = req.body;
  try {
    const motDePasseChiffre = await bcrypt.hash(mot_de_passe, 10);
    await db.query(
      'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, email, motDePasseChiffre, role]
    );
    res.json({ message: 'Utilisateur ajouté avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un utilisateur
exports.supprimer = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM utilisateurs WHERE id = ?', [id]);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};