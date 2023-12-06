<script setup>
import AppHeader from '../components/AppHeader.vue'
import SubNav from '../components/SubNav.vue'
import GridList from '../components/GridList.vue'
import PaginationNav from '../components/PaginationNav.vue'
import useMovies from '../composables/useMovies'
import { useRouter } from 'vue-router'
const router = useRouter()

const { getMoviesPage, getMoviesRecently, getMoviesMostRated } = useMovies()

let currentPage
if (router.currentRoute.value.query.page) {
  currentPage = parseInt(router.currentRoute.value.query.page)
} else {
  currentPage = 1
}

const { movies } =
  router.currentRoute.value.name == 'movies'
    ? getMoviesPage(currentPage)
    : router.currentRoute.value.name == 'movies-recently'
    ? getMoviesRecently(currentPage)
    : router.currentRoute.value.name == 'movies-rating'
    ? getMoviesMostRated(currentPage)
    : null
</script>

<template>
  <AppHeader></AppHeader>
  <div id="movie-grid">
    <div class="nav">
      <h2>Movie Grid</h2>
      <SubNav
        :items="[
          { name: 'Recently Released', path: '/movies/recently' },
          { name: 'Top Rated', path: '/movies/rating' }
        ]"
      ></SubNav>
    </div>
    <div class="grid-list">
      <GridList v-if="movies" :movies="movies.movies"></GridList>
    </div>
    <PaginationNav
      v-if="Object.keys(movies).length > 0"
      :totalPages="movies.metadata.lastPage"
    ></PaginationNav>
  </div>
</template>

<style scoped>
@import '../assets/css/gridlist-page.css';
</style>
