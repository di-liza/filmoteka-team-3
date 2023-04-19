import Swiper, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';

import { GetMovie } from './apiFetch';
const getMovie = new GetMovie();

const swiperId = document.querySelector('#trends-swiper');
const swiperConatiner = document.querySelector('.swiper-wrapper');

const mySlider = new Swiper(swiperId, {
  modules: [Autoplay],
  loop: true,
  grabCursor: true,

  breakpoints: {
    768: {
      slidesPerView: 4,
      spaceBetween: 15,
      centeredSlides: false,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 30,
      centeredSlides: false,
    },
  },

  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },
  on: {
    reachEnd: function () {
      mySlider.autoplay.stop();
    },
  },
});

async function makeSwiper() {
  const { results } = await getMovie.getTrandMoviesWeek();
  swiperConatiner.innerHTML = results
    .map(({ id, poster_path, title }) => {
      return `<div class='swiper-slide' data-open-modal>
    <div class='content-wrap'>
      <img
        data-id='${id}'
        class='swiper-slide__poster'
        src='https://image.tmdb.org/t/p/w500${poster_path}'
        srcset='https://image.tmdb.org/t/p/w500${poster_path} 2x'
        alt='${title}'
        width = "219" height="328"
      />
    </div>
  </div>`;
    })
    .join('');
  mySlider.on('touchEnd', function () {
    mySlider.autoplay.start();
  });
}

makeSwiper();
