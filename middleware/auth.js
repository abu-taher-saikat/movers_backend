const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/ErrorResponse');
// const Admin = require('../models/AdminModel');
// const Admin = require('../models/admin');
const admin = require('../models/admin');


// Protect routers (where we use protect user has to login)
exports.protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }


    // Make usre token exists
    if(!token){
        return next(new ErrorResponse('Not auththorize to access this route', 401));
    } 


    console.log('secret', process.env.JWT_SECRET);
    try{
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log('decoded', decoded);

        req.user = await admin.findById(decoded.id);
        next();
    }catch(err){
        return next(new ErrorResponse('Not authorized to access this route at last', 401));
    }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
    return(req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
        }
        next();
    }
}