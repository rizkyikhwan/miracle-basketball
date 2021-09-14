<template>
  <div class="card">
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
    transition: .2s ease;
}

.card:hover {
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
}

.nama-produk {
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
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