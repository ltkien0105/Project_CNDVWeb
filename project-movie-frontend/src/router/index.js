import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GridPage from '../views/GridPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import ForgetPage from '../views/ForgetPage.vue'
import MovieDetailPage from '../views/MovieDetailPage.vue'
import SearchResultPage from '../views/SearchResultPage.vue'
import GenresPage from '../views/GenresPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/home',
      name: 'home-splash',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage,
      beforeEnter: (_, from, next) => {
        if (from.name != 'login') {
          next({ name: 'login', replace: true })
        } else next()
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: ForgetPage,
      beforeEnter: (_, from, next) => {
        if (from.name != 'login') {
          next({ name: 'login', replace: true })
        } else next()
      }
    },
    {
      path: '/movies',
      name: 'movies',
      children: [
        {
          path: 'genres',
          name: 'movies-genres',
          component: GenresPage
        },
        {
          path: 'recently',
          name: 'movies-recently',
          component: GridPage
        },
        {
          path: 'rating',
          name: 'movies-rating',
          component: GridPage
        }
      ],
      component: GridPage
    },
    {
      path: '/movies/:id(\\d+)',
      name: 'movie-detail',
      component: MovieDetailPage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResultPage
    },
    {
      path: '/genres',
      name: 'genres',
      component: GenresPage
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: ProfilePage
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null
  if (to.name !== 'login' && !isAuthenticated) {
    if (to.name === 'signup' || to.name === 'forget') next()
    else next({ name: 'login', replace: true })
  } else next()
})

export default router
