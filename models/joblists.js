const mongoose = require('mongoose');

const JobListSchema = new mongoose.Schema({
        customerName : {
            type : String,
            required : [true, 'Please add customer Name'],
            trim: true
        },
        email : {
            type:String,
            unique : true,
            match : [
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                'Please add a valid email..'
            ],
            trim: true
        },
        phone : {
            type : Number,
            trim: true,
            required: [true,"Please add a phone number"]
        },
    
        moveFrom : {
            type : String,
            required:[true,"Please add move From address location"],
            trim: true
        },
        moveTo: {
            type: String,
            required:[true,'Please add move to location'],
            trim: true
        },
        movingDate:{
            type :Date,
            required:[true,'Plaeas submit your moving date']
        },
        items:[{
          itemName : {
              type : String,
              required : [true, 'Please add a Item Name']
          },
          itemQuantity : {
              type : Number,
              default : 1
          }
        }],
        advancePay:{
            type : Number,
            default : 0.00
        },
        due: {
            type : Number,
            default : 0.00
        },
        vat: {
            type : Number,
            default : 0.00
        },
        isPaid: {
            type : Boolean,
            default : false
        },
        payment: Number,
        status: {
            type:String,
        },
        notes:String,
        managerId: {
            type: mongoose.Schema.ObjectId,
            ref: 'admin'
        },
        costListId: {
            type: mongoose.Schema.ObjectId,
            ref: 'costlist'
        },
},{
    timestamps: true 
})

module.exports = mongoose.model('joblists', JobListSchema);


