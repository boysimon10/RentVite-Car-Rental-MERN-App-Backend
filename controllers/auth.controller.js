const User = require("../Models/user.model");

exports.signUp = (req, res) => {
    const newUser = new User(req.body);

    newUser.save()
        .then(savedUser => res.json(savedUser))
        .catch(error => res.status(500).json({ error: error.message }));
};