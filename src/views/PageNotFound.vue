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
  transition: .5s ease-out;
}

.button:hover {
  box-shadow: inset 0 -100px 0 0 #00bfa6;
  color: #fff;
}
</style>