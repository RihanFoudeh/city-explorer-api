'use strict';

require('dotenv').config(); //to import dotenv
const express = require('express'); //import express
const cors = require('cors'); //import cors


const getWeather =require('./weather')

const getMovie =require('./movies')
const server = express();
server.use(cors()); // make my server opened for any client

const PORT = process.env.PORT; //take the port from .env file
//

// http://localhost:3010/
server.get('/',(req,res)=>{
    res.send('Hello from the home route')
})

// http://localhost:3010/weather?searchQuery=Amman
server.get('/weather',getWeather);
// http://localhost:3010/movies?searchQuery=Amman
server.get('/movies',getMovie);


server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})