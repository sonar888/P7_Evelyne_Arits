//The module that allows us to create a model for MongoDB
const mongoose = require('mongoose');

//The model for the pagePosts
const pagePostSchema = mongoose.Schema({
    // None of the input is required for the call as the user can send a combination of title/text/image
    text: { type: String, required: false}, 
    title: {type: String, required: false},
    imageUrl: {type: String, required: false},

    //Values are assigned by the API call
    created_at:{type: String},
    likes : {type: Number},
    usersLiked: { type: [String]},
    author: { 
        id : {type : String, required: true },
        name : {type : String, required : true},
        admin: {type: Boolean}
    }
});

module.exports = mongoose.model('post', pagePostSchema);