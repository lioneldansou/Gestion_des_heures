const db = require('../db');

exports.getEtat = async (req, res) => {
  const { enseignant_id, periode_id } = req.query;

  try {
    let query = `
      SELECT 
        enseignants.id,
        enseignants.nom,
        enseignants.prenom,
        enseignants.taux_horaire,
        SUM(CASE WHEN type_heure = 'CM' THEN duree ELSE 0 END) as total_cm,
        SUM(CASE WHEN type_heure = 'TD' THEN duree ELSE 0 END) as total_td,
        SUM(CASE WHEN type_heure = 'TP' THEN duree ELSE 0 END) as total_tp,
        SUM(duree) as total_heures
      FROM heures_effectuees
      JOIN enseignants ON heures_effectuees.enseignant_id = enseignants.id
      WHERE 1=1
    `;

    const params = [];

    if (enseignant_id) {
      query += ' AND enseignants.id = ?';
      params.push(enseignant_id);
    }

    if (periode_id) {
      query += ' AND heures_effectuees.periode_id = ?';
      params.push(periode_id);
    }

    query += ' GROUP BY enseignants.id';

    const [rows] = await db.query(query, params);

    const result = rows.map(r => ({
      ...r,
      montant_total: r.total_heures * r.taux_horaire
    }));

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};