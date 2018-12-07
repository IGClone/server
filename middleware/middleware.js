const User = require("../models/user")
const bcrypt = require("../helpers/bcrypt")

module.exports = {
    checkPassword: function(req, res, next) {
        User.find({email: req.body.email}, function(err, user) {
                if (err) res.status(400).json({err:err.message})
                else {
                    if (user.length == 0) {
                        res.status(400).json({message: "User Not Found"})
                    } else {
                        let isPassword = bcrypt.checkPassword(req.body.password, user[0].password)
                        if (isPassword) {
                            req.currentUser = user
                            next()
                        } else {
                            res.status(400).json({message: "Wrong Password"})
                        }
                    }
                }
        })
    }
    
}
