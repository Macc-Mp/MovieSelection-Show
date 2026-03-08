// Read environment variables provided by Vite.
// Ensure your .env variables are prefixed with VITE_ (e.g. VITE_API_KEY)
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://api.themoviedb.org/3';
export const getPopularMovies = async (page = 1) => {

    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    return {
        results: data.results,
        total_pages: Math.min(data.total_pages, 100)
    };
};

export const searchMovie = async (query) => {
    const response = await fetch
    (`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

export const getPopularTV = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch popular TV shows');
    }
    const data = await response.json();
    return {
        results: data.results,
        total_pages: Math.min(data.total_pages, 100)
    };
};

export const searchTV = async (query) => {
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
};

export const getMovieReviews = async (movieId, page = 1) => {
    if (!movieId) return [];
    const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie reviews');
    }
    const data = await response.json();
    return data.results || [];
};

export const getTVReviews = async (tvId, page = 1) => {
    if (!tvId) return [];
    const response = await fetch(`${BASE_URL}/tv/${tvId}/reviews?api_key=${API_KEY}&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch TV reviews');
    }
    const data = await response.json();
    return data.results || [];
};

export const getMovieCredits = async (movieId) => {
    if (!movieId) return { cast: [], crew: [] };
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie credits');
    }
    const data = await response.json();
    return { cast: data.cast || [], crew: data.crew || [] };
};

export const getTVCredits = async (tvId) => {
    if (!tvId) return { cast: [], crew: [] };
    const response = await fetch(`${BASE_URL}/tv/${tvId}/credits?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch TV credits');
    }
    const data = await response.json();
    return { cast: data.cast || [], crew: data.crew || [] };
};
