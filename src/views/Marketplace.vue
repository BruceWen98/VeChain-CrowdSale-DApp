<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              :key="card.name"
              class="hidden-sm-and-down"
              v-bind="{ [`xs6`]: true }"
            >
              <v-card v-bind:color="selectColor()">
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        
                        <div class="headline white--text" v-text="card.name"></div>
                        <pre>
                        </pre>   
                        <div class="white--text">Auction: {{displayAuction(card)}}</div>
                        <div class="white--text">Quantity on Sale: {{card.amount}}</div>
                        <div v-if="card.auction==true" class="white--text">Min. Price: VET{{card.min_price}}</div>
                        <div v-if="card.auction==true" class="white--text">Suggested Price: VET{{card.suggested_price}}</div>
                        <div v-if="card.auction==false" class="white--text">Price: VET{{card.price}}</div>
                        <div class="white--text">Description: {{card.description}}</div>
                        <div class="white--text">Party paying TXN fee: {{displayTransaction(card)}}</div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                <v-spacer></v-spacer>

                <v-card-actions>
                  <v-btn flat dark>View</v-btn>
                  <v-spacer></v-spacer>
                  <v-rating v-model="rating" half-increments></v-rating>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex
              v-for="card in cards"
              :key="card.name"
              class="hidden-md-and-up"
              v-bind="{ [`xs12`]: true }"
              v-bind:color="selectColor()"
            >
              <v-card v-bind:color="selectColor()">
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <div class="headline white--text" v-text="card.name"></div>
                        <pre>
                        </pre>
                        <v-card> 
                          <v-container
                            fluid
                            grid-list-md
                          >
                            <v-layout row wrap>
                              <v-flex
                                v-bind="{ [`xs6`]: true }"
                              >
                              <v-card>
                                <v-container
                                  fill-height
                                  fluid
                                  pa-2
                                >
                                  <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                      <div>Quantity: {{card.amount}}</div>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                              </v-card>
                              <v-card>
                                <v-container
                                  fill-height
                                  fluid
                                  pa-2
                                >
                                  <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                      <div>Price: {{card.price}}VET</div>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                              </v-card>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                <v-spacer></v-spacer>

                <v-card-actions>
                  <v-btn flat>View</v-btn>
                  <v-spacer></v-spacer>
                  <v-rating v-model="rating" half-increments></v-rating>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data: () => ({
        rating: 3.5,
        color: null,
        colors: ["indigo", "cyan darken-2", "blue-grey darken-2", "pink", "red", "purple", "deep-purple", "light-blue", "teal", "green", "light-green", "orange", "deep-orange"],
    }),
    methods: {
        selectColor() {
            let x = Math.floor((Math.random()*this.colors.length));
            this.color = this.colors[x];
            return this.color
        },
        displayAuction(card) {
            if (card.auction == true) return "Yes";
            return "No"
        },
        displayTransaction(card) {
            if (card.transaction == true) return "Buyer";
            return "Seller"
        },
        prepData(){
          this.cards = [
            { id: '', name: 'E-Book', auction: true, amount: Math.floor(100*Math.random()), min_price: 10, suggested_price: 20, price: null, description: "This product is Excellent!", transaction: true },
            { id: '', name: 'Digital Magazine', auction: false, amount: Math.floor(100*Math.random()), min_price: null, suggested_price: null, price: 100, description: "This product is Excellent!", transaction: false },
            { id: '', name: 'Software Key', auction: true, amount: Math.floor(100*Math.random()), min_price: 500000, suggested_price: 10000000000, price: null, description: "This product is Excellent!", transaction: true }
          ]
          // superagent.get("/url", function name(params) {
          //   this.cards=[]
          }
    },
    beforeMount(){
        this.prepData()
    },
}
</script>

<style scoped>
</style>
