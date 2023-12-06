<script setup>
import AppHeader from '../components/AppHeader.vue'
import SubNav from '../components/SubNav.vue'
import ListHorizontal from '../components/ListHorizontal.vue'
import MovieDetailCard from '../components/MovieDetailCard.vue'
import useMovies from '../composables/useMovies'
import { useRouter } from 'vue-router'

const router = useRouter()

const id = router.currentRoute.value.params.id

const { getMovieById } = useMovies()
const { movie } = getMovieById(id)
</script>

<template>
  <AppHeader></AppHeader>
  <SubNav
    :items="[
      { name: 'Home', path: '/home' },
      { name: 'All Movies', path: '/movies' },
      { name: 'Top Ratings', path: '/movies/rating' },
      { name: 'Recently Released', path: '/movies/recently' }
    ]"
  ></SubNav>
  <div class="content">
    <h1>Movie Detailed Page</h1>
    <MovieDetailCard v-if="Object.keys(movie).length > 0" :movie="movie.movie"></MovieDetailCard>
    <div v-if="Object.keys(movie).length > 0" class="overview">
      <h2>Description</h2>
      <p class="overview-text">
        {{ movie.movie.description }}
      </p>
    </div>
    <div v-if="Object.keys(movie).length > 0" class="more">
      <h2>More Like This</h2>
      <div class="list-horizontal">
        <ListHorizontal :movies="movie.moviesSameGenre" :index="1"></ListHorizontal>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  color: white;
  padding-bottom: 50px;
}

.overview,
.more {
  width: 100%;
  margin-top: 64px;
}

.overview,
.more h2 {
  padding: 0 5%;
}
.overview-text {
  margin-top: 20px;
}

.list-horizontal {
  margin-top: 32px;
}
</style>
