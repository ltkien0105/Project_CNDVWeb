<script setup>
import CardVertical from '../components/CardVertical.vue'

const props = defineProps({
  movies: {
    type: Array,
    require: true,
    default: () => []
  }
})
</script>

<template>
  <div class="grid">
    <div v-for="movie in props.movies" :key="movie.id" class="col">
      <CardVertical :movie="movie"></CardVertical>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-gap: 32px;
}

div.col {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 1480px) {
  .grid {
    grid-template-columns: auto auto auto auto auto;
  }
}

@media only screen and (max-width: 1232px) {
  .grid {
    grid-template-columns: auto auto auto auto;
  }
}

@media only screen and (max-width: 955px) {
  .grid {
    grid-template-columns: auto auto auto;
  }
}

@media only screen and (max-width: 740px) {
  .grid {
    grid-template-columns: auto auto;
  }
}

@media only screen and (max-width: 500px) {
  .grid {
    grid-template-columns: auto;
  }
}
</style>
