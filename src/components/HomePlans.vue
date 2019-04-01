<template>
    <v-container grid-list-lg>
        <v-layout row>
            <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5">Features in CrowdSale</v-flex>
        </v-layout>
        <v-layout row wrap class="meal-plans">
            <v-flex xs12 sm12 md4>
                <v-card>
                    <v-responsive>
                        <v-img src="/img/decentralized.gif" height="500px">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text">DECENTRALIZED NATURE</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">Buy from Trusted Sellers</h3>
                            <div>Being decentralized, CrowdSale records all transaction history on the blockchain network. Easily determine a seller's credibility by looking up his history.</div>
                            <pre>
                            </pre>
                            <h3 class="headline mb-0">Convenience of Crypto</h3>
                            <div>Buy/Sell products using cryptocurrency, without the hassle of credit cards.</div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 sm12 md4>
                <v-card>
                    <v-responsive>
                        <v-img src="/img/salesforce_dribbble.gif" height="500px">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text">AUCTION / BUY</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">Purchase things in a Group</h3>
                            <div>You get the cheapest price possible because sellers have the assurance that they are selling a particular amount.</div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 sm12 md4>
                <v-card>
                    <v-responsive>
                        <v-img src="/img/animated-gif-software-5.gif" height="500px">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text">MYRIAD of ONLINE ASSETS</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">Enjoy the wide variety of online assets on sale</h3>
                            <div>Software keys, indie games, movies, digital magazines, digital newspapers, e-books, freelance services... Revel in the modern CrowdSale concept online.</div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'HomePlans'
};
</script>

<style scoped>
</style>
