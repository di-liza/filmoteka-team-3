import { GetMovie } from './apiFetch';
import { createMarkupCards, createMarkupDropList } from './renderCardMarkup';
import { addPaginationSearching } from './pagination';
import { openModal } from './movieCardModal';
import { showTrailer } from './videoModal';
import { debounce } from 'debounce';
import { Notify } from 'notiflix';

const negativeSearchMessage = document.querySelector('.error-message');
const searchForm = document.querySelector('.search-form');
const inputQuery = document.querySelector('.search-form__input');
const droplist = document.querySelector('.movie-droplist');
const movieCollection = document.querySelector('.movie-cards-collection');
let isModalClosed = true;

export const getMovie = new GetMovie();

searchForm?.addEventListener('submit', searchMovie);
searchForm?.addEventListener('input', debounce(getDropListMovies, 350));

//Функция для создания выпадающего списка поиска

async function getDropListMovies() {
  getMovie.query = inputQuery.value;

  if (getMovie.query.trim() === '') {
    const message = `<p>Please, enter something for searching movies.</p>`;
    getErrorMessage(message);
    droplist.style.display = 'none';
    return;
  }

  try {
    const data = await getMovie.getMoviesByName();

    if (data.results.length === 0) {
      const message = `<p>Search result not successful. Enter the correct movie name.</p>`;
      getErrorMessage(message);
      droplist.style.display = 'none';
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
      isModalClosed = false;
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
    //Закрытие выпадающего списка поиска по клику вне списка
    window.addEventListener('click', event => {
      if (event.target !== droplist) {
        droplist.style.display = 'none';
      }
    });
  } catch (error) {
    Notify.failure(error.message);
  }
}

//Функция для проверки, что введеный запрос не пустой

function searchMovie(event) {
  event.preventDefault();
  getMovie.query = event.currentTarget.elements.searchQuery.value;

  if (getMovie.query.trim() === '') {
    const message = `<p>Please, enter something for searching movies.</p>`;
    getErrorMessage(message);
    return;
  }
  isModalClosed = true;
  getFoundMovies();
  scrollToMovieCollection();
}

//Функция для вывода результата поиска в основное окно

async function getFoundMovies() {
  droplist.style.display = 'none';
  try {
    const data = await getMovie.getMoviesByName();
    if (data.results.length === 0) {
      const message = `<p>Search result not successful. Enter the correct movie name.</p>`;
      getErrorMessage(message);
      return;
    }

    clearErrorMessage();
    getMovie.resetPage();
    clearForm();
    if (isModalClosed) {
      Notify.success(
        `Finded ${data.total_results} movies for "${getMovie.query}"`
      );
    }

    createMarkupCards(data.results);
    addPaginationSearching(data.total_results, data.total_pages);
  } catch (error) {
    Notify.failure(error.message);
  }
}

//Функции для вывода и убирания сообщения об ошибке под полем ввода

function getErrorMessage(message) {
  negativeSearchMessage.innerHTML = message;
}

function clearErrorMessage() {
  negativeSearchMessage.innerHTML = '';
}

function clearForm() {
  inputQuery.value = '';
}

function scrollToMovieCollection() {
  movieCollection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
