
const express = require('express');
//tour controller will now have access to all the function we export and are accessible as an object
const tourController = require('../controllers/tourController')

//We create a router
const router = express.Router()

//Param Middleware. Allows us to axt only on routes that have a param as the inde specified. In this case id
router.param('id', tourController.checkID)

//We define the routers route and the HTTP methods associated with such route
//To separate concenrns even more we create controllers wich take care of the logic and theese are important on an object so we can access them as tourController.getAllTours
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour)

router
    .route('/:id')
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)
    .get(tourController.getTour)

module.exports = router;