const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true },
  car: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', 
    required: true },
  dateDebut: { 
    type: Date, 
    required: true },
  dateFin: { 
    type: Date, 
    required: true },
  tarifstotals:{
    type: Number,
    required: true
  },
  dateReservation: {
    type: Date,
    default: Date.now 
  },
  statut: { 
    type: String, 
    enum: ['en attente', 'acceptée', 'refusée', 'terminée'], 
    required: true, 
    default: 'en attente' }
});

module.exports = mongoose.model('Booking', bookingSchema);
