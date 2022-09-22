//Importing the model for posts in the backend
const PagePost = require('../models/pagePosts');

//This module is required to delete images from the folder
const fs = require('fs');

//The API calls

//Create a post
exports.createPagePost = (req, res, next) => {

  //First checking to see if the request contains a file or not
  if (!req.file) {
    const pagePost = new PagePost({
      text: req.body.text,
      title: req.body.title,
      created_at: Math.floor(Date.now() / 1000),
    
      author: { 
          id : req.auth.userId,
          name : req.auth.userName,
          admin : req.auth.userAdmin
      },
    })
    pagePost.save()
      .then(() => res.status(201).json(pagePost)) 
      .catch(error => res.status(400).json({ error }));
    
  } else if (req.file) {
    const pagePost = new PagePost({
      text: req.body.text,
      title: req.body.title,
      created_at: Math.floor(Date.now() / 1000),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //if the reauest contains a file, we create a custom url for the file
    
      author: { 
          id : req.auth.userId,
          name : req.auth.userName,
          admin : req.auth.userAdmin
      },
    })
    pagePost.save()
    .then(() => res.status(201).json(pagePost)) 
    .catch(error => res.status(400).json({ error }));
  } 
  };


// SHowing all the posts
  exports.showAllPagePosts = (req, res, next) => {
    PagePost.find().sort({"created_at": "-1" })
        .then(pagePost => res.status(200).json(pagePost))
        .catch(error => res.status(400).json({error: error})) 
  };


// Deleting a post
exports.deletePagePost = (req, res, next) => {
   PagePost.findOne({ _id: req.params.id}) // first we find the post with the param id
       .then(post => { //then callback function to assign values
        const postAuthor = post.author.id
        const userId = req.auth.userId
        const admin = req.auth.userAdmin

           if (postAuthor === userId || admin) { // if/else statements to verify if the requester is authorised to delete the post (admin or author)

            if (post.imageUrl) { //checking to see if the post contains an image url so that we can remove the image from the folder
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                PagePost.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            })
            } else {
              PagePost.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            }
            PagePost.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
           } else {
              res.status(401).json({ message: 'You are not authorised to delete this post !'})
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};


// Updating the post
exports.updatePagePost = (req, res, next) => {
  PagePost.findOne({ _id: req.params.id}) // first we find the post with the param id
    .then (post => { //then callback function to assign values
      const postAuthor = post.author.id
      const userId = req.auth.userId
      const admin = req.auth.userAdmin

      if (postAuthor === userId || admin) { // if/else statements to verify if the requester is authorised to update the post (admin or author)
        const PagePostObject = req.file ? 
          {...req.body, // then we check if the request contains a new file to update the post with
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
          :
          { ...req.body };
          PagePost.updateOne({ _id: req.params.id }, { ...PagePostObject, _id: req.params.id })
            .then((post) => res.status(200).json(post))
            .catch(error => res.status(400).json({ error }));
        
    } else {
      PagePost.findOne({ _id: req.params.id })
          .then(() => res.status(401).json({ message: 'You are not authorised to update this post !'}))
          .catch(error => res.status(400).json({ error }));
    }
    })
    .catch (error => {
      res.status(400).send({ message: 'An error occurred, post does probably not exist', error : error.message})
    }) 
}

// Liking a post
exports.likePagePost = async (req, res, next) => {
  try {
    const post = await PagePost.findById(req.params.id) // first we find the post with the param id
    const userId = req.auth.userId
    const usersLiked = post.usersLiked

    if (usersLiked.includes(userId)) { // if the user already liked the post; we "unlike" it by removing his id from the usersLiked array
      const index = usersLiked.indexOf(userId)
      usersLiked.splice(index, 1)
      post.likes = usersLiked.length;
      post.save()
      return res.status(201).json(post)
    }
    usersLiked.push(userId) // else we add the user id to the usersLiked array
    post.likes = usersLiked.length
    post.save();
    return res.status(201).json(post)
  } catch (error) {
    res.status(400).send({ message: 'An error occurred, post does probably not exist', error : error.message})
  }   

}


