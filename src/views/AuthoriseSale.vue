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
                    </v-form>
                </v-card-text>
                </v-card>
                <v-toolbar v-if="this.authorisedSeller==false">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :disabled="!valid" @click="submit(true)">Submit Sale Authorisation Request</v-btn>
                </v-toolbar>
                <v-toolbar>
                    <v-spacer></v-spacer>
                    <div>Once you have been approved, an email will be sent to you.</div>
                </v-toolbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import dataStore from '../store/dataStore';

export default {
    name: 'AuthoriseSale',
    data() {
        return{
            valid: false,
            userEmail: '',
            userId: '',
            walletId: '',
            authorisedSeller: false,
            authorisedSellerMessage: '',
            companyName:'',
            companyWebsite:'',
            sellItem:'',
            info:'',

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
        submit(authorisedSeller) {
            dataStore.commit('updateAuthorisedSeller', authorisedSeller);
            this.$router.push('/about');
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