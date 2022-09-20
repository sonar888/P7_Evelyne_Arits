const PagePost = require('../models/pagePosts');
const fs = require('fs');
const pagePosts = require('../models/pagePosts');

exports.createPagePost = (req, res, next) => {
  console.log(req)

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
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    
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



  exports.showAllPagePosts = (req, res, next) => {
    pagePosts.find().sort({"created_at": "-1" })
        .then(pagePost => res.status(200).json(pagePost))
        .catch(error => res.status(400).json({error: error})) 

  };






// exports.deletePagePost = async (req, res, next) => {
//   try {
//     const post = await PagePost.findById(req.params.id)
//     const postAuthor = post.author.id
//     const userId = req.auth.userId
//     const admin = req.auth.userAdmin

//     if (postAuthor === userId || admin) {
//         pagePosts.deleteOne({ _id: req.params.id })
//           .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//           .catch(error => res.status(400).json({ error }));
//     } else {
//       pagePosts.findOne({ _id: req.params.id })
//           .then(() => res.status(401).json({ message: 'You are not authorised to delete this post !'}))
//           .catch(error => res.status(400).json({ error }));
//     }
//   } catch (error) {
//     res.status(400).send({ message: 'An error occurred, post does probably not exist', error : error.message})
//   }   
// }


exports.deletePagePost = (req, res, next) => {
   PagePost.findOne({ _id: req.params.id})
       .then(post => {

        const postAuthor = post.author.id
        const userId = req.auth.userId
        const admin = req.auth.userAdmin

           if (postAuthor === userId || admin) {

            if (post.imageUrl) {
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























// exports.updatePagePost = async (req, res, next) => {
//   try {
//     const post = await PagePost.findById(req.params.id)
//     const postAuthor = post.author.id
//     const userId = req.auth.userId
//     const admin = req.auth.userAdmin

//     if (postAuthor === userId || admin) {
//         pagePosts.findOneAndUpdate({_id:req.params.id}, {...req.body, _id: req.params.id})
//           .then(() => res.status(200).json({ message: 'Object updated'}))
//           .catch(error => res.status(400).json({ error }));
//     } else {
//       pagePosts.findOne({ _id: req.params.id })
//           .then(() => res.status(401).json({ message: 'You are not authorised to update this post !'}))
//           .catch(error => res.status(400).json({ error }));
//     }
//   } catch (error) {
//     res.status(400).send({ message: 'An error occurred, post does probably not exist', error : error.message})
//   }   
// }

exports.updatePagePost = (req, res, next) => {
  PagePost.findOne({ _id: req.params.id})
    .then (post => {
      const postAuthor = post.author.id
      const userId = req.auth.userId
      const admin = req.auth.userAdmin

      if (postAuthor === userId || admin) {
        // console.log(req)

        const PagePostObject = req.file ? 
        
        
          {...req.body, 
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









// exports.deleteSauce = (req, res, next) => {
//   Sauce.findOne({ _id: req.params.id })
//     .then(sauce => {
//       const filename = sauce.imageUrl.split('/images/')[1];
//       fs.unlink(`images/${filename}`, () => {
//         Sauce.deleteOne({ _id: req.params.id })
//           .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//           .catch(error => res.status(400).json({ error }));
//       });
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// exports.modifySauce = (req, res, next) => {
//   const sauceObject = req.file ?
//     {
//       ...JSON.parse(req.body.sauce),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };
//   Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// };















exports.likePagePost = async (req, res, next) => {
  try {
    const post = await PagePost.findById(req.params.id)
    const userId = req.auth.userId
    const usersLiked = post.usersLiked

    if (usersLiked.includes(userId)) {

      const index = usersLiked.indexOf(userId)
      usersLiked.splice(index, 1)
      post.likes = usersLiked.length;
      post.save()
      
      return res.status(201).json(post)
    }

    usersLiked.push(userId)
    post.likes = usersLiked.length
    post.save();
    return res.status(201).json(post)

  } catch (error) {
    res.status(400).send({ message: 'An error occurred, post does probably not exist', error : error.message})
  }   

}



    

// (req, res, next) => {
//   pagePosts.findOneAndUpdate({_id:req.params.id}, {...req.body, _id: req.params.id})
//   .then (() => res.status(200).json({message: 'objet modifié'}))
//   .catch(error => res.status(400).json({ error }));
// }