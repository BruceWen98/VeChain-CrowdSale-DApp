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
                <v-card>
                    <v-card-text>NOTE: This app is currently in initial stages, to request authorise seller, besides filling
                        in Request Sale Authorisation form and clicking on authorise sale, please also go to the link below 
                        and fill up the form to submit your wallet address. We will approve your request to be an 
                        authorised seller within 1 business day. Once your address has been approved you will be able
                        to create new sale.
<a href="https://docs.google.com/forms/d/e/1FAIpQLScFaq_JXWSkntxS5dwxfZBToZ9uK16VM3q1mQ0jmfaET65neQ/viewform?fbzx=-3145106771057433489">Go to Form</a>
                    </v-card-text>
                </v-card>
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
