import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ["/register", "/login", "/home"]
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem("user")
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/register")
  } else {
    next()
  }
})
export default router
