<template>
  <div class="form-warp">
    <LoadingPage v-show="loadingPage" />
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
      <h2>Create Your Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <font-awesome-icon
            class="icon"
            :icon="{ prefix: 'far', iconName: 'user' }"
          ></font-awesome-icon>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <font-awesome-icon
            class="icon"
            :icon="{ prefix: 'far', iconName: 'user' }"
          ></font-awesome-icon>
        </div>
        <div class="input">
          <input type="number" placeholder="Phone Number" v-model="phoneNumber" />
          <font-awesome-icon
            class="icon"
            :icon="{ prefix: 'fas', iconName: 'phone-alt' }"
          ></font-awesome-icon>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <font-awesome-icon
            class="icon"
            :icon="{ prefix: 'far', iconName: 'envelope' }"
          ></font-awesome-icon>
        </div>
        <div class="input">
          <input type="password" placeholder="Passowrd" v-model="password" />
          <font-awesome-icon
            class="icon"
            :icon="{ prefix: 'fas', iconName: 'lock' }"
          ></font-awesome-icon>
        </div>
        <Alert v-show="error" :errorMsg="errorMsg" @closeAlert="closeAlert()" />
      </div>
      <button @click.prevent="register">Sign Up</button>
    </form>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue"
import LoadingPage from "@/components/LoadingPage.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dbAuth, db } from "../firebase/config"

export default {
  name: "Register",
  components: {
    Alert,
    LoadingPage,
    FontAwesomeIcon,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: null,
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      loadingPage: null
    };
  },
  methods: {
    closeAlert() {
      this.error = false;
    },
    async register() {
      try {
        if (
          this.firstName !== "" &&
          this.lastName !== "" &&
          this.email !== "" &&
          this.phoneNumber !== "" &&
          this.password !== ""
        ) {
          this.loadingPage = true
          const createUser = await dbAuth.createUserWithEmailAndPassword(this.email, this.password)
          const result = await createUser
          const dataBase = db.collection("users").doc(result.user.uid)
          await dataBase.set({
            firstName : this.firstName,
            lastName : this.lastName,
            email : this.email,
            phoneNumber : this.phoneNumber
          }).then(() => {
            this.$router.push({name: "Home"})
            this.loadingPage = false
            return
          }) 
          .catch((err) => {
            this.error = true
            this.errorMsg = err.message
            this.loadingPage = false
        })
        }
        this.error = true;
        this.errorMsg = "Please fill out all the fields!"
        this.loadingPage = false
      } catch(err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  max-width: 350px;
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

.login-register {
  margin-bottom: 32px;
}

.login-register .router-link {
  color: #000;
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

.line {
  margin: 5px auto 5px;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number]{
  -moz-appearance: textfield;
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/images/bg-form.jpg");
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

  .angle,
  .background {
    display: initial;
  }
}
</style>