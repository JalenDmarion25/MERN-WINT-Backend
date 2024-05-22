const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');


const countryRoutes = require('./routes/countryRoutes');

require('dotenv').config();

const app = express();


// middleware

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})



app.use('/api/country/', countryRoutes)

mongoose.connect(process.env.MONGO_DATABASE).then(() =>{
    console.log("Database connected!!!");
    app.listen(process.env.PORT, () =>{
        console.log('Server is running on ', process.env.PORT)
    });
}).catch((error) => console.log(error));



