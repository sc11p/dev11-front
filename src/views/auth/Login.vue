<template>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-tooltip bottom>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>

                <v-form>
                  <!-- text field login -->
                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <!-- text field password -->
                  <v-text-field
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>

              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary"
                @click="login"
                >Login</v-btn>
                <v-btn
                  color="error"
                  @click="resetForm"
                  class="reset">
                  Reset Form
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
            resetForm () {
                this.email = ''
                this.password = ''
                },
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
