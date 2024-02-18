const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.signUp = (req, res) => {
    const { nom, email, telephone, password, role } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'Utilisateur déjà existant' });
            }
            const newUser = new User({ nom, email, telephone, password, role });
            return newUser.save();
        })
        .then(newUser => {
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE
            });
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.status(200).json({ token });
        })
        .catch(err => {
            res.status(500).json({ error: err.toString() });
        });
};

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ token });
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(500).json({ error: err.toString() });
    }
};

exports.logOut = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Déconnexion réussie' });
};
