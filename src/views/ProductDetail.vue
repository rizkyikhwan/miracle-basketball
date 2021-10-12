<template>
  <div class="product-detail">
    <LoadingPage v-show="loadingPage" />
    <Navbar />
    <div class="container mb-5">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb arrow-right bg-transparent">
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
              <font-awesome-icon icon="chevron-left" id="slideLeft" class="arrow" @click="slideLeft"></font-awesome-icon>
              <div id="slider">
                <img :src="'../assets/images/' + product.gambar" class="img-fluid shadow-sm produk-img thumbnail">
                <img :src="'../assets/images/' + product.gambar1" class="img-fluid shadow-sm produk-img thumbnail">
                <img :src="'../assets/images/' + product.gambar2" class="img-fluid shadow-sm produk-img thumbnail">
                <img :src="'../assets/images/' + product.gambar3" class="img-fluid shadow-sm produk-img thumbnail">
                <img :src="'../assets/images/' + product.gambar4" class="img-fluid shadow-sm produk-img thumbnail">
              </div>
              <font-awesome-icon icon="chevron-right" id="slideRight" class="arrow" @click="slideRight"></font-awesome-icon>
            </div>
          </div>
          <div class="col-md-6">
            <h3>{{ product.nama }}</h3>
            <p>Rp {{ formatPrice(product.harga) }}</p>
            <form class="mt-5" v-on:submit.prevent>
              <div class="form-group">
                <label for="order_quantity">Quantity</label>
                <div class="d-flex justify-content-start">
                <button class="btn-quantity" @click="decrement">
                  <font-awesome-icon :icon="{prefix: 'fas', iconName: 'minus'}"></font-awesome-icon>
                </button>
                <span class="quantity">{{ order.quantity }}</span>
                <button class="btn-quantity"  @click="increment">
                  <font-awesome-icon :icon="{prefix: 'fas', iconName: 'plus'}"></font-awesome-icon>
                </button>
                </div>
                <small class="text-muted">Max: 10</small>
              </div>
                <label for="size">Size</label>
                <select class="form-control select" v-model="order.size" @click="requiredSize">
                  <option
                    class="option"
                    v-for="product in productsize"
                    :key="product.size"
                  >
                    {{ product.size }}
                  </option>
                </select>
                <font-awesome-icon class="icon-chevron" :icon="{prefix: 'fas', iconName: 'chevron-down'}"></font-awesome-icon>
              <div class="form-group">
              </div>
              <Alert v-show="error" :errorMsg="errorMsg" @closeAlert="closeAlert()" />
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
import { db, dbAuth } from "@/firebase/config";

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
      order: {
        quantity: 1
      },
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
    increment() {
      this.order.quantity = this.order.quantity === 10 ? 10 : this.order.quantity + 1;
    },
    decrement() {
      this.order.quantity = this.order.quantity === 1 ? 1 : this.order.quantity - 1
    },
    slideLeft() {
      document.getElementById('slider').scrollLeft -= 150
    },
    slideRight() {
      document.getElementById('slider').scrollLeft += 150
    },
    requiredSize() {
      document.querySelector('.select').style = 'border-bottom: 2px solid #00bfa6'
      this.error = false;
    },
    async addToCart() {
      if (this.order.quantity && this.order.size) {
        this.order.product = this.product;
        try {
          this.loadingPage = true;
          const timestamp = await Date.now()
          const dataBase = await db.collection(dbAuth.currentUser.uid).doc()
          await dataBase.set({
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
          this.$toast.warning("You must login first", {
                type: "warning",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
          this.loadingPage = false;
          // console.log(err);
        }
      } else {
        this.error = true;
        this.errorMsg = "Please select a size.";

        const require = document.querySelector('.select')
        require.style = "border-bottom: 2px solid red"
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

    let slider = document.getElementById('slider')
    let grab = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      grab = true
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
    slider.addEventListener('mouseleave', () => {
      grab = false
    })
    slider.addEventListener('mouseup', () => {
      grab = false
    })
    slider.addEventListener('mousemove', (e) => {
      if(!grab) {
        return
      }
      const x = e.pageX - slider.scrollLeft
      slider.scrollLeft = scrollLeft - (x - startX)
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

.quantity {
  text-align: center;
  padding: 0 10px;;
  border-bottom: 2px solid #00bfa6;
  width: 50px;
}

.btn-quantity {
  border: 2px solid #009783;
  border-radius: 5px;
  padding: 2px 6px;
  background-color: #fff;
  font-size: 16px;
  color: #00bfa6;
  margin: 0 10px;
   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.06);
}

.btn-quantity:nth-child(1) {
  margin-left: 0;
}

.select {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  border-bottom-width: 2px;
  width: 25%;
  text-align: center;
}

.produk-img {
  border-radius: 10px;
  width: 500px;
}

.icon-chevron {
  position: absolute;
  transform: translateY(-25px);
  color: #ccc;
  font-size: 12px;
}

.thumbnail {
  object-fit: cover;
  max-width: 180px;
  max-height: 100px;
  cursor: pointer;
  opacity: 0.5;
  margin: 5px;
  -moz-user-drag: none; 
  -webkit-user-drag: none;
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
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

#slider::-webkit-scrollbar {
  display: none;
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