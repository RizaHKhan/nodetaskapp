const jwt = require('jsonwebtoken')
const User = require('../model/User')

exports.authentication = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        
        //returns the user ID
        const decoded = jwt.verify(token, 'Mastaraz')

        //returns the use based on the id and token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if(!user) {
            throw new Error()
        } 

        req.token = token
        //Above we retrived the user information from the server and we now want to store this information on the req object as we might need it again later. Fetching it again would be inefficient as we already have it. 
        req.user = user
        next()

    } catch(err) {
        res.status(401).send({error: 'Please login in order to accept this option.'})
    }
}