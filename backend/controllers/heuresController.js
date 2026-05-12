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
  
  console.log('Données reçues pour ajout heures:', req.body);

  try {
    await db.query(
      `INSERT INTO heures_effectuees 
       (enseignant_id, matiere_id, periode_id, date_cours, type_heure, duree, salle, observations, statut) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'en_attente')`,
      [enseignant_id, matiere_id, periode_id, date_cours, type_heure, duree, salle, observations]
    );
    
    res.json({ message: 'Heures saisies avec succès (en attente de validation)' });
  } catch (error) {
    console.error('Erreur ajout heures:', error.message);
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
exports.mettreAJourStatut = async (req, res) => {
  const { id } = req.params;
  const { statut, motif_refus, enseignant_nom } = req.body;

  try {
    await db.query(
      'UPDATE heures_effectuees SET statut = ?, motif_refus = ? WHERE id = ?',
      [statut, motif_refus || null, id]
    );

    // Créer une notification pour le RH si refus
    if (statut === 'refuse') {
      const message = `L'enseignant ${enseignant_nom || 'Un enseignant'} a refusé des heures. Motif : ${motif_refus || 'Non spécifié'}`;
      
      await db.query(
        'INSERT INTO notifications (destinataire_role, message) VALUES (?, ?)',
        ['rh', message]
      );
    }

    res.json({ message: 'Statut mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};