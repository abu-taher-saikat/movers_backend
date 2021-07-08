// const {Schema,model}  = require('mongoose')
const mongoose = require('mongoose');


const costListSchema = new mongoose.Schema({
        costList :[{
            costName : {
                type : String,
                required : [true, 'Please add a Cost Name']
            },
            quantity : {
                type : Number,
                default : 1
            },
            perUnitPrice : {
                type : Number,
                default : 0
            }
          }],
        jobListId: {
            type: mongoose.Schema.ObjectId,
            ref: 'joblists'
        },
        managerId: {
            type: mongoose.Schema.ObjectId,
            ref: 'admin'
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



