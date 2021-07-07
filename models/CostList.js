const {Schema,model}  = require('mongoose')

const CostListSchema =  new Schema({
        costList :[{
            costName : {
                type : String,
                required : [true, 'Please add a Cost Name']
            },
            itemQuantity : {
                type : Number,
                default : 1
            },
            perUnitPrice : {
                type : Number,
                default : 0
            }
          }],
        jobListId: {
            type: Schema.Types.ObjectId,
            ref: 'JobListModel'
        },
        managerId: {
            type: Schema.Types.Objectid,
            ref: 'AdminModel'
        },
        total: {
            type : Number,
            default : 0.00
        }
},{
    timestamps: true 
})

const CostList = model('CostList',CostListSchema)
module.exports = CostList



