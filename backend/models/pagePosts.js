const mongoose = require('mongoose');

const pagePostSchema = mongoose.Schema({
    // postId: { type: String, required: false },
    author: { type: String }, //required: false
    text: { type: String } //required: false
    // imageUrl: { type: String, required: false },
    // likes: { type: Number, required: false },
    // usersLiked: { type: [String], required: false}
});

module.exports = mongoose.model('post', pagePostSchema);