import Pagination from 'tui-pagination';
import { getGenres } from './genres';

export class LocalStorage {
  constructor() {
    this.movie = {};
    this.selectedArray;
    this.textRemoveBTN = 'remove from ';
    this.textAddBTN = 'add to ';
    this.numMoviesInPages = 9;
    this.movieCollection = document.querySelector('.movie-collection');
    this.results;
    this.urlIMG =
      'https://fv9-3.failiem.lv/thumb_show.php?i=wvrgyazty&download_checksum=c46e3875e607d6804a842a7f189fa3497d5b4812&download_timestamp=1681764842';
    this.urlIMGforDarckMode =
      'https://lh3.googleusercontent.com/u/1/drive-viewer/AAOQEORwHJ_nPbk78yncXyvFd-yOb5yQKomL1AQWhQCQ1ZUtlHDiW-N9i71VahNUXTnZpY_YE-_H2DTBF5H4lGZ4AC2Pxm3x-w=w3360-h1764';
    this.addOrRemoveFromLocalStoradgeWatched =
      this.addOrRemoveFromLocalStoradgeWatched.bind(this);
    this.addOrRemoveFromLocalStoradgeQueue =
      this.addOrRemoveFromLocalStoradgeQueue.bind(this);
  }

  getMovies(watchedOrQueue) {
    this.isLibrary = this.isLibraryWatched();
    if (watchedOrQueue === 'queue') {
      this.isLibrary = this.isLibraryQueue();
    }
    if (this.isLibrary) {
      this.total = this.results.length;
      this.selectedArray = watchedOrQueue;
      if (this.total > this.numMoviesInPages) {
        this.results = this.results.slice(0, this.numMoviesInPages);
        this.addPagination(this.total, watchedOrQueue);
      } else {
        document.getElementById('pagination').innerHTML = '';
      }
      this.createMarkupCards();
      this.movieCollection.style.pointerEvents = 'auto';
    } else {
      try {
        document.getElementById('pagination').innerHTML = '';
      } catch {}
      this.markupPlug();
    }
  }

  // Визначаємо наявнисть фільмів списку watch
  isLibraryWatched() {
    return JSON.parse(localStorage.getItem('watched'))?.length > 0;
  }

  // Визначаємо наявнисть фільмів списку queue
  isLibraryQueue() {
    return JSON.parse(localStorage.getItem('queue'))?.length > 0;
  }

  // Визначаємо загальну наявнисть фільмів
  isLibrarys() {
    return isLibraryQueue() || isLibraryWatched();
  }

  // Цей метод шукає обраний фільм у масиві та вибирає видалити чи додати фільм у масив
  addOrRemoveFromLocalStoradgeWatched() {
    this.addOrRemoveFromLocalStoradge('watched');
  }

  addOrRemoveFromLocalStoradgeQueue() {
    this.addOrRemoveFromLocalStoradge('queue');
  }

  addOrRemoveFromLocalStoradge(watchedOrQueue) {
    const arrMovie = JSON.parse(localStorage.getItem(watchedOrQueue));
    if (!arrMovie) {
      this.addToLocalStorage(watchedOrQueue);
      return;
    }
    const isMovie = arrMovie.find(item => item.id === this.movie.id);
    if (isMovie) {
      this.removeFromLocalStorage(watchedOrQueue);
    } else {
      this.addToLocalStorage(watchedOrQueue);
    }
  }

  // Цей метод додає фільм у вказаний масив
  addToLocalStorage(watchedOrQueue) {
    let arrMovie = localStorage.getItem(watchedOrQueue);
    if (arrMovie) {
      arrMovie = JSON.parse(arrMovie);
      this.movie.selectedArray = watchedOrQueue;
      arrMovie.unshift(this.movie);
    } else {
      arrMovie = [this.movie];
    }
    localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
    const queueSpan = document.querySelector(
      `span[data-text="${watchedOrQueue}"]`
    );
    queueSpan.textContent = this.textRemoveBTN;
    if (this.selectedArray === watchedOrQueue) {
      this.results = JSON.parse(localStorage.getItem(watchedOrQueue));
      this.getMovies(watchedOrQueue);
      // this.createMarkupCards();
    }
  }

