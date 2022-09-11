const express = require('express');
const bodyParser = require('body-parser')

const mongoose = require('mongoose');

const path = require('path');

const pagePostsRoutes = require('./routes/pagePosts');
const userRoutes = require('./routes/user');




mongoose.connect('mongodb+srv://Evelyne:Saphir162@cluster0.sfddy.mongodb.net/groupmania?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express();
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/pagePosts', pagePostsRoutes);
app.use('/api/auth', userRoutes);


// const alittlepost = {
    
//     author: "evelyne",
//     body: "oh yeah",
//     likes: 0,
//     usersLiked: 0 }

//     console.log(JSON.stringify(alittlepost))







module.exports = app