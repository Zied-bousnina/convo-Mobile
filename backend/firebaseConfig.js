// const firebase = require('firebase-admin');
const {initializeApp, cert} = require("firebase-admin/app")
const {getFirestore} = require('firebase-admin/firestore')

const serviceAccount = require('./creds.json')

initializeApp({
  credential: cert(serviceAccount)

})

const db = getFirestore()

module.exports = {db}


// const config = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,

//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// };

// firebase.initializeApp(config);

// module.exports = firebase;
