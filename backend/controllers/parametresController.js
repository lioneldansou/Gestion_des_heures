const db = require('../db');

// Récupérer tous les paramètres
exports.getTous = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM parametres');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Sauvegarder un paramètre
exports.sauvegarder = async (req, res) => {
  const { cle, valeur } = req.body;
  try {
    await db.query(
      'INSERT INTO parametres (cle, valeur) VALUES (?, ?) ON DUPLICATE KEY UPDATE valeur = ?',
      [cle, valeur, valeur]
    );
    res.json({ message: 'Paramètre sauvegardé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};