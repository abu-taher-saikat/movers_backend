
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const joblists = require('../models/joblists');
const admin = require('../models/admin');


// @desc   create a joblists
// @route  POST /api/v1/joblists/create
// @access Private(manager)
exports.create = asyncHandler(async(req, res, next) => {
    const managerId = req.user.id ;
    const {customerName, email, phone, moveFrom, moveTo,notes, movingDate,items,advancePay,due,vat,isPaid,payment,status} = req.body;

    const joblists = await joblists.create({
        customerName,
        email,
        phone,
        moveFrom,
        moveTo,
        movingDate,
        items,
        advancePay,
        due,
        vat,
        isPaid,
        payment,
        status,
        notes,
        managerId,
    })

    if(!joblists){
        return next(new ErrorResponse('Job List creating failed', 400));

    }
    
    res.status(200).json({
        success: true,
        data: joblists,
    })
})


// @desc   get All Job lists by indivisual manager
// @route  POST /api/v1/joblists/getjobesbymanagerid
// @access Private(admin, manager)
exports.getJobByManagerId = asyncHandler(async(req, res, next) => {
    const id = req.user.id
    const managerJob = await joblists.find({managerId : id});

    // if no jobs found with this manager id
    if(!managerJob){
        return next(new ErrorResponse('No job found with this manager id', 400));
    }
    
    res.status(200).json({
        success: true,
        count : managerJob.length,
        data: managerJob
    })
})


// @desc   get All Job lists by indivisual manager
// @route  POST /api/v1/joblists/getmanagerjobsbyadmin/:id
// @access Private(admin, manager)
exports.getManagerJobsByAdmin = asyncHandler(async(req, res, next) => {
    const {id} = req.params;

    const managerJob = await joblists.find({managerId : id});

    // if no jobs found with this manager id
    if(!managerJob){
        return next(new ErrorResponse('No job found with this manager id', 400));
    }
    
    res.status(200).json({
        success: true,
        count : managerJob.length,
        data: managerJob
    })
})


// @desc   update A Job list with job id.
// @route  POST /api/v1/joblists/update/:id
// @access Private
exports.update = asyncHandler(async(req, res, next) => {
    const {id} = req.params;

  // get the spacific admin with id.
  let editjoblists = await joblists.findById(id);

  editjoblists = await joblists.findByIdAndUpdate(id , req.body, {
      new : true,
      runValidators : true
  });

  // if no user find with the id.
  if(!editjoblists){
    return next(new ErrorResponse(`no job found with this ${id} id`, 404));
  }

  res.status(200).json({
    success:true,
    data: editjoblists
  })

})


// @desc   Delete A joblists by ID
// @route  DELETE /api/v1/auth/delete/:id
// @access Private
exports.deleteJob = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    
    const deletejoblists = await joblists.findByIdAndRemove(id);
    
    // if no user find with the id.
    if(!deletejoblists){
      return next(new ErrorResponse(`no job found with this ${id} id`, 404));
    }
  
    res.status(200).json({
      success:true,
      data: {}
    })
  
  })



  // @desc   Get all jobs By Admin
// @route  PUT /api/v1/auth/alljobs
// @access Private
exports.getAllJobByAdmin = asyncHandler(async(req, res, next) => {
  // get the spacific admin with id.
  const allJobs = await joblists.find();

  // if no jobs find with the id.
  if(!allJobs){
    return next(new ErrorResponse(`no job found`, 404));
  }

  res.status(200).json({
    success:true,
    count : allJobs.length,
    data: allJobs,
  })
  
})