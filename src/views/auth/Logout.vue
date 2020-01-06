<template>
    <div>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
    import apiRoutes from "../../plugins/apiRoutes";
    import common from "../../common";

    export default {
        name: "Logout",
        methods: {
            logout() {
                let authHeaders = this.$store.getters.auth;

                this.$axios.delete(apiRoutes.signOut, {data: {}, headers: {authHeaders}})
                    .then(() => {
                        this.$store.dispatch('logoutUser');
                        common.deleteSessionCookie();
                        this.$router.push('login').catch(err => console.log('error: ' + err));
                    });
            }
        }
    }
</script>

<style scoped>

</style>
