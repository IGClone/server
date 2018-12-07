const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    description : {
        type : String
    }, 
    images : [] 
}) 

const Post = mongoose.model('Post', postMessage)

module.exports = Post
