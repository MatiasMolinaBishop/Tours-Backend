
const express = require('express');
//tour controller will now have access to all the function we export and are accessible as an object
const tourController = require('../controllers/tourController')

//We create a router
const router = express.Router()

//Param Middleware. Allows us to axt only on routes that have a param as the inde specified. In this case id
router.param('id', tourController.checkID)

//We define the routers route and the HTTP methods associated with such route
//To separate concenrns even more we create controllers wich take care of the logic and theese are imported on an object so we can access them as tourController.getAllTours

//app.use('/api/v1/tours', tourRouter) - THIS IS HOW IT IS IMPORTED AS A MIDLE WARE ON THE APP.JS FILE. SO THE BASE ROUTE IS /api/v1/tours

router
//Here I specify that all the routes that have /api/v1/tours. By calling tghe .route('/) methos on router
//Since we imported the tourController we can acces the logic for each route as a method.
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour)

router
    .route('/:id')
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)
    .get(tourController.getTour)

module.exports = router;