import axios from 'axios';
import { showLoader, hideLoader } from './loader';
import { debounce } from 'debounce';
const hideLoaderDebounced = debounce(hideLoader, 200);

const API_KEY = '5cb4dd4cf3f1476227d92f7c4b196044';
const BASE_URL = 'https://api.themoviedb.org/3';

export class GetMovie {
  page = 1;
  query = null;
  movie_id = null;
  //   Запрос на самые популярные фильмы за месяц
  async getTrandMovies(page) {
    showLoader();
    try {
      const params = {
        api_key: API_KEY,
        language: 'en-US',
        page: page,
      };
      const response = await axios.get(`${BASE_URL}/trending/movie/week?`, {
        params,
      });
      hideLoaderDebounced();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  //  Запрос для поиска по ключевому слову
  async getMoviesByName(page) {
    showLoader();
    try {
      const params = {
        api_key: API_KEY,
        language: 'en-US',
        page: page,
        query: this.query,
      };
      const response = await axios.get(`${BASE_URL}/search/movie?`, {
        params,
      });
      hideLoaderDebounced();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Запрос для полной информации про фильм
  async getMovieFullInfo(id) {
    showLoader();
    try {
      const params = {
        api_key: API_KEY,
        language: 'en-US',
      };
      const response = await axios.get(`${BASE_URL}/movie/${id}?`, {
        params,
      });
      hideLoaderDebounced();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Запрос трейлера фильма
  async getMovieTrailer(movie_id) {
    showLoader();
    try {
      const params = {
        api_key: API_KEY,
        language: 'en-US',
      };
      const response = await axios.get(
        `${BASE_URL}/movie/${movie_id}/videos?`,
        {
          params,
        }
      );
      hideLoaderDebounced();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }
}
