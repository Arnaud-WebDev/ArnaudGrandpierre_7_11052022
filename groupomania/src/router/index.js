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
  const publicPages = ["/login", "/register", "/home"]
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem("user")
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login")
  } else {
    next()
  }
})
export default router
