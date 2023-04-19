import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { createMarkupCards } from './renderCardMarkup';

import { getMovie } from './searchInput';
import { GetMovie } from './apiFetch';
const apiMovie = new GetMovie();

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
        createMarkupCards(results);
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
        createMarkupCards(results);
      })
      .catch(error => console.log(error.stack));
  });
}
