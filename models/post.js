const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    description : {
        type : String
    }, 
    images : [],
    owner : { type : mongoose.Schema.Types.ObjectId, ref : 'User'} 
}) 

const Post = mongoose.model('Post', postSchema)

module.exports = Post
