const db = require('../db');

// Récupérer tous les départements
exports.getTous = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departements');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Ajouter un département
exports.ajouter = async (req, res) => {
  const { nom } = req.body;
  try {
    await db.query('INSERT INTO departements (nom) VALUES (?)', [nom]);
    res.json({ message: 'Département ajouté avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un département
exports.supprimer = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM departements WHERE id = ?', [id]);
    res.json({ message: 'Département supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};