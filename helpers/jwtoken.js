const jwt = require("jsonwebtoken")

module.exports = {
    createToken: function(email) {
        return jwt.sign({
            email: email,
        }, process.env.JWTTOKEN)
    },
    decodeToken: function(token) {
        let decoded = jwt.verify(token, process.env.JWTTOKEN)
        return decoded
    }
}