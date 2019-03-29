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
        <v-list-tile v-if="card.auction==true">
        <v-list-tile-content>Minimum Price:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ card.minPrice }} VET</v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile v-if="card.auction==true">
        <v-list-tile-content>Suggested Price:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ card.suggestedPrice }} VET</v-list-tile-content>
        </v-list-tile> -->
        <v-list-tile v-if="card.auction==false">
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
        <v-list-tile>
        <v-list-tile-content>Contract Address:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ card.address }}</v-list-tile-content>
        </v-list-tile>
    </v-list>
    </v-card>

    <v-toolbar height="100px" color="brown lighten-3" v-if="card.auction==true && card.auctionStatus==true && card.sellerId!=this.getUser.user.uid">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field prepend-icon="attach_money" name="bid_price" label="Your Bid (in VET)"
                required v-model='bid_price' :rules="priceRules">
            </v-text-field>
            <!-- <v-text-field prepend-icon="add_shopping_cart" name="buy_number" label="How Many?"
                required v-model='buy_number' :rules="buyNumberRules">
            </v-text-field> -->
        </v-form>
        <pre>     </pre>
        <div>Total Cost: {{ bid_price }}VET</div>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark :disabled="true">Bid
            <v-icon dark right>attach_money</v-icon>
        </v-btn>
    </v-toolbar>
    <v-toolbar height="50px" color="brown lighten-3" v-if="card.auction==true && card.auctionStatus==true && card.sellerId!=this.getUser.user.uid">
        <div>Bid for 1 {{card.productName}} through VeChain wallet transfer, to the contract address above.</div>
    </v-toolbar>

    <v-card v-if="card.auction==true">
      <v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <v-chip color="green" text-color="white" v-if="card.auctionStatus==true">
                <v-avatar>
                <v-icon>account_balance</v-icon>
                </v-avatar>
                Currently on Auction
            </v-chip>
            <v-chip color="red" text-color="white" v-if="card.auctionStatus==false || auctionEnabled ==false">
                <v-avatar>
                <v-icon>account_balance</v-icon>
                </v-avatar>
                Auction Closed
            </v-chip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card v-if="card.auction==false">
      <v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <v-chip color="green" text-color="white" v-if="card.saleStatus==true">
                <v-avatar>
                <v-icon>attach_money</v-icon>
                </v-avatar>
                Sale Ongoing
            </v-chip>
            <v-chip color="red" text-color="white" v-if="card.saleStatus==false">
                <v-avatar>
                <v-icon>money_off</v-icon>
                </v-avatar>
                Sale Closed
            </v-chip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-toolbar height="100px" color="brown lighten-3" v-if="card.saleStatus && card.auction==false && card.sellerId!=this.getUser.user.uid">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field prepend-icon="add_shopping_cart" name="buy_number" label="How Many?"
                required v-model='buy_number' :rules="buyNumberRules">
            </v-text-field>
        </v-form>
        <pre>   </pre>
        <div>Total Cost: {{buy_number * card.price}}VET</div>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark :disabled="true">Buy
            <v-icon dark right>attach_money</v-icon>
        </v-btn>
    </v-toolbar>
    <v-toolbar height="50px" color="brown lighten-3" v-if="card.auction==false && card.sellerId!=this.getUser.user.uid">
        <div>Purchase through the VeChain wallet transfer, to the contract address above.</div>
    </v-toolbar>


    <v-card v-if="card.auction==false &&card.saleStatus == true">
      <v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <v-btn color="green" dark :disabled=!card.saleStatus @click="finishSale">Finish Sale</v-btn>
            <pre>
            </pre>
            <div><em>Disclaimer: when you click this button, the product can no longer be bought. All money from product sales will be transferred to the seller's wallet.</em></div>

          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card v-if="card.auction==false && card.saleStatus == false">
      <v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <div>Finish Sale Transaction Details:</div>
            <div v-if="card.saleStatus==false"> TxId: {{getTxId}}</div>
            <div v-if="card.saleStatus==false"> Signer: {{getSigner}}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card v-if="card.auction==false">
        <v-card-title class="justify-center"><h2>Buy History</h2></v-card-title>
        <v-divider></v-divider>
        <v-container fill-height>
            <v-layout row wrap align-center>
            <v-flex class="text-xs-center">
                <v-btn color="blue" dark @click="getBuyHistoryForAProduct">Open History</v-btn>
            </v-flex>
            </v-layout>
        </v-container>
        <v-treeview :items="buyHistory" v-if="displayHistoryTree == true"></v-treeview>
    </v-card>
    <v-card v-if="card.auction==true">
        <v-card-title class="justify-center"><h2>Bidding History</h2></v-card-title>
        <v-divider></v-divider>
        <v-container fill-height>
            <v-layout row wrap align-center>
            <v-flex class="text-xs-center">
                <v-btn color="blue" dark @click="getBidHistoryForAProduct">Open History</v-btn>
            </v-flex>
            </v-layout>
        </v-container>
        <v-treeview :items="bidHistory" v-if="displayHistoryTree == true"></v-treeview>
    </v-card>

    <v-card v-if="card.auction ==true && card.auctionStatus==true">
      <v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">

            <span>(For Seller) Key in the wallet addresses of successful bidders for your {{card.productName}}:</span>
            <p style="white-space: pre-line;">{{ message }}</p>
            <br>
            <textarea v-model="auctionWinnerAddresses" placeholder="Separate your winning addresses by commas (,)"></textarea>
            <pre>
            </pre>
            <v-btn color="green" dark :disabled=!auctionEnabled @click="finishAuction">Finish Auction</v-btn>
            <pre>
            </pre>
            <div v-if="auctionEnabled==true"><em>Disclaimer: You must select a total number of bidders that match your product amount. When you click this button, the bids from the bidders you selected will be transferred to you. The other bidders' money will be returned back to them. You will officially close the auction.</em></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card v-if="card.auction ==true && card.auctionStatus == false">
      <v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <div>Finish Auction Transaction Details:</div>
            <div v-if="auctionEnabled==false"> TxId: {{getAuctionTxId}}</div>
            <div v-if="auctionEnabled==false"> Signer: {{getAuctionSigner}}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card v-if="card.auction==false">
        <v-card-title v-if="card.auction==false" class="justify-center"><h2>Sale Summary</h2></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
            <v-list-tile v-if="card.auction==false">
            <v-list-tile-content>Total Amount Sold:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ getBuyAmount }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="card.auction==false">
            <v-list-tile-content>Total VET transacted:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ getTransactionTotal }}</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
    <v-card v-if="card.auction==true">
        <v-card-title class="justify-center"><h2>Auction Summary</h2></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
            <v-list-tile v-if="card.auction==true">
            <v-list-tile-content>Number of Bids:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ getBidNumber }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="card.auction==true">
            <v-list-tile-content>Average Bidding Price:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ getAuctionTransactionTotal }}</v-list-tile-content>
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

