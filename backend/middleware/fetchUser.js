const jwt = require('jsonwebtoken')
const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"



const fetchUser = (req, res, next) => {
    //Get user from jwt & append id to req
    const authToken = req.header('auth-token')
    if (!authToken) {
        res.status(401).send({ "error": "Please auth using valid token", "message": error.message})
    }
    try {
        const data = jwt.verify(authToken, JWT_SECRET)
        req.userid = data.user;
        next()
    } catch (error) {
        res.status(401).send({ "error": "Please auth using valid token", "message": error.message})
    }
}

module.exports = fetchUser