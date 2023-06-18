const fs = require('fs');
//We read the file syncronously first since its the first thing the app will do. It wont block the code
//We are using the data within dev-data to simulate the tours before we have a data base
//We define the variable tour where we will save the data after it reads it from the file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


//WE DONT WANT TO REPEAT CODE ON ALL ROUTES WHERE WE NEED TO CHECK ID SO WE EXPORT THIS FUNCTION / MIDDLEWARE TO BE  USED ON THE ROUTER
//This will be used as call bak function for the router.param middleware we create on our router file. Therefore it will only apply to tour routes
exports.checkID = (req, res, next, val) => {// ':' specifies a variable which will be name in this case id
    console.log(`Tour id is: ${val}`);
    const id = req.params.id * 1; //This is a nice javascript of turning strings into numbers when the string looks like a number. In this case the id is a string because it comes from the url 

    if (id > tours.length) {
        //It is important to return as if the id is invalid we cant to end the request response cycle. 
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next()
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'bad request',
            message: 'Provide name and price'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {

    res.status(200).json({
        status: 'success',
        requestedTime: req.requestTime,
        results: tours.length,
        //We send the data as an object
        data: { tours }

    })
}

exports.getTour = (req, res) => {// ':' specifies a variable which will be name in this case id
    const tour = tours.find(el => el.id === req.params.id * 1)// This .find() takes a callback function that loops through the array and returns a new array with the element where the id equals the param id value
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }

    })
}


exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: '<updated tour here>...'

    })
}

exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        data: null,
        message: 'DELETED ROUTES TESTED'

    })

}

//We export each function seperately becaseu there is more than one export
