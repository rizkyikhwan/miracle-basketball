<template>
  <div id="navbar" class="navbar">
    <LoadingPage v-show="loadingPage" />
    <nav class="container custom-nav">
      <div class="branding">
        <router-link class="header" to="/"
          ><img src="../assets/images/logo.png" alt="logo" class="img-brand"
        /></router-link>
      </div>
      <!-- Desktop -->
      <div class="nav-links" v-show="!mobile">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/product">Products</router-link>
        <a class="link" @click="toggleCartNav"
          >Cart <b-icon-bag></b-icon-bag
          ><span class="badge badge-success ml-2" v-if="carts.length">{{
            updateCart ? updateCart.length : carts.length
          }}</span></a
        >

        <transition name="overlay">
          <div class="overlay" v-show="cartNav || login || register || forgotPassword"></div>
        </transition>

        <transition name="cart-nav">
          <div class="cart-nav" v-show="cartNav">
            <div class="container">
              <div class="icon mb-3 mt-3">
                <b-icon-bag></b-icon-bag>
                {{ updateCart ? updateCart.length : carts.length }}
                Items
              </div>
              <closeIcon @click="toggleCartNav" style="cursor: pointer" />
              <!-- Jika ada barang -->
              <table class="table" v-show="carts.length >= 1">
                <tbody>
                  <tr v-for="cart in carts" :key="cart.id">
                    <td>
                      {{ cart.order_quantity }}x
                      <br />
                      <b-icon-trash
                        class="text-danger"
                        style="cursor: pointer"
                        @click="deleteOrder(cart.id)"
                      ></b-icon-trash>
                    </td>
                    <td>
                      <img
                        :src="'../assets/images/' + cart.product.gambar"
                        class="img-fluid"
                        width="100px"
                        :alt="cart.product.gambar"
                      />
                    </td>
                    <td>
                      <div class="row">
                        <div class="col">
                          <p style="font-size: 12px">
                            {{ cart.product.nama }}
                          </p>
                          <p style="font-size: 12px">
                            Rp {{ formatPrice(cart.product.harga) }}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CartNavEmpty v-show="carts.length == 0" />
            <div class="row" v-show="carts.length >= 1">
              <div class="col-12">
                <router-link
                  type="button"
                  to="/checkout"
                  class="button-checkout shadow"
                  >Checkout Now<br />(Rp
                  {{ formatPrice(setTotal) }})</router-link
                >
              </div>
              <div class="col-12">
                <router-link type="button" to="/cart" class="button"
                  >View Cart</router-link
                >
              </div>
            </div>
          </div>
        </transition>
      </div>

      <a v-if="!user" @click="toggleModalLogin" class="nav-login" v-show="!mobile" v-b-tooltip.hover.bottomleft="'Login/Register'">
        <font-awesome-icon
          style="width: 25px"
          class="icon-profileMenu"
          :icon="{ prefix: 'fas', iconName: 'user-circle' }"
        ></font-awesome-icon>
      </a>

      <transition name="fadeInBottom">
        <ModalLogin v-show="login" @closeModal="toggleModalLogin" @registerAccount="registerAccount" @forgotPassowrdAccount="forgotPasswordAccount" />
      </transition>

      <transition name="fadeInBottom">
        <ModalRegister v-show="register" @closeModal="toggleModalRegister" @loginAccount="loginAccount" />
      </transition> 

      <transition name="fadeInBottom">
        <ModalForgotPassword v-show="forgotPassword" @closeModal="toggleModalForgotPassword" @loginAccount="loginAccount" />
      </transition>

      <div v-if="user" v-show="!mobile" @click="toggleProfileMenu" class="profile" ref="profile">
        <span>{{ this.$store.state.profileInitials }}</span>
        <transition name="fadeInTop">
          <div v-show="profileMenu" class="profile-menu">
          <div class="triangle"></div>
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p class="identity">Hello!</p>
                <p class="identity">{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                <p class="identity">{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{name: 'Profile'}">
                  <font-awesome-icon
                    class="icon-profileMenu"
                    :icon="{ prefix: 'far', iconName: 'user' }"
                  ></font-awesome-icon>
                  <p class="user">Profile</p>
                </router-link>
              </div>
              <div @click="signOut" class="option">
                <font-awesome-icon
                  class="icon-profileMenu"
                  :icon="{ prefix: 'fas', iconName: 'sign-out-alt' }"
                ></font-awesome-icon>
                <p class="user">Sign Out</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Mobile -->
    <menuIcon class="menu-icon" @click="toggleMobileNav" v-show="mobile" />
    <transition name="overlay">
      <div class="overlay" v-show="mobileNav || login || register || forgotPassword"></div>
    </transition>
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link-mobile" to="/">Home</router-link>
        <router-link class="link-mobile" to="/product">Products</router-link>
        <a
          class="link-mobile"
          style="cursor: pointer"
          @click="toggleCartNavMobile"
          >Cart <b-icon-bag></b-icon-bag
          ><span class="badge badge-success ml-2" v-if="carts.length">{{
            updateCart ? updateCart.length : carts.length
          }}</span></a
        >
      <a v-if="!user" class="link-mobile" style="cursor: pointer" @click="toggleModalLoginMobile">
        Login/Register
      </a>
       <div v-if="user" class="link-mobile">
         <p>Hello!</p>
         <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
         <div class="options-mobile">
            <div class="option-mobile">
              <router-link class="option-mobile" :to="{name: 'Profile'}">
                <font-awesome-icon
                  class="icon-profileMenu"
                  :icon="{ prefix: 'far', iconName: 'user' }"
                ></font-awesome-icon>
                <p class="user">Profile</p>
              </router-link>
            </div>
            <div @click="signOut" class="option-mobile">
              <font-awesome-icon
                class="icon-profileMenu"
                :icon="{ prefix: 'fas', iconName: 'sign-out-alt' }"
              ></font-awesome-icon>
              <p class="user">Sign Out</p>
            </div>
          </div>
       </div>
        <transition name="cart-navMobile">
          <div class="cart-navMobile" v-show="cartNavMobile">
            <div class="container">
              <div class="icon mb-3 mt-3">
                <b-icon-bag></b-icon-bag>
                {{ updateCart ? updateCart.length : carts.length }}
                Items
              </div>
              <closeIcon @click="toggleCartNavMobile" style="cursor: pointer" />
              <!-- Jika ada barang -->
              <table class="table" v-show="carts.length >= 1">
                <tbody>
                  <tr v-for="cart in carts" :key="cart.id">
                    <td>
                      {{ cart.order_quantity }}x
                      <br />
                      <b-icon-trash
                        class="text-danger"
                        style="cursor: pointer"
                        @click="deleteOrder(cart.id)"
                      ></b-icon-trash>
                    </td>
                    <td>
                      <img
                        :src="'../assets/images/' + cart.product.gambar"
                        class="img-fluid"
                        width="100px"
                        :alt="cart.product.gambar"
                      />
                    </td>
                    <td>
                      <div class="row">
                        <div class="col">
                          <p style="font-size: 12px">
                            {{ cart.product.nama }}
                          </p>
                          <p style="font-size: 12px">
                            Rp {{ formatPrice(cart.product.harga) }}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CartNavMobileEmpty v-show="carts.length == 0" />
            <div class="row" v-show="carts.length >= 1">
              <div class="col-12">
                <router-link
                  type="button"
                  to="/checkout"
                  class="button-checkout shadow"
                  >Checkout Now<br />(Rp
                  {{ formatPrice(setTotal) }})</router-link
                >
              </div>
              <div class="col-12">
                <router-link type="button" to="/cart" class="button"
                  >View Cart</router-link
                >
              </div>
            </div>
          </div>
        </transition>
        <closeIconNav class="close-icon" @click="toggleMobileNav" />
        <img
          src="../assets/images/logo-white.png"
          alt="logo"
          class="img-logo"
        />
      </ul>
    </transition>
  </div>
</template>

<script>
import CartNavEmpty from "@/components/CartNavEmpty.vue";
import CartNavMobileEmpty from "@/components/CartNavMobileEmpty.vue";
import LoadingPage from "@/components/LoadingPage.vue"
import ModalLogin from "@/components/ModalLogin.vue"
import ModalRegister from "@/components/ModalRegister.vue"
import ModalForgotPassword from "@/components/ModalForgotPassword.vue"
import menuIcon from "../assets/icons/menu.svg";
import closeIcon from "../assets/icons/close.svg";
import closeIconNav from "../assets/icons/closeMobile.svg";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { db, dbAuth } from "@/firebase/config";

export default {
  name: "Navbar",
  props: ["updateCart"],
  components: {
    CartNavEmpty,
    CartNavMobileEmpty,
    LoadingPage,
    ModalLogin,
    ModalRegister,
    ModalForgotPassword,
    menuIcon,
    closeIcon,
    closeIconNav,
    FontAwesomeIcon
  },
  data() {
    return {
      order_quantity: [],
      carts: [],
      login: null,
      register: null,
      forgotPassword: null,
      mobile: null,
      mobileNav: null,
      cartNav: null,
      cartNavMobile: null,
      windowWidth: null,
      profileMenu: null,
      loadingPage: null
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 766) {
        this.mobile = true;
        return;
      } else {
        this.mobile = false;
        return;
      }
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleCartNav() {
      this.cartNav = !this.cartNav;
    },
    toggleCartNavMobile() {
      this.cartNavMobile = !this.cartNavMobile;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    toggleModalLogin() {
      this.login = !this.login
    },
    toggleModalLoginMobile() {
      this.login = !this.login
      this.mobileNav = false;
    },
    toggleModalRegister() {
      this.register = !this.register
    },
    toggleModalForgotPassword() {
      this.forgotPassword = !this.forgotPassword
    },
    loginAccount() {
      this.register = false;
      this.forgotPassword = false;
      this.login = true;
    },
    registerAccount() {
      this.login = false;
      this.register = true;
    },
    forgotPasswordAccount() {
      this.login = false;
      this.forgotPassword = true;
    },
    signOut() {
      dbAuth.signOut();
      window.location.reload()
    },
    async deleteOrder(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              this.loadingPage = true
              await db
                .collection("carts")
                .doc(id)
                .delete()
                .then(() => {
                  this.Carts();
                });
              this.loadingPage = false
            } catch (err) {
              console.log(err);
            }
            this.$swal.fire("Deleted!", "Your order was deleted", "success");
          }
        });
    },
    async Carts() {
      try {
        const res = await db.collection("carts").get();

        this.carts = res.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.Carts();

    let prevScroll = window.pageYOffset;
    window.onscroll = function () {
      let currentScroll = window.pageYOffset;
      if (prevScroll > currentScroll) {
        document.querySelector(".navbar").style.top = "0";
      } else {
        document.querySelector(".navbar").style.top = "-100px";
      }
      prevScroll = currentScroll;
    };
  },
  computed: {
    setTotal() {
      return this.carts.reduce(function (items, data) {
        return items + data.product.harga * data.order_quantity;
      }, 0);
    },
    user() {
      return this.$store.state.user;
    }
  },
};
</script>

<style scoped>
.img-brand {
  width: 50px;
}

.link {
  font-weight: 500;
  padding: 0 8px;
  margin-right: 32px;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: #00bfa6;
  display: inline-block;
  transition: 0.3s color ease;
}

.link:hover {
  color: #00ffdd;
}

.custom-nav {
  display: flex;
  padding: 12px 0;
}

.branding {
  display: flex;
  align-items: center;
}

.header {
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-decoration: none;
}

.navbar {
  font-family: "Rajdhani", sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0 25px;
  position: fixed;
  width: 100%;
  top: 0;
  transition: 0.5s ease;
  z-index: 99;
}

.nav-links {
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
}

.nav-login {
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  color: #00bfa6;
  text-decoration: none;
  text-transform: uppercase;
  transition: .5s ease;
}

.nav-login:hover {
  color: #00ffdd;
}

.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
}

