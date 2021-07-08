
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const costlist = require('../models/costlist');
const joblists = require('../models/joblists')



// @desc   create a costlist
// @route  POST /api/v1/joblist/create/
// @access Private(manager)
exports.create = asyncHandler(async(req, res, next) => {
    const managerId = req.user.id ;

    const {costList, jobListId,  total } = req.body;

    const createcosts = await costlist.create({
        costList, jobListId, total, managerId
    })
    await joblists.findOneAndUpdate({ _id: jobListId }, {
        $push: {
            costListId: createcosts._id
        }
    })

    if(!createcosts){
        return next(new ErrorResponse('Cost List creating failed', 400));
    }
    
    res.status(200).json({
        success: true,
        data: createcosts,
    })
})





// @desc   get a costlist
// @route  GET /api/v1/cost/getcostbyjobid/:id
// @access Private(manager)
exports.getCostById = asyncHandler(async(req, res, next) => {
    const {id} = req.params;


    const createcosts = await costlist.findById(id)

    if(!createcosts){
        return next(new ErrorResponse('Cost List creating failed', 400));
    }
    
    res.status(200).json({
        success: true,
        data: createcosts,
    })
})




// @desc   Update a costlist
// @route  PUT /api/v1/cost/update/:id
// @access Private(manager)
exports.update = asyncHandler(async(req, res, next) => {
    const {id} = req.params;

    // get the spacific admin with id.
    let editcostlist = await costlist.findById(id);
  
    editcostlist = await costlist.findByIdAndUpdate(id , req.body, {
        new : true,
        runValidators : true
    });
  
    // if no user find with the id.
    if(!editcostlist){
      return next(new ErrorResponse(`no cost list find with this  cost id${id} id`, 404));
    }
  
    res.status(200).json({
      success:true,
      data: editcostlist
    })
})


