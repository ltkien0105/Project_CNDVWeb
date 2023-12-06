<script setup>
import { ref } from 'vue'
import MovideCard from '../components/MovieCard.vue'

const props = defineProps({
  movies: {
    type: Array,
    require: true,
    default: () => []
  }
})

const isPressed = ref(false)
const app = document.querySelector('#app')
function mouseDown() {
  const ul = document.querySelector('.list-carousel')
  ul.addEventListener('mousedown', () => {
    isPressed.value = true
    ul.style.cursor = 'grabbing'
  })
}

function mouseMove() {
  const ul = document.querySelector('.list-carousel')

  ul.addEventListener('mousemove', (e) => {
    if (isPressed.value) {
      ul.scrollLeft -= e.movementX * 0.004
    }
  })
}

app.addEventListener('mouseup', () => {
  const ul = document.querySelector('.list-carousel')
  isPressed.value = false
  ul.style.cursor = 'default'
})
</script>

<template>
  <div id="carousel" class="carousel">
    <div class="list-carousel" @mousedown.prevent="mouseDown" @mousemove.prevent="mouseMove">
      <div class="card-item"></div>
      <div v-for="movie in props.movies" :key="movie.id" class="card-item">
        <MovideCard :movie="movie"></MovideCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#carousel {
  position: relative;
  height: 100%;
  width: 100%;
}

.list-carousel {
  height: 100%;
  overflow-x: scroll;
  overflow: hidden;
  display: grid;
  grid-template-columns: 15vw repeat(6, minmax(60vw, 80vw));
  gap: 64px;
}

.card-item {
  width: 100%;
}

.card-item:last-child {
  right: 30vw;
}

@media only screen and (max-width: 450px) {
  .card-item {
    width: 100%;
    margin-left: -15px;
  }

  .list-carousel {
    grid-template-columns: 0px repeat(6, minmax(max-content, 80vw));
  }
}
</style>
