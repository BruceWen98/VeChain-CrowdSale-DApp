<template>
    <v-container fluid fill-height class="join">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Join CrowdSale</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field prepend-icon="person" name="email" label="Email" type="email"
                                          v-model="email" :rules="emailRules" data-cy="joinEmailField" required>
                            </v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password"
                                          type="password" required v-model="password" :rules="passwordRules"
                                          data-cy="joinPasswordField">
                            </v-text-field>
                            <v-text-field prepend-icon="account_balance_wallet" name="walletId" label="Enter your Wallet Address" type="walletId"
                                          v-model="walletId"
                                          :rules="walletRules" required>
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!valid" @click="submit" data-cy="joinSubmitBtn">Join</v-btn>
                    </v-card-actions>
                    <v-card-text>
                        Disclaimer: CrowdSale requires wallet address purely for the purpose of processing
                        transactions between the buyer and seller.
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Join',
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            walletId: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ],
            walletRules: [
                v => !!v || 'Wallet Address is required',
            ]
        };
    },
    computed: {
        getUser() {
            return this.$store.getters.getUser;
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userJoin', {
                    email: this.email,
                    password: this.password
                });
                let userDetails = {
                    userEmail: this.email,
                    userId: this.getUser.user.uid,
                    walletId: this.walletId
                };
                console.log(userDetails);
                //superagent.post()
            }
        }
    }
};
</script>

<style scoped>
.join {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
