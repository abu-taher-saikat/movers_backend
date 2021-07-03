const auth = require('./authRoutes')


const route = [{
        path: '/auth',
        handler: auth
    }
]


module.exports = app => {
    route.forEach(r => {
        if (r.path == '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }

    })
}