<template>
  <div class="modal">
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
        <h2>Create Your Account</h2>
        <div class="line"></div>
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
            <input
              type="number"
              placeholder="Phone Number"
              v-model="phoneNumber"
            />
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
          <transition name="fadeInTop">
            <p class="error" v-if="error" @click="closeError">{{ errorMsg }}</p>
          </transition>
        </div>
        <button @click.prevent="register">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingPage from "@/components/LoadingPage.vue";
import closeIcon from "../assets/icons/close.svg";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { db, dbAuth } from "@/firebase/config";

export default {
  name: "ModalRegister",
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      loadingPage: null,
      error: null,
      errorMsg: null
    }
  },
  components: {
    LoadingPage,
    closeIcon,
    FontAwesomeIcon,
  },
  methods: {
    closeError() {
      this.error = !this.error
    },
    async register() {
      try {
        if (this.firstName !== "" && this.lastName !== "" && this.phoneNumber !== "" && this.password !== "") {
          this.loadingPage = true;
          const createUser = dbAuth.createUserWithEmailAndPassword(this.email, this.password);
          const result = await createUser;
          const dataBase = db.collection('users').doc(result.user.uid)
          await dataBase.set({
            firstName : this.firstName,
            lastName : this.lastName,
            phoneNumber : this.phoneNumber,
            email : this.email
          })
          .then(() => {
            window.location.reload()
            this.loadingPage = false;
          })
          .catch((err) => {
            this.error = true;
            this.errorMsg = err.message;
            this.loadingPage = false;
          })
        } else {
          this.error = true;
          this.errorMsg = "Please fill out all the fields!"
          this.loadingPage = false
        }
      }
      catch(err) {
        this.error = true;
        this.errorMsg = err.message;
        this.loadingPage = false;
      }
    }
  }
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

.modal-content {
  height: 600px;
}

.line {
  margin: 5px auto 40px;
}

.router-link {
  cursor: pointer;
}

.router-link:hover {
  color: #000;
}

@media (max-width: 576px) {
  .icon {
    left: 50px;
  }
}

@media (max-width: 376px) {
  .icon {
    left: 30px;
  }
}
</style>