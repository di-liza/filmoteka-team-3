import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

import { GetMovie } from './apiFetch';

const swiperWrapper = document.querySelector('.swiper-wrapper');
console.log('swiperWrapper:', swiperWrapper);
const swiperRef = document.querySelector('#trends-swiper');

const getMovie = new GetMovie();

renderSwiper();

const swiper = new Swiper(swiperRef, {
  modules: [Pagination, Autoplay],
  loop: true,
  grabCursor: true,

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
      centeredSlides: false,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 30,
      centeredSlides: true,
    },
  },

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

async function renderSwiper() {
  const { results } = await getMovie.getTrandMoviesWeek();
  console.log('results:', results);
  swiperWrapper.innerHTML = results
    .map(({ id, poster_path, title }) => {
      return `<div class='swiper-slide' data-open-modal>
    <div class='content-wrap'>
      <img
        data-id='${id}'
        class='swiper-slide__poster'
        src='https://image.tmdb.org/t/p/w500${poster_path}'
        alt='${title}'
      />
    </div>
  </div>`;
    })
    .join('');
  swiper.update();
  //   document
  //     .querySelectorAll('[data-open-modal]')
  //     .forEach(card => card.addEventListener('click', onFilmCardClick));
}
