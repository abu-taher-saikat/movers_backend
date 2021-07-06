const mongoose = require('mongoose');

const connectDB =  async ()=>{

    try{
        const conn = await mongoose.connect( process.env.DATABASE_URI,{
            //must add in order to not get any error masseges:
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify : false
        })
        console.log(`mongo database is connected!!! ${conn.connection.host} `.cyan.underline)
    }catch(error){
        console.error(`Error: ${error} `.red.underline.bold);
        process.exit(1) //passing 1 - will exit the proccess with error
    }

}

module.exports = connectDB;