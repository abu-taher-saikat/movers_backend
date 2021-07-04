
const Admin = require('../models/AdminModel'); 
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');


// @desc   Register a user
// @route  POST /api/v1/auth/register
// @access Public

exports.register = asyncHandler(async(req, res, next) => {
    const {fullName, email, password, role, phone} = req.body;

    // Create user 
    const admin = await Admin.create({
        fullName,
        email, 
        password,
        role,
        phone
    })

    sendTokenResponse(admin, 200, res);
})

// @desc   Login user
// @route  POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const {
      email,
      password
  } = req.body;

  // Validate email & password
  if (!email || !password) {
      return next(new ErrorResponse('Please provie and email and password', 400));
  }

  //Check for user
  const user = await Admin.findOne({
      email: email
  }).select('+password');

  // if no user
  if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  // const token = user.getSignedJwtToken();
  // res.status(200).json({success : true, token });

  sendTokenResponse(user, 200, res);
})




//JWT_COOKIE_EXPIRE = 30
// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
    // Create token
    const token = admin.getSignedJwtToken();

    const options = {
      expiresIn : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly : true
    };

if(process.env.NODE_ENV === 'production'){
      options.secure = true
    }

    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({ success : true , token})
}
