'use strict';

require('dotenv').config(); //to import dotenv
const express = require('express'); //import express
const cors = require('cors'); //import cors
// const weather = require('./data/weather.json');
const axios = require('axios');


const server = express();
server.use(cors()); // make my server opened for any client

const PORT = process.env.PORT; //take the port from .env file
const weatherKey = process.env.WEATHER_API_KEY;
const movieKey = process.env.MOVIE_API_KEY;


// http://localhost:3010/
server.get('/',(req,res)=>{
    res.send('Hello from the home route')
})

// http://localhost:3010/weather?searchQuery=Amman
server.get('/weather',getWeather);
// http://localhost:3010/movies?searchQuery=Amman
server.get('/movies',getMovie);

// server.get('/weather',(req,res)=>{
//     const name = req.query.searchQuery;
//     const lat = req.query.lat;
//     const lon = req.query.lon;
//     try{
//     const result = weather.find( (item) =>{
//         if(item.city_name === name && item.lat === lat && item.lon === lon){
//           return item;
//         }      
        
//     })

//     let data = result.data.map(item=>{
//       return new Forcast(item);
//     })

//     res.send(data);
//   }
//   catch{
//     res.send('404 Not Found');
//   }
// })

function getWeather(req, res) {
  let query = req.query.searchQuery;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${weatherKey}`;

  axios
  .get(url)
  .then( result => {
    // console.log(result.data)
    let newWeather =  result.data.data.map(item => {
      return new Forcast(item);
    })

    res.send(newWeather)
  })
  .catch(err => console.log(err))

  // console.log(url)
  // res.send({
  //   message: 'from the server side'
  // })
}


class Forcast {
  constructor(item){
    this.date = item.valid_date;
    this. description= `Low of ${item.low_temp}, high of ${item.max_temp} with broken clouds${item.weather.description}` ;
  }
}

function getMovie(req, res) {
  let query = req.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${query}`;

  axios
  .get(url)
  .then( result => {
    // console.log(result.data)
    let newMovie =  result.data.results.map(item => {
      return new Movie(item);
    })

    res.send(newMovie)
  })
  .catch(err => console.log(err))

  // console.log(url)
  // res.send({
  //   message: 'from the server side'
  // })
}




class Movie {
  constructor(item){
    this.title = item.title;
    this. overview= item.overview;
    this. average_votes= item.vote_average;
    this. total_votes= item.vote_count;
    this. image_url= `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
    this. popularity= item.popularity;
    this. released_on= item.release_date;
  }
}

//     title": "Sleepless in Seattle",
//     "overview": "A young boy who tries to set his dad up on a date after the death of his mother. He calls into a radio station to talk about his dad’s loneliness which soon leads the dad into meeting a Journalist Annie who flies to Seattle to write a story about the boy and his dad. Yet Annie ends up with more than just a story in this popular romantic comedy.",
//     "average_votes": "6.60",
//     "total_votes": "881",
//     "image_url": "https://image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg",
//     "popularity": "8.2340",
//     "released_on": "1993-06-24"

// to make our server listen on PORT
server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})