const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI).then(console.log("Connected To Database")).catch((err) => console.log(err));

// Auth Routes
const authRoutes = require('./routes/create');
app.use('/auth', authRoutes);

// Road Routes
const roadRoutes = require('./routes/road');
app.use('/road', roadRoutes);

// Complaint Routes
const complaintRoutes = require("./controllers/complaints")
app.use("/complaint", complaintRoutes);

// Admin Routes
const adminRoutes = require("./controllers/admin");
app.use("/admin", adminRoutes);
 
app.listen(port, () => {
    console.log('Server is running on port 3000');
})