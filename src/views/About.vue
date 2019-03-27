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
import { mapState } from 'vuex'
import dataStore from '../store/dataStore';

export default {
    name: 'About',

    computed: {
        userEmail() { return dataStore.state.user.userEmail },
        userId() { return dataStore.state.user.userId },
        walletId() { return dataStore.state.user.walletId },
        authorisedSeller() { return dataStore.state.user.authorisedSeller },
        authorisedSellerMessage() { 
            return dataStore.state.user.authorisedSeller? 'You are authorised to sell!': 'Please request sale access.'
        }
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
