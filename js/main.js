$(document).ready(function () {
  $('#searchForm').on('submit', function (e) {
    //console.log(e);
    //console.log($('#searchText').val());
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  //console.log(searchText);
  axios.get(`http://www.omdbapi.com/?s=${searchText}&apikey=b0e0a161`)
    .then(function (response) {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, function (index, movie) {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=b0e0a161`)
    .then(function (response) {
      //console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre: ${movie.Genre}</strong></li>
              <li class="list-group-item"><strong>Released: ${movie.Released}</strong></li>
              <li class="list-group-item"><strong>Rated: ${movie.Rated}</strong></li>
              <li class="list-group-item"><strong>IMDB Rating: ${movie.imdbRating}</strong></li>
              <li class="list-group-item"><strong>Director: ${movie.Director}</strong></li>
              <li class="list-group-item"><strong>Writer: ${movie.Writer}</strong></li>
              <li class="list-group-item"><strong>Actors: ${movie.Actors}</strong></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch(function (err) {
      console.log(err);
    });

}
