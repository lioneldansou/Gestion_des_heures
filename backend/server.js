const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// =====================
// ROUTES
// =====================
const authRoutes = require('./routes/auth');
const utilisateursRoutes = require('./routes/utilisateurs');
const departementsRoutes = require('./routes/departements');
const enseignantsRoutes = require('./routes/enseignants');
const matieresRoutes = require('./routes/matieres');
const heuresRoutes = require('./routes/heures');
const periodesRoutes = require('./routes/periodes');
const etatsRoutes = require('./routes/etats');
const statsRoutes = require('./routes/stats');
const parametresRoutes = require('./routes/parametres');
const notificationsRoutes = require('./routes/notifications');

app.use('/api/auth', authRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/departements', departementsRoutes);
app.use('/api/enseignants', enseignantsRoutes);
app.use('/api/matieres', matieresRoutes);
app.use('/api/heures', heuresRoutes);
app.use('/api/periodes', periodesRoutes);
app.use('/api/etats', etatsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/parametres', parametresRoutes);
app.use('/api/notifications', notificationsRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API TPG fonctionne correctement !' });
});

// =====================
// LANCEMENT SERVEUR
// =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});