const multer = require('multer');
const path = require('path')

/* 
{
  fieldname: 'photo',
  originalname: '22.png',
  encoding: '7bit',
  mimetype: 'image/png'
}
*/
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/user'))  //文件路径
        },
        filename: function (req, file, cb) {
            let ext = path.extname(file.originalname)
            cb(null, file.fieldname + Math.random() + ext)

        }
    })
});


module.exports = {
    upload
}