  // Цей метод видаляє фільм по його id
  removeFromLocalStorage(watchedOrQueue) {
    let arrMovie = localStorage.getItem(watchedOrQueue);
    arrMovie = JSON.parse(arrMovie);
    const index = arrMovie.findIndex(movie => movie.id === this.movie.id);
    if (index !== -1) {
      arrMovie.splice(index, 1);
      localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
      const queueSpan = document.querySelector(
        `span[data-text="${watchedOrQueue}"]`
      );
      queueSpan.textContent = this.textAddBTN;
      if (this.selectedArray === watchedOrQueue) {
        this.results = JSON.parse(localStorage.getItem(watchedOrQueue));
        if (JSON.parse(localStorage.getItem(watchedOrQueue))?.length > 0) {
          this.getMovies(watchedOrQueue);
          // this.createMarkupCards();
        } else {
          try {
            document.getElementById('pagination').innerHTML = '';
          } catch {}
          this.markupPlug();
        }
      }
    }
  }
  //Цей метод пише текст на кнопці чи додати чи видалити фільм з масиву
  textButtonRemoveOrAdd(watchedOrQueue) {
    const arrMovie = JSON.parse(localStorage.getItem(watchedOrQueue));
    if (!arrMovie) {
      return this.textAddBTN;
    }
    const isMovie = arrMovie.find(movie => movie.id === this.movie.id);
    return isMovie ? this.textRemoveBTN : this.textAddBTN;
  }

  createMarkupCards() {
    this.movieCollection.innerHTML = this.results
      .map(({ poster_path, genres, title, release_date, id }) => {
        const genresList = getGenres(undefined, genres);
        const movieYear = release_date.slice(0, 4);
        let poster;
        if (!poster_path) {
          poster = 'https://otv.one/uploads/default_image/thumbnail.jpg';
        } else {
          poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        }
        return `  <li class="movie-collection__item" data-id="${id}" data-selectedArray="${this.selectedArray}">
   <img class="movie-collection__poster" loading="lazy" src="${poster}" srcset="${poster} 2x" alt="${title}" width="395" height="574"/>
   <h2 class="movie-collection__title">${title}</h2>
   <div class="movie-collection__discription">
     <p class="movie-collection__genre">${genresList}</p>
     <p class="movie-collection__year">${movieYear}</p>
   </div>
   <button class="movie-collection__button" type="button" data-id="${id}">Trailer</button>
</li>`;
      })
      .join('');
  }

  getPages(watchedOrQueue) {
    const arr = JSON.parse(localStorage.getItem(watchedOrQueue));
    let number = arr?.length / this.numMoviesInPages;
    return number % 1 !== 0 ? Math.ceil(number) : number;
  }

  darkModeForIMG() {
    return localStorage.getItem('theme')
      ? this.urlIMGforDarckMode
      : this.urlIMG;
  }

  markupPlug() {
    this.movieCollection.innerHTML = `<li class="plug"><img width="288" height="371" class="plug_poster" src="${this.darkModeForIMG()}" srcset="${this.darkModeForIMG()} 2x" alt="plug" /></li>`;
    this.movieCollection.style.pointerEvents = 'none';
  }

  addPagination(total, watchedOrQueue) {
    const pagination = new Pagination(document.getElementById('pagination'), {
      totalItems: 500,
      itemsPerPage: 10,
      visiblePages: this.getPages(watchedOrQueue),
      centerAlign: true,
    });
    pagination.setTotalItems(total);
    pagination.setItemsPerPage(this.numMoviesInPages);
    pagination.on('afterMove', event => {
      const currentPage = event.page;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.getMoviesFromLocalStorageForPagination(watchedOrQueue, currentPage);
      this.createMarkupCards();
    });
    pagination.visiblePages = this.getPages(watchedOrQueue);
  }

  getMoviesFromLocalStorageForPagination(watchedOrQueue, n) {
    const movies = localStorage.getItem(watchedOrQueue);
    const moviesObj = JSON.parse(movies);
    const endNum = n * this.numMoviesInPages;
    const startNum = endNum - this.numMoviesInPages;
    this.results = moviesObj.slice(startNum, endNum);
  }
}
