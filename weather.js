
'use strict';
const weatherKey = process.env.WEATHER_API_KEY;
const axios = require('axios');


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


  module.exports=getWeather;