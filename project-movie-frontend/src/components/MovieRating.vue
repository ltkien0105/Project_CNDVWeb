<script setup>
import { ref } from 'vue'
const props = defineProps({
  ratings: {
    type: Number,
    required: true,
    default: 0
  }
})
const ratings = ref(props.ratings)
const ratings_unvote = ref(5 - props.ratings)
</script>

<template>
  <div class="ratings">
    <div class="stars">
      <i v-for="i in ratings" :key="i" class="fa-solid fa-star me-1" style="color: #ffd43b"></i>
      <i
        v-for="i in ratings_unvote"
        :key="5 - i"
        class="fa-solid fa-star me-1"
        style="color: grey"
      ></i>
    </div>
  </div>
</template>

<style scoped>
.ratings {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
}
</style>
