//Separation of concerns is important.
//This app.js file is usually used for middleware declarations / Express set up

const express = require('express');//We install express and create app.js file where we require express and store it ion a variable
const morgan = require('morgan');

//WE REQUIRE THE ROUTERS WE CREATE ON routes file
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

//1) MIDDLEWARES

app.use(express.json()); //// This is the middleware we need to have the data into the req. Function that can modify the incoming request data
//its called middleware because it stands in between the request and the response
app.use(morgan('dev'))
app.use((req, res, next) => {
    console.log('Middle wares must always call the next() 👽')
    next()
})
//Imagine we wanted to know when the requestes are made. We can create our own middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


//2) ROUTE HABDLERS

//3) ROUTES

//We define a router and use it instead of app
//This is actually a middleware so to be able to use it we must we must app.use
//First we define the route and then call the middleware tourRputes as callback function

//THIS IS WHERE WE MOUNT OUR ROUTERS
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


//4) START SERVER
//envionment variable that tells the absolute of the directory
//console.log(__dirname)
// const port = 3000;
// app.listen(port, () => {//Call back function that will be called as soon as server starts listening
//     console.log(`App runing on port ${port}...`)
// })

module.exports = app