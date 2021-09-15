<template>
  <div class="overlay">
    <div class="spin"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.spin {
  display: block;
  position: relative;
  width: 40px;
  height: 40px;
  margin: 350px auto;
  padding: 30px;
  border: 5px solid transparent;
  border-radius: 50%;
  border-top-color: #00bfa6;
  border-bottom-color: #00bfa6;
  animation: spin .75s linear infinite;
}

@media (max-width: 766px) {
  .spin {
    margin: 300px auto;
  } 
}

@keyframes spin {
  to{transform: rotateZ(360deg);}
}
</style>