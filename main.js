$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?s=' +searchText +'&apikey=9be27fce')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) =>{
            output += `
            <style>

            a.btn.btn-primary{
                padding:7px;
                text-align:center;
                font-size: 12px;
            }

            p{
                text-align:center;
                font-size: 12px;
            }
            .card{
                margin:10px 15px;
                border-radius: 13px;
                width :180px;
                height: 400px;

            }
            .card img{
                width :180px;
                height: 253px;
                border-top-left-radius: 13px;
                border-top-right-radius: 13px;
            }
            </style>
            <div class="card">
            <img src="${movie.Poster}" class="card-img-top">
            <div class="card-body">
              <p class="card-title">${movie.Title}(${movie.Year})</p>
              <a onclick="movieSelected('${movie.imdbID}','${movie.Title}','${movie.Year}')"href="#" class="btn btn-primary">Click here for details</a>
            </div>
          </div>
            `;
        });
        $('#movies').html(output);  
    })
    .catch((err) =>{
        console.log(err);
    });
}
function movieSelected(id, title, year){
    sessionStorage.setItem('movieId', id);
    sessionStorage.setItem('movieTitle', title);
    sessionStorage.setItem('movieYear', year);
    

    window.location = "movie.html";
    return false;
}

  function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
  
    axios.get('http://www.omdbapi.com?i='+movieId +'&apikey=9be27fce')
      .then((response) => {
        console.log(response);
        let movie = response.data;
  
        let output =`
        <style>
        
        img.card-img{
            width:80%;
            margin: 14px 30px;
        
        }
        </style>
        <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="card-img">
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h2>${movie.Title}(${movie.Year})</h2>
              <p class="card-text"><strong>Genre:</strong> ${movie.Genre}</p>
              <p class="card-text"><strong>Duration:</strong> ${movie.Runtime}</p>
              <p class="card-text"><strong>Rated:</strong> ${movie.Rated}</p>
              <p class="card-text"><strong>IMDB Rating:</strong> ${movie.imdbRating} &#11088</p>
              <p class="card-text"><strong>Director:</strong> ${movie.Director}</p>
              <p class="card-text"><strong>Writer:</strong> ${movie.Writer}</p>
              <p class="card-text"><strong>Actors:</strong> ${movie.Actors}</p>
              <p class="card-text"><strong>Plot:</strong> ${movie.Plot}}</p>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>
        </div>
      </div>
        `;
  
        $('#movie').html(output);
      })
      .catch((err) => {
        console.log(err);
      
      });
}


  function videoSearch(key, movieTitle, maxResult){
    var API_KEY = "AIzaSyBq-HNMmlCYZy7Cb3jzP3328eqOyQYWU1s";
  var video = ''

 var movieTitle =  sessionStorage.getItem('movieTitle');
 var movieYear =  sessionStorage.getItem('movieYear');
      $.get("https://www.googleapis.com/youtube/v3/search?key="+ API_KEY + "&type=video&part=snippet&maxResults=1&q=" + movieTitle + movieYear,function(data){
          console.log(data)
          data.items.forEach(item => {
            video = `
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            $("#videos").append(video)
        });


      })
  }
  
  
  