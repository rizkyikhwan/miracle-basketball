<template>
  <div class="form-warp">
    <LoadingPage v-show="loadingPage" />
    <div class="background"></div>
    <form class="login">
      <div class="angle"></div>
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{name: 'Register'}">Register</router-link>
      </p>
      <h2>Login</h2>
      <div class="line"></div>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email">
          <font-awesome-icon class="icon" :icon="{prefix: 'far', iconName: 'envelope'}"></font-awesome-icon>
        </div>
        <div class="input">
          <input type="password" placeholder="Passowrd" v-model="password">
          <font-awesome-icon class="icon" :icon="{prefix: 'fas', iconName: 'lock'}"></font-awesome-icon>
        </div>
        <Alert v-show="error" :errorMsg="errorMsg" @closeAlert="closeAlert()" />
      </div>
      <router-link class="forgot-password" :to="{name: 'ForgotPassword'}">Forgot your passowrd?</router-link>
      <button @click.prevent="signIn">Sign In</button>
    </form>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue"
import LoadingPage from "@/components/LoadingPage.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { dbAuth } from "@/firebase/config"

export default {
  name: 'Login',
  components: {
    Alert,
    LoadingPage,
    FontAwesomeIcon
  },
  data() {
    return {
      email: "",
      password: "",
      loadingPage: null,
      error: null,
      errorMsg: ""
    }
  },
  methods: {
    closeAlert() {
      this.error = false;
    },
    async signIn() {
      try {
        if (this.email !== "" && this.password !== "") {
          this.loadingPage = true;
          await dbAuth.signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({name: "Products"})
            this.loadingPage = false;
          })
        }
        this.error = true;
        this.errorMsg = "Please fill out all the fields!"
        this.loadingPage = false
        } catch(err) {
        this.error = true;
        this.errorMsg = err.message;
        this.loadingPage = false;
      }
    }
  }
}
</script>

<style scoped>
.form-warp {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
}

.login-register {
  margin-bottom: 32px;
}

.login-register .router-link {
  color: #000;
}

.line {
  margin: 5px auto 40px;
}

form {
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

form h2 {
  text-align: center;
  font-size: 32px;
  color: #303030;
  margin-bottom: 2px;
}

.inputs {
  width: 100%;
  max-width: 350px;
}

.inputs .input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.inputs .input input {
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 4px 4px 4px 30px;
  height: 50px;
  border-radius: 5px;
}

.icon {
  position: absolute;
  left: 8px;
}

.forgot-password {
  color: #000;
  cursor: pointer;
  font-size: 14px;
  margin: 16px 0 32px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease all;
}

button {
  color: #fff;
  border: 2px solid #303030;
  background-color: #303030;
  border-radius: 5px;
  padding: 12px 24px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  transition: ease-out .5s;
}

button:hover {
  opacity: 0.7;
}

.button-wrap {
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
}

.background {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/images/bg-form.jpg");
  width: 100%;
  height: 100%;
}

.angle {
  display: none;
  position: absolute;
  background-color: #fff;
  transform: rotateZ(3deg);
  width: 60px;
  left: -30px;
  height: 101%;
}

@media (min-width: 900px) {
  .form-warp {
    width: 100%;
  }

  form {
    padding: 0 50px;
  }

  h2 {
    font-size: 40px;
  }

  .angle, .background {
    display: initial;
  }
  
}
</style>