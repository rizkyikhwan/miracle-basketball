<template>
  <div class="modal">
    <div class="modal-content">
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
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  width: 300px;
  padding: 40px 30px;
  background-color: #fff;
}

.body-modal {
  text-align: center;
}

button {
  transition: 500ms ease all;
  align-self: center;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

button:hover {
  background-color: rgba(48, 48, 48, 0.7);
}
</style>