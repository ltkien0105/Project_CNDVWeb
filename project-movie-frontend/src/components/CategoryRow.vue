<script setup>
const props = defineProps({
  genres: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div class="category">
    <div class="line"></div>
    <div class="category-item">
      <div v-for="(genre, index) in props.genres" :key="index" class="category-part">
        <p>{{ genre }}</p>
        <div v-if="index < props.genres.length - 1" class="vertical-line">|</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.category {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
}

.category-part {
  display: flex;
}

.line {
  width: 20px;
  height: 2px;
  background-color: white;
  margin-right: 10px;
}

.category-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

p {
  display: inline-block;
}

.vertical-line {
  margin: 0px 4px;
}
</style>
