<template>
  <v-app-bar app dark>
    <v-toolbar-title>RDB</v-toolbar-title>
    <div class="flex-grow-1"></div>
    <v-spacer />
    
    <v-toolbar-items v-show="this.$store.getters.user !== null">

      <v-btn to="/acts">Acts</v-btn>
      <v-btn to="/logout">Logout</v-btn>

    </v-toolbar-items>

  </v-app-bar>
</template>

<script>
</script>

<style scoped>
</style>
