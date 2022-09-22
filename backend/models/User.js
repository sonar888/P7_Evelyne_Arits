//The module that allows us to create a model for MongoDB
const mongoose = require('mongoose');

// the module that allows us to require some data to be unique
const uniqueValidator = require('mongoose-unique-validator')

//The model for the users
const userSchema = mongoose.Schema({
    firstName : {type: String, required: true },
    lastName : {type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin : {type: Boolean, required: true, default: false}

});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)