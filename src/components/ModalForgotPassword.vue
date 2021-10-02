<template>
  <div class="modal">
    <transition name="overlay">
      <div class="overlay" v-show="modalActive"></div>
    </transition>
    <transition name="fadeInBottom">
      <Modal v-if="modalActive" :modalMessage="modalMessage" @closeModal="closeModal" />
    </transition>
    <LoadingPage v-if="loadingPage" />
    <div class="modal-content">
      <div class="modal-body">
        <LoadingPage v-if="loadingPage" />
        <div class="close-icon">
          <closeIcon
            @click="$emit('closeModal')"
            style="cursor: pointer"
          />
        </div>
         <p>
          Already have an account?
          <a class="router-link" @click="$emit('loginAccount')"
            >Login</a
          >
        </p>
      <h2>Reset Password</h2>
      <div class="line"></div>
      <p style="padding: 0 30px">Enter your email to receive instructions on how to reset your password.</p>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email">
          <font-awesome-icon class="icon" :icon="{prefix: 'far', iconName: 'envelope'}"></font-awesome-icon>
        </div>
        <transition name="fadeInTop">
          <p class="error" v-if="error" @click="closeError">{{ errorMsg }}</p>
        </transition>
      </div>
      <button @click.prevent="resetPassword">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue"
import LoadingPage from "@/components/LoadingPage.vue"
import closeIcon from "../assets/icons/close.svg";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { dbAuth } from "@/firebase/config"

export default {
  data() {
    return {
      email: "",
      modalMessage: "",
      modalActive: null,
      loadingPage: null,
      error: null,
      errorMsg: null
    }
  },
  components: {
    Modal,
    LoadingPage,
    closeIcon,
    FontAwesomeIcon
  },
  methods: {
    async resetPassword() {
      this.loadingPage = true;
      await dbAuth.sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalActive = true;
          this.modalMessage = "If your account exists, you will receive a email";
          this.loadingPage = false
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = err.message;
          this.loadingPage = false;
        })
    },
    closeModal() {
      this.modalActive = !this.modalActive
    },
    closeError() {
      this.error = !this.error
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  font-family: "Saira Semi Condensed", sans-serif;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0;
  width: 100%;
  height: 101%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 100;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  height: 450px;
  border-radius: 0;
  border: 0;
}

.modal-body {
  text-align: center;
}

.close-icon {
  display: flex;
  justify-content: flex-end;
}

.router-link {
  cursor: pointer;
  color: #000;
}

.line {
  margin: 5px auto 40px;
}

h2 {
  margin-bottom: 2px;
}

.input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

input {
  width: 100%;
  max-width: 300px;
  border: 0;
  background-color: #f2f7f6;
  border-radius: 5px;
  padding: 4px 4px 4px 35px;
  height: 50px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.icon {
  position: absolute;
  left: 70px;
}

.forgot-password {
  color: rgb(105, 105, 105);
  text-decoration: none;
}

button {
  display: inline-block;
  background-color: #303030;
  border: 0;
  color: #fff;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  margin-top: 25px;
  transition: 0.2s;
}

button:hover {
  background-color: #3030309d;
}

.error {
  color: red;
  margin-bottom: 0;
  cursor: pointer;
}

@media (max-width: 576px) {
  .icon {
    left: 50px;
  }
}

@media (max-width: 429px) {
  .icon {
    left: 55px;
  }
}

@media (max-width: 413px) {
  .icon {
    left: 50px;
  }
}

@media (max-width: 393px) {
  .icon {
    left: 40px;
  }
}

@media (max-width: 391px) {
  .icon {
    left: 40px;
  }
}

@media (max-width: 376px) {
  .icon {
    left: 30px;
  }
}

@media (max-width: 361px) {
  .icon {
    left: 25px;
  }
}

@media (max-width: 361px) {
  .icon {
    left: 10px;
  }
}
</style>