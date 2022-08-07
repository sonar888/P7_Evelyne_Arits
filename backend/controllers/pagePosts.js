const PagePost = require('../models/pagePosts');
const fs = require('fs');
const pagePosts = require('../models/pagePosts');

exports.createPagePost = (req, res, next) => {
    console.log(req.body)
    // delete req.body._id;
    //console.log()
    const pagePost = new PagePost({
      ...req.body
    });
    pagePost.save()
      .then(() => res.status(201).json(pagePost)) // try to console.log(res) if error comes back
      .catch(error => res.status(400).json({ error }));
  };

  exports.showAllPagePosts = (req, res, next) => {
    pagePosts.find()
        .then(pagePost => res.status(200).json(pagePost))
        .catch(error => res.status(400).json({error: error})) 

  };

exports.deletePagePost = (req, res, next) => {
    pagePosts.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}
    