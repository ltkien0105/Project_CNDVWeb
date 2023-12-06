<script setup>
import { useVideoOverplayStatusStore } from '../stores/videoOverplayStatus'

const { show } = useVideoOverplayStatusStore()
</script>

<template>
  <div class="button">
    <button @click="show">
      <i class="fa-solid fa-circle-play me-1" style="color: #ffffff"></i>
      Watch Trailer
    </button>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  justify-content: start;
}

button {
  color: white;
}

button {
  border: none;
  border-radius: 20px;
  padding: 6px 20px;
  background: linear-gradient(90deg, rgba(150, 58, 175, 1) 0%, rgba(195, 64, 202, 1) 100%);
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: 8px;
}

button:hover {
  opacity: 0.8;
}

@media only screen and (max-width: 1100px) {
  button {
    margin-top: 16px;
    justify-content: center;
  }
}
</style>
