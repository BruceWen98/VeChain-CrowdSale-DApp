<template>

    <v-container fluid fill-height class="authorise-sale">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                <v-card-text>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Requst Sale Authorization</v-toolbar-title>
                    </v-toolbar>
                    <v-list-tile>
                        <v-list-tile-content>Tell us about your credentials.</v-list-tile-content>
                    </v-list-tile>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field prepend-icon="work" name="companyName" label="Your Company Name"
                            required v-model='companyName' :rules="companyNameRules">
                        </v-text-field>
                        <v-text-field prepend-icon="link" name="companyWebsite" label="Your Company Website"
                            required v-model='companyWebsite' :rules="companyWebsiteRules">
                        </v-text-field>
                        <v-text-field prepend-icon="shopping_basket" name="sellItem" label="What you intend to sell"
                            required v-model='sellItem' :rules="sellItemRules">
                        </v-text-field>
                        <v-text-field prepend-icon="description" name="info" label="Information about yourself"
                            required v-model='info' :rules="infoRules">
                        </v-text-field>
                        <v-text-field prepend-icon="account_balance" name="walletId" label="Enter Wallet ID"
                            required v-model='walletId'>
                        </v-text-field>
                    </v-form>
                </v-card-text>
                </v-card>
                <v-toolbar v-if="this.authorisedSeller==false">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :disabled="!valid" @click="submit">Submit Sale Authorisation Request</v-btn>
                </v-toolbar>
                <v-card>
                    <v-card-text>NOTE: This app is currently in initial stages, to request authorise seller, besides 
                        filling in the form above and clicking on authorise sale, please also go to the link below 
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
import dataStore from '../store/dataStore';

import Vue from 'vue';
import VueNotification from "@kugatsu/vuenotification";
Vue.use(VueNotification, {});

export default {
    name: 'AuthoriseSale',
    data() {
        return{
            valid: false,
            userEmail: '',
            userId: '',
            walletId: '',
            authorisedSeller: false,
            companyName:'',
            companyWebsite:'',
            sellItem:'',
            info:'',
            walletId: '',

            companyNameRules: [
                v => !!v || 'Company Name is required'
            ],
            companyWebsiteRules: [
                v => /^((http(s){0,1}\:\/\/){0,1}([a-z|A-Z|0-9|\.|\-|_]){4,255}(\:\d{1,5}){0,1}){0,1}((\/([a-z|A-Z|0-9|\.|\-|_]|\%[A-F|a-f|0-9]{2}){1,255}){1,255}\/{0,1}){0,1}(|\/{0,1}\?[a-z|A-Z|0-9|\.|\-|_]{1,255}\=([a-z|A-Z|0-9|\.|\-|_|\+|\:]|\%[A-F|a-f|0-9]{2}|\&[a-z|A-Z]{2,12}\;){0,255}){0,1}((\&[a-z|A-Z|0-9|\.|\-|_]{1,255}\=([a-z|A-Z|0-9|\.|\-|_|\+|\:]|\%[A-F|a-f|0-9]{2}|\&[a-z|A-Z]{2,12}\;){0,255}){0,255})(\/{0,1}|\#([a-z|A-Z|0-9|\.|\-|_|\+|\:]|\%[A-F|a-f|0-9]{2}|\&[a-z|A-Z]{2,12}\;){0,255})$/.test(v) || "Must be valid URL"
            ],
            sellItemRules: [
                v => !!v || 'Product Name is required'
            ],
            infoRules: [
                v => !!v || 'Information is required'
            ]
        }     
    },
    computed:{ 
        getUser() {
            return this.$store.getters.getUser;
        }
    },
    methods: {
        prepData() {
            this.userEmail = this.getUser.user.email;
            this.userId = this.getUser.user.uid;        
        },
        submit() {
            let seller = {
                userEmail: this.userEmail,
                sellerId: this.userId,
                walletId: this.walletId,
                seller: this.walletId
            }
            dataStore.dispatch('checkLoginUserIsAuthorisedSeller')
            dataStore.dispatch('registerSeller', seller);
            this.$router.push('/about');
            this.$notification.new(`${this.userEmail} has submitted Seller Authorisation Request!`, { timer: 4 });
        }
    },
    beforeMount() {
      this.prepData();
    }
}
</script>

<style scoped>
.authorise-sale {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>