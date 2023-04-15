// import {GetMovie} from './apiFetch'

const API_KEY = '5cb4dd4cf3f1476227d92f7c4b196044';
const BASE_URL = 'https://api.themoviedb.org/3';
let movie_id = '';

const button = document.querySelector('.movie-collection');

button.addEventListener('click', e => {
  const perent = e.target.closest('button');
  console.log(perent);
  const { id } = perent.dataset;
  movie_id = id;
  console.log(id);
  openModal(id);
  
});

async function openModal(id) {
  try {
    const result = await getVideo(id);
      } catch (error) {
    console.log(error);
  }
}


const modalEl = document.querySelector('.modal-video');


const videoModal = document.querySelector('.modal-video')
export function trailerBtn (watchBtn){
  const id = watchBtn.dataset;
    watchBtn.addEventListener('click', ()=>{
      getVideo(id)
    });
}

export async function getVideo(id) {
  const videoModal = document.querySelector('.modal-content');
  modalEl.classList.add('modal--show');
  document.body.classList.add('stop-scrolling');
     
  fetch (`${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}`).then(responce => {
   
    return responce.json();
  }).then(video => {
    const currentVideo = video.results          
    videoModal.innerHTML=`<iframe
    class="modal-video"
    src="https://www.youtube.com/embed/${currentVideo[0].key}"
    ></iframe> `
  })
  const watchBtn = document.querySelector('.movie-collection__button');
 
  const btnClose = document.querySelector('.modal-close-btn');
  btnClose.addEventListener('click', () => closeModal());
}

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
