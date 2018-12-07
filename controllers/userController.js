const User = require("../models/user")
const bcrypt = require("../helpers/bcrypt")
const jwttoken = require("../helpers/jwtoken")

module.exports = {
    login: function(req, res) {
         let user = req.currentUser[0]
         let token = jwttoken.createToken(user.email, user._id)
         res.status(200).json({
            token:token
        })
    },
    signup: function(req, res) {
        let user = new User({
            name: req.body.name, 
            email: req.body.email, 
            password: bcrypt.generatePassword(req.body.password)
        })
        user.save(function(err) {
            if (err) res.status(400).json({err: err.message})
            else {
                res.status(200).json({message: "new user has been created"})
            }
        })
    },
    all: function(req,res,next){
        User.find({},{
            password: 0
        })
        .then((data) =>{
            res.status(200).json({data: data})
        })
        .catch((err) =>{
            res.status(400).json({err: err.message})
        })
    },
    follow: function(req,res,next){
        console.log( req.currentUser)
        console.log(req.body.newFollowingUser)
        User.updateOne({
            email: req.currentUser.email
        },{
            $push:{following: req.body.newFollowingUser}
        })
        .then((user_docs) =>{
            console.log(user_docs)
            res.status(200).json({message: `you sucessfully follow this user`})
        })
        .catch((err) =>{
            res.status(400).json({err: err.message})
        })
    }
}