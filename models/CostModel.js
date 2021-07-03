const {Schema,model}  = require('mongoose')

const CostListSchema =  new Schema({
        costList : [
            {
                type:String,
                trim:true
            }
        ],
        jobListId: {
            type: Schema.Types.ObjectId,
            ref: 'JobListModel'
        },
        managerId: {
            type: Schema.Types.Objectid,
            ref: 'AdminModel'
        },
        total: Number
       

},{
    timestamps: true 
})
const CostList = model('CostList',CostListSchema)
module.exports = CostList



