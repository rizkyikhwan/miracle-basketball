<template>
  <div class="cart">
    <Navbar :updateCart="carts" />
    <div class="container">
      <nav aria-label="breadcrumb mt-2">
        <ol class="breadcrumb bg-transparent">
          <li class="breadcrumb-item">
            <router-link to="/" class="item">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/product" class="item">Product</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Cart</li>
        </ol>
      </nav>

      <Loading id="loader" style="display: none" />
      <div id="cart" v-show="carts.length >= 1">
        <div class="row">
          <div class="col">
            <div class="table-responsive mt-3">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Product</th>
                    <th scope="col">Description</th>
                    <th scope="col" class="rows">Qty</th>
                    <th></th>
                    <th scope="col" class="rows">Unit Price</th>
                    <th scope="col" class="rows">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cart, index) in carts" :key="cart.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                      <img
                        :src="'../assets/images/' + cart.products.gambar"
                        class="img-fluid shadow-sm mb-3"
                        :alt="cart.products.gambar"
                        width="125px"
                      />
                    </td>
                    <td>
                      <p>Name: {{ cart.products.nama }}</p>
                      <p>Brand: {{ cart.products.brand }}</p>
                      <p>Size : {{ cart.size }}</p>
                    </td>
                    <td class="text-center">{{ cart.order_quantity }}</td>
                    <td class="text-danger">
                      <b-icon-trash
                        class="delete-btn"
                        @click="deleteOrder(cart.id)"
                      ></b-icon-trash>
                    </td>
                    <td class="text-center">
                      Rp {{ formatPrice(cart.products.harga) }}
                    </td>
                    <td class="text-center">
                      Rp
                      {{
                        formatPrice(cart.order_quantity * cart.products.harga)
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6" align="right">
                      <strong>Total Harga :</strong>
                    </td>
                    <td align="center">Rp {{ formatPrice(setTotal) }}</td>
                  </tr>
                </tbody>
              </table>
              <router-link class="button float-right mt-3" to="/checkout">
                Checkout Now <b-icon-cart-check></b-icon-cart-check>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <EmptyCart id="emptyCart" style="display: none" v-show="carts.length === 0" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import EmptyCart from "@/components/EmptyCart.vue";
import Loading from "@/components/Loading.vue"
import { db } from "@/firebase/config"

export default {
  name: "Cart",
  components: {
    Navbar,
    EmptyCart,
    Loading
  },
  data() {
    return {
      carts: [],
      order: {},
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async deleteOrder(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try{
              const loader = document.querySelector('#loader')
              const cart = document.querySelector('#cart')

              loader.style.display = 'block'
              cart.style.display = 'none'
              await db.collection('carts')
                .doc(id)
                .delete()
                .then(() => {
                  this.Carts()
                })
              loader.style.display = 'none'
              cart.style.display = 'block'
            }
            catch (err) {
              console.log(err);
            }
            this.$swal.fire("Deleted!", "Your order was deleted", "success");
          }
        });
    },
    async Carts() {
      try {
        const loader = document.querySelector('#loader')
        const emptyCart = document.querySelector('#emptyCart')

        loader.style.display = 'block'
        emptyCart.style.display = 'none'
        const res = await db.collection('carts')
          .get()

        this.carts = res.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
        loader.style.display = 'none'
        emptyCart.style.display = 'block'
      }
      catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.Carts()
  },
  computed: {
    setTotal() {
      return this.carts.reduce(function (items, data) {
        return items + data.products.harga * data.order_quantity;
      }, 0);
    },
  },
};
</script>

<style scoped>
.rows {
  text-align: center;
}

.item {
  text-decoration: none;
  color: #00bfa6;
}

.breadcrumb-item.active {
  font-weight: 700;
  color: #00bfa6;
}

.delete-btn {
  cursor: pointer;
}

.button {
  display: inline-block;
  border: 2px solid #00bfa6;
  background-color: #fff;
  border-radius: 5px;
  padding: 8px 10px;
  text-decoration: none;
  color: #00bfa6;
  font-weight: 500;
  box-shadow: inset 0 0 0 0 #00bfa6;
  transition: 1s ease;
}

.button:hover {
  box-shadow: inset 400px 0 0 0 #00bfa6;
  color: #fff;
}
</style>