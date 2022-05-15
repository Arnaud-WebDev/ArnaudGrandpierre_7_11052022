<template>
  <div>
    <form>
      <label for="Username">Username :</label>
      <input type="text" autofocus /> <br />
      <label for="Username">Password :</label>
      <input type="password" /> <br />
      <input type="submit" value="" />
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
}
</script>

<style scoped>
input {
  margin: 10px;
}
</style>
