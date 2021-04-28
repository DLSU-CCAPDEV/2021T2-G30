// import GridFs
const crypto = require('crypto');
const multer = require('multer'); //to parse incoming bodies
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('gridfs-stream');
// const { connect } = require('http2');




// GridFs Storage Engine
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => { //generate 16 character string name 
          if (err) {
            return reject(err); //promise reject error
          }
          const filename = buf.toString('hex') + path.extname(file.originalname); //if no error create filename with extension
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads' //should match collection name
          };
          resolve(fileInfo); //resolving promise 
        });
      });
    }
});
const upload = multer ({ storage });


const imageController = {
    
}

module.exports = router; 