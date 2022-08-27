const PagePost = require('../models/pagePosts');
const fs = require('fs');
const pagePosts = require('../models/pagePosts');
const { equal } = require('assert');

exports.createPagePost = (req, res, next) => {
    console.log(req.body)
    // delete req.body._id;
    //console.log()
    const pagePost = new PagePost({
      text: req.body.text,
      title: req.body.title,
    
      author: { 
          id : req.auth.userId,
          name : req.auth.userName,
          admin : req.auth.userAdmin
          // firstName : {type : mongoose.Schema.Types.String },
          // lastName : {type : mongoose.Schema.Types.String },

      },
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

exports.deletePagePost = async (req, res, next) => {
  try {
    
    const post = await PagePost.findById(req.params.id)
    const postAuthor = post.author.id
    const postAdmin = post.author.admin
    const userId = req.auth.userId
    const admin = req.auth.userAdmin

    if (postAuthor === userId || admin) {
        pagePosts.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
    } else {
      pagePosts.findOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'You are not authorised to delete this post !'}))
          .catch(error => res.status(400).json({ error }));
    }

    console.log ("this is my information", post, userId, admin, postAuthor, postAdmin)
    
  } catch (err) {
    console.log (err)
  }

    
}

exports.updatePagePost = (req, res, next) => {
  pagePosts.findOneAndUpdate({_id:req.params.id}, {...req.body, _id: req.params.id})
  .then (() => res.status(200).json({message: 'objet modifié'}))
  .catch(error => res.status(400).json({ error }));
}



    