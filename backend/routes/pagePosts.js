const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

const pagePostsCtrl = require('../controllers/pagePosts');

router.get('/', pagePostsCtrl.showAllPagePosts); //auth
// router.get('/:id', multer, pagePostsCtrl.getOneSauce);


router.post('/', pagePostsCtrl.createPagePost); //, multer auth
router.delete('/:id', pagePostsCtrl.deletePagePost);
// router.put('/:id', auth, multer, pagePostsCtrl.modifySauce);

// router.post('/:id/like', pagePostsCtrl.likeSauce)

module.exports = router;