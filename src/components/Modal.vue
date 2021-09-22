<template>
  <div class="modal-alert">
    <div class="modal-content-alert">
      <p class="body-modal">{{ this.modalMessage }}</p>
      <button @click="$emit('closeModal')">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modalMessage"]
}
</script>

<style scoped>
.modal-alert {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 101%;
  top: 0;
}

.modal-content-alert {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  width: 300px;
  padding: 40px 30px;
  background-color: #fff;
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