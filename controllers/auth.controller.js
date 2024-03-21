const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.signUp = (req, res) => {
    const { nom, email, telephone, password, role } = req.body;
    let errorResponse = null;

    User.findOne({ email }).then((user) => {
        if (user) {
            errorResponse = { error: 'Utilisateur déjà existant' };
            throw new Error('Utilisateur déjà existant');
        }

        return User.findOne({ telephone });
    }).then((user) => {
        if (user) {
            errorResponse = { error: 'Numéro de téléphone déjà utilisé' };
            throw new Error('Numéro de téléphone déjà utilisé');
        }

        const newUser = new User({ nom, email, telephone, password, role });
        return newUser.save();
    }).then((newUser) => {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
        //res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });
        //localStorage.setItem('token', token); ce bail doit etre uniquement dans le frontend
        res.status(200).json({ token });
    }).catch((err) => {
        if (!errorResponse) {
            res.status(500).json({ error: err.toString() });
        } else {
            res.status(400).json(errorResponse);
        }
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

        //res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });
        //localStorage.setItem('token', token);
        res.status(200).json({ token });
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(500).json({ error: err.toString() });
    }
};

//le logout est géré dans le frontend maintenant
/*exports.logOut = (req, res) => {
    localStorage.removeItem('token');
    res.status(200).json({ message: 'Déconnexion réussie' });
};*/
