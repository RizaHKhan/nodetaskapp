const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
const taskController = require('./controller/taskController')
const auth = require('./middleware/auth')
const multer = require('multer')

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        cb(new Error('File Must be a PDF'))
        cb(undefined, true)
        cb(undefined, false)
    }
})

router.get('/', (req, res) => {
    res.send('Welcome to our app')
})

//register and login users
router.post('/register', userController.register)
router.post('/login', userController.login)
router.delete('/deleteUser/me', auth.authentication, userController.deleteUser)

router.post('/logout', auth.authentication, userController.logout)
router.post('/logoutAll', auth.authentication, userController.logoutAll)

//get all users
router.get('/users/me', auth.authentication, userController.users)

//task routes
router.post('/task', auth.authentication, taskController.createTask)
router.delete('/task', auth.authentication, taskController.deleteTask)
router.get('/task/:id', auth.authentication, taskController.getTaskById)
router.get('/task', auth.authentication, taskController.getAllTasks)


//uploading avatar
router.post('/users/me/avatar', auth.authentication, upload.single('upload'), userController.avatar)

module.exports = router