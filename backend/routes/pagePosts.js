const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// const multer = require("multer");
// const upload = multer({ dest: "images/" });

const pagePostsCtrl = require('../controllers/pagePosts');

router.get('/', auth, pagePostsCtrl.showAllPagePosts); //don't forget to add auth auth
// router.get('/:id', multer, pagePostsCtrl.getOneSauce);


router.post('/', auth, multer, pagePostsCtrl.createPagePost); //, multer auth
router.delete('/:id', auth, multer, pagePostsCtrl.deletePagePost);
router.put('/:id', auth, multer, pagePostsCtrl.updatePagePost);

router.post('/:id/like', auth, pagePostsCtrl.likePagePost)

module.exports = router;