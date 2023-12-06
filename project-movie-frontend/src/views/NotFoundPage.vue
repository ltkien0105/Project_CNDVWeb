<script setup>
const app = document.getElementById('app')
app.style.backgroundImage = 'none'
</script>

<template>
  <div class="content">
    <h1>404</h1>
    <p class="nothing">OOPS! NOTHING WAS FOUND</p>
    <p class="desc">
      WE ARE SORRY BUT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAVE BEEN REMOVED, NAME CHANGED
      OR IS TEMPORARILY UNAVAILABLE
    </p>
    <router-link class="link" to="/">GO TO HOMEPAGE</router-link>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-size: 100px;
  color: orange;
}

.nothing {
  font-size: 35px;
  margin-top: 16px;
}
.desc {
  font-size: 15px;
  margin-top: 32px;
}

.link {
  margin-top: 16px;
  color: orangered;
  text-decoration: underline;
}
</style>
