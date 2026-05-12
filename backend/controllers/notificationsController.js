const db = require('../db');

// Récupérer les notifications pour le RH
exports.getTous = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM notifications WHERE destinataire_role = "rh" ORDER BY created_at DESC'
    );
    
    // On s'assure de toujours renvoyer un tableau
    res.json(rows || []);
  } catch (error) {
    console.error('Erreur notifications:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Marquer comme lu
exports.marquerLu = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      'UPDATE notifications SET lu = TRUE WHERE id = ?',
      [id]
    );
    res.json({ message: 'Notification marquée comme lue' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};