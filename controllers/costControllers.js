
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


    const createcosts = await costlist.findById(id).populate()

    if(!createcosts){
        return next(new ErrorResponse('Cost List creating failed', 400));
    }
    
    res.status(200).json({
        success: true,
        data: createcosts,
    })
})


