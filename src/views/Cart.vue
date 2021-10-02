<template>
  <div class="checkout">
    <LoadingPage v-show="loadingPage" />
    <Navbar :updateCart="carts" />
    <div class="container">
      <nav aria-label="breadcrumb mt-2">
        <ol class="breadcrumb arrow-right bg-transparent">
          <li class="breadcrumb-item">
            <router-link to="/" class="item">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/product" class="item">Products</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Cart</li>
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
                      :src="'../assets/images/' + cart.product.gambar"
                      style="max-width: 200px"
                      class="img-product"
                    />
                  </div>
                  <div class="card-body">
                    <closeIcon
                      class="deleteItem"
                      @click="deleteOrder(cart.id)"
                    />
                    <h5 class="card-title">{{ cart.product.nama }}</h5>
                    <small>{{ cart.product.brand }}</small>
                    <p class="card-text">
                      Rp {{ formatPrice(cart.product.harga) }}
                    </p>
                    <div class="size-shoes-wrap">
                    <p style="margin-bottom: 0">Size : </p>
                    <select class="form-control select" v-model="cart.size">
                      <option
                        v-for="product in productsize"
                        :key="product.size"
                      >
                        {{ product.size }}
                      </option>
                    </select>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p>Quantity : </p>
                      <div class="btn-quantity-wrap">
                        <button class="btn-quantity" @click="cart.quantity === 1 ? 1 : cart.quantity --">
                          <font-awesome-icon :icon="{prefix: 'fas', iconName: 'minus'}"></font-awesome-icon>
                        </button>
                        <span class="quantity">{{ cart.quantity }}</span>
                        <button class="btn-quantity" @click="cart.quantity === 10 ? 10 : cart.quantity ++">
                          <font-awesome-icon :icon="{prefix: 'fas', iconName: 'plus'}"></font-awesome-icon>
                        </button>
                      </div>
                      <p>
                        Subtotal: Rp
                        {{
                          formatPrice(cart.product.harga * cart.quantity)
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
                      placeholder="Coments"
                      rows="3"
                      v-model="comments"
                    ></textarea>
                  </div>
                  <hr />
                  <div class="form-group">
                    <label for="Kurir">Kurir*</label>
                    <select class="form-control" v-model="kurir" required>
                      <option>JNE - REG</option>
                      <option>J&T Express - Regular / EZ</option>
                      <option>TIKI - Reg</option>
                      <option>POS Indonesia - Kurir Reguler</option>
                      <option>SiCepat - Reguler</option>
                    </select>
                  </div>
                  <Alert
                    v-show="errorCourier"
                    :errorMsg="errorMsgSelectCourier"
                    @closeAlert="closeAlert"
                  />
                </div>
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content title="Shipping Address" :before-change="inputForm">
          <div class="row">
            <div class="col-lg-8 col-12 mb-4">
              <div class="card shadow">
                <div class="card-body">
                  <h5 class="card-title">Shipping Address*</h5>
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputFullName">Nama Lengkap</label>
                        <input
                          type="text"
                          class="form-control"
                          disabled
                          v-model="fullName"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputEmail">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          disabled
                          v-model="email"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputPhoneNumber">No. Hp</label>
                        <input
                          type="number"
                          class="form-control"
                          min="1"
                          disabled
                          v-model="phoneNumber"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputZip">Provinsi</label>
                        <select class="form-control" v-model="provinsi" required>
                          <option v-for="provinsi in provinsis" :key="provinsi.id">
                            {{ provinsi.nama }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputPhoneNumber">Kota/Kabupaten</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="kota"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputZip">Kode Pos</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="kodepos"
                          min="1"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="inputAddress">Alamat</label>
                        <textarea
                          class="form-control"
                          v-model="alamat"
                          rows="3"
                          placeholder="Jalan, ..."
                        />
                        <small class="text-muted"
                          >*Lengkap dengan Kecamatan</small
                        >
                      </div>
                    </div>
                    <Alert
                      v-show="errorInputForm"
                      :errorMsg="errorMsgInputForm"
                      @closeAlert="closeAlert"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-12 mb-4">
              <div class="card mb-3 shadow">
                <div class="card-body">
                  <div class="row" v-for="cart in carts" :key="cart.id">
                    <div class="col-6">
                      <p class="name-product">{{ cart.product.nama }}</p>
                      <p class="size">Size: {{ cart.size }}</p>
                    </div>
                    <div class="col-6">
                      <p class="float-right">
                        {{ cart.quantity }} × Rp
                        {{ formatPrice(cart.product.harga) }}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-6">
                      <p><strong>Total</strong></p>
                    </div>
                    <div class="col-6">
                      <p class="float-right"><strong>Rp {{ formatPrice(setTotal) }}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content title="Checkout">
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
                      <p><strong>Total</strong></p>
                    </div>
                    <div class="col-6">
                      <p class="float-right">
                       <strong>Rp {{ formatPrice(setTotal + 18000 + 5000) }}</strong>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { db, dbAuth } from "@/firebase/config";

export default {
  name: "Checkout",
  components: {
    Navbar,
    closeIcon,
    EmptyCart,
    Loading,
    LoadingPage,
    Alert,
    FontAwesomeIcon
  },
  data() {
    return {
      carts: [],
      productsize: [],
      provinsis: [],
      comments: "",
      kurir: "",
      provinsi: "",
      kota: "",
      kodepos: "",
      alamat: "",
      errorCourier: null,
      errorInputForm: null,
      errorMsgSelectCourier: "",
      errorMsgInputForm: "",
      loadingPage: null
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    selectCourier() {
      if (this.kurir) {
        return true;
      }
      this.errorCourier = true;
      this.errorMsgSelectCourier = "Pilih ekspedisi pengiriman";
      return false;
    },
    inputForm() {
      if (
        this.fullName &&
        this.email &&
        this.phoneNumber &&
        this.provinsi &&
        this.kota &&
        this.alamat &&
        this.kodepos
      ) {
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
      this.loadingPage = true
      await db
        .collection(dbAuth.currentUser.uid)
        .doc(id)
        .delete()
        .then(() => {
          this.Carts();
        });
      this.loadingPage = false
      this.$toast.error("Your order was deleted", 
      {
        type: "error",
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
    },
    async orders() {
      if (
        this.kurir &&
        this.fullName &&
        this.email &&
        this.phoneNumber &&
        this.provinsi &&
        this.kota &&
        this.alamat &&
        this.kodepos
      ) {
        try {
          await db
            .collection("orders").doc()
            .set({
              carts: this.carts,
              comments: this.comments,
              kurir: this.kurir,
              fullName: this.fullName,
              email: this.email,
              phoneNumber: this.phoneNumber,
              provinsi: this.provinsi,
              kota: this.kota,
              kodepos: this.kodepos,
              alamat: this.alamat,
            })
            .then(() => {
              this.carts.map((item) => {
                return db.collection(dbAuth.currentUser.uid).doc(item.id).delete();
              });
            });
            this.loadingPage = true;
          setTimeout(() => {
            this.$router.push({ path: "/order-success" });
            this.$toast.success("Successfully Ordered", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            this.loadingPage = false;
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
        const res = await db.collection(dbAuth.currentUser.uid).orderBy("date", "desc").get();

        this.carts = res.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        loader.style.display = "none";
        cartEmpty.style.display = "none";
      } catch (err) {
        // console.log(err);
      }
    },
    async sizeShoes() {
      try {
        const res = await db.collection("size-shoes").get()

        this.productsize = res.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
      }
      catch (err) {
        console.log(err);
      }
    },
    async dataProvinsi() {
      try {
        fetch('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        .then((res) => res.json())
        .then((data) => (this.provinsis = data.provinsi))
        .catch((error) => console.log(error))
      }
      catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.Carts();

    this.sizeShoes()

    this.dataProvinsi();
  },
  computed: {
    setTotal() {
      return this.carts.reduce((items, data) => {
        return items + data.product.harga * data.quantity;
      }, 0);
    },
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      }
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      }
    },
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    email: {
      get() {
        return this.$store.state.profileEmail;
      }
    },
    phoneNumber: {
      get() {
        return this.$store.state.profilePhoneNumber;
      }
    }
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  /* border: 1px solid #00bfa6; */
}

.card-title {
  margin-bottom: 0;
}

.img-product {
  border-radius: 10px 0 0 10px;
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
  color: #d23f57;
}

.breadcrumb-item.active {
  font-weight: 700;
  color: #00bfa6;
}

.item {
  text-decoration: none;
  color: #00bfa6;
}

.size-shoes-wrap {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.select {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  border-radius: 0;;
  padding: 0 0 0 5px;
  color: #000;
  text-align: center;
  width: 15%;
  height: 15%;
}

.quantity {
  text-align: center;
  padding: 0 5px;
  width: 25px;
}

.btn-quantity-wrap {
  position: absolute;
  display: flex;
  gap: 10px;
  width: 50%;
  transform: translateY(25px);
}

.btn-quantity {
  border: 0;
  width: 25px;
  height: 25px;
  background-color: #fff;
  font-size: 14px;
  color: #00bfa6;
}

.btn-quantity:nth-child(1) {
  margin-left: 0;
}

@media (max-width: 528px) {
  .img-product {
    border-radius: 10px 0 5px 0;
  }

  .select {
    width: 20%;
    text-align: start;
  }
}
</style>