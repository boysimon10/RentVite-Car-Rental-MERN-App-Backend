const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller')
const authMiddleware = require('../middleware/auth.middleware');

router.post("/",authMiddleware , bookingController.bookCar);
router.get("/",authMiddleware , bookingController.getAllBookedCar);
router.get("/:id",authMiddleware , bookingController.getBookedCarById);
router.put("/:id/confirm", authMiddleware, bookingController.confirmBooking);






// GET /booking/:id - Récupérer les détails d'une réservation spécifique
// PUT /booking/:id/confirm - Confirmer une réservation spécifique (authentification requise)
// PUT /booking/:id/cancel - Annuler une réservation spécifique (authentification requise)
// GET /booking/user/:userId - Récupérer toutes les réservations d'un utilisateur spécifique (authentification requise)
// GET /booking/car/:carId - Récupérer toutes les réservations pour une voiture spécifique (authentification requise)
// GET /booking/owner/:ownerId - Récupérer toutes les réservations pour un propriétaire de voiture spécifique (authentification requise)
// GET /booking/status/:status - Récupérer toutes les réservations avec un statut spécifique (authentification requise)
// POST /booking/:id/comment - Ajouter un commentaire à une réservation spécifique (authentification requise)
// GET /booking/:id/comment - Récupérer les commentaires d'une réservation spécifique (authentification requise)
// PUT /booking/:id/rate - Noter une réservation spécifique après la location (authentification requise)
// GET /booking/:id/rate - Récupérer la note d'une réservation spécifique (authentification requise)




module.exports = router;