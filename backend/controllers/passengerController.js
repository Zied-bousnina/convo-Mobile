const { db } = require('../firebaseConfig');
const Passenger = require('../models/Passenger');

// Create a new passenger
exports.createPassenger = async (req, res) => {
  const { name, email, phone, address, password } = req.body;
  const passenger = new Passenger(null, name, email, phone, address, password);

  try {
    const docRef = await db.collection('passengers').add(passenger);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a passenger by ID
exports.getPassenger = async (req, res) => {
  try {
    const docRef = db.collection('passengers').doc(req.params.id);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
      const passengerData = snapshot.data();
      const passenger = new Passenger(
        req.params.id,
        passengerData.name,
        passengerData.email,
        passengerData.phone,
        passengerData.address,
        passengerData.password
      );
      res.json(passenger);
    } else {
      res.status(404).json({ error: 'Passenger not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a passenger by ID
exports.updatePassenger = async (req, res) => {
  const { name, email, phone, address, password } = req.body;
  const passenger = new Passenger(req.params.id, name, email, phone, address, password);

  try {
    const docRef = db.collection('passengers').doc(req.params.id);
    await docRef.set(passenger, { merge: true });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a passenger by ID
exports.deletePassenger = async (req, res) => {
  try {
    const docRef = db.collection('passengers').doc(req.params.id);
    await docRef.delete();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
