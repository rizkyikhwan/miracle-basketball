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
  border: 2px solid #00bfa6;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
  padding: 8px 10px;
  font-size: 18px;
  letter-spacing: 1px;
  color: #00bfa6;
  font-weight: 500;
  box-shadow: inset 0 0 0 0 #00bfa6;
  transition: .75s ease-out;
}

.button:hover {
  box-shadow: inset 0 -100px 0 0 #00bfa6;
  color: #fff;
}
</style>