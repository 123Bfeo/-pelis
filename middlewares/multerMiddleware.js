//middleware permite cargar una imagen y guardar en la carperta  del proyecto
const multer = require('multer');
const path = require('path');

let multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let profile = path.join(__dirname, '../public/images/img');
    cb(null, profile);
  },

  filename: (req, file, cb) => {
    let nameProfile = Date.now() + path.extname(file.originalname)
    cb(null, nameProfile);
  }
})
module.exports = multerDiskStorage;