
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const costlist = require('../models/costlist');
const joblists = require('../models/joblists')



// @desc   create a joblist
// @route  POST /api/v1/joblist/create/
// @access Private(manager)
exports.create = asyncHandler(async(req, res, next) => {
    const managerId = req.user.id ;

    const {costList, jobListId,  total } = req.body;

    const costlist = await costlist.create({
        costList, jobListId, total, managerId
    })

    if(!costlist){
        return next(new ErrorResponse('Job List creating failed', 400));

    }
    
    res.status(200).json({
        success: true,
        data: joblist,
    })
})

