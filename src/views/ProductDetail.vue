<template>
  <div class="product-detail">
    <LoadingPage id="loadingPage" style="display: none" />
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent">
              <li class="breadcrumb-item">
                <router-link to="/" class="item">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/product" class="item">Product</router-link>
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
              :src="'../assets/images/' + product.gambar"
              class="img-fluid shadow-sm produk-img mb-3"
              :alt="product.gambar"
            />
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
                  v-model="order.order_quantity"
                />
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
import Loading from "@/components/Loading.vue"
import LoadingPage from "@/components/LoadingPage.vue"
import { db } from "@/firebase/config"

export default {
  name: "ProductDetail",
  components: {
    Navbar,
    Loading,
    LoadingPage
  },
  data() {
    return {
      product: {},
      productsize: [],
      order: {},
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async addToCart() {
      if (this.order.order_quantity && this.order.size) {
        this.order.products = this.product;
        try {
          const loadingPage = document.querySelector('#loadingPage')
          
          loadingPage.style.display = 'block'
          // const loading = this.$vs.loading({
          //     background: "rgba(0, 0, 0, 0.5)",
          //     type: "waves",
          //     color: "#00bfa6",
          //     text: "Confirm Order...",
          //   });
          await db.collection('carts')
            .add(this.order)
            .then(() => {
              this.$router.push({ name: "Cart" });
              this.$toast.success("Your order is added to the cart", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            })
            // loading.close()
          loadingPage.style.display = 'none'
        } 
        catch (err) {
          console.log(err);
        }
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please complete the order form!",
        });
      }
    },
    async getProduct(id) {
      try {
        const loader = document.querySelector('#loader')
        const detailProduct = document.querySelector('.detailProduct')

        loader.style.display = 'block'
        detailProduct.style.display = 'none'
        const res = await db.collection('allProducts')
          .doc(id)
          .get()

        this.product = {
          ...res.data(),
          id: res.id
        }
        loader.style.display = 'none'
        detailProduct.style.display = 'block'
      }
      catch (err) {
        console.log(err);
      }
    },
    async sizeShoes() {
      try {
        const res = await db.collection('size-shoes')
          .get()

        this.productsize = res.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
      }
      catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
      this.getProduct(this.$route.params.id)

      this.sizeShoes()
  },
};
</script>

<style scoped>
.product-detail {
  margin-bottom: 20px;
}

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
  transition: .75s ease-out;
}

.button:hover {
  box-shadow: inset 400px 0 0 0 #00bfa6;
  color: #fff;
}

.produk-img {
  border-radius: 10px;
  width: 500px;
}
</style>