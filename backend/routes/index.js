var express = require('express');
const { Register } = require('../controllers/users.controller');
var router = express.Router();

/* GET home page. */
router.post('/register',Register)

module.exports = router;
