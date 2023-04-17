import { GetMovie } from './apiFetch';

const getMovie = new GetMovie();
const button = document.querySelector('.movie-collection');

button.addEventListener('click', e => {
  const perent = e.target.closest('li');
  const button = e.target.closest('button');
  const { id } = button?.dataset || {};
  console.log('id :', id);

  showTrailer(id);

});

let key = '';
export async function showTrailer(id) {
  try {
    const { results } = await getMovie.getMovieTrailer(id);
    const trailer = results.find(item => {
      return item.type === 'Trailer';
    });

    if (trailer && trailer.type !== 'Trailer') {
      return;
    }
    key = trailer ? trailer.key : '';
    getVideo(key)
  } catch (error) {
    console.log(error.message);
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
  src="https://www.youtube.com/embed/${key}"
  ></iframe> `;

  if (localStorage.getItem('theme')) {
    crossIcon.classList.add("dark");
    return videoModal.classList.add("dark");
  }

  if (!localStorage.getItem('theme')) {
  crossIcon.classList.remove("dark");
  return videoModal.classList.remove("dark");
  }
};
  

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
