import type { Movie, MovieFilters, MovieResponse } from '../types/movie.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class MovieService {
  async getMovies(filters?: MovieFilters): Promise<MovieResponse> {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.search) params.append('search', filters.search);

    const response = await fetch(`${API_BASE_URL}/movies?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener películas');
    }

    return response.json();
  }

  async getMovieById(id: string): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener película');
    }

    return response.json();
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    const response = await this.getMovies({ category });
    return response.movies;
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const response = await this.getMovies({ search: query });
    return response.movies;
  }
}

export const movieService = new MovieService();
export default movieService;