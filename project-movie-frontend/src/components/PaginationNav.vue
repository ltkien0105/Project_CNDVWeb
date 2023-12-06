<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  totalPages: {
    type: Number,
    require: true,
    default: 0
  }
})

let currentPage
if (router.currentRoute.value.query.page) {
  currentPage = parseInt(router.currentRoute.value.query.page)
} else {
  currentPage = 1
}

const previousPage = () => {
  if (currentPage > 1) {
    return currentPage - 1
  } else {
    return props.totalPages
  }
}

const nextPage = () => {
  if (currentPage < props.totalPages) {
    return currentPage + 1
  } else {
    return 1
  }
}
</script>

<template>
  <nav class="pagination-nav">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" @click="router.push(`?page=${previousPage()}`)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li v-for="page in props.totalPages" :key="page" class="page-item">
        <a
          v-if="page === currentPage"
          class="page-link active"
          @click="router.push(`?page=${page}`)"
          >{{ page }}</a
        >
        <a v-else class="page-link" @click="router.push(`?page=${page}`)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="router.push(`?page=${nextPage()}`)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
@import '../assets/css/pagination.css';
</style>
