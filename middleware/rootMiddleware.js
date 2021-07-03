const morgan = require('morgan')
const express = require('express')
// const config = require('config')
// const { bindUserWithRequest } = require('./authinticate')
// const setLocal = require('./setLocals')
// const session = require('express-session')
// var MongoDBStore = require('connect-mongodb-session')(session);


// const URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0-wqw2c.mongodb.net/store?retryWrites=true&w=majority`

// var store = new MongoDBStore({
//     uri: URI,
//     collection: 'storeSession'
// });

const middlewares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.static('public'),

    express.json(),
    // session({
    //     secret: config.get('secret'),
    //     resave: false,
    //     saveUninitialized: false,
    //     store: store,
    // }),
    // flash(),
    // bindUserWithRequest(),
    // setLocal()


]


module.exports = app => {
    middlewares.forEach(m => {
        app.use(m)
    })
}