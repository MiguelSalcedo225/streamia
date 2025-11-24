import type { FavoritePayload } from '../types/movie.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class FavoritesService {
  async addFavorite(payload: FavoritePayload): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al añadir favorito');
    }

    // Emitir evento global
    this.emitFavoriteAdded(payload.movieId);
  }

  async removeFavorite(movieId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/favorites/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar favorito');
    }

    // Emitir evento global
    this.emitFavoriteRemoved(movieId);
  }

  async getFavorites(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al obtener favoritos');
    }

    return response.json();
  }

  private emitFavoriteAdded(movieId: string): void {
    window.dispatchEvent(
      new CustomEvent('favorite:added', {
        detail: { movieId },
      })
    );
  }

  private emitFavoriteRemoved(movieId: string): void {
    window.dispatchEvent(
      new CustomEvent('favorite:removed', {
        detail: { movieId },
      })
    );
  }

  // Escuchar eventos externos
  onFavoriteRemoved(callback: (movieId: string) => void): () => void {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent;
      callback(customEvent.detail.movieId);
    };

    window.addEventListener('favorite:removed', handler);

    return () => window.removeEventListener('favorite:removed', handler);
  }
}

export const favoritesService = new FavoritesService();
export default favoritesService;