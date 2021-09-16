<template>
  <div class="hero">
    <div class="container">
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div id="hero" class="row mt-3">
        <div class="col-md-6">
          <img class="image" src="../assets/images/logo.png" alt="" />
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <div class="line"></div>
              <h1><strong>Miracle</strong> <span class="typing"></span></h1>
              <h4>Your Attribute was Here!</h4>
              <p>Get the champion with your best attribute</p>
              <div class="row justify-content-center">
                <div class="col">
                  <router-link
                    to="/product"
                    class="button"
                    >Lihat Produk <font-awesome-icon icon="shopping-cart"></font-awesome-icon></router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img src="../assets/images/hero-nike.png" alt="hero" class="img-hero" />
          <div class="color-box"></div>
        </div>
      </div>
    </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-3">
        <div class="col-md mb-5">
          <img src="../assets/images/hero-nike.png" alt="hero" class="img-hero" />
          <div class="color-box"></div>
        </div>
        <div class="container">
        <div class="col-md">
          <img class="image-mobile" src="../assets/images/logo.png" alt="" />
          <div class="d-flex">
            <div class="justify-content-end align-self-end">
              <div class="line"></div>
              <h2><strong>Miracle</strong> <span class="typing"></span></h2>
              <h5>Your Attribute was Here!</h5>
              <p>Get the champion with your best attribute</p>
              <div class="row justify-content-center">
                <div class="col">
                  <router-link
                    to="/product"
                    class="button"
                    >Lihat Produk <font-awesome-icon icon="shopping-cart"></font-awesome-icon></router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

gsap.registerPlugin(TextPlugin);

export default {
  name: "Hero",
  components: {
    FontAwesomeIcon
  },
  mounted() {
    // typing
    const typing = gsap.timeline({ repeat: 0 });

    typing
      .to(".typing", {
        text: "Basketball",
        duration: 1,
        repeat: 1,
        yoyo: true,
        delay: 1.3,
        repeatDelay: 1.5,
      })
      .to(".typing", { text: "Shoes", duration: 0.5, delay: 0.7, yoyo: true, repeat: 1, repeatDelay: 1.5 })
      .to(".typing", { text: "Store", duration: 0.5, delay: 0.7, yoyo: true });
  },
};
</script>

<style scoped>
.img-hero {
  width: 110%;
}

.garis::after {
  content: "";
  width: 5px;
  height: 32%;
  background-color: #00bfa6;
  position: absolute;
  top: 35%;
  left: -5px;
  border-radius: 10px;
}

.image {
  position: absolute;
  opacity: 0.05;
  top: 50px;
  left: -150px;
}

.image-mobile {
  position: absolute;
  opacity: 0.05;
  top: -90px;
  left: 100px;
}

.button {
  color: rgb(0, 191, 166);
  border: 2px solid rgb(0, 191, 166);
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 9px 18px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 1px;
  text-decoration: none;
  box-shadow: inset 0 0 0 0 #00bfa6;
  transition: ease-out .75s;
}

.button:hover {
  box-shadow: inset 400px 0 0 0 #00bfa6;
  color: #fff;
}

.color-box {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #00bfa6;
  border-radius: 20px;
  height: 100%;
  width: 110%;
  filter: blur(2px);
  z-index: -1;
  transform: translateX(35%);
}

@media (max-width: 768px) {
  .img-hero {
    width: 75%;
    margin: auto;
  }
}

@media (max-width: 415px) {
  .color-box {
    transform: translateX(-35%);
    border-radius: 0 20px 20px 0;
  }
}

</style>
