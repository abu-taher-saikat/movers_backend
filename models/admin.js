const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const adminSchema = new mongoose.Schema({
        // profilePic: {
        //     type : String,
        //     default: '/uploads/profile.png'
        // },
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

// AdminSchema.methods.matchPassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password);
// }

// AdminSchema.pre('save', async function(next){
//     if(!this.isModified('password')){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })


// Encrypt password using bcrypt
adminSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})


// Match user entered password to hashed password in database
adminSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
  }

adminSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRE
    });
}


//   Generate and hash password token   
// AdminSchema.methods.getResetPasswordToken = function(){
//     // Genereate Token
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     console.log(resetToken.green);
//     // Hash token and set the resetPassword token field 
//     this.resetPasswordToken = crypto
//         .createHash('sha256')
//         .update(resetToken)
//         .digest('hex');
//     console.log(resetToken.pink);
//     // Set expire 
//     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//     return resetToken;
// }

module.exports = mongoose.model('admin', adminSchema);

// const Admin = model('Admin',AdminSchema)
// module.exports = Admin
