// This middleware handles the image files sent to the API
const multer = require('multer');

// we assign the file types
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // callnback function to store the files in the correct folder
  },
  filename: (req, file, callback) => { // callback function tha allows us to rename the files
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image')

