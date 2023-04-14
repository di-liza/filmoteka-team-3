import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createMarkupOneCard } from './renderCardMarkup';

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

export function addPaginationSearching(total) {
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
    getMovie
      .getMoviesByName(currentPage)
      .then(({ results }) => {
        createMarkupOneCard(results);
      })
      .catch(error => console.log(error.stack));
  });
}
