const Post = require('../models/post')
const User = require('../models/user')
module.exports = {
    postSingle :  (req, res) => {
        let user = req.currentUser
        console.log(' ini user : ', user)
        let data = { description } = req.body
        data.owner= user.id
        data.labels = req.labels
        data.images =[ String(req. publicUrl) ]
        let newPost = new Post( data )
        newPost.save()
            .then( postbaru => {
                User.findOneAndUpdate({ email : user.email}, {$push : { post : postbaru._id}}, { new: true})
                    .then( response => {
                        res.status(200).json({ success : true})
                    })
                    .catch(error => {
                        res.status(500).json({ message  : error.message})
                    })
            })
            .catch( error => {
                res.status(500).json({ message  : error.message})
            })
    },
    comment: function(req,res,next){
        Post.updateOne({
            _id: req.params.commentId
        },{
            $push:{
                commentBody: req.body.comment,
                commenter: req.currentUser.id
            }
        })
        .then((comment_doc) =>{
            res.status(200).json({message: `you just added comment`})
        })
        .catch((err) =>{
            res.status(400).json({err: err.message})
        })
    },   
    readFeed : (req, res) => {
        Post
        .find({})
        .populate('owner')
            .then( posts => {
                res.status(200).json( posts )
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    }
}