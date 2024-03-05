const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nom: { 
        type: String,
        required: true
        },
    email: { 
        type: String,
        required: true,
        lowercase:true,
        trim: true  },
    telephone: { 
        type: String,
        required: true },
    password: { 
        type: String,
        required: true },
    profilePicture: { 
        type: String,
        default: './uploads/profil/default.png' },
    role: { 
        type: String,
        enum: ['client', 'business', 'admin'],
        default: 'client',
        required: true },
    certification: { 
        type: Boolean,
        default: false },
    avisNotations: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'AvisNotation' }],
    reservations: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation' }]
});

// Cryptage mot de passe
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);