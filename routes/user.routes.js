const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadProfile = require('../middleware/uploadProfile.middleware.js');

//authentification
router.post("/register", authController.signUp);

//User Database
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

//upload
router.put('/:id/profile-picture', uploadProfile.single('profilePicture'), userController.updateProfilePicture);


module.exports = router;