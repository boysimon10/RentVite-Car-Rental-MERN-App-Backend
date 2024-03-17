const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');
const path = require('path');

//get users info
exports.getAllUsers = (req, res) => { 
    User.find().select("-password")
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};
//get user info
exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    User.findById(req.params.id)
    .select("-password")
    .then(docs => {
        if (docs) res.send(docs);
        else res.status(404).send("User not found");
        })
    .catch(err => {
        console.log("ID unknown : " + err);
        res.status(500).send("Something went wrong");
        });
};
//mise à jour d'info d'un user
exports.updateUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(error => res.status(500).json({ error: error.message }));
}
//Supprimer un user
exports.deleteUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    const { id } = req.params;
    User.findByIdAndDelete(id)
        .then(deletedUser => res.json(deletedUser))
        .catch(error => res.status(500).json({ error: error.message }));
}
//update photo de profil
exports.updateProfilePicture = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    User.findByIdAndUpdate(
        req.params.id,
        { $set: { profilePicture: `./uploads/profil/${req.file.filename}` } },
        { new: true, useFindAndModify: false }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ message: "Photo de profil mise à jour avec succès", user });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la photo de profil" });
    });
};