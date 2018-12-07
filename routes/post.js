var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({
    storage: multer.MemoryStorage 
})
const { uploadSingle } = require('../midleware/cloud')
const { postSingle } = require('../controllers/post')
const { isLogin } = require('../middleware/middleware')

/* GET users listing. */
router.post('/',isLogin, upload.single('images'),uploadSingle, postSingle);

module.exports = router;
