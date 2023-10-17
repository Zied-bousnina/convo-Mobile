const express = require('express');
const router = express.Router();
const {
  createPassenger,
  getPassenger,
  updatePassenger,
  deletePassenger,
} = require('../controllers/passengerController');

// Create a new Passenger
router.post('/passengers', createPassenger);

// Get a Passenger by ID
router.get('/passengers/:id', getPassenger);

// Update a Passenger by ID
router.put('/passengers/:id', updatePassenger);

// Delete a Passenger by ID
router.delete('/passengers/:id', deletePassenger);

module.exports = router;
