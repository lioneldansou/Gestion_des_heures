const db = require('../db');

exports.getTous = async (req, res) => {
  const { enseignant_id } = req.query;
  try {
    let query = `
      SELECT heures_effectuees.*, 
        enseignants.nom as enseignant_nom,
        enseignants.prenom as enseignant_prenom,
        matieres.intitule as matiere_nom
      FROM heures_effectuees
      JOIN enseignants ON heures_effectuees.enseignant_id = enseignants.id
      JOIN matieres ON heures_effectuees.matiere_id = matieres.id
    `;

    const params = [];
    if (enseignant_id) {
      query += ' WHERE heures_effectuees.enseignant_id = ?';
      params.push(enseignant_id);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.ajouter = async (req, res) => {
  const { enseignant_id, matiere_id, periode_id, date_cours, type_heure, duree, salle, observations } = req.body;
  console.log('Données reçues:', req.body);
  try {
    await db.query(
      'INSERT INTO heures_effectuees (enseignant_id, matiere_id, periode_id, date_cours, type_heure, duree, salle, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [enseignant_id, matiere_id, periode_id, date_cours, type_heure, duree, salle, observations]
    );
    res.json({ message: 'Heures saisies avec succès' });
  } catch (error) {
    console.log('Erreur:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.supprimer = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM heures_effectuees WHERE id = ?', [id]);
    res.json({ message: 'Heures supprimées avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};