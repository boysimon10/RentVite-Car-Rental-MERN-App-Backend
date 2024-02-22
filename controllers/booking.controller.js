const Booking = require('../models/booking.model');

// code sans condition de verification et gestions de conflits lors des reservations 
exports.bookCar = (req, res) => {
    //const user = req.user.id;
    // car = req.car.id;
    //const proprietaire = req.car.proprietaire;
    const {
        user,
        car,
        proprietaire,
        dateDebut,
        dateFin,
        statut
    } = req.body;
    const booking = new Booking({
        user,
        car,
        proprietaire,
        dateDebut,
        dateFin,
        statut
    });

    booking.save()
        .then((booking) => {
            res.status(201).json({ message: 'Booking Done' });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};