
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
      email
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




// @desc   Get All Users
// @route  GET /api/v1/auth/alladmins
// @access Public
exports.getAllUsers = asyncHandler(async(req, res, next) => {
  const alluser = await Admin.find();
  if(!alluser){
    res.status(200).json({
        success : true,
        data: "no user found"
    })
  }

  res.status(200).json({
      success : true,
      count : alluser.length,
      data : alluser
  })
})

// @desc   Get a specific user by userID
// @route  GET /api/v1/auth/admin/:id
// @access Public
exports.getSingleAdmin = asyncHandler(async(req, res, next) => {
    const {id} = req.params;

    const singleAdmin = await Admin.findById(id);
    
    // if no user find with the id.
    if(!singleAdmin){
      return next(new ErrorResponse(`no user found with this ${id} id`, 404));
    }

    res.status(200).json({
      success:true,
      data: singleAdmin
    })

})


// @desc   Delete A Admin by ID
// @route  DELETE /api/v1/auth/admin/:id
// @access Public
exports.deleteSingleAdmin = asyncHandler(async(req, res, next) => {
  const {id} = req.params;
  
  const deleteAdmin = await Admin.findByIdAndRemove(id);
  
  // if no user find with the id.
  if(!deleteAdmin){
    return next(new ErrorResponse(`no user found with this ${id} id`, 404));
  }

  res.status(200).json({
    success:true,
    data: {}
  })

})

// exports.updateNote = asyncHandler(async(req, res, next) => {
//   let note = await Note.findById(req.params.id);

//   if(!note){
//       return next(new ErrorResponse(`can't find notes with this id ${req.params.id}`, 400 ));
//   }

//   // Make sure USER is note owner
//   if(note.user.toString() !== req.user.id){
//       return  next(new ErrorResponse(`User ${req.params.id} is not authorized to update this note`, 401));
//   }

//   // find by id an update.
//   note = await Note.findByIdAndUpdate(req.params.id, req.body, {
//       new : true,
//       runValidators : true
//   });

//   // console.log(req.body.red);
//   // console.log(req.params.id.green);

//   res.status(200).json({
//       success : true,
//       data : note
//   })
// });


// @desc   Edit A Admin by ID
// @route  PUT /api/v1/auth/edit/:id
// @access Public
exports.updateSingleAdmin = asyncHandler(async(req, res, next) => {
  const {id} = req.params;

  // get the spacific admin with id.
  // let getAdmin = await Admin.findById(id);

  const editAdmin = await Admin.findByIdAndUpdate(id , req.body, {
      new : true,
      runValidators : true
  });

  // if no user find with the id.
  if(!editAdmin){
    return next(new ErrorResponse(`no user found with this ${id} id`, 404));
  }


  res.status(200).json({
    success:true,
    data: editAdmin
  })
  
})




//JWT_COOKIE_EXPIRE = 30
// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
    // Create token
    const token = admin.getSignedJwtToken();

    // options for cookies.
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
