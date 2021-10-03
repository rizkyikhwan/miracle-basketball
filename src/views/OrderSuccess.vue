<template>
  <div class="order-success">
    <Navbar />
    <div class="container mt-3">
      <div class="d-flex justify-content-center">
        <div class="row mb-5">
          <div class="col">
            <transition appear @before-enter="beforeEnter" @enter="enter">
            <img
              src="../assets/images/order-success.png"
              alt="success"
              style="width: 500px"
            />
            </transition>
            <div class="text-center">
              <h4>The order is being packing</h4>
              <p>Silakan periksa Email Anda untuk melanjutkan pembayaran</p>
              <router-link to="/product">
                <button class="btn">Back to Shop</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import gsap from "gsap";

export default {
  name: "OrderSuccess",
  components: {
    Navbar,
  },
  methods: {
      beforeEnter(el) {
          el.style.opacity = 0,
          el.style.transform = 'translateY(-50px)'
      },
      enter(el, done) {
          gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'expo.out',
              onComplete: done
          })
      }
  }
};
</script>

<style scoped>
.btn {
  display: inline-block;
  color: #00bfa6;
  background-color: #fff;
  border: 2px solid #00bfa6;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 9px 18px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  color: #00bfa6;
  box-shadow: 1px 1px #00bfa6, 2px 2px #00bfa6, 3px 3px #00bfa6;
  transform: translateX(-3px);
}

</style>