CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL,
  role ENUM('admin', 'rh', 'enseignant') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enseignants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NULL,
  nom VARCHAR(100) NOT NULL DEFAULT '',
  prenom VARCHAR(100) NOT NULL DEFAULT '',
  grade ENUM('Assistant', 'Maitre-Assistant', 'Professeur', 'Autres') NOT NULL,
  statut ENUM('Permanent', 'Vacataire') NOT NULL,
  departement_id INT NOT NULL,
  heures_contractuelles INT DEFAULT 0,
  taux_horaire DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
  FOREIGN KEY (departement_id) REFERENCES departements(id)
);

CREATE TABLE IF NOT EXISTS periodes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  libelle VARCHAR(20) NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  active BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS matieres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  intitule VARCHAR(150) NOT NULL,
  filiere VARCHAR(100) NOT NULL,
  niveau ENUM('L1', 'L2', 'L3', 'M1', 'M2') NOT NULL,
  volume_horaire_prevu INT NOT NULL,
  departement_id INT NOT NULL,
  FOREIGN KEY (departement_id) REFERENCES departements(id)
);

CREATE TABLE IF NOT EXISTS heures_effectuees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enseignant_id INT NOT NULL,
  matiere_id INT NOT NULL,
  periode_id INT NOT NULL,
  date_cours DATE NOT NULL,
  type_heure ENUM('CM', 'TD', 'TP') NOT NULL,
  duree DECIMAL(6,2) NOT NULL,
  salle VARCHAR(50),
  observations TEXT,
  statut ENUM('en_attente', 'accepte', 'refuse') DEFAULT 'en_attente',
  motif_refus TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (enseignant_id) REFERENCES enseignants(id),
  FOREIGN KEY (matiere_id) REFERENCES matieres(id),
  FOREIGN KEY (periode_id) REFERENCES periodes(id)
);

CREATE TABLE IF NOT EXISTS parametres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cle VARCHAR(100) UNIQUE NOT NULL,
  valeur VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destinataire_role ENUM('rh', 'admin') NOT NULL,
    message TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- DONNÉES DE TEST
-- =====================
INSERT IGNORE INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES 
('Admin', 'Super', 'admin@tpg.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Ressources', 'Humaines', 'rh@tpg.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'rh'),
('Dupont', 'Jean', 'enseignant@tpg.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant');

INSERT IGNORE INTO departements (nom) VALUES ('Informatique');

INSERT IGNORE INTO periodes (libelle, date_debut, date_fin, active) VALUES 
('2024-2025', '2024-09-01', '2025-06-30', true);

INSERT IGNORE INTO enseignants (utilisateur_id, nom, prenom, grade, statut, departement_id, taux_horaire, heures_contractuelles) 
VALUES (3, 'Dupont', 'Jean', 'Assistant', 'Permanent', 1, 5000, 192);