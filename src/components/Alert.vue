<template>
<transition name="alert">
  <div class="alert alert-danger" role="alert">
    <button @click="$emit('closeAlert')" type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>Attention!</strong> <br> {{ errorMsg }}
  </div>
</transition>
</template>

<script>
export default {
  props: ["errorMsg"]
};
</script>

<style>
</style>