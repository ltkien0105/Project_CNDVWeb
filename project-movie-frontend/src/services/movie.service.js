function movieService() {
  const baseUrl = '/api/movies'
  const searchUrl = '/api/search'

  function getFormattedDate(date) {
    const dateObj = new Date(date)
    return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
  }

  function getMoviesGenres() {
    let url = `${baseUrl}/genres`
    const response = fetch(url).then((res) => res.json())
    return response
  }

  async function getMoviesRecently(page, limit = 12) {
    let url = `${baseUrl}/recently?page=${page}&limit=${limit}`
    const response = await fetch(url).then((res) => res.json())
    return response
  }

  async function getMoviesMostRated(page, limit = 12) {
    let url = `${baseUrl}/rating?page=${page}&limit=${limit}`
    const response = await fetch(url).then((res) => res.json())
    return response
  }

  async function getMoviesPage(page = 1, limit = 12) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`
    const response = await fetch(url).then((res) => res.json())
    return response
  }

  async function getMovieById(id) {
    let url = `${baseUrl}/${id}`
    const response = await fetch(url).then((res) => res.json())
    return response
  }

  async function getMoviesBySearchQuery(query, page = 1, limit = 12) {
    let url = `${searchUrl}?q=${query}&page=${page}&limit=${limit}`
    const response = await fetch(url).then((res) => res.json())
    return response
  }

  return {
    getMoviesGenres,
    getMoviesRecently,
    getMoviesMostRated,
    getMoviesPage,
    getMovieById,
    getMoviesBySearchQuery,
    getFormattedDate
  }
}

export default movieService()
