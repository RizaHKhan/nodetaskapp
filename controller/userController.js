const User = require('../model/User')


exports.register = async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (err) {
        res.send({error: err.message})
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(err) {
        res.status(400).send()
    }
}

exports.users = async (req, res) => {
    console.log(req.body)
    res.send(req.user)
}

exports.logout = async(req, res) => {
   try {
       req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
       }) 
       await req.user.save()
       res.send('You are logged out')
   } catch (err) {
       res.status(500).send('Unable to process Request')
   }
}

exports.logoutAll = async(req, res) => {
   try {
       req.user.tokens = [] 
       await req.user.save()
       res.send()
   } catch (err) {
       res.status(500).send()
   }
}

exports.deleteUser = async (req, res) => {
   try {
       await req.user.remove()
       res.send(req.user) 
   } catch (err) {
       res.status(500).send()
   }
}




exports.avatar = async (req, res) => {
    res.send('File Uploaded')
}