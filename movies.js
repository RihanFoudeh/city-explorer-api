'use strict';
const axios = require('axios');


const movieKey = process.env.MOVIE_API_KEY;


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


  module.exports=getMovie;