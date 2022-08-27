const mongoose = require('mongoose');

const pagePostSchema = mongoose.Schema({
    
     //required: false
    text: { type: String, required: true },
    title: {type: String, required: false},
    
    author: { 
        id : {type : String, required: true },
        name : {type : String, required : true },
        admin: {type: Boolean}
    },//required: false
    // imageUrl: { type: String, required: false },
    // likes: { type: Number, required: false },
    // usersLiked: { type: [String], required: false}
});

module.exports = mongoose.model('post', pagePostSchema);