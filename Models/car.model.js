const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
  marque: { 
    type: String, 
    required: true 
  },
  modele: { 
    type: String,
    required: true 
  },
  annee: { 
    type: Number
  },
  typeCarburant: { 
    type: String, 
    required: true 
  },
  kilometrage: { 
    type: Number 
  },
  transmission: { 
    type: String, 
    enum: ['Automatique', 'Manuelle'],
    required: true 
  },
  capaciteAccueil: { 
    type: Number, 
    required: true 
  },
  options: [String],
  photos: [String],
  tarifs: {
    jour: { 
      type: Number, 
      required: true 
    },
    semaine: { 
      type: Number, 
      required: true 
    },
    mois: { 
      type: Number,
      required: true 
    }
  },
  politiqueCarburant: { 
    type: String,
    enum: ['Plein-à-plein', 'Plein-à-vide', 'Plein-à-plein partiel', 'Prépaiement partiel', 'Autres'], 
    required: true 
  },
  lieuPriseEnCharge: { 
    type: String, 
    required: true 
  },
  lieuRestitution: { 
    type: String, 
    required: true 
  },
  proprietaire: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
  reservations: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Reservation' 
  }]
  //va etre deplacé dans les reservations seuls les personnes ayant deja eu acces à la voiture peut donner leurs avis sur cette reservation.
  /*avis: [{
    contenu: { 
      type: String, 
      required: true 
    },
    note: { 
      type: Number, 
      min: 1, 
      max: 5, 
      required: true 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
    userCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }]*/
});

module.exports = mongoose.model('Car', carsSchema);