import VueNotification from "@kugatsu/vuenotification";
import { close } from 'fs';
Vue.use(VueNotification, {});

export default {
    name: 'View',
    data() {
        return{ 
            valid: false,
            displayHistoryTree: false,
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
            buyHistory: null,
            saleEnabled: true,
            bidHistory: null,
            auctionEnabled: true,
            auctionWinnerAddresses: ''
            }

    },
    computed: {
        getUser() {
            return this.$store.getters.getUser;
        },
        getBuyAmount() {
            let buyAmount = 0;
            let historyArray = dataStore.getters.getBuyHistoryForAProduct;
            for (let i=0; i<historyArray.length; i++) {
                buyAmount += parseInt(historyArray[i].quantity);
            }
            return buyAmount;
        },
        getTransactionTotal() {
            let transactionTotal = 0;
            let historyArray = dataStore.getters.getBuyHistoryForAProduct;
            for (let i=0; i<historyArray.length; i++) {
                transactionTotal += parseInt(historyArray[i].amount / 1000000000000000000);
            }
            return transactionTotal;
        },
        getBidNumber() {
            let bidNumber = 0;
            let historyArray = dataStore.getters.getBidHistoryForAProduct;
            for (let i=0; i<historyArray.length; i++) {
                bidNumber ++;
            }
            return bidNumber;
        },
        getAuctionTransactionTotal() {
            let auctionTransactionTotal = 0;
            let historyArray = dataStore.getters.getBidHistoryForAProduct;
            for (let i=0; i<historyArray.length; i++) {
                auctionTransactionTotal += parseInt(historyArray[i].value / 1000000000000000000);
            }
            return auctionTransactionTotal/historyArray.length;
        },
        getTxId() {
            return dataStore.getters.getFinishSaleData.txId;
        },
        getSigner() {
            return dataStore.getters.getFinishSaleData.signer;
        },
        getAuctionTxId() {
            return dataStore.getters.getFinishAuctionData.txId;
        },
        getAuctionSigner() {
            return dataStore.getters.getFinishAuctionData.signer;
        }
    },
    methods: {
        prepData() {
            this.card = dataStore.getters.getCardById(dataStore.state.id)
        },
        getBuyHistoryForAProduct() {
            this.displayHistoryTree = !this.displayHistoryTree;
            let historyArray = dataStore.getters.getBuyHistoryForAProduct;
            console.log(historyArray);
            //[{"buyer":"0x7567d83b7b8d80addcb281a71d54fc7b3364ffed","quantity":"10","amount":"100000000000000000000","time":"1553749619"}]
            let finalArray = [];
            let buyAmount = 0;
            let totalSpent = 0;
            for (let i=0; i<historyArray.length; i++) {
                let newObj = {}
                let tempObj = historyArray[i];
                newObj.name = `Buyer: ${tempObj.buyer}`;
                newObj.children = [
                    {name: `Quantity bought: ${tempObj.quantity}`},
                    {name: `VET Spent: ${tempObj.amount / 1000000000000000000}`},
                    {name: `Time of Purchase: ${new Date(tempObj.time * 1000).toISOString()}`}
                ];
                finalArray.push(newObj);
                buyAmount += tempObj.quantity;
                totalSpent += tempObj.amount/1000000000000000000;
            }
            console.log(finalArray)
            this.buyHistory = finalArray;
            this.buyAmount = buyAmount;
            this.totalSpent = totalSpent;
        },
        getBidHistoryForAProduct() {
            this.displayHistoryTree = !this.displayHistoryTree;
            let historyArray = dataStore.getters.getBidHistoryForAProduct;
            console.log(historyArray);
            //[{"bider":"0xd3ae78222beadb038203be21ed5ce7c9b1bff602",
            //"value":"5000000000000000000000","time":"1553831881"}]
            let finalArray = [];
            let bidAmount = 0;
            let totalVETCommitted = 0;
            for (let i=0; i<historyArray.length; i++) {
                bidAmount++;
                let newObj = {};
                let tempObj = historyArray[i];
                newObj.name = `Bidder: ${tempObj.bider}`;
                newObj.children = [
                    {name: `VET Committed: ${tempObj.value / 1000000000000000000}`},
                    {name: `Time of Purchase: ${new Date(tempObj.time * 1000).toISOString()}`}
                ];
                finalArray.push(newObj);
                totalVETCommitted += tempObj.value/1000000000000000000;
            }
            console.log(finalArray)
            this.bidHistory = finalArray;
            this.bidAmount = bidAmount;
            this.totalVETCommitted = totalVETCommitted;
        },
        // bid() {
        //     let bid_obj={
        //         productId: this.card.productId,
        //         bidPrice: this.bid_price,
        //         bids: this.buy_number,
        //         bidderId: this.getUser.user.uid
        //     }
        //     console.log(bid_obj)
        //     //superagent.post()

        //     let loader = this.$loading.show({
        //         loader: 'bars',
        //         opacity: 0.6,
        //         color:'blue'
        //     });
        //     setTimeout(() => loader.hide(), 1000)
        //     this.$notification.new(`Your purchase of ${this.buy_number} ${this.card.productName} has been submitted!`, { timer: 4 });
        // },
        // buy() {
        //     let buy_obj={
        //         productId: this.card.productId,
        //         buyAmount: this.buy_number,
        //         buyerId: this.getUser.user.uid
        //     }
        //     console.log(buy_obj)
        //     //superagent.post()

        //     let loader = this.$loading.show({
        //         loader: 'bars',
        //         opacity: 0.6,
        //         color:'blue'
        //     });
        //     setTimeout(() => loader.hide(), 1000)
        //     this.$notification.new(`Your purchase of ${this.buy_number} ${this.card.productName} has been submitted!`, { timer: 4 });
        // },
        finishSale(){
            dataStore.dispatch("finishSale", this.card);
            this.saleEnabled = false;
            
        },
        finishAuction() {
            let sendData = [this.card, this.auctionWinnerAddresses]
            dataStore.dispatch("finishAuctionSale", sendData);
            this.auctionEnabled = false;
            let loader = this.$loading.show({
                loader: 'bars',
                opacity: 0.6,
                color:'blue'
            });
            setTimeout(() => loader.hide(), 1000)
            this.$notification.new(`Your have ended the auction of ${this.card.productName}`, { timer: 4 });
        },
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