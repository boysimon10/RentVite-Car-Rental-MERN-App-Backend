const mongoose = require('mongoose');

const avisNotationSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule', required: true },
  contenu: { type: String, required: true },
  note: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AvisNotation', avisNotationSchema);
