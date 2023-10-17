const {db}= require("./firebaseConfig.js");
const Driver = require('../models/Driver');

// Create a new driver
exports.createDriver = async (req, res) => {
  const { name, email, phone, address, license, car } = req.body;
  const driver = new Driver(null, name, email, phone, address, license, car);

  try {
    const docRef = await db.collection('drivers').add(driver);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a driver by ID
exports.getDriver = async (req, res) => {
  try {
    const docRef = db.collection('drivers').doc(req.params.id);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
      const driverData = snapshot.data();
      const driver = new Driver(
        req.params.id,
        driverData.name,
        driverData.email,
        driverData.phone,
        driverData.address,
        driverData.license,
        driverData.car
      );
      res.json(driver);
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a driver by ID
exports.updateDriver = async (req, res) => {
  const { name, email, phone, address, license, car } = req.body;
  const driver = new Driver(req.params.id, name, email, phone, address, license, car);

  try {
    const docRef = db.collection('drivers').doc(req.params.id);
    await docRef.set(driver, { merge: true });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a driver by ID
exports.deleteDriver = async (req, res) => {
  try {
    const docRef = db.collection('drivers').doc(req.params.id);
    await docRef.delete();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
