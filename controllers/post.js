const Post = require('../models/post')

module.exports = {
    postSingle :  (req, res) => {
        let user = req.currentUser
        let data = { description } = req.body
        data.images = req. publicUrl
        let newPost = new Post( data )
        let postSaved = null
        newPost.save()
            .then( new_post => {
               postSaved = new_post
               return user.findById(user._id)
            })
            .then( user => {
                user.pos.push( postSaved._id)
                return user.save()
            })
            .then( response => {
                res.status(201).json( postSaved )
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    }
}