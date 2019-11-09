const express = require('express')
const router = require('./router')
const app = express()

//allows the body object to be attached to the request object
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', router)

module.exports = app