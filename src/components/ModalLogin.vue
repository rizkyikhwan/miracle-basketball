<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-body">
        <LoadingPage v-if="loadingPage" />
        <div class="close-icon">
          <closeIcon
            @click="$emit('closeModalLogin')"
            style="cursor: pointer"
          />
        </div>
        <p>
          Don't have an account?
          <router-link class="router-link" :to="{ name: 'Register' }"
            >Register</router-link
          >
        </p>
        <h2>Login</h2>
        <div class="line"></div>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <font-awesome-icon
              class="icon"
              :icon="{ prefix: 'far', iconName: 'envelope' }"
            ></font-awesome-icon>
          </div>
          <div class="input">
            <input type="password" placeholder="Passowrd" v-model="password" @keyup.enter="signIn">
            <font-awesome-icon
              class="icon"
              :icon="{ prefix: 'fas', iconName: 'lock' }"
            ></font-awesome-icon>
          </div>
          <p  class="error" v-if="error">{{ errorMsg }}</p>
          <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
            >Forgot your Password?</router-link
          >
        </div>
        <button @click="signIn">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingPage from "@/components/LoadingPage.vue"
import closeIcon from "../assets/icons/close.svg";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { dbAuth } from "@/firebase/config"

export default {
  data() {
    return {
      email: null,
      password: null,
      loadingPage: null,
      error: null,
      errorMsg: ""
    };
  },
  components: {
    LoadingPage,
    closeIcon,
    FontAwesomeIcon
  },
  methods: {
    async signIn() {
      try {
        this.loadingPage = true
  
        await dbAuth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          window.location.reload()
          this.loadingPage = false
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = err.message
          this.loadingPage = false;
        })
      }
      catch (err) {
        console.log(err);
      }
    }
  },
};
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
}
</style>