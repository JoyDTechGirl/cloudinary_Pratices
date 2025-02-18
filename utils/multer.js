const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'./uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const filefilter = (req,file,cb) => {
  if(file.mimetype.startsWith('image/')){
    cb(null,true)
  }else{
    cb(new Error('Invalid file,Please upload image'))
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5
};

const upload = multer({
  storage,
  filefilter,
  limits,
});

module.exports = upload;