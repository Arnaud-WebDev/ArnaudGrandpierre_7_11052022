<template>
  <div>
    <img src="./assets/icon-left-font.png" alt="Logo Groupomania" class="logo" /> <br />
    <router-link to="register">Register</router-link> / <router-link to="register">Login</router-link>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.logo {
  width: 250px;
  margin-right: 20px;
  margin-top: -40px;
}

.flex {
  display: flex;
  flex-direction: column;
}
</style>
