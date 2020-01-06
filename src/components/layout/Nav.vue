<template>
    <v-app-bar app dark color="black">
        <div class="d-flex align-center">
            <v-img
                    alt="Logo"
                    class="shrink mr-2"
                    contain
                    :src="require('../../assets/logo.png')"
                    transition="scale-transition"
                    width="40"
            />

            <div class="display-1">Golf Hacker Club</div>
        </div>

        <v-spacer/>

        <div v-show="this.$store.getters.user !== null">
            
            <router-link to="/acts">Acts</router-link>
            <Logout/>
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
    }
</script>

<style scoped>

</style>
