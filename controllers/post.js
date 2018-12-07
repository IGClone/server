const Post = require('../models/post')
const User = require('../models/user')
module.exports = {
    postSingle :  (req, res) => {
        let user = req.currentUser
        console.log('ini merupakan user :',  user)
        let data = { description, owner: user._id  } = req.body
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
    }
}