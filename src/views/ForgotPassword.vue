<template>
<div class="reset-password">
  <Modal v-if="modalActive" :modalMessage="modalMessage" @closeModal="closeModal" />
  <LoadingPage v-if="loading" />
  <div class="form-warp">
    <div class="background"></div>
    <form class="register">
      <div class="angle"></div>
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <div class="line"></div>
      <h2>Reset Password</h2>
      <p style="width: 300px">Enter your email to receive instructions on how to reset your password.</p>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email">
          <font-awesome-icon class="icon" :icon="{prefix: 'far', iconName: 'envelope'}"></font-awesome-icon>
        </div>
        <Alert v-show="error" :errorMsg="errorMsg" @closeAlert="closeAlert"/>
      </div>
      <button @click.prevent="resetPassword">Reset</button>
    </form>
  </div>
</div>
</template>

<script>
import Alert from "@/components/Alert.vue"
import Modal from "@/components/Modal.vue"
import LoadingPage from "@/components/LoadingPage.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { dbAuth } from "@/firebase/config"

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: "",
      modalActive: false,
      modalMessage: "",
      loading: null,
      error: null,
      errorMsg: null
    }
  },
  components: {
    Alert,
    Modal,
    LoadingPage,
    FontAwesomeIcon
  },
  methods: {
    async resetPassword() {
      this.loading = true;
      await dbAuth.sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage = "If your account exists, you will receive a email";
          this.loading = false;
          this.modalActive = true;
        })
        .catch((err) => {
          this.errorMsg = err.message;
          this.loading = false;
          this.error = true;
        })
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
    closeAlert() {
      this.error = !this.error
    }
  }
}
</script>

<style scoped>
.router-link {
  color: #000;
}

.reset-password {
  position: relative;
}

.line {
  margin: 5px auto 5px;
}

h2 {
  max-width: 350px;
}

p {
  text-align: center;
  margin-bottom: 32px;
}

.form-warp {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
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
  margin-bottom: 40px;
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
}

input {
  border-radius: 5px;
}

.icon {
  position: absolute;
  left: 8px;
}

button {
  color: #fff;
  border: 2px solid #303030;
  background-color: #303030;
  border-radius: 5px;
  padding: 12px 24px;
  margin-top: 24px;
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

.angle {
  display: none;
  position: absolute;
  background-color: #fff;
  transform: rotateZ(3deg);
  width: 60px;
  left: -30px;
  height: 101%;
}

.background {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/images/bg-form.jpg");
  width: 100%;
  height: 100%;
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