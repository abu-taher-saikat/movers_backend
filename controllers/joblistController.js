
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const JobList = require('../models/jobListModel');
const Admin = require('../models/AdminModel'); 
// const CostList = require('../models/CostModel');



// @desc   create a joblist
// @route  POST /api/v1/joblist/create
// @access Private(manager)
exports.create = asyncHandler(async(req, res, next) => {
    const managerId = req.user.id ;
    const {customerName, email, phone, moveFrom, moveTo,notes, movingDate,items,advancePay,due,vat,isPaid,payment,status} = req.body;

    const joblist = await JobList.create({
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

    if(!joblist){
        return next(new ErrorResponse('Job List creating failed', 400));

    }
    
    res.status(200).json({
        success: true,
        data: joblist,
    })
})


// @desc   get All Job lists by indivisual manager
// @route  POST /api/v1/joblist/getjobesbymanagerid
// @access Private(admin, manager)
exports.getJobByManagerId = asyncHandler(async(req, res, next) => {
    const id = req.user.id
    const managerJob = await JobList.find({managerId : id});

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
// @route  POST /api/v1/joblist/getmanagerjobsbyadmin/:id
// @access Private(admin, manager)
exports.getManagerJobsByAdmin = asyncHandler(async(req, res, next) => {
    const {id} = req.params;

    const managerJob = await JobList.find({managerId : id});

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
// @route  POST /api/v1/joblist/update/:id
// @access Private
exports.update = asyncHandler(async(req, res, next) => {
    const {id} = req.params;

  // get the spacific admin with id.
  let editJobList = await JobList.findById(id);

  editJobList = await JobList.findByIdAndUpdate(id , req.body, {
      new : true,
      runValidators : true
  });

  // if no user find with the id.
  if(!editJobList){
    return next(new ErrorResponse(`no job found with this ${id} id`, 404));
  }

  res.status(200).json({
    success:true,
    data: editJobList
  })

})


// @desc   Delete A Joblist by ID
// @route  DELETE /api/v1/auth/delete/:id
// @access Private
exports.deleteJob = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    
    const deleteJoblist = await JobList.findByIdAndRemove(id);
    
    // if no user find with the id.
    if(!deleteJoblist){
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
  const allJobs = await JobList.find();

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