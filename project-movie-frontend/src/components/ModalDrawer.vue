<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDrawerStatusStore } from '../stores/drawerStatus'

const router = useRouter()
const drawerStatus = useDrawerStatusStore()

const { status } = storeToRefs(drawerStatus)
</script>

<template>
  <div v-if="status" id="modal" class="drawer" @click="drawerStatus.hide">
    <div class="drawer-component">
      <button @click.prevent="router.push('/login')">Login</button>
      <hr />
      <button @click.prevent="router.push('/')">Home</button>
      <button @click.prevent="router.push('/movies')">Movies</button>
      <button @click.prevent="router.push('/movies/rating')">Top Ratings</button>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/modal.css';
@import '../assets/css/modal-drawer.css';
</style>
