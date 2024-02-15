const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule', required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  statut: { type: String, enum: ['en attente', 'acceptée', 'refusée', 'terminée'], required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
