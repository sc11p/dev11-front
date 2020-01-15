<template>
  <v-app>
    <Nav></Nav>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Nav from "./components/layout/Nav";
import common from "./common";
export default {
  name: "App",
  components: {
    Nav
  },
  data: () => ({
    //
  }),
  beforeCreate() {
    // Persist state through an app reload
    const existingSessionCookie = common.getSessionCookie();
    // If a session cookie exists, update the vuex store with the cookie contents
    if (existingSessionCookie && existingSessionCookie.length) {
      const session = JSON.parse(existingSessionCookie);
      this.$store.commit("setAuth", session.tokens);
      this.$store.commit("setUser", session.user);
    }
  }
};
</script>
