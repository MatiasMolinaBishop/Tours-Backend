//GOOD PRACTICE TO KEEP THINGS RELATED TO THE SERVER ON A SEPERATE FILE FORM EXPRESS
//This file doesnt know about teh app so we must import it

const app = require('./app')

const port = 3000;
app.listen(port, () => {//Call back function that will be called as soon as server starts listening
    console.log(`App runing on port ${port}...`)
})