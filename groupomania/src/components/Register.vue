<template>
  <div>
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!successful" class="center">
        <div class="container">
          <div>
            <div class="start">
              <label for="username">Username :</label>
            </div>
            <Field name="username" type="text" />
            <ErrorMessage name="username" />
          </div>
          <br />

          <div>
            <div class="start">
              <label for="email">Email :</label>
            </div>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <br />

          <div>
            <div class="start">
              <label for="password">Password :</label>
            </div>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
          </div>
          <br />

          <button :disabled="loading"><span v-show="loading"></span> Sign Up</button>
        </div>
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

label {
  margin-top: 10px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start {
  display: flex;
  justify-content: flex-start;
}

.container {
  margin-top: 40px;
  border: 2px solid black;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 2px 2px 3px black;
  background-color: #f7f7f7;
}
</style>
