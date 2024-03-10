const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller')
const authMiddleware = require('../middleware/auth.middleware');
const uploadcar = require('../middleware/carUpload.middleware');

// Crud
// router.post("/addcar",authMiddleware , uploadcar.array('photos', 5), carController.addCar);
router.post("/addcar",authMiddleware , carController.addCar);
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

// Routes pour les commentaires sur les voitures
/*router.post('/:id/comment',authMiddleware, carController.commentCar);
router.put('/:id/comment/edit', carController.editCarComment);
router.delete('/:id/comment/delete', carController.deleteCarComment);*/


module.exports = router;