<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDrawerStatusStore } from '../stores/drawerStatus'

const { show } = useDrawerStatusStore()

const isAuthenticated = ref(localStorage.getItem('token') !== null)
const username = ref(localStorage.getItem('username'))

const isShowDrawerBtn = ref(window.innerWidth < 690)
window.addEventListener('resize', () => {
  isShowDrawerBtn.value = window.innerWidth < 690
})

const isShowSheet = ref(false)

const router = useRouter()

function goToLogin() {
  router.push('/login')
}

function backToHome() {
  router.push('/')
}

function submit() {
  router.push(`/search?q=${searchText.value}`)
}

function goToProfile() {
  router.push({ name: 'profile', params: { username: username.value } })
}

function logOut() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isAuthenticated.value = false
  username.value = ''
  router.push('/login')
}

const searchText = ref('')
</script>

<template>
  <nav class="navbar navbar-expand" data-bs-theme="dark">
    <a @click.prevent="backToHome" class="navbar-brand">
      <img
        src="../assets/images/logo.svg"
        alt="Logo"
        width="30"
        height="24"
        class="d-inline-block align-text-top"
      />
      MoviePoint
    </a>
    <div id="navbarSupportedContent" class="expand navbar-expand">
      <div class="me-5 navbar-nav">
        <form
          @submit.prevent="submit"
          v-if="isShowDrawerBtn === false"
          class="d-flex position-relative"
          role="search"
        >
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchText"
            @keyup.enter.prevent="submit"
          />
          <button
            class="btn fa-solid fa-magnifying-glass position-absolute position-absolute top-50 end-0 translate-middle-y translate-middle-x"
            type="submit"
          ></button>
        </form>
        <li
          v-if="isShowDrawerBtn === false && isAuthenticated === false"
          id="form-box"
          class="nav-item ms-5"
        >
          <p>Welcome Guest?</p>
          <a class="nav-link" @click.prevent="goToLogin">Login</a>
        </li>
        <li
          v-if="isShowDrawerBtn === false && isAuthenticated === true"
          id="form-box"
          class="nav-item ms-5 hello-notification"
        >
          <p>Hello!</p>
          <a class="nav-link" @click.prevent="isShowSheet = !isShowSheet">{{ username }}</a>
          <div v-if="isShowSheet" class="sheet">
            <div class="sheet-item">
              <a class="sheet-link" @click.prevent="goToProfile">Profile</a>
            </div>
            <div class="sheet-item">
              <a class="sheet-link" @click.prevent="logOut">Logout</a>
            </div>
          </div>
        </li>
        <li v-if="isShowDrawerBtn" id="search" class="nav-item ms-5">
          <i class="fa-solid fa-magnifying-glass" style="color: #ffffff"></i>
        </li>
        <li v-if="isShowDrawerBtn" id="drawer" class="nav-item ms-3" @click.prevent="show">
          <i class="fa-solid fa-bars" style="color: #ffffff"></i>
        </li>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
}
.navbar-brand {
  margin-left: 20px;
}
.navbar-brand:hover,
.nav-link:hover {
  cursor: pointer;
}

.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

form button:hover {
  color: white;
}

.form-control {
  border-radius: 25px;
}

#form-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#form-box p {
  margin: 0;
  color: white;
}

#form-box a {
  color: red;
}

#drawer,
#search {
  cursor: pointer;
}

.hello-notification {
  position: relative;
}

.sheet {
  position: absolute;
  top: 100%;
  right: 0;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.sheet-item:first-child {
  margin-bottom: 8px;
}

.sheet-link {
  color: grey !important;
  text-decoration: none;
  cursor: pointer;
}

.sheet-link:hover {
  color: black !important;
}
</style>
