const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateIDN = async () => {
    let unique = false;
    let idn;

    while(!unique){
        idn = Math.floor(10000 + Math.random()*90000);

        const exist = await User.findOne({id: idn});

        if(!exist){
            unique = true;
        }
    }

    return idn;
}

const register = async (req, res) => {
    try{
        const { name, email, password, officer = false } = req.body;

        const exists = await User.findOne({email});

        if(exists){
            return res.status(400).json({success: false, message: 'Email already exists'});
        }

        const hashed = await bcrypt.hash(password, 10);

        if(officer) {
            const idn = await generateIDN();
            const user = new User({name: name, email: email, password: hashed, officer: officer, id: idn});
            await user.save();
            res.status(200).json({success: true, message: 'User created successfully'});
            return ;
        }
        
        const user = new User({name: name, email: email, password: hashed, officer: officer});
        await user.save();

        res.status(200).json({success: true, message: 'User created successfully', idn: (idn ? idn : 0)});
    } catch(err){
        console.error(err);
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body;

            const user = await User.findOne({email});

            if(!user){
                return res.status(400).json({success: false, message: "User Doesn't Exist"});
            }
            const check = await bcrypt.compare(password, user.password);

            if(!check){
                return res.status(400).json({success: false, message: 'Invalid Password'});
            }

            const token = jwt.sign({id: user._id}, process.env.Token, {expiresIn: '3d'});

            // setting cookie for authentication
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 3*24*60*60*1000
            });

            return res.status(200).json({success: true, name: user.name, email: user.email, officer: user.officer});
    } catch(err){
        console.error(err);
    }
}

module.exports = {register, login};