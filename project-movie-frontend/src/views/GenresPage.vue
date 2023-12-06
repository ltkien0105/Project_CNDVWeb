<script setup>
import AppHeader from '../components/AppHeader.vue'
import ListHorizontal from '../components/ListHorizontal.vue'
import useMovies from '../composables/useMovies'
const { getMoviesGenres } = useMovies()

const { movies } = getMoviesGenres()
let i = 1
</script>

<template>
  <AppHeader></AppHeader>
  <div v-if="Object.keys(movies).length > 0" class="content">
    <div v-for="[genre, movie] in Object.entries(movies)" :key="genre" class="genre-container">
      <h2>{{ genre }}</h2>
      <ListHorizontal :movies="movie" :index="i++"></ListHorizontal>
    </div>
  </div>
</template>

<style scoped>
.genre-container {
  margin-bottom: 64px;
  color: white;
}

h2 {
  padding-left: 5%;
  margin-bottom: 16px;
}
</style>
