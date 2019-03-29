<template>
    <v-container fluid fill-height class="sign-in">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login to CrowdSale</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" >
                            <v-text-field prepend-icon="person" name="email" label="Email" type="email"
                                          v-model="email" :rules="emailRules" required data-cy="signinEmailField">
                            </v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" type="password"
                                          data-cy="signinPasswordField" v-model="password"
                                          :rules="passwordRules" required>
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!valid" @click="submit" data-cy="signinSubmitBtn">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

import VueNotification from "@kugatsu/vuenotification";
Vue.use(VueNotification, {});

import dataStore from '../store/dataStore';

export default {
    name: 'Signin',
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Password must be greater than 6 characters'
            ],
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password,
                    callback: () => {
                        let loader = this.$loading.show({
                            loader: 'bars',
                            opacity: 0.6,
                            color:'blue'
                        });
                        setTimeout(() => loader.hide(), 1000)
                        this.$notification.new(`${this.email} has logged in!`, { timer: 4 });

                        let loginUser = this.email;
                        console.log(loginUser);
                        dataStore.commit('updateLoginUser', loginUser);
                        dataStore.dispatch('checkLoginUserIsAuthorisedSeller')
                        this.$router.push('/about');
                    },
                    failureCallback: () => {
                        let loader = this.$loading.show({
                            loader: 'bars',
                            opacity: 0.6,
                            color:'blue'
                        });
                        setTimeout(() => loader.hide(), 1000)
                        this.$notification.new('Login Failure!', { timer: 4 });
                    }
                });
                // let loader = this.$loading.show({
                //     loader: 'bars',
                //     opacity: 0.6,
                //     color:'blue'
                // });
                // setTimeout(() => loader.hide(), 1000)
                // this.$notification.new(`${this.email} has logged in!`, { timer: 4 });

                // let loginUser = this.email;
                // console.log(loginUser);
                // dataStore.commit('updateLoginUser', loginUser);
                // dataStore.dispatch('checkLoginUserIsAuthorisedSeller')
                // this.$router.push('/about');
            }
        }
    }
};
</script>

<style scoped>
.sign-in {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
