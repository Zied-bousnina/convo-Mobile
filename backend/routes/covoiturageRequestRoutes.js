const express = require('express');
const router = express.Router();
const {
  createCovoiturageRequest,
  getCovoiturageRequest,
  updateCovoiturageRequest,
  deleteCovoiturageRequest,
} = require('../controllers/covoiturageRequestController');

// Create a new Covoiturage Request
router.post('/covoiturageRequests', createCovoiturageRequest);

// Get a Covoiturage Request by ID
router.get('/covoiturageRequests/:id', getCovoiturageRequest);

// Update a Covoiturage Request by ID
router.put('/covoiturageRequests/:id', updateCovoiturageRequest);

// Delete a Covoiturage Request by ID
router.delete('/covoiturageRequests/:id', deleteCovoiturageRequest);

module.exports = router;
