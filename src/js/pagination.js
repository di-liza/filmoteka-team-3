import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createMarkupOneCard } from './renderCardMarkup';

const movieCollection = document.querySelector('.movie-collection');

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
        movieCollection.innerHTML = createMarkupOneCard(results);
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
