import { GetMovie } from './apiFetch';
import { createMarkupOneCard, createMarkupDropList } from './renderCardMarkup';
import { addPaginationSearching } from './pagination';
import { openModal } from './movieCardModal';
import { showTrailer } from './videoModal';
import { debounce } from 'debounce';

const negativeSearchMessage = document.querySelector('.error-message');
const searchForm = document.querySelector('.search-form');
const inputQuery = document.querySelector('.search-form__input');
const droplist = document.querySelector('.movie-droplist');

export const getMovie = new GetMovie();

searchForm?.addEventListener('submit', searchMovie);
searchForm?.addEventListener('input', debounce(getDropListMovies, 500));

//Функция для создания выпадающего списка поиска

async function getDropListMovies() {
  getMovie.query = inputQuery.value;

  if (getMovie.query.trim() === '') {
    const message = `<p>Please, enter something for searching movies.</p>`;
    errorMessage(message);
    return;
  }
  try {
    const data = await getMovie.getMoviesByName();

    if (data.results.length === 0) {
      droplist.style.display = 'none';
      const message = `<p>Search result not successful. Enter the correct movie name.</p>`;
      errorMessage(message);
      return;
    }
    clearErrorMessage();
    getMovie.resetPage();
    createMarkupDropList(data.results);

    //Открытие модалки или фильма, или трейлера из выпадающего списка поиска

    droplist.addEventListener('click', event => {
      droplist.style.display = 'none';
      const movieCard = event.target.closest('li');
      const movieId = movieCard.dataset.id;
      getFoundMovies();
      if (event.target.nodeName === 'BUTTON') {
        showTrailer(movieId);
      } else {
        openModal(movieId);
      }
    });

    //Закрытие выпадающего списка поиска по esc

    window.addEventListener('keydown', function closeDroplist(event) {
      if (event.key === 'Escape') {
        window.removeEventListener('keydown', closeDroplist);
        droplist.style.display = 'none';
      }
    });
    //Закрытие выпадающего списка поиска по клику вне списке
    window.addEventListener('click', event => {
      if (event.target !== droplist) {
        droplist.style.display = 'none';
      }
    });
  } catch (error) {
    console.log(error, error.stack);
  }
}

//Функция для проверки, что введеный запрос не пустой

function searchMovie(event) {
  event.preventDefault();
  getMovie.query = event.currentTarget.elements.searchQuery.value;

  if (getMovie.query.trim() === '') {
    const message = `<p>Please, enter something for searching movies.</p>`;
    errorMessage(message);
    return;
  }
  getFoundMovies();
}

//Функция для вывода результата поиска в основное окно

async function getFoundMovies() {
  droplist.style.display = 'none';

  try {
    const data = await getMovie.getMoviesByName();
    if (data.results.length === 0) {
      const message = `<p>Search result not successful. Enter the correct movie name.</p>`;
      errorMessage(message);
      return;
    }
    clearErrorMessage();
    getMovie.resetPage();
    createMarkupOneCard(data.results);
    addPaginationSearching(data.total_results, data.total_pages);
  } catch (error) {
    console.log(error, error.stack);
  }
}

//Функции для вывода и убирания сообщения об ошибке под полем ввода

function errorMessage(message) {
  negativeSearchMessage.innerHTML = message;
}

function clearErrorMessage() {
  negativeSearchMessage.innerHTML = '';
}
