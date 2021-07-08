// const {Schema,model}  = require('mongoose')
const mongoose = require('mongoose');


const costListSchema = new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobListModel'
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AdminModel'
        },
        total: {
            type : Number,
            default : 0.00
        }
},{
    timestamps: true 
})


module.exports = mongoose.model('costlist', costListSchema);

// const CostList = model('costlist',costListSchema)
// module.exports = CostList



