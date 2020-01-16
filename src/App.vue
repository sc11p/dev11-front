<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>RDB</v-toolbar-title>
      <v-spacer></v-spacer>
      <Nav />
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <router-view />
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
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
