<template>
  <div class="alert alert-danger" role="alert">
    <strong>Attention!</strong> {{ errorMsg }}
    <button @click="$emit('closeAlert')" type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
  </button>
  </div>
</template>

<script>
export default {
  props: ["errorMsg"]
};
</script>

<style>
</style>