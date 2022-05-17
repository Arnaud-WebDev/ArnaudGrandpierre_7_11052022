<template>
  <div>
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!successful">
        <label for="username">Username :</label>
        <Field name="username" type="text" autofocus />
        <ErrorMessage name="username" /><br />

        <label for="email">Email :</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" /><br />

        <label for="password">Password :</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" /><br />

        <input type="submit" value="S'incrire" />
      </div>
    </Form>
    <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required !").min(3, "Il faut au moins 3 caractères !").max(20, "Il faut au maximum 20 caractères !"),
      email: yup.string().required("Email est requis !").email("Email invalide !").max(60, "Maximum 60 caractères !"),
      password: yup.string().required("un mot de passe est requis !").min(6, "Minimum 6 caractères !").max(20, "Maximum 20 caractères !"),
    })
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile")
    }
  },
  methods: {
    handleRegister(user) {
      ;(this.message = ""),
        (this.successful = false),
        (this.loading = true),
        this.$store.dispatch("auth/register", user).then(
          (data) => {
            this.message = data.message
            this.successful = true
            this.loading = true
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            this.successful = false
            this.loading = false
          }
        )
    },
  },
}
</script>

<style scoped>
input {
  margin: 10px;
}
</style>
