const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const colors = require("colors");
const cookieParser = require('cookie-parser');

dotenv.config({path : './config/.env'});

// Database connection middlewares
const connectDB = require('./config/db');
// express error handler.
// const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const errorHandler = require('./middleware/error');



// const auth = require('./routes/authRoutes');



const app = express();
connectDB();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


// middleware and Route call
const rootMiddleware = require('./middleware/rootMiddleware')
const rootRoutes = require('./routes/rootRoutes')

// use midleware and Route
rootMiddleware(app)
// route
rootRoutes(app)


// app.use('/api/v1/auth', auth);




// calling back error handler. you have to remember it's a middle ware.and middleware need to be call after calling routes , that;s why it's on the bottom of everything..
// Error handler middlewares . 
// app.use(notFound);
// app.use(errorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${process.env.NODE_ENV}, and mode is ${MODE} and port on ${PORT} !`.yellow);
});


// Handle unhandled promise rejection.
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.white.bold);
    // Close server and exit process
    server.close(()=> process.exit(1));
})