require('dotenv').config({path: __dirname + '/.env'})
const mongoose = require('mongoose')

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.on('open', function() {
    console.log('DB connection established')
    const app = require('./server')
    const port = process.env.PORT
    app.listen(port, console.log(`Server listening on port ${port}`))
})


