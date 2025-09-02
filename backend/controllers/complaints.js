const express = require("express");
const cloudinary = require("../cloudinary");
const Complaint = require("../models/Complaint");

const router = express.Router();

router.post("/post", async(req, res) => {
    try{
        const {userId, roadId, detail, image} = req.body;

        if(!image){
            return res.status(400).json({error: "Image Is Required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(image, {folder: "complaints", resource_type: "image"});

        const complaint = new Complaint({userId: userId, roadId: roadId, detail: detail, imageUrl: uploadResponse.secure_url});

        await complaint.save();

        res.status(201).json({message: "Complaint Saved!", complaint});
    } catch(err){
        console.error("Error Saving Complaint: ", err);
        res.status(500).json({error: "Something Went Wrong!"});
    }
})

router.get("/get", async(req, res) => {
    try{
        const {userId} = req.query;
        const complaints = await Complaint.find({userId: userId});
        res.status(200).json(complaints);
    } catch(err){
        console.error(err);
        res.status(500).json({message: "An Error Occured"});
    }
})

router.get("/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        res.status(200).json(complaint);
    }catch(err){
        console.error(err);
    }
})

module.exports = router;