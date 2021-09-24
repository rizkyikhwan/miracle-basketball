<template>
  <div id="app">
    <router-view/>
    <Footer v-if="!navigation" />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import { dbAuth } from '@/firebase/config'

export default {
  data() {
    return {
      navigation: null
    }
  },
  components: {
    Footer
  },
  async created() {
    await dbAuth.onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user)
      if (user) {
        this.$store.dispatch("getCurrentUser")
      }
    })
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  }
}
</script>


<style>
</style>
