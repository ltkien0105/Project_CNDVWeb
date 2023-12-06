import { useQuery } from '@tanstack/vue-query'
import movieService from '../services/movie.service'

export default function useMovies() {
  function getMoviesRecently(page, limit = 12) {
    const { data: movies, ...rest } = useQuery({
      queryKey: ['movies', 'recently'],
      queryFn: () => movieService.getMoviesRecently(page, limit),
      initialData: [],
      keepPreviousData: true
    })

    return {
      movies,
      ...rest
    }
  }

  function getMoviesGenres() {
    const { data: movies, ...rest } = useQuery({
      queryKey: ['movies', 'genres'],
      queryFn: () => movieService.getMoviesGenres(),
      initialData: [],
      keepPreviousData: true
    })

    return {
      movies,
      ...rest
    }
  }

  function getMoviesMostRated(page, limit = 12) {
    const { data: movies, ...rest } = useQuery({
      queryKey: ['movies', 'most_rated'],
      queryFn: () => movieService.getMoviesMostRated(page, limit),
      initialData: [],
      keepPreviousData: true
    })

    return {
      movies,
      ...rest
    }
  }

  function getMoviesPage(page = 1, limit = 12) {
    const { data: movies, ...rest } = useQuery({
      queryKey: ['movies', page],
      queryFn: () => movieService.getMoviesPage(page, limit),
      initialData: [],
      keepPreviousData: true
    })

    return {
      movies,
      ...rest
    }
  }

  function getMovieById(id) {
    const { data: movie, ...rest } = useQuery({
      queryKey: ['movies', id],
      queryFn: () => movieService.getMovieById(id),
      initialData: [],
      keepPreviousData: true
    })

    return {
      movie,
      ...rest
    }
  }

  function getMoviesBySearchQuery(query, page = 1, limit = 12) {
    const { data: movies, ...rest } = useQuery({
      queryKey: ['movies', query],
      queryFn: () => movieService.getMoviesBySearchQuery(query, page, limit),
      initialData: [],
      keepPreviousData: true
    })

    return {
      movies,
      ...rest
    }
  }

  return {
    getMoviesGenres,
    getMoviesRecently,
    getMoviesMostRated,
    getMoviesPage,
    getMovieById,
    getMoviesBySearchQuery
  }
}
