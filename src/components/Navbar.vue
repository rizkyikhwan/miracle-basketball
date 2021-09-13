<template>
  <div class="navbar">
    <nav class="container custom-nav">
      <div class="branding">
        <router-link class="header" to="/"
          ><img src="../assets/images/logo.png" alt="logo" class="img-brand"
        /></router-link>
      </div>
      <div class="nav-links" v-show="!mobile">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/product">Product</router-link>
        <a class="link" @click="toggleCartNav"
          >Cart <b-icon-bag></b-icon-bag
          ><span class="badge badge-success ml-2" v-if="carts.length">{{
            updateCart ? updateCart.length : carts.length
          }}</span></a
        >

        <transition name="overlay">
          <div class="overlay" v-show="cartNav"></div>
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
                        :src="'../assets/images/' + cart.products.gambar"
                        class="img-fluid"
                        width="100px"
                        :alt="cart.products.gambar"
                      />
                    </td>
                    <td>
                      <div class="row">
                        <div class="col">
                          <p style="font-size: 12px">
                            {{ cart.products.nama }}
                          </p>
                          <p style="font-size: 12px">
                            Rp {{ formatPrice(cart.products.harga) }}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CartNavEmpty v-show="carts.length == 0"/>
            <div class="row" v-show="carts.length >= 1">
              <div class="col-12">
                <router-link type="button" to="/checkout" class="button-checkout shadow"
                  >Checkout Now<br>(Rp {{ formatPrice(setTotal) }})</router-link
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
    </nav>
    <menuIcon class="menu-icon" @click="toggleMobileNav" v-show="mobile" />
    <transition name="overlay">
      <div class="overlay" v-show="mobileNav"></div>
    </transition>
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link-mobile" to="/">Home</router-link>
        <router-link class="link-mobile" to="/product">Product</router-link>
        <router-link class="link-mobile" to="/cart"
          >Cart <b-icon-bag></b-icon-bag
          ><span class="badge badge-success ml-2">{{
            updateCart ? updateCart.length : carts.length
          }}</span></router-link
        >
        <closeIconNav class="close-icon" @click="toggleMobileNav" />
        <img src="../assets/images/logo-white.png" alt="logo" class="img-logo" />
      </ul>
    </transition>
  </div>
</template>

<script>
import CartNavEmpty from "@/components/CartNavEmpty.vue"
import menuIcon from "../assets/icons/menu.svg";
import closeIcon from "../assets/icons/close.svg";
import closeIconNav from "../assets/icons/closeMobile.svg";
import { db } from "@/firebase/config"

export default {
  name: "Navbar",
  props: ["updateCart"],
  components: {
    CartNavEmpty,
    menuIcon,
    closeIcon,
    closeIconNav,
  },
  data() {
    return {
      order_quantity: [],
      carts: [],
      mobile: null,
      mobileNav: null,
      cartNav: null,
      windowWidth: null,
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
              await db.collection('carts')
                .doc(id)
                .delete()
                .then(() => {
                  this.Carts()
                })
            }
            catch(err) {
              console.log(err);
            }
            this.$swal.fire("Deleted!", "Your order was deleted", "success");
          }
        });
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      } else {
        this.mobile = false;
        this.mobileNav = false;
        return;
      }
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleCartNav() {
      this.cartNav = !this.cartNav;
    },
    async Carts() {
      try {
        const res = await db.collection('carts')
          .get()
        
        this.carts = res.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
      }
      catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.Carts()

    window.addEventListener("scroll", this.sticky);
  },
  computed: {
    setTotal() {
      return this.carts.reduce(function (items, data) {
        return items + data.products.harga * data.order_quantity;
      }, 0);
    },
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
  padding: 25px 0;
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
  background-color: #fff;
  padding: 0 25px;
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); */
  /* height: 75px; */
}

.nav-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
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
.overlay-enter-active,
.overlay-leave-active {
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

.overlay-enter {
  opacity: 0;
}

.overlay-leave-to {
  opacity: 0;
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

.overlay {
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
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
