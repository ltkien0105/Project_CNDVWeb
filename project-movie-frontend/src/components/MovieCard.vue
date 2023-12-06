<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import WatchTrailerButton from './WatchTrailerButton.vue'
import { useVideoOverplayStatusStore } from '../stores/videoOverplayStatus'
import MovieRating from './MovieRating.vue'

const videoOverplayStatus = useVideoOverplayStatusStore()
const { trailerUrl } = storeToRefs(videoOverplayStatus)

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const describe = ref(props.movie.description)
describe.value = describe.value.split(' ', 30).join(' ') + '...'

const imgWidth = 267
// const sizeCardWhenLargeScreen = `${imgWidth + 64}px`
</script>

<template>
  <div class="card">
    <div class="left">
      <img :width="imgWidth" :src="props.movie.img_url" alt="avatar" />
    </div>

    <div class="right">
      <div class="top">
        <h2>{{ props.movie.title }}</h2>
        <MovieRating :ratings="props.movie.rating"></MovieRating>
      </div>
      <p class="describe">{{ describe }}</p>
      <p class="duration">
        <i class="fa-solid fa-stopwatch me-1" style="color: #ffffff"></i>
        Thời lượng: {{ props.movie.duration }} phút
      </p>
      <WatchTrailerButton
        @click="
          () => {
            trailerUrl = props.movie.trailer_url
          }
        "
      ></WatchTrailerButton>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.card {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 32px;
  background-color: #2a3145;
  box-shadow: 0px 0px 20px 5px #2a3145;
}

img {
  height: 400px;
}

.left {
  width: 40%;
  margin-right: 32px;
  display: flex;
  justify-content: center;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 32px;
}

h2,
p {
  color: white;
}

.describe {
  text-align: justify;
}

@media only screen and (max-width: 1100px) {
  .card {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .left {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 8px;
  }

  .right {
    align-items: center;
  }

  .ratings {
    justify-content: center;
  }

  img {
    width: 267px;
    height: 400px;
  }

  .describe,
  .duration {
    margin-top: 16px;
  }
}

@media only screen and (max-width: 1100px) and (max-height: 1024px) {
  .describe {
    display: none;
  }
}
</style>
