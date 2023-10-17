const express = require('express');
const router = express.Router();
const {
  createDriver,
  getDriver,
  updateDriver,
  deleteDriver,
} = require('../controllers/driverController');

// Create a new Driver
router.post('/drivers', createDriver);

// Get a Driver by ID
router.get('/drivers/:id', getDriver);

// Update a Driver by ID
router.put('/drivers/:id', updateDriver);

// Delete a Driver by ID
router.delete('/drivers/:id', deleteDriver);

module.exports = router;
