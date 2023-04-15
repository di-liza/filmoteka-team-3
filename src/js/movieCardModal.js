import { GetMovie } from './apiFetch';
import { LocalStorage } from './localStorage';

const getMovie = new GetMovie();
const localStorage = new LocalStorage();

const button = document.querySelector('.movie-collection');

button.addEventListener('click', e => {
  // console.log(e);
  if  (e.target.nodeName === 'IMG' || e.target.nodeName === 'P' || e.target.nodeName === 'H2') {
    const perent = e.target.closest('li');
    const { id } = perent.dataset;
    openModal(id);

  }
});

export async function openModal(id) {
  try {
    const result = await getMovie.getMovieFullInfo(id);
    localStorage.movie = result; // <<<<<<<<<<<<<<<<<<<<<<Ivan>>>>>>>>>>>>>>>>>>>>>> //
    movieCardModal(result);
    // console.log(result);
  } catch (error) {
    console.log(error.stack);
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
  modalEl.innerHTML = `    <div class="movieCardModal__container">
  <button class="modal-btn-cross">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        class="modal-btn-cross__icon"
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
      src="https://image.tmdb.org/t/p/w500/${poster}"
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
      <button type="button" class="movieCardModal__btn" data=watched>
        <span data-text=watched>${localStorage.textButtonRemoveOrAdd(
          'watched'
        )}</span> watched 
      </button>
      <button type="button" class="movieCardModal__btn" data=queue>
        <span data-text=queue>${localStorage.textButtonRemoveOrAdd(
          'queue'
        )}</span> queue
      </button>
    </div>
  </div>
</div>`;
  const btnClose = document.querySelector('.modal-btn-cross');
  btnClose.addEventListener('click', () => closeModal());

  // <<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>> //
  // <<<<<<<<<<<<<<<<<<<<<<Ivan>>>>>>>>>>>>>>>>>>>>>> //
  const btnAddOrRemoveWatched = document.querySelector('[data=watched]');
  const btnAddOrRemoveQueue = document.querySelector('[data=queue]');
  btnAddOrRemoveWatched.addEventListener(
    'click',
    localStorage.addOrRemoveFromLocalStoradgeWatched
  );
  btnAddOrRemoveQueue.addEventListener(
    'click',
    localStorage.addOrRemoveFromLocalStoradgeQueue
  );

  // <<<<<<<<<<<<<<<<<<<<<<Ivan>>>>>>>>>>>>>>>>>>>>>> //
  // <<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>> //
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
