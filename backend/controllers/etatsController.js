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
        enseignants.heures_contractuelles,
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

    const result = rows.map(r => {
      const heures_normales = Math.min(r.total_heures, r.heures_contractuelles);
      const heures_complementaires = Math.max(0, r.total_heures - r.heures_contractuelles);
      const montant_total = heures_complementaires * r.taux_horaire;

      return {
        ...r,
        heures_normales,
        heures_complementaires,
        montant_total
      };
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};