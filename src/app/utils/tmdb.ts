const API_KEY = 'fc113ae7bdb111be9218caccbfb49bfe';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const tmdb = {
  getTrending: async (type = 'movie', timeWindow = 'day') => {
    const response = await fetch(`${BASE_URL}/trending/${type}/${timeWindow}?api_key=${API_KEY}`);
    return response.json();
  },
  getMoviesByCategory: async (categoryId: string) => {
    // Mapping categories to TMDB genres or sections
    // Genre IDs: Action=28, Comedy=35, Drama=18, Thriller=53
    let endpoint = `/movie/popular`;
    
    if (categoryId === 'bollywood') {
      endpoint = `/discover/movie?with_original_language=hi`;
    } else if (categoryId === 'hollywood') {
      endpoint = `/discover/movie?with_original_language=en`;
    } else if (categoryId === 'action') {
      endpoint = `/discover/movie?with_genres=28`;
    } else if (categoryId === 'comedy') {
      endpoint = `/discover/movie?with_genres=35`;
    } else if (categoryId === 'drama') {
      endpoint = `/discover/movie?with_genres=18`;
    } else if (categoryId === 'thriller') {
      endpoint = `/discover/movie?with_genres=53`;
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`);
    return response.json();
  },
  getMovieDetails: async (id: string) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,similar,credits`);
    return response.json();
  },
  getTVDetails: async (id: string) => {
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,similar,credits`);
    return response.json();
  },
  search: async (query: string) => {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    return response.json();
  },
  getImageUrl: (path: string | null) => (path ? `${IMAGE_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image'),
};