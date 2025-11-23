import { useState, useCallback } from 'react';
import type { MovieFilters } from '../types/movie.types';

export const useFilters = (initialFilters?: MovieFilters) => {
  const [filters, setFilters] = useState<MovieFilters>(initialFilters || {});

  const updateFilter = useCallback((key: keyof MovieFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const setCategory = useCallback((category: string | undefined) => {
    updateFilter('category', category);
  }, [updateFilter]);

  const setGenre = useCallback((genre: string | undefined) => {
    updateFilter('genre', genre);
  }, [updateFilter]);

  const setRating = useCallback((rating: number | undefined) => {
    updateFilter('rating', rating);
  }, [updateFilter]);

  const setSearch = useCallback((search: string | undefined) => {
    updateFilter('search', search);
  }, [updateFilter]);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return {
    filters,
    setCategory,
    setGenre,
    setRating,
    setSearch,
    clearFilters,
    hasActiveFilters,
  };
};