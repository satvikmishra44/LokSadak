const mongoose = require('mongoose');

const person = new mongoose.Schema({
    name: {type: String, required: true},
    tenure: {type: String, required: true},
    party: {type: String}
})

const Road = mongoose.model('Roads', new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    pin: {type: Number, required: true},
    tender: {type: Number, required: true},
    mla : {type: person},
    mp: {type: person},
    parshad: {type: person},
    contractor: {type: person},
    registeredBy: {type: Number, required: true},
    inaugration: {type: Date, required: true, default: Date.now},
}))

module.exports = Road;