const PagePost = require('../models/pagePosts');
const fs = require('fs');
const pagePosts = require('../models/pagePosts');
const { equal } = require('assert');

exports.createPagePost = (req, res, next) => {
    console.log(req.body)
    const pagePost = new PagePost({
      text: req.body.text,
      title: req.body.title,
    
      author: { 
          id : req.auth.userId,
          name : req.auth.userName,
          admin : req.auth.userAdmin
      },
    });
    pagePost.save()
      .then(() => res.status(201).json(pagePost)) 
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
    const userId = req.auth.userId
    const admin = req.auth.userAdmin

    if (postAuthor === userId || admin) {
        pagePosts.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
    } else {
      pagePosts.findOne({ _id: req.params.id })
          .then(() => res.status(401).json({ message: 'You are not authorised to delete this post !'}))
          .catch(error => res.status(400).json({ error }));
    }
  } catch (error) {
    res.status(400).send({ message: 'An error occurred, post does probably not exist', error : error.message})
  }   
}

exports.updatePagePost = async (req, res, next) => {
  try {
    const post = await PagePost.findById(req.params.id)
    const postAuthor = post.author.id
    const userId = req.auth.userId
    const admin = req.auth.userAdmin

    if (postAuthor === userId || admin) {
        pagePosts.findOneAndUpdate({_id:req.params.id}, {...req.body, _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Object updated'}))
          .catch(error => res.status(400).json({ error }));
    } else {
      pagePosts.findOne({ _id: req.params.id })
          .then(() => res.status(401).json({ message: 'You are not authorised to update this post !'}))
          .catch(error => res.status(400).json({ error }));
    }
  } catch (error) {
    res.status(400).send({ message: 'An error occurred, post does probably not exist', error : error.message})
  }   
}



    

// (req, res, next) => {
//   pagePosts.findOneAndUpdate({_id:req.params.id}, {...req.body, _id: req.params.id})
//   .then (() => res.status(200).json({message: 'objet modifié'}))
//   .catch(error => res.status(400).json({ error }));
// }