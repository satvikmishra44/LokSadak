const express = require('express');
const router = express.Router();
const {register, details} = require('../controllers/registration');

router.post('/register', register);
router.get('/details/:id', details);

module.exports = router;