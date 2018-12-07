var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({
    storage: multer.MemoryStorage 
})
const { uploadSingle } = require('../midleware/cloud')
const { postSingle, readFeed } = require('../controllers/post')
const { isLogin } = require('../middleware/middleware')
const {findCurrentUser} = require("../middleware/middleware")
const postController = require("../controllers/post")
const GoogleVision = require('../controllers/vision')

/* GET users listing. */
router.post('/comment/:postId',isLogin, postController.comment);

/* GET users listing. */
router.post('/',isLogin, upload.single('images'),uploadSingle,GoogleVision.detectTags,postSingle);
router.get('/', readFeed);

module.exports = router;
