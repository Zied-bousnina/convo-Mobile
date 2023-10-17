var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()
var indexRouter = require('./routes/index');

const {db}= require("./firebaseConfig.js");
const { FieldValue } = require('firebase-admin/firestore');
const twilio = require("twilio");
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID, // Your Twilio Account SID
  process.env.TWILIO_AUTH_TOKEN  // Your Twilio Auth Token
);



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.post("/send-otp", (req, res) => {
    const phoneNumber = req.body.phoneNumber; // The phone number to send the OTP to
    // const otp = generateOTP(); // Implement your OTP generation logic

    // Send the OTP via SMS
    twilioClient.messages.create({
      to: "+21656981500",
      from: "+21656981500",
      body: `Your OTP is: 555`
    })
    .then(message => {
      console.log(`OTP sent: ${message.sid}`);
      res.status(200).send("OTP sent successfully");
    })
    .catch(error => {
      console.error(`Error sending OTP: ${error}`);
      res.status(500).send("Error sending OTP");
    });
  });




app.get('/addfriend', async (req, res) => {
    const peopleRef = db.collection('users').doc('Oe4lr59vNzHKwOGHDBon')
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})

module.exports = app;
