const mongoose = require('mongoose')
//GOOD PRACTICE TO KEEP THINGS RELATED TO THE SERVER ON A SEPERATE FILE FORM EXPRESS
//This file doesnt know about teh app so we must import it
const dotenv = require('dotenv')


//We need to npm i dotenv to be able to access environment variables
dotenv.config({
    path: './config.env'
})

//We make our connection to our data base through mongoose

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

//connection method returns a promise so we need to handle that promise
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    //console.log(con.connections)
    console.log('DB Connection Succesful 🤖')
})

const app = require('./app')

//By default Node sets the environment to develpemnt. We can check by logging below
console.log(app.get('env'))
//Node sets up a lot of environment variables by default. We can check those by logging like below
//console.log(process.env)

//TO SET UP ENVIRONMENT VARIABLES WE DO AS FOLLOWS on the terminal
//NODE_ENV=development nodemon server.js
//More commonly we do it by crating a configuration file

const port = process.env.PORT || 3000;
app.listen(port, () => {//Call back function that will be called as soon as server starts listening
    console.log(`App runing on port ${port}...`)
})