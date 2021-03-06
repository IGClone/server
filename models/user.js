const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email Address is Required"], 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: {
            isAsync: true, 
            validator: function(email, cb) {
                User.find({email:email}, function(err, email_exist) {
                    if (err) {
                        cb(false, err)
                    }
                    else if (email_exist) {
                        if (email_exist.length == 0) {
                            cb(true, "User Created")
                        } else {
                            cb(false, "User Already Exist")
                        }
                    }
                })
            },
        }
    }, 
    password: {
        type: String,
        required: [true, "Password is Required"]
    }, 
    post: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

const User = mongoose.model("User", userSchema)
module.exports = User
