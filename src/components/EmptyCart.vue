<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="row mb-5">
        <div class="col">
          <transition appear @before-enter="beforeEnter" @enter="enter">
            <img
              class="empty-img img-fluid"
              src="../assets/images/empty-cart(edit).png"
              alt="empty"
            />
          </transition>
          <div class="text-center">
            <p>Add items you want to shop</p>
            <router-link to="/product">
              <button class="button">Go to Shop</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "EmptyCart",
  methods: {
    beforeEnter: function (el) {
      (el.style.opacity = 0), (el.style.transform = "translateY(-25px)");
    },
    enter: function (el, done) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        onComplete: done,
      });
    },
  },
};
</script>

<style scoped>
.empty-img {
  width: 500px;
}

.button {
  display: inline-block;
  color: #00bfa6;
  background-color: #fff;
  border: 2px solid #00bfa6;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 9px 18px;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  box-shadow: 1px 1px #00bfa6, 2px 2px #00bfa6, 3px 3px #00bfa6;
  transform: translateX(-3px);
}
</style>