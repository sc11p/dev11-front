<template>
  <v-app-bar 
    app
    dark
    color="indigo darken-2"
  >
    <div class="display-1">RDB</div>
    <v-spacer />

    <div v-show="this.$store.getters.user !== null">
      <router-link to="/acts">Acts</router-link>
      <Logout />
    </div>
  </v-app-bar>
</template>

<script>
import Logout from "../../views/auth/Logout";

export default {
  name: "Nav",
  components: {
    Logout
  }
};
</script>

<style scoped>
</style>
