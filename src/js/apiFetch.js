import axios from 'axios';

const API_KEY = '5cb4dd4cf3f1476227d92f7c4b196044';
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/';

export class GetMovie {
  page = 1;

  //   Запрос на самые популярные фильмы за месяц
  async getTrandMovies(page) {
    try {
      const params = {
        api_key: API_KEY,
        language: 'en-US',
        page: page,
      };
      const response = await axios.get(`${BASE_URL}week?`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  //  Запрос для поиска по ключевому слову
  async getMoviesByName(name) {}
  // Запрос для полной информации про фильм
  async getMovieFullInfo(movie_id) {}
  // Запрос трейлера фильма
  async getMovieTrailer(movie_id) {}

  incrementPage() {
    this.page += 1;
  }
}
