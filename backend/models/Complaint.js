const mongoose = require('mongoose');

const complaint = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    roadId : {type: String, required: true},
    detail: {type: String, required: true},
    imageUrl: {type: String, required: true},
    submittedOn: {type: Date, default: Date.now},
    status: {type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending"},
    remarks: {type: String, default: ""},
    resolvedBy: {type: Number}
})

module.exports = mongoose.model("Complaint", complaint);