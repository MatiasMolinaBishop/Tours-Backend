//Separation of concerns is important.
//This app.js file is usually used for middleware declarations / Express set up

const express = require('express');//We install express and create app.js file where we require express and store it on a variable
const morgan = require('morgan'); //middle ware to log http rewuests and their corresponding infos

//WE REQUIRE THE ROUTERS WE CREATE ON routes file
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

//1) MIDDLEWARES

app.use(express.json()); //// This is the middleware we need to have the data into the req. Function that can modify the incoming request data
//its called middleware because it stands in between the request and the response
//We want to use only morgean during development. So it will only run while we are on our development envornment.
if (process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'))
}

//To be able to serve static files we need the follwoing builtin middleware. It is not our case as we will only have API endpoinst 
//Without this we cannot serve files that are in the public folder. HTM, img etc we would need this if we had handlebarsl..
app.use(express.static(`${__dirname}/public`))



app.use((req, res, next) => {
    console.log('Middle wares must always call the next() 👽')
    next()
})
//Imagine we wanted to know when the requestes are made. We can create our own middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


//2) ROUTE HANDLERS

//3) ROUTES

//This is actually a middleware so to be able to use it we must we must app.use
//First we define the route and then call the middleware tourRoutes as callback function

//THIS IS WHERE WE MOUNT OUR ROUTERS
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


module.exports = app