const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', required: true },
  car: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car', required: true },
  proprietaire: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', required: true },
  dateDebut: { 
    type: Date, 
    required: true },
  dateFin: { 
    type: Date, 
    required: true },
  statut: { 
    type: String, 
    enum: ['en attente', 'acceptée', 'refusée', 'terminée'], 
    required: true, 
    default: 'en attente' }
});

module.exports = mongoose.model('booking', bookingSchema);
