'use strict';

require('dotenv').config(); //to import dotenv
const express = require('express'); //import express
const cors = require('cors'); //import cors
const weather = require('./data/weather.json');


const server = express();
server.use(cors()); // make my server opened for any client

const PORT = process.env.PORT; //take the port from .env file

// http://localhost:3010/
server.get('/',(req,res)=>{
    res.send('Hello from the home route')
})

// http://localhost:3010/weather?searchQuery=Amman&lat=''&lon=''
server.get('/weather',(req,res)=>{
    const name = req.query.searchQuery;
    const lat = req.query.lat;
    const lon = req.query.lon;
    try{
    const result = weather.find( (item) =>{
        if(item.city_name === name && item.lat === lat && item.lon === lon){
          return item;
        }      
        
    })

    let data = result.data.map(item=>{
      return new Forcast(item);
    })

    res.send(data);
  }
  catch{
    res.send('404 Not Found');
  }
})

class Forcast {
  constructor(item){
    this.date = item.valid_date;
    this. description= item.weather.description ;
  }
}

// to make our server listen on PORT
server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})