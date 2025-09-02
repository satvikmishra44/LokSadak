const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    officer: {type: Boolean, required: true, default: false},
    id: {type: Number, unique: true, sparse: true},
}))

module.exports = User;