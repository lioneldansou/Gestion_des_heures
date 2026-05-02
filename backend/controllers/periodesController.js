const db = require('../db');

exports.getTous = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM periodes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.ajouter = async (req, res) => {
  const { libelle, date_debut, date_fin } = req.body;
  try {
    await db.query(
      'INSERT INTO periodes (libelle, date_debut, date_fin) VALUES (?, ?, ?)',
      [libelle, date_debut, date_fin]
    );
    res.json({ message: 'Période ajoutée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.supprimer = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM periodes WHERE id = ?', [id]);
    res.json({ message: 'Période supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};