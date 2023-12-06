<script setup>
import CardVertical from '../components/CardVertical.vue'

const props = defineProps({
  movies: {
    type: Array,
    require: true
  },
  index: {
    type: Number
  }
})

function scrollLeft() {
  const ul = document.querySelectorAll('ul.list-horizontal-card')[props.index - 1]
  ul.scrollLeft -= 100
}

function scrollRight() {
  const ul = document.querySelectorAll('ul.list-horizontal-card')[props.index - 1]
  ul.scrollLeft += 100
}
</script>

<template>
  <div class="row">
    <button @click.prevent="scrollLeft">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <ul class="list-horizontal-card" @mousedown="mouseDown" @mousemove="mouseMove">
      <li v-for="(movie, index) in props.movies" :key="index">
        <div class="card-vertical">
          <CardVertical :movie="movie"></CardVertical>
        </div>
      </li>
    </ul>
    <button @click.prevent="scrollRight">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
  <!-- </div> -->
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.row {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

ul {
  width: 90%;
  list-style-type: none;
  display: flex;
  gap: 32px;
  overflow: hidden;
}

button {
  width: 5%;
  background-color: transparent;
  border: none;
  color: red;
}

button i {
  font-size: 30px;
}
</style>
