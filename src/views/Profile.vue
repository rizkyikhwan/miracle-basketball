<template>
  <div class="profile">
    <transition name="overlay">
      <div class="overlay" style="z-index: 100" v-show="modalActive"></div>
    </transition>
    <Navbar />
    <div class="body-profile">
    <transition name="fadeInBottom">
    <Modal v-if="modalActive" :modalMessage="modalMessage" @closeModal="closeModal" />
    </transition>
      <div class="container">
        <h2>Account Settings</h2>
        <div class="line" style="margin: auto"></div>
        <div class="profile-info row d-flex justify-content-around">
          <div class="align-items-start mt-5">
            <div class="row">
              <div class="col-12 d-flex justify-content-center">
                <div class="initials col-12 col-sm-6">{{ this.$store.state.profileInitials }}</div>
              </div>
            </div>
            <div class="text-center mt-3">
              <p>Hi Mr/Mrs, {{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-6">
            <div class="profile-body">
              <div class="input">
                <label for="First Name">First Name :</label>
                <input disabled type="text" id="firstName" v-model="firstName">
                <font-awesome-icon class="icon" :icon="{ prefix: 'far', iconName: 'user' }"></font-awesome-icon>
              </div>
              <div class="input">
                <label for="Last Name">Last Name :</label>
                <input disabled type="text" id="lastName" v-model="lastName">
                <font-awesome-icon class="icon" :icon="{ prefix: 'far', iconName: 'user' }"></font-awesome-icon>
              </div>
              <div class="input">
                <label for="Phone Number">Phone Number :</label>
                <input disabled type="text" id="phoneNumber" v-model="phoneNumber">
                <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'phone-alt' }"></font-awesome-icon>
              </div>
              <div class="input">
                <label for="email">Email :</label>
                <input disabled type="text" id="email" v-model="email">
                <font-awesome-icon class="icon" :icon="{ prefix: 'far', iconName: 'envelope' }"></font-awesome-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col col-md-5"></div>
          <div class="col-12 col-md-6">
            <div class="button-wrap">
              <div class="d-flex justify-content-end">
                <button v-show="!edit" @click="editProfile" class="manage-account">
                <font-awesome-icon
                  class="icon-profileMenu"
                  :icon="{ prefix: 'fas', iconName: 'edit' }"
                ></font-awesome-icon> Edit</button>
                <button v-show="!edit" class="manage-account danger" @click="signOut">
                  <font-awesome-icon
                    class="icon-profileMenu"
                    :icon="{ prefix: 'fas', iconName: 'sign-out-alt' }"
                  ></font-awesome-icon> Sign Out</button>
                <button v-show="edit" class="manage-account success" @click="updateProfile">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Modal from "@/components/Modal.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { dbAuth } from "@/firebase/config"

export default {
  name: "Profile",
  components: {
    Navbar,
    Modal,
    FontAwesomeIcon
  },
  data() {
    return {
      modalMessage : "Changes were saved!",
      modalActive: null,
      edit: null,
    }
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateUserSettings")
      this.modalActive = true
      
      // Disable Form
      document.getElementById('firstName').disabled = true;
      document.getElementById('lastName').disabled = true;
      document.getElementById('phoneNumber').disabled = true;

      this.edit = false;
      
    },
    closeModal() {
      this.modalActive = !this.modalActive
    },
    editProfile() {
      this.edit = !this.edit

      if (this.edit) {
        // Undisable Form
        document.getElementById('firstName').disabled = false;
        document.getElementById('lastName').disabled = false;
        document.getElementById('phoneNumber').disabled = false;
      }
    },
    signOut() {
      dbAuth.signOut()
      this.$router.push({name: 'Home'})
    }
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit("changeFirstName", payload)
      }
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit("changeLastName", payload)
      }
    },
    phoneNumber: {
      get() {
        return this.$store.state.profilePhoneNumber;
      },
      set(payload) {
        this.$store.commit("changePhoneNumber", payload)
      }
    },
    email() {
      return this.$store.state.profileEmail;
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 16px;
  font-weight: 300;
  font-size: 32px;
}

.initials {
  position: initial;
  width: 160px;
  height: 80px;
  max-width: 160px;
  max-height: 80px;
  font-size: 24px;
  background-color: #303030;
  color: #fff;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.manage-account {
  margin: 5px 0 20px 10px;
  border-radius: 25px;
  background-color: #fff;
  color: #303030;
  padding: 4px 20px;
  transition: 0.2s;
}

.manage-account:hover {
  background-color: #303030;
  color: #fff;
  opacity: 1;
}

.input {
  margin: 16px 0;
}

label {
  font-size: 14px;
  display: block;
  padding-bottom: 6px;
}

input {
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  border-radius: 5px;
  padding: 4px 4px 4px 30px;
  height: 50px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number]{
  -moz-appearance: textfield;
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
  align-self: center;
  text-transform: uppercase;
  text-decoration: none;
  transition: ease-out .5s;
}

button:hover {
  opacity: 0.7;
}

.danger {
  border: 2px solid #dc3545;
  color: #dc3545;
}

.danger:hover {
  background-color: #dc3545;
  color: #fff;
}

.success {
  border: 2px solid #28a745;
  color: #28a745;
}

.success:hover {
  background-color: #28a745;
}

.icon {
  position: absolute;
  left: 23px;
  margin-top: 17px;
}

@media (max-width: 900px) {
  .initials {
    width: 80px;
    max-width: 80px;
  }

  .button-wrap {
    display: flex;
    justify-content: center;
  }

  button {
    padding: 12px 10px;
  }

  .manage-account {
    background-color: #303030;
    color: #fff;
  }

  .danger {
    background-color: red;
    color: #fff;
  }
}

@media (max-width: 768px) {
  .initials {
    width: 160px;
    max-width: 160px;
  }
}

@media (max-width: 576px) {
  .initials {
    width: 80pc;
    max-width: 80px;
  }

  .manage-account {
    padding: 3.5px 50px;
    margin-left: 20px;
  }
}
</style>