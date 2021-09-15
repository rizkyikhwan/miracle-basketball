<template>
  <div class="checkout">
    <LoadingPage id="loadingPage" style="display: none" />
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
          <li class="breadcrumb-item">
            <router-link to="/cart" class="item">Cart</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Checkout</li>
        </ol>
      </nav>

      <form-wizard
        v-show="carts.length >= 1"
        color="#00bfa6"
        @on-complete="orders"
        finish-button-text="Order Now"
      >
        <span slot="title"></span>
        <tab-content
          title="Cart"
          class="custom-form-wizard"
          :before-change="selectCourier"
        >
          <div class="row">
            <div class="col-lg-8 col-12 mb-4">
              <div
                class="card mb-3 shadow-sm"
                v-for="cart in carts"
                :key="cart.id"
              >
                <div class="row no-gutters">
                  <div class="d-flex justify-content-center">
                    <img
                      :src="'../assets/images/' + cart.products.gambar"
                      style="max-width: 200px"
                      class="img-product"
                    />
                  </div>
                  <div class="card-body">
                    <closeIcon
                      class="deleteItem"
                      @click="deleteOrder(cart.id)"
                    />
                    <h5 class="card-title">{{ cart.products.nama }}</h5>
                    <small>{{ cart.products.brand }}</small>
                    <p class="card-text">
                      Rp {{ formatPrice(cart.products.harga) }}
                    </p>
                    <p>Size: {{ cart.size }}</p>
                    <div class="d-flex justify-content-between">
                      <p>Quantity: {{ cart.order_quantity }}</p>
                      <p>
                        Subtotal: Rp
                        {{
                          formatPrice(cart.products.harga * cart.order_quantity)
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div class="card mb-3 shadow">
                <div class="card-body">
                  <div class="card-title d-flex justify-content-between">
                    <p>Total</p>
                    <h4>Rp {{ formatPrice(setTotal) }}</h4>
                  </div>
                  <hr />
                  <h6 class="card-title">
                    Additional Comments <span class="label">Note</span>
                  </h6>
                  <small class="text-muted">Optional</small>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Coments"
                      rows="3"
                      v-model="order.comments"
                    ></textarea>
                  </div>
                  <hr />
                  <div class="form-group">
                    <label for="Kurir">Kurir*</label>
                    <select class="form-control" v-model="order.kurir" required>
                      <option>JNE - REG</option>
                      <option>J&T Express - Regular / EZ</option>
                      <option>TIKI - Reg</option>
                      <option>POS Indonesia - Kurir Reguler</option>
                      <option>SiCepat - Reguler</option>
                    </select>
                  </div>
                  <transition name="alert">
                    <Alert
                      v-if="errorCourier"
                      :errorMsg="errorMsgSelectCourier"
                      @closeAlert="closeAlert"
                    />
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content title="Details" :before-change="inputForm">
          <div class="row">
            <div class="col-lg-8 col-12 mb-4">
              <div class="card shadow">
                <div class="card-body">
                  <h5 class="card-title">Shipping Address*</h5>
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputPassword4">Nama Lengkap</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="order.nama"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputEmail">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="order.email"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputAddress2">No. Hp</label>
                        <input
                          type="number"
                          class="form-control"
                          min="1"
                          v-model="order.noHp"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputZip">Kode Pos</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="order.kodepos"
                          min="1"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="inputAddress">Alamat</label>
                        <textarea
                          class="form-control"
                          v-model="order.alamat"
                          rows="3"
                          placeholder="Provinsi, Kabupaten/Kota, ..."
                        />
                        <small class="text-muted"
                          >*Lengkap dengan Provinsi, Kabupaten/Kota,
                          Kecamatan</small
                        >
                      </div>
                    </div>
                    <transition name="alert">
                      <Alert
                        v-if="errorInputForm"
                        :errorMsg="errorMsgInputForm"
                        @closeAlert="closeAlert"
                      />
                    </transition>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-12 mb-4">
              <div class="card mb-3 shadow">
                <div class="card-body">
                  <div class="row" v-for="cart in carts" :key="cart.id">
                    <div class="col-6">
                      <p class="name-product">{{ cart.products.nama }}</p>
                      <p class="size">Size: {{ cart.size }}</p>
                    </div>
                    <div class="col-6">
                      <p class="float-right">
                        {{ cart.order_quantity }} × Rp
                        {{ formatPrice(cart.products.harga) }}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-6">
                      <p>Total</p>
                    </div>
                    <div class="col-6">
                      <p class="float-right">Rp {{ formatPrice(setTotal) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content title="Payment">
          <div class="row">
            <div class="col-lg-8 col-12 mb-4">
              <div class="card shadow">
                <div class="card-body">
                  <h5>Payment</h5>
                  <hr />
                  <p>Method of payment</p>
                  <div class="row">
                    <div class="col-6 col-md-3 mb-3">
                      <img
                        src="../assets/icons/Mandiri.png"
                        alt=""
                        style="max-width: 100px"
                      />
                      <br />
                      <small>Mandiri Virtual Account</small>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                      <img
                        src="../assets/icons/BCA.png"
                        alt=""
                        style="max-width: 100px"
                      />
                      <br />
                      <small>BCA Virtual Account</small>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                      <img
                        src="../assets/icons/briva.png"
                        alt=""
                        style="max-width: 100px"
                      />
                      <br />
                      <small>BRIVA</small>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                      <img
                        src="../assets/icons/bni.png"
                        alt=""
                        style="max-width: 100px"
                      />
                      <br />
                      <small>BNI Virtual Account</small>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                      <img
                        src="../assets/icons/btn.png"
                        alt=""
                        style="max-width: 100px"
                      />
                      <br />
                      <small>BTN Virtual Account</small>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                      <img
                        src="../assets/icons/danamon.png"
                        alt=""
                        style="max-width: 100px"
                      />
                      <br />
                      <small>Danamon Virtual Account</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-12 mb-4">
              <div class="card mb-3 shadow">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12">
                      <p>
                        Subtotal
                        <span class="float-right"
                          >Rp {{ formatPrice(setTotal) }}</span
                        >
                      </p>
                    </div>
                    <div class="col-12">
                      <p>Shipping <span class="float-right">Rp 18,000</span></p>
                    </div>
                    <div class="col-12">
                      <p>
                        Delivery Warranty
                        <span class="float-right">Rp 5,000</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-6">
                      <p>Total</p>
                    </div>
                    <div class="col-6">
                      <p class="float-right">
                        Rp {{ formatPrice(setTotal + 18000 + 5000) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tab-content>
      </form-wizard>
      <Loading id="loader" style="display: none" />
      <EmptyCart
        id="cartEmpty"
        style="display: none"
        v-show="carts.length === 0"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import closeIcon from "../assets/icons/close.svg";
import EmptyCart from "@/components/EmptyCart.vue";
import Loading from "@/components/Loading.vue";
import LoadingPage from "@/components/LoadingPage.vue";
import Alert from "@/components/Alert.vue";
import { db } from "@/firebase/config";

export default {
  name: "Checkout",
  components: {
    Navbar,
    closeIcon,
    EmptyCart,
    Loading,
    LoadingPage,
    Alert,
  },
  data() {
    return {
      carts: [],
      order: {},
      errorCourier: null,
      errorInputForm: null,
      errorMsgSelectCourier: "",
      errorMsgInputForm: "",
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    selectCourier() {
      if (this.order.kurir) {
        this.order.carts = this.carts;
        return true;
      }
      this.errorCourier = true;
      this.errorMsgSelectCourier = "Pilih ekspedisi pengiriman";
      return false;
    },
    inputForm() {
      if (
        this.order.nama &&
        this.order.email &&
        this.order.noHp &&
        this.order.alamat &&
        this.order.kodepos
      ) {
        this.order.carts = this.carts;
        return true;
      }
      this.errorInputForm = true;
      this.errorMsgInputForm = "Lengkapi Alamat Pengiriman";
      return false;
    },
    closeAlert() {
      this.errorCourier = false
      this.errorInputForm = false
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
            const loadingPage = document.querySelector("#loadingPage");

            loadingPage.style.display = "block";
            await db
              .collection("carts")
              .doc(id)
              .delete()
              .then(() => {
                this.Carts();
              });

            loadingPage.style.display = "none";
            this.$toast.error("Your order was deleted", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            })
          }
        });
    },
    async orders() {
      if (
        this.order.kurir &&
        this.order.nama &&
        this.order.email &&
        this.order.noHp &&
        this.order.alamat &&
        this.order.kodepos
      ) {
        this.order.carts = this.carts;
        try {
          await db
            .collection("orders")
            .add(this.order)
            .then(() => {
              this.carts.map((item) => {
                return db.collection("carts").doc(item.id).delete();
              });
            });
          const loading = this.$vs.loading({
            background: "rgba(0, 0, 0, 0.5)",
            type: "waves",
            color: "#00bfa6",
            text: "Confirm Order...",
          });
          setTimeout(() => {
            this.$router.push({ path: "/order-success" });
            this.$toast.success("Successfully Ordered", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            loading.close();
          }, 3000);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async Carts() {
      try {
        const loader = document.querySelector("#loader");
        const cartEmpty = document.querySelector("#cartEmpty");

        loader.style.display = "block";
        cartEmpty.style.display = "none";
        const res = await db.collection("carts").get();

        this.carts = res.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        loader.style.display = "none";
        cartEmpty.style.display = "none";
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.Carts();
  },
  computed: {
    setTotal() {
      return this.carts.reduce((items, data) => {
        return items + data.products.harga * data.order_quantity;
      }, 0);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  border: none;
}

.card-title {
  margin-bottom: 0;
}

.label {
  display: inline-block;
  padding-left: 4px;
  padding-top: 2px;
  height: 25px;
  width: 40px;
  color: #d23f57;
  background-color: #ffcdda;
  border-radius: 5px;
}

.name-product {
  margin-bottom: 0;
}

.size {
  margin-bottom: 25px;
}

.deleteItem {
  position: absolute;
  cursor: pointer;
  right: 10px;
  height: 25px;
  top: 10px;
  width: auto;
}

.breadcrumb-item.active {
  font-weight: 700;
  color: #00bfa6;
}

.item {
  text-decoration: none;
  color: #00bfa6;
}

@media (max-width: 528px) {
  .img-product {
    border-radius: 0 0 5px 0;
  }
}
</style>