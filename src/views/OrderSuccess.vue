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
              <h4>The Order is Being Packing</h4>
              <p>Please Check your Email to Proceed a Payment</p>
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
  border: 2px solid #00bfa6;
  color: #00bfa6;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 500;
  box-shadow: inset 0 0 0 0 #00bfa6;
  transition: 0.5s ease-out;
}

.btn:hover {
  box-shadow: inset 0 -100px 0 0 #00bfa6;
  color: #fff;
}

</style>