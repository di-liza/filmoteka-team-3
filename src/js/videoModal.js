import { GetMovie } from './apiFetch';
import { Notify } from 'notiflix';

import { showLoader, hideLoader } from './loader';
import { debounce } from 'debounce';
const hideLoaderDebounced = debounce(hideLoader, 500);

const getMovie = new GetMovie();
const cardsCollection = document.querySelector('.movie-collection');

cardsCollection.addEventListener('click', e => {
  if (e.target.nodeName === 'BUTTON') {
    const button = e.target.closest('button');
    const { id } = button?.dataset || {};
    showTrailer(id);
  }
});

let key = '';
export async function showTrailer(id) {
  try {
    showLoader();
    const { results } = await getMovie.getMovieTrailer(id);
    console.log(results);
    const trailer = results.find(item => {
      return item.type === 'Trailer';
    });

    if (trailer && trailer.type !== 'Trailer') {
      return;
    }
    key = trailer ? trailer.key : '';
    getVideo(key);
  } catch (error) {
    Notify.failure(error.message);
  }
}

const modalEl = document.querySelector('.modal-video-container');

async function getVideo(key) {
  const videoModal = document.querySelector('.modal-content');
  const crossIcon = document.querySelector('.modal-btn-cross__icon');
  modalEl.classList.add('modal--show');
  document.body.classList.add('stop-scrolling');
  videoModal.innerHTML = `<iframe
  class="modal-video"
  alt="Trailer"
  src="https://www.youtube.com/embed/${key}"
  ></iframe> `;

  hideLoaderDebounced();
  if (localStorage.getItem('theme')) {
    crossIcon.classList.add('dark');
    return videoModal.classList.add('dark');
  }

  if (!localStorage.getItem('theme')) {
    crossIcon.classList.remove('dark');
    return videoModal.classList.remove('dark');
  }
}

const btnClose = document.querySelector('.modal-close-btn');
btnClose.addEventListener('click', () => closeModal());
const clearModal = document.querySelector('.modal-content');

function closeModal() {
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scrolling');
  clearModal.innerHTML = '';
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
