const mongoose = require('mongoose');

const pagePostSchema = mongoose.Schema({
    
     //required: false
    text: { type: String, required: false },
    title: {type: String, required: false},
    imageUrl: {type: String, required: false},
    created_at:{type: String, reauired: false},
    likes : {type: Number},
    usersLiked: { type: [String], required: false},
    
    author: { 
        id : {type : String, required: true },
        name : {type : String, required : true},
        admin: {type: Boolean}
    }//required: false
    
    // likes: { type: Number, required: false },
    // usersLiked: { type: [String], required: false}
});

module.exports = mongoose.model('post', pagePostSchema);