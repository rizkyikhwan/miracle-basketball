<template>
  <div class="product-detail">
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
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "ProductDetail",
  components: {
    Navbar,
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
    setProduct(data) {
      this.product = data;
    },
    setSizeShoes(data) {
      this.productsize = data;
    },
    addToCart() {
      if (this.order.order_quantity && this.order.size) {
        this.order.products = this.product;
        axios
          .post("http://localhost:3000/carts", this.order)
          .then(() => {
            this.$router.push({ path: "/cart" });
            this.$toast.success("Your order is added to the cart", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please complete the order form!",
        });
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3000/size-shoes")
      .then((response) => this.setSizeShoes(response.data))
      .catch((error) => console.log(error));
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