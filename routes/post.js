var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({
    storage: multer.MemoryStorage 
})
const { uploadSingle } = require('../midleware/cloud')
const { postSingle } = require('../controllers/post')
const { isLogin } = require('../middleware/middleware')
const {findCurrentUser} = require("../middleware/middleware")
const postController = require("../controllers/post")

/* GET users listing. */
router.post('/',isLogin, upload.single('images'),uploadSingle, postSingle);
router.post('/comment/:postId',isLogin, postController.comment);

module.exports = router;
