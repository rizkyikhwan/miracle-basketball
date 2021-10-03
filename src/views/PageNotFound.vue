<template>
  <div class="pageNotFound">
    <Navbar />
    <div class="d-flex justify-content-center">
      <div class="row mb-5">
        <div class="col">
          <img
            src="../assets/images/page-not-found.png"
            alt="not found"
            class="img-notfound img-fluid"
          />
          <div class="col d-flex justify-content-center mt-3 mb-3">
            <router-link :to="{ name: 'Home' }">
              <button class="button">GO BACK HOME</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "PageNotFound",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.img-notfound {
  width: 600px;
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
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  box-shadow: 1px 1px #00bfa6, 2px 2px #00bfa6, 3px 3px #00bfa6;
  transform: translateX(-3px);
}
</style>