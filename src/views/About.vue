<template>

    <v-container fluid fill-height class="about">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Your Profile</v-toolbar-title>
                    </v-toolbar>
                    <v-list-tile>
                        <v-list-tile-content>Email:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.userEmail}}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>Wallet Address:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.walletId}}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>Your User UID:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.userId}}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>Sale Authorization:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.authorisedSellerMessage}}</v-list-tile-content>
                    </v-list-tile>
                </v-card>
                <v-toolbar v-if="this.authorisedSeller==false">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" to="/authorise-sale">Request to Sell</v-btn>
                </v-toolbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import dataStore from '../store/dataStore';

export default {
    name: 'About',
    data() {
        return{
            userEmail: '',
            userId: '',
            walletId: '',
            authorisedSeller: false,
            authorisedSellerMessage: ''
        }     
    },
    methods: {
        prepData() {
            this.userEmail = dataStore.state.user.userEmail;
            this.userId = dataStore.state.user.userId;
            this.walletId = dataStore.state.user.walletId;
            if (dataStore.state.user.authorisedSeller==true) {
                this.authorisedSeller = true;
                this.authorisedSellerMessage = 'You are authorised to sell!';
            }
            if (dataStore.state.user.authorisedSeller==false) {
                this.authorisedSeller = false;
                this.authorisedSellerMessage = 'Please request sale access.';
            }
        },
    },
    beforeMount() {
      this.prepData();
    }
}
</script>

<style scoped>
.about {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
