const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        let token = req.cookies.accessToken || req.header('Authorization') 
        if (!token) {
            return res.status(401).json({message: "Invalid Authentication"})
        }
        
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error){
                return res.status(400).json({ message: 'Invalid Authentication' });
            }
        
            req.user = user
            next()
        })
        
    }
    catch (error) {
        res.status(500).json({ message: `Something wrong. Detail ${error}` })
    }
}

module.exports = auth