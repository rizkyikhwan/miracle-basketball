<template>
  <div class="product-detail">
    <LoadingPage v-show="loadingPage" />
    <Navbar />
    <div class="container mb-5">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent">
              <li class="breadcrumb-item">
                <router-link to="/" class="item">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/product" class="item">Products</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Product Detail
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <Loading id="loader" style="display: none" />
      <div class="detailProduct">
        <div class="row mt-2">
          <div class="col-md-6">
            <img
              id="featured"
              :src="'../assets/images/' + product.gambar"
              class="img-fluid shadow-sm produk-img mb-3"
              :alt="product.gambar"
            />
            <div id="slide-wrapper" class="mb-5">
              <font-awesome-icon icon="chevron-left" id="slideLeft" class="arrow"></font-awesome-icon>
              <div id="slider">
                <img :src="'../assets/images/' + product.gambar" class="img-fluid shadow-sm produk-img thumbnail">
                <img :src="'../assets/images/' + product.gambar1" class="img-fluid shadow-sm produk-img thumbnail">
                <img :src="'../assets/images/' + product.gambar2" class="img-fluid shadow-sm produk-img thumbnail">
                <img :src="'../assets/images/' + product.gambar3" class="img-fluid shadow-sm produk-img thumbnail">
                <img :src="'../assets/images/' + product.gambar4" class="img-fluid shadow-sm produk-img thumbnail">
              </div>
              <font-awesome-icon icon="chevron-right" id="slideRight" class="arrow"></font-awesome-icon>
            </div>
          </div>
          <div class="col-md-6">
            <h3>{{ product.nama }}</h3>
            <p>Rp {{ formatPrice(product.harga) }}</p>
            <form class="mt-5" v-on:submit.prevent>
              <div class="form-group">
                <label for="order_quantity">Quantity</label>
                <input
                  type="number"
                  class="form-control"
                  min="1"
                  value="1"
                  max="10"
                  v-model="order.order_quantity"
                />
                <small class="text-muted">Max: 10</small>
              </div>
              <div class="form-group">
                <label for="size">Size</label>
                <select class="form-control" v-model="order.size">
                  <option
                    v-for="product in productsize"
                    :key="product.size"
                    :product="product"
                  >
                    {{ product.size }}
                  </option>
                </select>
              </div>
              <transition name="alert">
                <Alert v-if="error" :errorMsg="errorMsg" @closeAlert="closeAlert()" />
              </transition>
              <button type="submit" class="button" @click="addToCart">
                Add to Cart <b-icon-cart-plus></b-icon-cart-plus>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import LoadingPage from "@/components/LoadingPage.vue";
import Alert from "@/components/Alert.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { db } from "@/firebase/config";

export default {
  name: "ProductDetail",
  components: {
    Navbar,
    Loading,
    LoadingPage,
    Alert,
    FontAwesomeIcon
  },
  data() {
    return {
      product: {},
      productsize: [],
      order: {},
      error: null,
      errorMsg: "",
      arrowImg: null,
      loadingPage: null
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    closeAlert() {
      this.error = false
    },
    async addToCart() {
      if (this.order.order_quantity <= 10 && this.order.size) {
        this.order.product = this.product;
        try {
          this.loadingPage = true;
          const timestamp = await Date.now()
          await db
            .collection("carts").doc()
            .set({
              ...this.order,
              profileId: this.profileId,
              date: timestamp
            })
            .then(() => {
              this.$router.push({ name: "Cart" });
              this.$toast.success("Your order is added to the cart", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            });
            this.loadingPage =false;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.error = true;
        this.errorMsg = "Please fill in the form correctly!";
      }
    },
    async getProduct(id) {
      try {
        const loader = document.querySelector("#loader");
        const detailProduct = document.querySelector(".detailProduct");

        loader.style.display = "block";
        detailProduct.style.display = "none";
        const res = await db.collection("allProducts").doc(id).get();

        this.product = {
          ...res.data(),
          id: res.id,
        };
        loader.style.display = "none";
        detailProduct.style.display = "block";
      } catch (err) {
        console.log(err);
      }
    },
    async sizeShoes() {
      try {
        const res = await db.collection("size-shoes").get();

        this.productsize = res.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getProduct(this.$route.params.id);

    this.sizeShoes();

    const thumbnails = document.getElementsByClassName('thumbnail')
    const activeImages = document.getElementsByClassName('active-img')

    for(let i=0; i < thumbnails.length; i++) {
      thumbnails[i].addEventListener('click', function () {
        if(activeImages.length > 0) {
          activeImages[0].classList.remove('active-img')
        }

        this.classList.add('active-img')
        document.getElementById('featured').src = this.src
      })
    }

    const buttonRight = document.getElementById('slideRight')
    const buttonLeft = document.getElementById('slideLeft')

    buttonLeft.addEventListener('click', function () {
      document.getElementById('slider').scrollLeft -= 50
    })

    buttonRight.addEventListener('click', function () {
      document.getElementById('slider').scrollLeft += 50
    })

  },
  computed: {
    profileId() {
      return this.$store.state.profileId
    }
  }
};
</script>

<style scoped>
.item {
  text-decoration: none;
  color: #00bfa6;
}

.breadcrumb-item.active {
  font-weight: 700;
  color: #00bfa6;
}

.button {
  display: inline-block;
  border: 2px solid #00bfa6;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
  padding: 9px 18px;
  color: #00bfa6;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 500;
  box-shadow: inset 0 0 0 0 #00bfa6;
  transition: 0.75s ease-out;
}

.button:hover {
  box-shadow: inset 400px 0 0 0 #00bfa6;
  color: #fff;
}

.produk-img {
  border-radius: 10px;
  width: 500px;
}

.thumbnail {
  object-fit: cover;
  max-width: 180px;
  max-height: 100px;
  cursor: pointer;
  opacity: 0.5;
  margin: 5px;
  transition: 0.2s;
}

.thumbnail:hover {
  opacity: 1;
}

.active-img {
  opacity: 1;
}

#slide-wrapper {
  max-width: 500px;
  display: flex;
  max-height: 100px;
  align-items: center;
}

#slider {
  width: 440px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
}

.arrow {
  width: 30px;
  height: 30px;
  margin: 0 5px;
  cursor: pointer;
  color: #009783;
  transition: .2s;
}

.arrow:nth-child(1):hover {
  opacity: .5;
  transform: translateX(-5px);
}

.arrow:nth-child(3):hover {
  opacity: .5;
  transform: translateX(5px);
}
</style>