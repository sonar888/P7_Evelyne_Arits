//The 2 modules that allow us to set up the API routes
const express = require('express');
const router = express.Router();

//Our middlewares that handle the authentication and the file upload
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//The controller that allows us to access the different API calls from the controller folder
const pagePostsCtrl = require('../controllers/pagePosts');

//This is a private API so all the routes need to be authenticated
router.get('/', auth, pagePostsCtrl.showAllPagePosts); 
router.post('/', auth, multer, pagePostsCtrl.createPagePost); 
router.delete('/:id', auth, multer, pagePostsCtrl.deletePagePost);
router.put('/:id', auth, multer, pagePostsCtrl.updatePagePost);
router.post('/:id/like', auth, pagePostsCtrl.likePagePost)

module.exports = router;