<script setup>
import { storeToRefs } from 'pinia'
import CategoryRow from '../components/CategoryRow.vue'
import InfoDetailList from '../components/InfoDetailList.vue'
import WatchTrailerButton from '../components/WatchTrailerButton.vue'
import VideoOverplay from '../components/VideoOverplay.vue'
import { useVideoOverplayStatusStore } from '../stores/videoOverplayStatus'

const videoOverplayStatus = useVideoOverplayStatusStore()
const { status } = storeToRefs(videoOverplayStatus)

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="movie-detail-card">
    <img :src="props.movie.img_url" alt="avatar" />
    <div v-if="Object.keys(props.movie).length > 0" class="col info">
      <h2>{{ props.movie.title }}</h2>
      <CategoryRow :genres="props.movie.genres" class="category"></CategoryRow>
      <InfoDetailList :movie="props.movie"></InfoDetailList>
      <WatchTrailerButton class="watch-trailer-button"></WatchTrailerButton>
    </div>
  </div>
  <VideoOverplay v-if="status" :videoUrl="props.movie.trailer_url"></VideoOverplay>
</template>

<style scoped>
img {
  width: 267px;
  margin-right: 32px;
}
.movie-detail-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  background-color: #2a3145;
  padding: 32px;
  box-shadow: 0px 0px 20px 5px #2a3145;
}

.category {
  margin-bottom: 20px;
}

.watch-trailer-button {
  margin-top: 32px;
}

@media only screen and (max-width: 768px) {
  img {
    width: 267px;
    margin-right: 0px;
  }
  .movie-detail-card {
    flex-direction: column;
  }

  .col.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
  }

  .watch-trailer-button {
    margin-top: 0px;
  }
}

@media only screen and (max-width: 470px) {
  .movie-detail-card {
    padding: 32px 8px;
  }
}
</style>
