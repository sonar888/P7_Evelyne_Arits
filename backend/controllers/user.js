const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.login = (req, res, next) => {
    console.log('user logged in')
    
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({user}))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ message: 'Utilisateur erreur !' }));
  };