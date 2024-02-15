const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
  marque: { type: String, required: true },
  modele: { type: String, required: true },
  annee: { type: Number, required: true },
  typeCarburant: { type: String, required: true },
  kilometrage: { type: Number, required: true },
  transmission: { type: String, required: true },
  capaciteAccueil: { type: Number, required: true },
  options: [String],
  photos: [String],
  tarifs: {
    jour: { type: Number, required: true },
    semaine: { type: Number, required: true },
    mois: { type: Number, required: true }
  },
  politiqueCarburant: { type: String, required: true },
  lieuPriseEnCharge: { type: String, required: true },
  lieuRestitution: { type: String, required: true },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
});

module.exports = mongoose.model('Cars', carsSchema);