var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({
    storage : multer.memoryStorage
})
const { uploadSingle } = require('../midleware/cloud')
const { postSingle } = require('../controllers/post')

/* GET users listing. */
router.post('/', upload.single('image'),uploadSingle, postSingle);

module.exports = router;
