const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const {login, register} = require('../controllers/auth');
const User = require('../models/User');

// Verifying Token

router.get('/me', verifyToken, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({success: false, message: 'User Not Found'})
        }

        res.json({success: true, user});
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: 'Server Error'});
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token', {httpOnly: true, secure: false, sameSite: 'strict'})
    res.json({success: true, message: 'Logged Out'});
})

router.post("/register", register);
router.post("/login", login);

module.exports = router;