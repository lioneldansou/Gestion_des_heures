const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const statsRoutes = require('./routes/stats');
const departementsRoutes = require('./routes/departements');
const enseignantsRoutes =require('./routes/enseignants');
const utilisateursRoutes = require('./routes/utilisateurs');
const parametresRoutes = require('./routes/parametres')
const matieresRoutes = require('./routes/matieres');
const heuresRoutes = require('./routes/heures');
const periodesRoutes = require('./routes/periodes');
const etatsRoutes = require('./routes/etats');
const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.json());app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/enseignants', enseignantsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/parametres', parametresRoutes);
app.use('/api/matieres', matieresRoutes);
app.use('/api/heures', heuresRoutes);
app.use('/api/periodes', periodesRoutes);
app.use('/api/etats', etatsRoutes);
const PORT = process.env.PORT || 3000;

app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionnelle' });
});
app.use('/api/departements', departementsRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});