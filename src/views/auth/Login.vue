<template>
    <div>
        <form @submit.prevent="login">
            <h1>Login</h1>
            <label>Email</label>
            <input required v-model="email" type="email"/>
            <label>Password</label>
            <input required v-model="password" type="password"/>
            <hr/>
            <button type="submit">Login</button>
        </form>

    </div>
</template>

<script>
    import {pick} from 'lodash'
    import apiRoutes from "../../plugins/apiRoutes";
    import common from "../../common";
    import {RESPONSE_HEADERS} from "../../constants"
    import notifier from "../../shared/notifier";

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                this.$axios.post(apiRoutes.signIn, {
                    email: this.email, password: this.password
                }).then(response => {
                    // Again commits the relevant headers to the store.
                    const authHeaders = pick(response.headers, RESPONSE_HEADERS.ARRAY);
                    this.$store.commit('setAuth', authHeaders);

                    // response.data.data is an object containing public information about the current user.
                    // This is useful to keep track of so that your app can display the current user's
                    // email/username somewhere.
                    let currentUser = response.data.data;
                    this.$store.commit('setUser', currentUser);

                    // Write both the response headers and the current user data to the cookie.
                    const contents = {
                        tokens: authHeaders,
                        user: currentUser
                    };

                    common.setSessionCookie(contents);

                    // Navigate to Outings
                    this.$router.push('outings').catch(err => console.log('error: ' + err));
                }).catch(() => {
                    notifier.error('Email and/or password are incorrect');
                });
            }
        }
    }
</script>

<style scoped>

</style>
