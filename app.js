const fs = require('fs');
const express = require('express');//We install express and create app.js file where we require express and store it ion a variable
const morgan = require('morgan');

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

//We read the file syncronously first since its the first thing the app will do. It wont block the code
//We are using the data within dev-data to simulate the tours before we have a data base
//We define the variable tour where we will sivae the data after it reads it from the file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//2) ROUTE HABDLERS

const getAllTours = (req, res) => {

    res.status(200).json({
        status: 'success',
        requestedTime: req.requestTime,
        results: tours.length,
        //We send the data as an object
        data: { tours }

    })
}

const getTour = (req, res) => {// ':' specifies a variable which will be name in this case id
    console.log(req.params);
    const id = req.params.id * 1; //This is a nice javascript of turning strings into numbers when the string looks like a number. In this case the id is a string because it comes from the url 

    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    const tour = tours.find(el => el.id === id)// This .find() takes a callback function that loops through the array and returns a new array with the element where the id equals the param id value
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }

    })
}

const createTour = (req, res) => {
    console.log(req.body);
    // res.send('Done') WE CAN ONLY SEND ONE RES SO WE WILL COMMENT THIS OUT NOW
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body) //This allows us to merge 2 objects creating a new object with the two
    //Now we want to add this new tour to the tours array
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        //201 is the status for created
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour
            }
        })
    })//Here we write the new arr into the file asyncronously
}

const updateTour = (req, res) => {
    console.log(req.params.id)

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: '<updated tour here>...'

    })
}

const deleteTour = (req, res) => {
    console.log(req.params.id)

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null,
        message: 'DELETED ROUTES TESTED'

    })

}
//app.get('/api/v1/tours', getAllTours)
//app.get('/api/v1/tours/:id', getTour)
//app.post('/api/v1/tours', createTour)
//app.patch('/api/v1/tours/:id', updateTour)
//app.delete('/api/v1/tours/:id', deleteTour)
//Good practice using Router
//THIS IS TEH SAME AS THE GET ROUTE ABOVE

//3) ROUTES
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app
    .route('/api/v1/tours/:id')
    .patch(updateTour)
    .delete(deleteTour)
    .get(getTour)


//4) START SERVER
//envionment variable that tells the absolute of the directory
//console.log(__dirname)
const port = 3000;
app.listen(port, () => {//Call back function that will be called as soon as server starts listening
    console.log(`App runing on port ${port}...`)
})
