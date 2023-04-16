import { GetMovie } from './apiFetch';
const API_KEY = '5cb4dd4cf3f1476227d92f7c4b196044';
const BASE_URL = 'https://api.themoviedb.org/3';
let movie_id = '';


const getMovie = new GetMovie();
const button = document.querySelector('.movie-collection');

// button.addEventListener('click', e => {
//   const perent = e.target.closest('button');
//   console.log(perent);
//   const { id } = perent.dataset;
//   movie_id = id;
//   console.log(id);
//   openModal(id);
// });

// async function openModal(id) {
//   try {
//     const result = await getVideo(id);
//   } catch (error) {
//     console.log(error);
//   }
// }
button.addEventListener('click', e => {
  const perent = e.target.closest('li');
  const button = e.target.closest('button');
  const { id } = button?.dataset || {};
  console.log('id :', id);

  showTrailer(id);

});


export async function showTrailer(id) {
  try {
    // showSpinner();
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

const videoModal = document.querySelector('.modal-video');
// export function trailerBtn(watchBtn) {
//   const id = watchBtn.dataset;
//   watchBtn.addEventListener('click', () => {
//     getVideo(id);
//   });
// }

 async function getVideo(key) {
  const videoModal = document.querySelector('.modal-content');
  const crossIcon = document.querySelector('.modal-btn-cross__icon');
  modalEl.classList.add('modal--show');
  document.body.classList.add('stop-scrolling');

  // fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
  //   .then(responce => {
  //     return responce.json();
  //   })
  //   .then(video => {
  //     const currentVideo = video.results;
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
  const watchBtn = document.querySelector('.movie-collection__button');

  const btnClose = document.querySelector('.modal-close-btn');
  btnClose.addEventListener('click', () => closeModal());


function closeModal() {
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scrolling');
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
