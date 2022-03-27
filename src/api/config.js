import { TMDB_API_KEY, TMDB_API_URL } from '../env';

const API_CONFIG = {
  apiKey: TMDB_API_KEY,
  baseUrl: TMDB_API_URL,
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default API_CONFIG;
