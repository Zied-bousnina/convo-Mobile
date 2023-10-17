const {db}= require("./firebaseConfig.js");
const Profile = require('../models/Profile');

// Create a new profile
exports.createProfile = async (req, res) => {
  const { name, email, password, role } = req.body;
  const profile = new Profile(null, name, email, password, role);

  try {
    const docRef = await db.collection('profiles').add(profile);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a profile by ID
exports.getProfile = async (req, res) => {
  try {
    const docRef = db.collection('profiles').doc(req.params.id);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
      const profileData = snapshot.data();
      const profile = new Profile(
        req.params.id,
        profileData.name,
        profileData.email,
        profileData.password,
        profileData.role
      );
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a profile by ID
exports.updateProfile = async (req, res) => {
  const { name, email, password, role } = req.body;
  const profile = new Profile(req.params.id, name, email, password, role);

  try {
    const docRef = db.collection('profiles').doc(req.params.id);
    await docRef.set(profile, { merge: true });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a profile by ID
exports.deleteProfile = async (req, res) => {
  try {
    const docRef = db.collection('profiles').doc(req.params.id);
    await docRef.delete();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
