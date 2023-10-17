const express = require('express');
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');

// Create a new Profile
router.post('/profiles', createProfile);

// Get a Profile by ID
router.get('/profiles/:id', getProfile);

// Update a Profile by ID
router.put('/profiles/:id', updateProfile);

// Delete a Profile by ID
router.delete('/profiles/:id', deleteProfile);

module.exports = router;
