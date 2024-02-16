const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadProfile = require('../middleware/uploadProfile.middleware.js');
const router = express.Router();


// Authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);

// User Database
router.get("/", authMiddleware, userController.getAllUsers); 
router.get("/:id", authMiddleware, userController.userInfo); 
router.put("/:id", authMiddleware, userController.updateUser); 
router.delete("/:id", authMiddleware, userController.deleteUser); 

// Upload
router.put('/:id/profile-picture', authMiddleware, uploadProfile.single('profilePicture'), userController.updateProfilePicture); 

module.exports = router;
