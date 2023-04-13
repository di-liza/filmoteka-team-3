import { GetMovie } from './apiFetch';
import { createMarkupOneCard } from './renderCardMarkup';

const movieCollection = document.querySelector('.movie-collection');
const negativeSearchMessage = document.querySelector('.error-message');
const searchForm = document.querySelector('.search-form');

const getMovie = new GetMovie();

searchForm.addEventListener('submit', searchMovies);

function searchMovies(event) {
  event.preventDefault();

  getMovie.query = event.currentTarget.elements.searchQuery.value;
  if (getMovie.query === '') {
    const message = `<p>Please, enter something for searching movies.</p>`;
    errorMessage(message);
    return;
  }
  getFoundMovies();
}

async function getFoundMovies() {
  try {
    const { results } = await getMovie.getMoviesByName();
    if (results.totall === 0) {
      const message = `<p>Search result not successful. Enter the correct movie name.</p>`;
      errorMessage(message);
      return;
    }
    clearMovieCollection();
    //   resetPage();
    results.map(result => {
      createMarkupOneCard(result);
    });
  } catch (error) {
    console.log(error, error.stack);
  }
}

function clearMovieCollection() {
  movieCollection.innerHTML = '';
}

function errorMessage(message) {
  negativeSearchMessage.innerHTML('beforeend', message);
}
