// Routes To Be Created:- Officer Account Creation, Complaint Management(1 Route For Listing All Complaints, Another Route For Getting Details Of The
// Complaint and Giving Remarks Or Updating State of It), One For Filtering Pending And In Progress Requests, Can Also Modify The Schema To Include Resolved 
// By To get Details Of The Employee Who Have Marked It As Done, so to make him accountable for it.

const express = require('express');
const Complaint = require('../models/Complaint');

router = express.Router();

// Get All Complaints
router.get("/pending", async(req, res) => {
    try{
        const complaints = await Complaint.find({status: "Pending"});
        res.status(200).json(complaints);
    }catch(err){
        console.error(err);
    }
})

// Get Only Current Admin's Complaints
router.get("/my", async(req, res) => {
    try{
        const { id } = req.query;
        const complaints = await Complaint.find({resolvedBy: id});

        if(!complaints){
            res.status(500).json({success: false, message: "Looks Like You Don't Have An Assigned Case"})
        }

        res.json(complaints);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

// Find A Complaint
router.get("/find", async(req, res) => {
    try{
        const {id} = req.query;
        const complaint = await Complaint.findById(id);
        if(!complaint){
            res.status(404).json({success: false, message: "Complaint Not Found"})
        }

        res.json(complaint);
    } catch(err){
        res.status(500).json({success: false, message: err.message});
    }
})

// Update A Complaint
router.put("/complaint/:id", async(req, res) => {
    try{
        const { remarks, status, userId } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(req.params.id, {remarks: remarks, status: status, resolvedBy: userId}, {new: true});
        if(!complaint){
            return res.json(404).json({success: false, message: "Complaint Not Found"})
        }

        res.json({success: true, complaint: complaint});
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

module.exports = router;