<template>
  <div class="hero">
    <div class="container">
      <div id="hero" class="row mt-3">
        <div class="col-md-6 order-1 mb-5">
          <img class="image-logo" src="../assets/images/logo.png" alt="" />
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
        <div class="col-md-6 order-md-2 mb-5">
          <div class="slide" v-for="hero in images" :key="hero.id">
            <img :src="'../assets/images/hero/' + hero.image" alt="hero" class="img-hero" />
          </div>
          <div class="color-box"></div>
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
  data() {
    return {
      images: [
        {id: 1, image: 'hero-nike.png'},
        {id: 2, image: 'hero-lebron.png'},
        {id: 3, image: 'hero-jordan.png'},
        {id: 4, image: 'hero-kyrie.png'},
        {id: 5, image: 'hero-pg.png'},
      ]
    }
  },
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

    // Hero Slider
    const sliderTL = gsap.timeline({repeat: -1})
    const slides = document.querySelectorAll(".slide")
    const slideBg = document.querySelectorAll(".img-hero")

    slides.forEach((slide, i) => {
      sliderTL
      .from(slideBg[i], {duration: 0.5, opacity: 0, transform: 'translateX(25px)'})
      .to(slideBg[i], {duration: 0.5, opacity: 0, delay: 1.5, transform: 'translateX(25px)'}, "+=1")
    })
  },
};
</script>

<style scoped>
.slide {
  position: absolute;
}

.slide:nth-child(5) {
  position: relative;
}

.img-hero {
  width: 100%;
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

.image-logo {
  position: absolute;
  opacity: 0.05;
  top: 50px;
  left: -150px;
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

@media (max-width: 576px) {
  .img-hero {
    display: flex;
  }

  .image-logo {
    top: -90px;
    left: 100px;
  }

  .color-box {
    transform: translateX(5%);
    border-radius: 0;
  }
}

</style>
