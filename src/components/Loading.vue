<template>
  <div class="spin"></div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .spin {
    display: block;
    width: 40px;
    height: 40px;
    margin: 10% auto 15%;
    padding: 30px;
    border: 3px solid rgba(216, 216, 216, 0.5);
    border-radius: 50%;
    border-top-color: #00bfa6;
    animation: spin 1s ease infinite;
  }

  @keyframes spin {
    to{transform: rotateZ(360deg);}
  }
</style>