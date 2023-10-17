var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()
var indexRouter = require('./routes/index');

const {db}= require("./firebaseConfig.js");
const { FieldValue } = require('firebase-admin/firestore');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);



app.get('/addfriend', async (req, res) => {
    const peopleRef = db.collection('users').doc('Oe4lr59vNzHKwOGHDBon')
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})

module.exports = app;
