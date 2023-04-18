import { GetMovie } from './apiFetch';
import { LocalStorage } from './localStorage';
import { Notify } from 'notiflix';

const getMovie = new GetMovie();
const myMovieLocalStorage = new LocalStorage();

const cardsCollection = document.querySelector('.movie-collection');
const sliderCards = document.querySelector('.swiper-wrapper');

sliderCards?.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    const perent = e.target.closest('div');
    const { id } = e.target.dataset;
    myMovieLocalStorage.selectedArray = perent?.dataset.selectedarray;
    openModal(id);
  }
});

cardsCollection.addEventListener('click', e => {
  if (
    e.target.nodeName === 'LI' ||
    e.target.nodeName === 'IMG' ||
    e.target.nodeName === 'P' ||
    e.target.nodeName === 'H2'
  ) {
    const perent = e.target.closest('li');
    const { id } = perent.dataset;
    myMovieLocalStorage.selectedArray = perent?.dataset.selectedarray;
    openModal(id);
  }
});

export async function openModal(id) {
  try {
    const result = await getMovie.getMovieFullInfo(id);
    myMovieLocalStorage.movie = result;
    movieCardModal(result);
  } catch (error) {
    Notify.failure(error.message);
  }
}

const modalEl = document.querySelector('.modal');

export async function movieCardModal(result) {
  modalEl.classList.add('modal--show');
  document.body.classList.add('stop-scrolling');
  const {
    poster_path,
    genres,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
    id,
  } = result;
  const genresList = genres.map(genre => genre.name).join(', ');
  let poster;
  if (!poster_path) {
    poster = 'https://otv.one/uploads/default_image/thumbnail.jpg';
  } else {
    poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  }
  modalEl.innerHTML = `    <div class="movieCardModal__container ${localStorage.getItem(
    'theme'
  )}">
  <button class="modal-btn-cross">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        class="modal-btn-cross__icon ${localStorage.getItem('theme')}"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
    </button>

  <div class="movieCardModal__image">
    <img
      class="movieCardModal__image--el"
      src="${poster}"
      srcset="${poster} 2x"
      alt="${title}"
    />
  </div>
  <div class="movieCardModal__information">
    <div>
      <h2 class="movieCardModal__title">${title}</h2>
      <ul>
        <li class="movieCardModal__item">
          <p class="movieCardModal__details ">Vote / Votes</p>
          <p class="movieCardModal__info--uper">
            <span class="movieCardModal__rating--orange">${vote_average}</span>
            <span class="movieCardModal__rating--divider"> / </span>
            <span>${vote_count}</span>
          </p>
        </li>
        <li class="movieCardModal__item">
          <p class="movieCardModal__details ">Popularity</p>
          <p class="movieCardModal__info--uper">${popularity}</p>
        </li>
        <li class="movieCardModal__item">
          <p class="movieCardModal__details">Original title</p>
          <p>${original_title}</p>
        </li>
        <li class="movieCardModal__item">
          <p class="movieCardModal__details">Genre</p>
          <p class="movieCardModal__info">${genresList}</p>
        </li>
      </ul>
    </div>
    <div>
      <h3 class="movieCardModal__about__title">About</h3>
      <p class="movieCardModal__about__text">${overview}</p>
    </div>
    <div class="movieCardModal__btn--wrapper">
      <button disabled type="button" class="movieCardModal__btn-nowe" data=watched tip="You need to log in!">
        <span data-text=watched>${myMovieLocalStorage.textButtonRemoveOrAdd(
          'watched'
        )}</span> watched 
      </button>
      <button disabled type="button" class="movieCardModal__btn-nowe" data=queue tip="You need to log in!">
        <span data-text=queue>${myMovieLocalStorage.textButtonRemoveOrAdd(
          'queue'
        )}</span> queue
      </button>
    </div>
  </div>
</div>`;
  const btnClose = document.querySelector('.modal-btn-cross');
  btnClose.addEventListener('click', () => closeModal());


  const LOGIN_STATE_KEY = 'loginState';

  // Знаходимо кнопки ADD_WATCHED, ADD_QUEUE та додаєм слухачів
  const btnAddOrRemoveWatched = document.querySelector('[data=watched]');
  const btnAddOrRemoveQueue = document.querySelector('[data=queue]');

  isUserAuthenticatedHandler();

  function isUserAuthenticatedHandler() {
    const isLoginState = localStorage.getItem(LOGIN_STATE_KEY);
    if (isLoginState) {
      btnAddOrRemoveQueue.classList.remove('movieCardModal__btn-nowe');
      btnAddOrRemoveQueue.classList.add('movieCardModal__btn');
      btnAddOrRemoveQueue.disabled = false;

      btnAddOrRemoveWatched.classList.remove('movieCardModal__btn-nowe');
      btnAddOrRemoveWatched.classList.add('movieCardModal__btn');
      btnAddOrRemoveWatched.disabled = false;
    }
    return;
  }

  btnAddOrRemoveWatched.addEventListener(
    'click',
    myMovieLocalStorage.addOrRemoveFromLocalStoradgeWatched
  );
  btnAddOrRemoveQueue.addEventListener(
    'click',
    myMovieLocalStorage.addOrRemoveFromLocalStoradgeQueue
  );
}

function closeModal() {
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scrolling');
  modalEl.innerHTML = '';
}

window.addEventListener('click', e => {
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.keyCode === 27) {
    closeModal();
  }
});