.profile span {
  pointer-events: none;
}

.triangle {
  position: absolute;
  top: -8px;
  left: 221px;
  height: 0;
  width: 0;
  border-bottom: 15px solid #303030;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}

.profile-menu {
  position: absolute;
  top: 50px;
  right: 0;
  width: 250px;
  background-color: #303030;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.06);
}

.info {
  display: flex;
  cursor: default;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #fff;
}

.initials {
  position: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #303030;
  background-color: #fff;
}

.right {
  flex: 1;
  margin-left: 24px;
}

.right .identity:nth-child(1) {
  font-size: 14px;
}

.right .identity:nth-child(2), .identity:nth-child(3) {
  font-size: 12px;
}

.options {
  padding: 15px;
}

.option {
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.options-mobile {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}

.option-mobile {
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
}

.option-mobile:last-child {
  cursor: pointer;
}

.icon-profileMenu {
  width: 18px;
  height: auto;
}

.user {
  font-size: 14px;
  margin-left: 12px;
}

.option:last-child {
  margin-bottom: 0px;
}

p {
  margin-bottom: 0px;
}

.menu-icon {
  position: absolute;
  cursor: pointer;
  right: 25px;
  height: 25px;
  width: auto;
}

.close-icon {
  position: absolute;
  cursor: pointer;
  right: 10px;
  height: 25px;
  top: 10px;
  width: auto;
  z-index: 2;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
  z-index: 2;
}

.mobile-nav .link-mobile {
  padding: 15px 0;
  color: #fff;
  text-decoration: none;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active,
.cart-nav-enter-active,
.cart-nav-leave-active,
.cart-navMobile-enter-active,
.cart-navMobile-leave-active {
  transition: all 0.5s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}

.cart-nav-enter {
  transform: translateX(400px);
}

.cart-nav-leave-to {
  transform: translateX(400px);
}

.cart-navMobile-enter {
  transform: translateX(-400px);
}

.cart-navMobile-leave-to {
  transform: translateX(-400px);
}

.router-link-exact-active {
  font-weight: 700;
}

.badge {
  border-radius: 10px;
}

.img-logo {
  position: absolute;
  width: 300px;
  opacity: 0.05;
  left: -25px;
  z-index: -1;
}

.cart-nav {
  padding: 15px;
  width: 70%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  color: #303030;
  background-color: #fff;
  top: 0;
  right: 0;
  z-index: 2;
}

.cart-navMobile {
  padding: 15px;
  width: 70%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  color: #303030;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 2;
}

.delete-btn {
  cursor: pointer;
}

.button {
  display: block;
  border: 1px solid #008573;
  border-radius: 5px;
  padding: 8px 10px;
  margin-bottom: 15px;
  color: #008573;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.button:hover {
  color: #fff;
  background-color: #008573;
}

.button-checkout {
  display: block;
  border: 1px solid #008573;
  border-radius: 5px;
  padding: 8px 10px;
  margin-bottom: 15px;
  background-color: #008573;
  color: #fff;
  font-weight: 500;
  text-align: center;
  /* box-shadow: inset 0 0 0 0 #00bfa6; */
  text-decoration: none;
  transition: all 0.5s ease;
}
</style>
