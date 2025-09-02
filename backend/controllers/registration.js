const Road = require('../models/Road');
const User = require('../models/User');


const generateCode = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i = 0; i<8; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const getCode = async () => {
    let unique = false;
    let code;

    while(!unique){
        code = generateCode();
        const exists = await Road.findOne({code: code});
        if(!exists){
            unique = true;
        }
    }

    return  code;
}

exports.register = async(req, res) => {
    try{
        const {name, pin, tender, mla, mp, parshad, contractor, registeredBy} = req.body;

        const code = await getCode();

        const road = new Road({code: code, name: name, pin: pin, tender: tender, mla: mla, mp: mp, parshad: parshad, contractor: contractor, registeredBy: registeredBy});

        await road.save();

        res.status(200).json({success: true, message: "Road Registered Successfully", code: code});
    } catch(err){
        console.error(err);
    }
}

exports.details = async (req, res) =>  {
    try{
        const code = req.params.id;

        const road = await Road.findOne({code: code});

        if(!road){
            return res.status(400).json({success: false, message: "Invalid Code"});
        }

        res.status(200).json({success: true, name: road.name, pin: road.pin, tender: road.tender, mla: road.mla, mp: road.mp, parshad: road.parshad, contractor: road.contractor, registeredBy: road.registeredBy});

    } catch(err){
        console.error(err);
    }
}