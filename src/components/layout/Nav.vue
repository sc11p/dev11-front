<template>
 
    
    <v-toolbar-items v-show="this.$store.getters.user !== null">
      <v-btn text to="/acts">Acts</v-btn>
      <v-btn text to="/logout">Logout</v-btn>
    </v-toolbar-items>


</template>

<script>
</script>

<style scoped>
</style>
