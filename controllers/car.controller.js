const Car = require('../models/car.model');
const ObjectID = require('mongoose').Types.ObjectId;

exports.addCar = (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    if (userRole !== 'business') {
        return res.status(403).json({ error: 'Only users with a business role can add a car' });
    }
    const {
        marque,
        modele,
        annee,
        typeCarburant,
        kilometrage,
        transmission,
        capaciteAccueil,
        options,
        photos,
        tarifs,
        politiqueCarburant,
        lieuPriseEnCharge,
        lieuRestitution,
        description
    } = req.body;
    //const photos = req.files.map(file => file.path);
    console.log("Received car data:", req.body);
    const newCar = new Car({
        marque,
        modele,
        annee,
        typeCarburant,
        kilometrage,
        transmission,
        capaciteAccueil,
        options,
        photos,
        tarifs,
        politiqueCarburant,
        lieuPriseEnCharge,
        lieuRestitution,
        proprietaire: userId,
        description
    });
    console.log("New car object:", newCar);
    newCar.save()
        .then(() => {
            res.status(201).json({ message: 'Car added successfully' });
        })
        .catch((err) => {
            res.status(500).json({ error: err.toString() });
            console.error("Error adding car:", err);
        });
};


exports.getAllCars = (req, res) => {
    Car.find().populate({
      path: 'proprietaire',
      select: '-password'
  })
        .then(cars => res.status(200).json(cars))
        .catch(err => res.status(500).json({ message: err.message }));
};

exports.getCarById = (req, res) => {
    Car.findById(req.params.id).populate({
      path: 'proprietaire',
      select: '-password'
  })
        .then(car => {
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(car);
        })
        .catch(err => res.status(500).json({ message: err.message }));
    };

exports.updateCar = (req, res) => {
    Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(car => {
            if (!car) return res.status(404).json({ message: 'Car not found' });
            res.status(200).json(car); 
        })
        .catch(err => res.status(400).json({ message: err.message }));
};

exports.deleteCar = (req, res) => {
    Car.findByIdAndDelete(req.params.id)
        .then(car => {
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json({ message: 'Car deleted successfully' });
        })
        .catch(err => res.status(500).json({ message: err.message }));
};


/* exports.commentCar = (req, res) => {
    const userId = req.user.id;
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID de voiture inconnu : " + req.params.id);
    }
    Car.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
              avis: {
                contenu: req.body.contenu,
                note: req.body.note,
                date: new Date().getTime(),
                userCommentId: userId
          },
        },
      },
      { new: true }
    )
      .then((updatedCar) => {
        return res.send(updatedCar);
      })
      .catch((err) => {
        return res.status(400).send(err);
        });
  };


exports.editCarComment = (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send("ID de voiture inconnu : " + req.params.id);
    }
  
    Car.findById(req.params.id)
      .then((car) => {
        const theComment = car.avis.find((comment) =>
          comment._id.equals(req.body.commentId)
        );
  
        if (!theComment) {
          return res.status(404).send("Avis non trouvé");
        }
  
        theComment.contenu = req.body.contenu;
        theComment.note = req.body.note;
  
        return car.save();
      })
      .then((savedCar) => {
        return res.status(200).send(savedCar);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  };

  
  module.exports.deleteCarComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID de voiture inconnu : " + req.params.id);
  
    try {
      return Car.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            avis: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }; */