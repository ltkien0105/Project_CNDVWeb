<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <ul>
    <li class="info-detailed">
      <div class="name">Writer:</div>
      <div class="name-info">{{ props.movie.writers.join(', ') }}</div>
    </li>
    <li class="info-detailed">
      <div class="name">Director:</div>
      <div class="name-info">{{ props.movie.directors.join(', ') }}</div>
    </li>
    <li class="info-detailed">
      <div class="name">Stars:</div>
      <div class="name-info">{{ props.movie.stars.join(', ') }}</div>
    </li>
    <li class="info-detailed">
      <div class="name">Duration:</div>
      <div class="name-info">{{ props.movie.duration }} minutes</div>
    </li>
    <li class="info-detailed">
      <div class="name">Release Year:</div>
      <div class="name-info">{{ props.movie.release_year }}</div>
    </li>
  </ul>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.info-detailed {
  display: flex;
  flex-direction: row;
}
.info-detailed .name {
  width: 100px;
  color: #ab2745;
}

.info-detailed .name-info {
  color: white;
}
</style>
