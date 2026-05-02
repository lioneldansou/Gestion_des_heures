const db = require('../db');

exports.getTous = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT matieres.*, departements.nom as departement_nom FROM matieres JOIN departements ON matieres.departement_id = departements.id'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.ajouter = async (req, res) => {
  const { intitule, filiere, niveau, volume_horaire_prevu, departement_id } = req.body;
  try {
    await db.query(
      'INSERT INTO matieres (intitule, filiere, niveau, volume_horaire_prevu, departement_id) VALUES (?, ?, ?, ?, ?)',
      [intitule, filiere, niveau, volume_horaire_prevu, departement_id]
    );
    res.json({ message: 'Matière ajoutée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.supprimer = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM matieres WHERE id = ?', [id]);
    res.json({ message: 'Matière supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};