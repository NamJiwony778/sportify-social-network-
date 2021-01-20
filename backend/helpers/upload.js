const multer = require("multer");


let diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[0];
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single( 
  'image'
);

// const storage2 = multer({ storage: diskStorage, fileFilter: fileFilter }).single( 
//   'avatarImg'
// );

module.exports = storage;
// module.exports = storage2;