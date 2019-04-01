<template>
    <v-container fluid fill-height>
    <v-container grid-list-lg>
        <v-layout row>
            <v-flex xs12 class="text-xs-center display-3 blue--text font-weight-black my-5">The CrowdSale Model</v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm12 md12>
                <v-card>
                    <v-responsive>
                        <v-img src="/img/Understand-How-The-Auctions-Come-About.png" height="700px">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <v-spacer></v-spacer>
                                        <span class="headline black--text">OUR AUCTION MODEL</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">The Algorithm</h3>
                            <pre>
                            </pre>
                            <div>The auction seller puts up "x" number of his product for sale. Bidders bid for the particular 
                                product, and each bid is recorded on the blockchain. Take note that when submitting a bid, the bidder 
                                will need to pay the respective number of tokens. When the number of bids equals to or exceeds 
                                the total number of products available, the seller has the option to finish the Auction. Upon the 
                                seller's finish auction confirmation, CrowdSale will send the blockchain tokens of the successful 
                                bidders over to the seller, and return the blockchain tokens of the failed bidders back to them.
                                </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md6>
                <v-card>
                    <v-responsive>
                        <v-img src="/img/Commerce+-+transaction+fees.png" height="500px">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline black--text">TAKE CONTROL OF TRANSACTION FEE</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">You Choose Who Pays</h3>
                            <pre>
                            </pre>
                            <div>There is a common problem with marketplaces that operate on blockchain, which is paying
                                the transaction fee. Transaction fee is a payment made for every transaction, required
                                by the blockchain protocol. By adopting suitable blockchain protocol, CrowdSale sharply reduces
                                the transaction fee. Furthermore, the seller can determine whether the buyer or the seller 
                                pays the transaction fee for each transaction. Buyers/bidders can view this information and 
                                make a decision whether to buy/bid for the product based on it. You can make the decision.
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md6>
                <v-card>
                    <v-responsive>
                        <v-img src="/img/coindust--dribbble.gif" height="500px">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline black--text">BENEFIT FROM BLOCKCHAIN</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">Trust the Data</h3>
                            <pre>
                            </pre>
                            <div>Auction History, History of Sales, and Product Ratings are shown in many marketplaces.
                                What makes CrowdSale special is that these data can never be mutated by anybody; they are 
                                securely stored on blockchain. Product Ratings cannot be falsely attributed because of the 
                                deterrent of the transaction fee. Auction History is prominently displayed so that sellers
                                or buyers can make the most rational decision. And the History page is available for you to
                                look up past sales and sellers for you to decide who is trustable.
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'ModelCards'
};
</script>

<style scoped>
</style>
