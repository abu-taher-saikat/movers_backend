const {Schema,model}  = require('mongoose')

const AdminSchema =  new Schema({
        profilePic: {
            type : String,
            default: '/uploads/profile.png'
        },
        fullName : {
            type : String,
            required : [true, 'Please add A fullName'],
            trim: true
        },
        email: {
            type:String,
            required: [true,'Please add Email'],
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
        role: {
            type:String,
            enum : ['admin', 'manager'],
            default : 'manager'
        },
        password : {
            type : String,
            required : [true, 'Please add a password'],
            minlength: 6
        }

},{
    timestamps: true 
})
const Admin = model('Admin',AdminSchema)
module.exports = Admin
