import { GetMovie } from './apiFetch';
import { createMarkupOneCard } from './renderCardMarkup';
import { addPaginationSearching } from './pagination';

const negativeSearchMessage = document.querySelector('.error-message');
const searchForm = document.querySelector('.search-form');

export const getMovie = new GetMovie();

searchForm.addEventListener('submit', searchMovies);

function searchMovies(event) {
  event.preventDefault();

  getMovie.query = event.currentTarget.elements.searchQuery.value;
  if (getMovie.query.trim() === '') {
    const message = `<p>Please, enter something for searching movies.</p>`;
    errorMessage(message);
    return;
  }
  getFoundMovies();
}

async function getFoundMovies() {
  try {
    const data = await getMovie.getMoviesByName();
    if (data.results.length === 0) {
      const message = `<p>Search result not successful. Enter the correct movie name.</p>`;
      errorMessage(message);
      return;
    }
    getMovie.resetPage();
    createMarkupOneCard(data.results);
    addPaginationSearching(data.total_results, data.total_pages);
  } catch (error) {
    console.log(error, error.stack);
  }
}

function errorMessage(message) {
  negativeSearchMessage.innerHTML = message;
}
