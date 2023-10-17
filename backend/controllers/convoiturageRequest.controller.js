const {db}= require("./firebaseConfig.js");
const CovoiturageRequest = require('../models/CovoiturageRequest');

// Create a new Covoiturage Request
exports.createCovoiturageRequest = async (req, res) => {
  const { idUser, idCovoiturage, status } = req.body;
  const covoiturageRequest = new CovoiturageRequest(null, idUser, idCovoiturage, status);

  try {
    const docRef = await db.collection('covoiturageRequests').add(covoiturageRequest);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Covoiturage Request by ID
exports.getCovoiturageRequest = async (req, res) => {
  try {
    const docRef = db.collection('covoiturageRequests').doc(req.params.id);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
      const covoiturageRequestData = snapshot.data();
      const covoiturageRequest = new CovoiturageRequest(
        req.params.id,
        covoiturageRequestData.idUser,
        covoiturageRequestData.idCovoiturage,
        covoiturageRequestData.status
      );
      res.json(covoiturageRequest);
    } else {
      res.status(404).json({ error: 'Covoiturage Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Covoiturage Request by ID
exports.updateCovoiturageRequest = async (req, res) => {
  const { idUser, idCovoiturage, status } = req.body;
  const covoiturageRequest = new CovoiturageRequest(req.params.id, idUser, idCovoiturage, status);

  try {
    const docRef = db.collection('covoiturageRequests').doc(req.params.id);
    await docRef.set(covoiturageRequest, { merge: true });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Covoiturage Request by ID
exports.deleteCovoiturageRequest = async (req, res) => {
  try {
    const docRef = db.collection('covoiturageRequests').doc(req.params.id);
    await docRef.delete();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
