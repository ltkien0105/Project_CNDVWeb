<script setup>
import { useRouter } from 'vue-router'
import MovieRating from '../components/MovieRating.vue'

const props = defineProps({
  movie: {
    type: Object,
    require: true,
    default: () => {}
  }
})

const router = useRouter()

function handleClick() {
  router.push(`/movies/${props.movie.id}`)
}
</script>

<template>
  <div class="card-vertical" @click="handleClick">
    <img :src="props.movie.img_url" />
    <p class="title">{{ props.movie.title }}</p>
    <MovieRating :ratings="props.movie.rating" class="ratings-tag"></MovieRating>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.card-vertical {
  height: 400px;
  width: 200px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 8px;
  padding-bottom: 8px;
}

.card-vertical:hover {
  opacity: 0.8;
  cursor: pointer;
}

img {
  width: 200px;
  height: 70%;
  border-radius: 8px 8px 0 0;
}

p {
  height: 20%;
  margin: 8px 8px 0px;
  text-align: center;
  display: flex;
  align-items: center;
}

.ratings-tag {
  height: 10%;
}
</style>
