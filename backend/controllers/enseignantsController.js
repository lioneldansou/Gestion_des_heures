const db = require('../db');

// Récupérer tous les éléments
exports.recup = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT enseignants.*, departements.nom as departement_nom FROM enseignants JOIN departements ON enseignants.departement_id = departements.id'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.ajouter = async (req, res) => {
  const { nom, prenom, grade, statut, departement_id, taux_horaire, heures_contractuelles } = req.body; 
  try {
    await db.query(
      'INSERT INTO enseignants (nom, prenom, grade, statut, departement_id, taux_horaire, heures_contractuelles) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [nom, prenom, grade, statut, departement_id, taux_horaire, heures_contractuelles]
    );
    res.json({ message: 'Enseignant ajouté avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
  exports.supp=async(req,res)=>{
    const {id}=req.params;
    try{
        await db.query('delete from enseignants where id=?',[id]);
        res.json({message:'Enseignant supprimé avec succès'});
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });

    }};