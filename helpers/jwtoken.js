const jwt = require("jsonwebtoken")

module.exports = {
    createToken: function(email, id) {
        console.log( email)
        return jwt.sign({
            email: email,
            id : id
        }, process.env.JWTTOKEN)
    },
    decodeToken: function(token) {
        let decoded = jwt.verify(token, process.env.JWTTOKEN)
        return decoded
    }
}