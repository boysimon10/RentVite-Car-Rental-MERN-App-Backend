const Booking = require('../models/booking.model');

// code sans condition de verification et gestions de conflits lors des reservations 
exports.bookCar = (req, res) => {
    //const user = req.user.id;
    // car = req.car.id;
    //const proprietaire = req.car.proprietaire; deja dans les info de car 
    const {
        user,
        car,
        dateDebut,
        dateFin,
        tarifstotals
        
    } = req.body;
    const booking = new Booking({
        user,
        car,
        dateDebut,
        tarifstotals,
        dateFin
        
    });

    booking.save()
        .then((booking) => {
            res.status(201).json({ message: 'Booking Done' });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

exports.getAllBookedCar = (req, res) => {
    Booking.find()
        .populate({ path: 'user', select: '-password' })
        .populate({ 
            path: 'car',
            populate: { path: 'proprietaire', select: '-password' }
        })
        .then(bookings => {
            res.status(200).json(bookings);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

exports.getBookedCarById = (req, res) => {
    Booking.findById(req.params.id)
    .populate({ path: 'user', select: '-password' })
        .populate({ 
            path: 'car',
            populate: { path: 'proprietaire', select: '-password' }
        })
        .then(booking => {
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.status(200).json(booking);
            })
            .catch(err => res.status(500).json({ message: err.message }));
}

exports.confirmBooking = (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;

    
    const validStatus = ['acceptée', 'refusée', 'terminée', 'annulée'];
    if (!validStatus.includes(statut)) {
    return res.status(400).json({ message: "Statut invalide." });
    }

    Booking.findOneAndUpdate(
    { _id: id },
    { statut: statut },
    { new: true }
    )
    .then((booking) => {
        if (!booking) {
        return res.status(404).json({ message: "Réservation introuvable." });
        }
        res.json({ message: "Statut de la réservation mis à jour avec succès.", booking });
        })
        .catch((err) => {
        res.status(500).json({ message: "Erreur lors de la mise à jour du statut de la réservation.", error: err.message });
        });
    };
