const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const options = {
      secure: true,
      cloud_name: process.env.CLOUD_NAME, 
      api_key: process.env.CLOUD_KEY, 
      api_secret: process.env.CLOUD_SECRET,
      folder: process.env.CLOUD_FOLDER,
      unique_filename:false,
      overwrite:false
}
cloudinary.config(options);

console.log(options);

async function uploadDefault(dataURI) {
  return cloudinary.uploader.upload(dataURI, options);
}

async function uploadStream(buffer, filename) {
  return new Promise((res, rej) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      {public_id:filename,...options},
      (err, result) => {
        if (err) return rej(err);
        res(result);
      }
    );
    let str = Readable.from(buffer);
    str.pipe(theTransformStream);
  });
}

async function chunkedUpload(dataURI) {
    return cloudinary.uploader.upload_large(dataURI, options);
  }

module.exports={
    uploadDefault,
    uploadStream,
    chunkedUpload
}