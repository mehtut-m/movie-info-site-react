import axios from './axiosClient';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType = {
  popular: 'popular',
  on_the_air: 'on_the_air',
  top_rated: 'top_rated',
};

const tmdbApi = {
  getMovieList: (type, params) => {
    const url = `movie/${movieType[type]}`;
    return axios.get(url, params);
  },
  getTvList: (type, params) => {
    const url = `tv/${tvType[type]}`;
    return axios.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = `${category[cate]}/${id}/videos`;
    return axios.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = `search/${category[cate]}`;
    return axios.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + '/' + id;
    return axios.get(url, params);
  },
  credits: (cate, id, params) => {
    const url = category[cate] + '/' + id + '/credits';
    return axios.get(url, params);
  },
  similar: (cate, id) => {
    const url = category[cate] + '/' + id + '/similar';
    return axios.get(url);
  },
};

export default tmdbApi;
