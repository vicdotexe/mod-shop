const {uploadStream} = require( '../utils/uploadFunctions')
const router = require('express').Router();
const multer = require('multer');

const mStorage = multer.memoryStorage();
const mUpload = multer({ mStorage });
const myUploadMiddleware = mUpload.single("image");


function runMiddleware(fn, req, res) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}


router.post('/',async (req, res) => {

  try{
    await runMiddleware(myUploadMiddleware,req,res);
    console.log(req);
    let cldRes = await uploadStream(req.file.buffer, req.file.originalname, res);

    res.status(200).json(cldRes);
  }catch(error){
    console.log(error);
    res.status(500).send({
      message: error.message
    })
  }

});
module.exports = router;