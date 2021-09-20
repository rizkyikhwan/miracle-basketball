<template>
  <div class="product">
    <Navbar />
    <div class="container mt-5">
      <div class="line"></div>
      <h2>Best <strong>Seller</strong></h2>
      <div v-if="error">{{ error }}</div>
      <transition-group
        appear
        tag="div"
        class="row mb-5"
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <router-link
          :to="'/products/' + product.id"
          class="col-6 col-md-4 mt-2 produk"
          v-for="(product, index) in bestproducts"
          :key="product.id"
          :data-index="index"
        >
          <CardProduct :product="product" />
        </router-link>
      </transition-group>
      <Loading id="loader" style="display: none" />
      <div class="line"></div>
      <div class="row">
        <div class="col-md-6">
          <h2>All Products</h2>
          <div class="d-flex">
            <div class="input-group flex-nowrap mb-3">
              <input
                v-model="search"
                type="search"
                class="search"
                placeholder="Search.."
                aria-label="Search"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-end">
          <div class="col filterBrand">
            <div class="row">
              <vs-select v-model="brand" style="z-index: 0" >
                <vs-option label="All" value="All"> All </vs-option>
                <vs-option label="Nike" value="Nike"> Nike </vs-option>
                <vs-option label="Adidas" value="Adidas"> Adidas </vs-option>
                <vs-option label="Air Jordan" value="Air Jordan">
                  Air Jordan
                </vs-option>
                <vs-option label="Under Armour" value="Under Armour">
                  Under Armour
                </vs-option>
              </vs-select>
            </div>
          </div>
        </div>
      </div>
      <div v-if="error">{{ error }}</div>
      <transition-group
        appear
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter"
        class="row mb-5"
        v-show="allproducts.length >= 1"
        v-if="allproducts.length"
      >
        <router-link
          :to="'/products/' + product.id"
          class="col-6 col-md-3 mt-2 produk"
          v-for="(product, index) in filterProducts"
          :key="product.id"
          :data-index="index"
        >
          <CardProduct :product="product" />
        </router-link>
      </transition-group>
      <Loading v-else />
      <NotFound id="searchNotFound" v-show="filterProducts.length == 0" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import NotFound from "@/components/SearchNotFound.vue";
import Loading from "@/components/Loading.vue"
import { db } from "@/firebase/config"
import gsap from "gsap";

export default {
  name: "Product",
  components: {
    Navbar,
    CardProduct,
    NotFound,
    Loading
  },
  data() {
    return {
      bestproducts: [],
      allproducts: [],
      search: "",
      brand: "All",
      error: ""
    };
  },
  methods: {
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
      try {
        const loader = document.querySelector('#loader')

        loader.style.display = 'block'
        const res = await db.collection('best-seller')
          .get()

        this.bestproducts = res.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
        loader.style.display = 'none'
      }
      catch (err) {
        console.log(err);
      }
    },
    async allProducts() {
      try {
        const searchNotFound = document.querySelector('#searchNotFound')

        searchNotFound.style.display = 'none'
        const res = await db.collection('allProducts')
          .orderBy('brand')
          .get()

        this.allproducts = res.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
        searchNotFound.style.display = 'block'
      }
      catch (err) {
        this.error = err.message
        console.log(err);
      }
    }
  },
  mounted() {
    // Best Seller
    this.bestSeller();

    // All Product
    this.allProducts();
  },
  computed: {
    filterProducts() {
      let filterProduct = this.allproducts;

      if (this.search) {
        filterProduct = filterProduct.filter(product => {
          return product.nama
            .toLowerCase()
            .includes(this.search.toLowerCase())
        })
      }

      if (this.brand === "All") {
        return filterProduct;
      } else {
        return filterProduct.filter(
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

.title-category {
  margin-right: 10px;
  margin-top: 10px;
}

.filterBrand {
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
}

.active {
  background-color: #00bfa6;
  color: #fff;
}

@media (max-width: 992px) {
  .search[type="search"] {
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 25px;
    font-size: 16px;
    background-color: #fff;
    padding: 10px 20px 10px 40px;
    transition: width 0.4s ease-in-out;
  }
}

@media (max-width: 768px) {
  .filterBrand {
    display: flex;
      justify-content: start;
      margin-bottom: 10px;
    }
}
</style>
