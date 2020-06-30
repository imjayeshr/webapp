
let multer = require('multer');
const multerS3 = require('multer-s3');
var path = require('path');
const aws = require('aws-sdk');
let s3 = new aws.S3({
  "signatureVersion":"v4"
});

let bucket = process.env.AWS_BUCKET_NAME;
let upload;


aws.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", aws.config.credentials.accessKeyId);
    }
  });


upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: bucket,
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })

    }); 

exports.upload = upload;
exports.s3 = s3;