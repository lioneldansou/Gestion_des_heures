const db = require('../db');

exports.getStats = async (req, res) => {
  try {
    const [[enseignants]] = await db.query('SELECT COUNT(*) as total FROM enseignants');
    const [[departements]] = await db.query('SELECT COUNT(*) as total FROM departements');
    const [[heures]] = await db.query('SELECT COUNT(*) as total FROM heures_effectuees');
    const [[utilisateurs]] = await db.query('SELECT COUNT(*) as total FROM utilisateurs');
    const [[matieres]] = await db.query('SELECT COUNT(*) as total FROM matieres');
    res.json({
      enseignants: enseignants.total,
      departements: departements.total,
      heures: heures.total,
      utilisateurs: utilisateurs.total,
      matieres: matieres.total
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};