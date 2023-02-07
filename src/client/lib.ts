/**
 * Definitions of the API endpoints
 */
export const ENDPOINTS = {
  GET: {
    listMovies: () => `/movie`,
    getMovie: (movieId: string) => `/movie/${movieId}`,
    getMovieQuotes: (movieId: string) => `/movie/${movieId}/quote`,
  },
};
