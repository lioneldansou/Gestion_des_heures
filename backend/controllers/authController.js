const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const utilisateur = rows[0];

    const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Chercher l'enseignant_id si le rôle est enseignant
    let enseignant_id = null;
    if (utilisateur.role === 'enseignant') {
      const [enseignant] = await db.query('SELECT id FROM enseignants WHERE utilisateur_id = ?', [utilisateur.id]);
      if (enseignant.length > 0) enseignant_id = enseignant[0].id;
    }

    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, role: utilisateur.role, enseignant_id });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};