const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/country/', countryRoutes);

// Connect to the database and start the server
mongoose.connect(process.env.MONGO_DATABASE)
    .then(() => {
        console.log("Database connected!!!");
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    });

// General error handling middleware
app.use((err, req, res, next) => {
    console.error("Unexpected error:", err);
    res.status(500).send("Internal Server Error");
});
