import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createMarkupOneCard } from './renderCardMarkup';

import { getMovie } from './searchInput';
import { GetMovie } from './apiFetch';

import { LocalStorage } from './localStorage';
const localStorage = new LocalStorage();

const apiMovie = new GetMovie();

const tuiPagination = document.querySelector('.tui-pagination');

export function addPagination(total) {
  const pagination = new Pagination(document.getElementById('pagination'), {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: 5,
    centerAlign: true,
  });
  pagination.setTotalItems(total);
  pagination.setItemsPerPage(20);
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    topFunction();
    apiMovie
      .getTrandMovies(currentPage)
      .then(({ results }) => {
        createMarkupOneCard(results);
      })
      .catch(error => console.log(error.stack));
  });
}

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
export function addPaginationSearching(total, totalPages) {
  if (totalPages === 1) {
    tuiPagination.style.display = 'none';
    return;
  }
  let visiblePages = null;
  if (totalPages < 5) {
    visiblePages = totalPages;
  } else {
    visiblePages = 5;
  }
  const pagination = new Pagination(document.getElementById('pagination'), {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages,
    centerAlign: true,
  });
  pagination.setTotalItems(total);
  pagination.setItemsPerPage(20);
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    topFunction();
    getMovie
      .getMoviesByName(currentPage)
      .then(({ results }) => {
        createMarkupOneCard(results);
      })
      .catch(error => console.log(error.stack));
  });
}

// export function watchedPag(total, totalPages) {
//   const pagination = new Pagination(document.getElementById('pagination'), {
//     totalItems: 500,
//     itemsPerPage: 10,
//     visiblePages,
//     centerAlign: true,
//   });
//   pagination.setTotalItems(total);
//   pagination.setItemsPerPage(20);
//   pagination.on('afterMove', event => {
//     const currentPage = event.page;
//     topFunction();
//     getMovie
//       .getMoviesByName(currentPage)
//       .then(({ results }) => {
//         createMarkupOneCard(results);
//       })
//       .catch(error => console.log(error.stack));
//   });
// }

// const elentsQ = localStorage.getPages('queue');
// console.log('pages queue:', elentsQ);

// const elementsW = localStorage.getPages('watched');
// console.log('pages watched:', elementsW);

// const totalElPerPage = (localStorage.numMoviesInPages = 3);
// console.log('count:', totalElPerPage);
