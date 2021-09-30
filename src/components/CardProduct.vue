<template>
  <div class="card">
    <div class="overlay-card d-flex flex-column justify-content-center align-items-center">
      <img :src="'../assets/logo/' + product.logo" :alt="product.brand" style="position: absolute">
      <p style="font-weight: 500">{{ product.nama }}</p>
      <div class="detail-btn d-flex justify-content-center align-items-center">
        <span class="detail">
          Check Product
        </span>
      </div>
    </div>
    <img
      :src="'../assets/images/' + product.gambar"
      class="card-img-top"
      :alt="product.gambar"
    />
    <div class="card-body text-left">
      <p class="card-text">
        <small class="text-muted">{{ product.brand }}</small>
      </p>
      <h5 class="card-title nama-produk">{{ product.nama }}</h5>
      <p class="card-text">Rp {{ formatPrice(product.harga) }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "CardProduct",
  props: ["product"],
  methods: {
    formatPrice(value) {
       let val = (value/1).toFixed(0).replace('.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
};
</script>

<style scoped>
.card {
  border: 0;
  color: #000;
  margin-bottom: 25px;
  overflow: hidden;
  transition: .2s ease;
}

.card:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
}

.card-body {
  position: relative;
}

.nama-produk {
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.overlay-card {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9;
}

.detail {
  position: absolute;
  text-transform: uppercase;
  letter-spacing: 0;
  color: #fff;
}

.icon {
  position: absolute;
  visibility: hidden;
  transform: translateY(-50px);
}

.detail-btn {
  position: relative;
  width: 100%;
  height: 15.5%;
  background-color: #00bfa6;
  color: #252525;
  overflow: hidden;
  font-weight: 700;
  letter-spacing: 1px;
  border-radius: 10px 10px 5px 5px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
  transform: translateY(375%);
  transition: .35s ease;
  z-index: 99;
}

.overlay-card {
  visibility: hidden;
}

.card:hover .overlay-card {
  visibility: visible;
  animation: fade 0.3s ease;
  background: rgba( 255, 255, 255, 0.6 );
  backdrop-filter: blur( 3px );
  -webkit-backdrop-filter: blur( 3px );
}

.card:hover .detail-btn {
  transform: translateY(250%);
  backdrop-filter: blur( 3px );
  -webkit-backdrop-filter: blur( 3px );
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .card {
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    }
}

@media (max-width: 576px) {
  .card-title {
    font-size: 16px;
  }

  .card-text {
    font-size: 14px;
  }

}
</style>