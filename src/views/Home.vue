<template>
  <div class="home">
    <Navbar />
    <div class="delay">
      <Hero class="mb-5" />

      <!-- New Arrival -->
      <div id="newArrival" class="container">
        <div class="line"></div>
        <h2 class="arrival">New <strong>Arrival</strong></h2>
        <div class="row mb-5">
          <router-link
            :to="'/products/' + product.id"
            class="col-sm-6 col-md-3 mt-2 produk"
            v-for="product in newArrival"
            :key="product.id"
          >
            <NewArrival :product="product" />
          </router-link>
          <Loading id="loader" style="display: none" />
        </div>
      </div>

      <!-- Benefit -->
      <section id="benefit">
        <div class="container">
          <div class="line-benefit"></div>
          <h2 class="title">BENEFITS</h2>
          <div class="card-deck">
            <div class="row">
              <div class="col-lg mb-3">
                <div class="card">
                  <h2 class="icon">
                    <font-awesome-icon icon="box-open"></font-awesome-icon>
                  </h2>
                  <div class="card-body">
                    <h5 class="card-title">Produk 100% Original</h5>
                    <p class="card-text">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Reprehenderit odio vero rerum eum molestias at!
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg mb-3">
                <div class="card">
                  <h2 class="icon">
                    <font-awesome-icon icon="truck"></font-awesome-icon>
                  </h2>
                  <div class="card-body">
                    <h5 class="card-title">Pengiriman Cepat dan Aman</h5>
                    <p class="card-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Eius sunt, voluptatum eveniet vitae fuga amet!
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg mb-3">
                <div class="card">
                  <h2 class="icon">
                    <font-awesome-icon icon="exchange-alt"></font-awesome-icon>
                  </h2>
                  <div class="card-body">
                    <h5 class="card-title">Tukar Ukuran</h5>
                    <p class="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Culpa inventore natus ad sapiente sunt eos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import NewArrival from "@/components/NewArrival.vue";
import Loading from "@/components/Loading.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import gsap from "gsap";
import { db } from "@/firebase/config"

export default {
  name: "Home",
  components: {
    Navbar,
    Hero,
    NewArrival,
    Loading,
    FontAwesomeIcon,
  },
  data() {
    return {
      newArrival: [],
    };
  },
  methods: {
    async NewArrival() {
      try{
        const loader = document.querySelector('#loader')

        loader.style.display = 'block'
        const res = await db.collection('newArrival')
                      .orderBy("brand")
                      .get()

        this.newArrival = res.docs.map((doc) => {
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
    }
  },
  mounted() {
    gsap.from(".delay", {
      opacity: 0,
      duration: 0.5,
      y: 25,
      delay: 0.5,
    });

    this.NewArrival()
  },
};
</script>

<style scoped>
#benefit {
  padding: 50px 0px 50px 0;
}

.arrival {
  font-family: "Rajdhani", sans-serif;
}

.arrival::after {
  content: "New Arrival";
  font-family: "Montserrat", sans-serif;
  position: absolute;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 3px;
  left: 15%;
  line-clamp: 0.3;
  transform: translateY(-20px);
  color: rgb(243, 244, 248);
  z-index: -1;
}

.line-benefit {
  height: 2.5px;
  width: 100px;
  background-color: #00bfa6;
  border-radius: 10px;
  margin: auto;
  margin-bottom: 10px;
}

.baru {
  text-align: center;
}

.title {
  text-align: center;
  color: #fff;
}

/* .title::after {
  content: "BENEFITS";
  font-family: "Montserrat", sans-serif;
  position: absolute;
  font-size: 60px;
  transform: translateX(-255px);
  font-weight: 800;
  letter-spacing: 5px;
  line-height: 0.3;
  color: rgb(243, 244, 248);
  margin-top: 20px;
  z-index: -1;
} */

.deskripsi {
  color: #fff;
  text-align: center;
}

.title-benefit {
  text-align: center;
  color: #fff;
}

.card-deck {
  padding-top: 25px;
  cursor: default;
}

.card-deck .card {
  border-radius: 10px;
  color: #fff;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-out;
  background: rgba(0, 191, 166, 0.2);
  overflow: hidden;
}

.card-deck .card::before {
  content: "";
  background: rgba(255, 255, 255, 0.3);
  width: 60%;
  height: 100%;
  top: 0%;
  left: -125%;
  transform: skew(45deg);
  position: absolute;
  animation-direction: left;
  transition-duration: 500ms;
}

.card-deck .card:hover {
  /* border: 1px solid rgb(0, 191, 166); */
  box-shadow: 0px 15px 30px 1px rgba(0, 0, 0, 0.1);
  transform: translateY(-15px);
}

.card-deck .card:hover::before {
  left: 150%;
}

.card-body {
  text-align: center;
}

.icon {
  color: #fff;
  font-size: 50px;
  text-align: center;
  padding-top: 25px;
}

#benefit {
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url("../assets/images/footer-bg.jpg");
  background-position: center;
  background-size: cover;
}
</style>
