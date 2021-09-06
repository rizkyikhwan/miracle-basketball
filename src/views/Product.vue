<template>
  <div class="product">
    <Navbar />
    <div class="container mt-5">
      <div class="line"></div>
      <h2>Best <strong>Seller</strong></h2>
      <transition-group
        appear
        tag="div"
        class="row mb-5"
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <router-link
          :to="'/products/' + product.id"
          class="col-sm-6 col-md-4 mt-2 produk"
          v-for="(product, index) in bestproducts"
          :key="product.id"
          :data-index="index"
        >
          <CardProduct :product="product" />
        </router-link>
      </transition-group>
      <div class="line"></div>
      <div class="row">
        <div class="col-md-6">
          <h2>All Products</h2>
          <div class="d-flex align-items-center">
            <div class="input-group flex-nowrap mb-3">
              <input
                v-model="search"
                type="search"
                class="search"
                placeholder="Search.."
                aria-label="Search"
                aria-describedby="addon-wrapping"
                @keyup="searchAllProduct"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div class="col">
            <div class="row">
              <div class="col-12">
                <p>Category</p>
              </div>
              <div class="btn-group" data-toggle="buttons">
                <div class="col-2.4">
                  <label class="category-list active">
                    <input type="radio" v-model="brand" value="All" /> All
                  </label>
                </div>
                <div class="col-2.4">
                  <label class="category-list">
                    <input type="radio" v-model="brand" value="Nike" /> Nike
                  </label>
                </div>
                <div class="col-2.4">
                  <label class="category-list">
                    <input type="radio" v-model="brand" value="Adidas" /> Adidas
                  </label>
                </div>
                <div class="col-2.4">
                  <label class="category-list">
                    <input type="radio" v-model="brand" value="Air Jordan" />
                    Air Jordan
                  </label>
                </div>
                <div class="col-2.4">
                  <label class="category-list">
                    <input type="radio" v-model="brand" value="Under Armour" /> Under Armour
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <transition-group
        appear
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter"
        class="row mb-5"
        v-show="allproducts.length >= 1"
      >
        <router-link
          :to="'/products/' + product.id"
          class="col-sm-6 col-md-3 mt-2 produk"
          v-for="(product, index) in filterProductsByCategory"
          :key="product.id"
          :data-index="index"
        >
          <AllProduct :product="product" />
        </router-link>
      </transition-group>
      <NotFound v-show="allproducts.length == 0" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import AllProduct from "@/components/AllProduct.vue";
import NotFound from "@/components/SearchNotFound.vue";
import axios from "axios";
import gsap from "gsap";
import $ from "jquery";

export default {
  name: "Product",
  components: {
    Navbar,
    CardProduct,
    AllProduct,
    NotFound,
  },
  data() {
    return {
      bestproducts: [],
      allproducts: [],
      search: "",
      brand: "All",
    };
  },
  methods: {
    async searchAllProduct() {
      const response =  await axios.get("http://localhost:3000/products?q=" + this.search)
        this.allproducts = response.data;
    },
    beforeEnter: function (el) {
      (el.style.opacity = 0), (el.style.transform = "translateY(25px)");
    },
    enter: function (el, done) {
      gsap.to(el, {
        opacity: 1,
        duration: 1,
        y: 0,
        ease: "power4.out",
        delay: el.dataset.index * 0.2,
        onComplete: done,
      });
    },
    async bestSeller() {
      const response = await axios.get("http://localhost:3000/best-seller");
      this.bestproducts = response.data;
    },
    async allProducts() {
      const response = await axios.get("http://localhost:3000/products");
      this.allproducts = response.data;
    }
  },
  mounted() {
    // Best Seller
    this.bestSeller();

    // All Product
    this.allProducts();

    this.searchAllProduct();

    $(".category-list").on("click", function () {
      $(".category-list").removeClass("active");
      $(this).addClass("active");
    });
  },
  computed: {
    filterProductsByCategory() {
      if (this.brand === "All") {
        return this.allproducts;
      } else {
        return this.allproducts.filter(
          (product) => !product.brand.indexOf(this.brand)
        );
      }
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: "Rajdhani", sans-serif;
}

[type="radio"] {
  display: none;
}

.search[type="search"] {
  width: 250px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  background-color: #fff;
  padding: 10px 20px 10px 40px;
  transition: width 0.4s ease-in-out;
}

.search[type="search"]:focus {
  width: 100%;
  outline: none;
  border-color: #00bfa6;
}

.category-list {
  border: 1.5px solid #00bfa6;
  background-color: #fff;
  padding: 1px 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: inset 0 0 0 0 #00bfa6;
  transition: all 0.5s ease-out;
}

.category-list:hover {
  background-color: #00bfa6;
  box-shadow: inset 0 100px 0 0 #00bfa6;
  color: #fff;
}

.active {
  background-color: #00bfa6;
  color: #fff;
}
</style>
