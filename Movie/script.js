const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f6aa0f45c135c1637e753a0b2a62b703&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f6aa0f45c135c1637e753a0b2a62b703&query="'



const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmFhMGY0NWMxMzVjMTYzN2U3NTNhMGIyYTYyYjcwMyIsInN1YiI6IjY1YzFlOGNhOGU4ZDMwMDE3Yjc4NmJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x2m8zO22DrtIq4CIqJXQjNizpmFz-WpY0sb2nyGCMyw'
    }
  };

  fetch('https://api.themoviedb.org/3/account/20971090', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  



const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')



getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie 

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <div class="movie">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>Movie Title</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}
            </div>
        </div>
        `;
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }

})
