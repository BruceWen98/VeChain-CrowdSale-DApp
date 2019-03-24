<template>
<v-container fluid fill-height class="view">
<v-layout>
<v-flex xs12 sm6 offset-sm3>
    <v-toolbar color="brown lighten-3">
        <v-btn to="/marketplace" color="primary" dark>
            <v-icon dark>arrow_back</v-icon>
            <pre> </pre>
            Back to Marketplace
        </v-btn>
    </v-toolbar>

    <v-card>
    <v-card-title class="justify-center"><h2>{{ card.productName }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-list dense>
        <v-list-tile v-if="card.auction==true">
        <v-list-tile-content>Auction?</v-list-tile-content>
        <v-list-tile-content class="align-end">
            <v-icon color="green">done_outline</v-icon>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
        <v-list-tile-content>Number of Products:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ card.productAmount }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="card.minPrice !== null">
        <v-list-tile-content>Minimum Price:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ card.minPrice }} VET</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="card.suggested_price!==null">
        <v-list-tile-content>Suggested Price:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ card.suggestedPrice }} VET</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="card.price!==null">
        <v-list-tile-content>Price:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ card.price }} VET</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
        <v-list-tile-content>Description:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ card.description }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
        <v-list-tile-content>Party paying transaction fee:</v-list-tile-content>
        <v-list-tile-content class="align-end" v-if="card.transaction==true">Buyer</v-list-tile-content>
        <v-list-tile-content class="align-end" v-if="card.transaction==false">Seller</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
        <v-list-tile-content>Rating:</v-list-tile-content>
        <v-list-tile-content class="align-end">
            <v-rating v-model="card.rating" half-increments></v-rating>
        </v-list-tile-content>
        </v-list-tile>
    </v-list>
    </v-card>

    <v-toolbar height="150px" color="brown lighten-3" v-if="card.auction==true && card.auctionStatus==true">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field prepend-icon="attach_money" name="bid_price" label="Your Bid (in VET)"
                required v-model='bid_price' :rules="priceRules">
            </v-text-field>
            <v-text-field prepend-icon="add_shopping_cart" name="buy_number" label="How Many?"
                required v-model='buy_number' :rules="buyNumberRules">
            </v-text-field>
        </v-form>
        <pre>     </pre>
        <div>Total Cost: {{buy_number * bid_price}}VET</div>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark :disabled="!valid" @click="bid">Bid
            <v-icon dark right>attach_money</v-icon>
        </v-btn>
    </v-toolbar>

    <v-toolbar height="100px" v-if="card.auction==true">
        <div class="text-xs-center" v-if="card.auctionStatus==true">
            <v-chip color="green" text-color="white">
                <v-avatar>
                <v-icon>account_balance</v-icon>
                </v-avatar>
                Currently on Auction
            </v-chip>
        </div>
        <div class="text-xs-center" v-if="card.auctionStatus==false">
            <v-chip color="red" text-color="white">
                <v-avatar>
                <v-icon>account_balance</v-icon>
                </v-avatar>
                Auction Closed
            </v-chip>
        </div>
    </v-toolbar>

    <v-toolbar height="100px" color="brown lighten-3" v-if="card.auction==false">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field prepend-icon="add_shopping_cart" name="buy_number" label="How Many?"
                required v-model='buy_number' :rules="buyNumberRules">
            </v-text-field>
        </v-form>
        <pre>   </pre>
        <div>Total Cost: {{buy_number * card.price}}VET</div>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark :disabled="!valid" @click="buy">Buy
            <v-icon dark right>attach_money</v-icon>
        </v-btn>
    </v-toolbar>

    <v-card v-if="card.auction==true">
        <v-card-title class="justify-center"><h2>Auction History</h2></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
            <v-list-tile v-if="card.auction==true">
            <v-list-tile-content>Number of Bids:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ card.numberOfBids }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="card.auction==true">
            <v-list-tile-content>Average Bidding Price:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ card.averageBidPrice }}</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>

    <v-card v-if="card.auction==false">
        <v-card-title v-if="card.auction==true" class="justify-center"><h2>Auction History</h2></v-card-title>
        <v-card-title v-if="card.auction==false" class="justify-center"><h2>Sale History</h2></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
            <v-list-tile v-if="card.auction==false">
            <v-list-tile-content>Amount Sold:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ card.numberSold }}</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
import dataStore from '../store/dataStore';

import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

export default {
    name: 'View',
    data() {
        return{ 
            valid: false,
            bid_price: null,
            buy_number: null,
            priceRules: [
                v => !!v || 'Make a Bid!',
                v => /^[$]?[0-9]*(\.)?[0-9]?[0-9]?$/.test(v) || 'Make a Valid Bid!'
            ], 
            buyNumberRules: [
                v => !!v || 'Number to buy required',
                v=> /^\d+$/.test(v) || 'Must be whole number'
            ], 
        }

    },
    computed: {
        getUser() {
            return this.$store.getters.getUser;
        }
    },
    methods: {
        prepData() {
          this.card = dataStore.getters.getCardById(dataStore.state.id)
        },
        bid() {
            let bid_obj={
                productId: this.card.productId,
                bidPrice: this.bid_price,
                bids: this.buy_number,
                bidderId: this.getUser.user.uid
            }
            console.log(bid_obj)
            //superagent.post()

            let loader = this.$loading.show({
                loader: 'bars',
                opacity: 0.6,
                color:'blue'
            });
            setTimeout(() => loader.hide(), 1000)
        },
        buy() {
            let buy_obj={
                productId: this.card.productId,
                buyAmount: this.buy_number,
                buyerId: this.getUser.user.uid
            }
            console.log(buy_obj)
            //superagent.post()

            let loader = this.$loading.show({
                loader: 'bars',
                opacity: 0.6,
                color:'blue'
            });
            setTimeout(() => loader.hide(), 1000)
        }
    },
    beforeMount() {
        this.prepData();
    }
}
</script>



<style scoped>
.view {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>