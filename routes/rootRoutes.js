const auth = require('./authRoutes')


const route = [{
        path: '/api/v1/auth',
        handler: auth
    },
    {
        path: '/',
        handler: (req,res,next)=>{
            res.send('sdfsfs')
        }
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