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
    const requestError = `<p>Please, enter something for searching movies.</p>`;
    errorMessage(requestError);
    return;
  }
  getFoundMovies();
}

async function getFoundMovies() {
  try {
    const { results } = await getMovie.getMoviesByName();
    if (results.totall === 0) {
      const requestError = `<p>Search result not successful. Enter the correct movie name.</p>`;
      errorMessage(requestError);
      return;
    }
    clearMovieCollection();
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

function errorMessage(requestError) {
  negativeSearchMessage.innerHTML('beforeend', requestError);
}
