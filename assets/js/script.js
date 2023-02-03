const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2994c4147e2afe49f6667536b6aec78e&page=1';

// take the url + discover example (from the docs) & api key (from account setup) & page 1 for first set of results

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
// create the variable for the image path to concatenate with the jpg from the api data.. Change the width if necessary (it defaults to /w500)

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=2994c4147e2afe49f6667536b6aec78e&query="'; // same root url as above but change /discover/ to /search/ and remove the sort and add &query=" - note the single double quote - to concatenate the search term from the search box into this variable

const form = document.getElementById('form');

const search = document.getElementById('search');

const main = document.getElementById('main');

// Get initial movies ---------------------->

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);

    console.log(data.results);
} // makes a request. They return a promise that resolves with the result of the asynchronous operation.  use the await keyword inside an async function to wait for a promise to resolve and get its result. The code inside the async function will pause until the promise is resolved and then continue.


function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie;

        // Destructuring (above const) in JavaScript is a convenient way to extract values from arrays or objects into separate variables. It allows you to unpack values from arrays, objects or maps into distinct variables. better than const = movie.title.... movie.poster_path etc)


        //recreate the div html
        const movieElement = document.createElement('div');

        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}"
                alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
            `;

    });
};


// creates the Green, Orange & Red classes
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
};






form.addEventListener('submit', (e) => {
    e.preventDefault();
    //listens for the submit event, then prevents the event from submitting it as per the defualt action

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        //if searchTerm exists and is not equal to nothing, then concats the searchTerm to the search api url
        search.value = '';
        //this clears the search bar
    } else {
        window.location.reload()
        //if submit is pressed with nothing in the search, then relaod the page
    }

});

// Adding the api data to the DOM
// create the showMovies()