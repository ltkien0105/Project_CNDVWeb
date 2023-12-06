<script setup>
import AppHeader from '../components/AppHeader.vue'
import SubNav from '../components/SubNav.vue'
import MovieCarousel from '../components/MovieCarousel.vue'
import GridList from '../components/GridList.vue'
import VideoOverplay from '../components/VideoOverplay.vue'

import { storeToRefs } from 'pinia'
import useMovies from '../composables/useMovies'
import { useVideoOverplayStatusStore } from '../stores/videoOverplayStatus'

const { getMoviesRecently, getMoviesMostRated } = useMovies()

const { movies: moviesRecently } = getMoviesRecently(1, 6)
const { movies: moviesMostRated } = getMoviesMostRated(1)

const videoOverplayStatus = useVideoOverplayStatusStore()
const { trailerUrl, status } = storeToRefs(videoOverplayStatus)
</script>

<template>
  <AppHeader></AppHeader>
  <SubNav
    :items="[
      { name: 'Home', path: '/' },
      { name: 'Movies', path: '/movies' },
      { name: 'By Genres', path: '/genres' }
    ]"
  ></SubNav>
  <div class="movie-recently">
    <h1>Recently</h1>

    <MovieCarousel
      v-if="moviesRecently"
      :movies="moviesRecently.movies"
      class="movie-carousel"
    ></MovieCarousel>
  </div>
  <div class="most-rated">
    <h1>Most Rated</h1>
    <div class="grid-list">
      <GridList v-if="moviesMostRated" :movies="moviesMostRated.movies"></GridList>
    </div>
  </div>
  <VideoOverplay v-if="status" :videoUrl="trailerUrl"></VideoOverplay>
</template>

<style scoped>
.movie-recently {
  width: 100%;
  height: 70vh;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.movie-carousel {
  margin-top: 20px;
}

.movie-recently h1 {
  margin-bottom: 16px;
}

.most-rated {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding-bottom: 50px;
}

.grid-list {
  width: 80%;
  margin-top: 30px;
}

@media only screen and (max-width: 768px) {
  .movie-recently {
    height: max-content;
  }
}

@media only screen and (max-width: 450px) {
  .movie-recently {
    height: 100vh;
  }
}

@media only screen and (max-width: 370px) {
  .movie-recently {
    height: 95vh;
  }
}

@media only screen and (max-width: 330px) {
  .movie-recently {
    height: 100vh;
  }
}
</style>
