<template>
  <div class="modal-delete">
    <div class="modal-content-delete">
      <h3 class="text-center">Delete Item</h3>
      <div class="body-modal">
        <p>Hapus sepatu {{ cart.products.nama }} dari keranjang?</p>
      </div>
      <div class="d-flex justify-content-center">
        <div class="row">
          <div class="col">
            <button @click="$emit('deleteItem')">Hapus</button>
          </div>
          <div class="col">
            <button @click="$emit('closeModal')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart"]
};
</script>

<style scoped>
.modal-delete {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 101%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content-delete {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  width: 400px;
  padding: 20px 15px;
  background-color: #fff;
}

h3 {
  margin-bottom: 25px;
}

.body-modal {
  text-align: center;
  font-size: 16px;
}

button {
  transition: 500ms ease all;
  align-self: center;
  cursor: pointer;
  margin-top: 24px;
  padding: 5px 24px;
  background-color: #dc3545;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

button:hover {
  opacity: 0.7;
}
</style>