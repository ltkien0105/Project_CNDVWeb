<script setup>
import AppHeader from '../components/AppHeader.vue'
import GridList from '../components/GridList.vue'
import useMovies from '../composables/useMovies'
import { useRouter } from 'vue-router'
const { getMoviesBySearchQuery } = useMovies()
const router = useRouter()
const searchQuery = router.currentRoute.value.query.q

const { movies } = getMoviesBySearchQuery(searchQuery)

const app = document.getElementById('app')
app.style.height = '100vh'
</script>

<template>
  <AppHeader></AppHeader>
  <div id="movie-grid">
    <div class="nav">
      <h2 v-if="Object.keys(movies).length > 0">
        {{ movies.metadata.totalRecords }} kết quả từ tìm kiếm của "{{ searchQuery }}"
      </h2>
    </div>
    <div class="grid-list">
      <GridList v-if="Object.keys(movies).length > 0" :movies="movies.movies"></GridList>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/gridlist-page.css';
</style>
