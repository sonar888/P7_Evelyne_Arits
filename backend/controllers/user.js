// Importing the user model
const User = require('../models/User')

// This package allows us to encrypt the password
const bcrypt = require('bcrypt')

// This allows us to create a token
const jwt = require('jsonwebtoken')


//Login call
exports.login = (req, res, next) => {
    User.findOne({email:req.body.email}) // we look for the user by its email that is unique
    .then(user => {
      if (!user) { // handle user not found
        return res.status(401).json({message: "utilisateur pas trouvé"})

      } // we check the user's password with the encryption
      bcrypt.compare(req.body.password, user.password)
      .then (valid => {
        if (!valid){ // we handle the incorrect password
          return res.status(401).json({message: "mot de pass incorrect"})
        }
        res.status(200).json({ // we create a token for the user if the password is correct, including his admin role, name and id
          userId: user._id,
          token: jwt.sign(
            {
              userId: user._id, 
              userName : user.firstName + " " + user.lastName,
              userAdmin: user.admin
              
            }, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'}
          )
          
        })
      })
    })
    .catch(error => res.status(500).json({error}))  
}

// Signup call
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // we encrypt the user's password
      .then(hash => { // create the new user based on the model
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        
        }); 
        user.save()
          .then(() => res.status(201).json({user}))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ message: 'Utilisateur erreur !' }));
  };


 