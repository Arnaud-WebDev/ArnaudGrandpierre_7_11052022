<template>
  <div>
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!successful">
        <label for="username">Username :</label>
        <Field name="username" type="text" />
        <ErrorMessage name="username" /><br />

        <label for="email">Email :</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" /><br />

        <label for="password">Password :</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" /><br />

        <button :disabled="loading"><span v-show="loading"></span> Sign Up</button>
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
      username: yup.string().required("Username is required!").min(3, "Must be at least 3 characters!").max(20, "Must be maximum 20 characters!"),
      email: yup.string().required("Email is required!").email("Email is invalid!").max(50, "Must be maximum 50 characters!"),
      password: yup.string().required("Password is required!").min(6, "Must be at least 6 characters!").max(40, "Must be maximum 40 characters!"),
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
      this.message = ""
      this.successful = false
      this.loading = true
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message
          this.successful = true
          this.loading = false
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
