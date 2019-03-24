<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-container fluid fill-height class="market-place">
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
              <v-card color="white" class="rounded-card">
                  <v-toolbar dark color="primary">
                    <div class="headline white--text" v-text="card.productName">
                    </div>
                    <v-spacer></v-spacer>
                      <div class="text-xs-center">
                        <v-chip v-bind="{color: card.color}" text-color="white">
                          <v-avatar>
                            <v-icon v-if="card.icon=='computer'">computer</v-icon>
                            <v-icon v-if="card.icon=='movie'">movie</v-icon>
                            <v-icon v-if="card.icon=='games'">games</v-icon>
                            <v-icon v-if="card.icon=='book'">book</v-icon>
                            <v-icon v-if="card.icon=='room_service'">room_service</v-icon>
                            <v-icon v-if="card.icon=='list_alt'">list_alt</v-icon>
                          </v-avatar>
                          {{card.productCategory}}
                        </v-chip>
                      </div>
                  </v-toolbar>

                  <v-list-tile>
                    <v-list-tile-content>Quantity on Sale:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{card.productAmount}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="card.auction==true">
                    <v-list-tile-content>Minimum Bid:</v-list-tile-content>
                    <v-list-tile-content class="align-end">VET{{card.minPrice}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="card.auction==true">
                    <v-list-tile-content>Suggested Price:</v-list-tile-content>
                    <v-list-tile-content class="align-end">VET{{card.suggestedPrice}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="card.auction==false">
                    <v-list-tile-content>Price:</v-list-tile-content>
                    <v-list-tile-content class="align-end">VET{{card.price}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Description:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{card.description}}</v-list-tile-content>
                  </v-list-tile>
                <v-spacer></v-spacer>

                <v-card-actions>
                  <v-btn color="primary" @click="uponClick(card.productId)">View</v-btn>
                  <v-spacer></v-spacer>
                  <v-rating v-model="card.rating" half-increments></v-rating>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex
              v-for="card in cards"
              :key="card.name"
              class="hidden-md-and-up"
              v-bind="{ [`xs12`]: true }"
            >
              <v-card color="white" class="rounded-card">
                  <v-toolbar dark color="primary">
                    <div class="headline white--text" v-text="card.productName">
                    </div>
                    <v-spacer></v-spacer>
                      <div class="text-xs-center">
                        <v-chip v-bind="{color: card.color}" text-color="white">
                          <v-avatar>
                            <v-icon v-if="card.icon=='computer'">computer</v-icon>
                            <v-icon v-if="card.icon=='movie'">movie</v-icon>
                            <v-icon v-if="card.icon=='games'">games</v-icon>
                            <v-icon v-if="card.icon=='book'">book</v-icon>
                            <v-icon v-if="card.icon=='room_service'">room_service</v-icon>
                            <v-icon v-if="card.icon=='list_alt'">list_alt</v-icon>
                          </v-avatar>
                          {{card.productCategory}}
                        </v-chip>
                      </div>
                  </v-toolbar>

                  <v-list-tile>
                    <v-list-tile-content>Quantity on Sale:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{card.productAmount}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="card.auction==true">
                    <v-list-tile-content>Minimum Bid:</v-list-tile-content>
                    <v-list-tile-content class="align-end">VET{{card.minPrice}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="card.auction==true">
                    <v-list-tile-content>Suggested Price:</v-list-tile-content>
                    <v-list-tile-content class="align-end">VET{{card.suggestedPrice}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="card.auction==false">
                    <v-list-tile-content>Price:</v-list-tile-content>
                    <v-list-tile-content class="align-end">VET{{card.price}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Description:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{card.description}}</v-list-tile-content>
                  </v-list-tile>
                <v-spacer></v-spacer>

                <v-card-actions>
                  <v-btn color="primary" @click="uponClick(card.productId)">View</v-btn>
                  <v-spacer></v-spacer>
                  <v-rating v-model="card.rating" half-increments></v-rating>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import dataStore from '../store/dataStore';
import "../store/dataStore";

export default {
    data: () => ({
        rating: 3.5,
        color: null,
        colors: ["indigo", "cyan darken-2", "blue-grey darken-2", "pink", "red", "purple", "deep-purple", "light-blue", "teal", "green", "light-green", "orange", "deep-orange"],
        cards: null,
        testIcon: "computer"
    }),
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        selectColor() {
            let x = Math.floor((Math.random()*this.colors.length));
            this.color = this.colors[x];
            return this.color
        },
        prepData() {
          this.cards = dataStore.state.cards;
        },
        uponClick(id) {
          if (!this.isAuthenticated) {
            console.log('Login to View')
            this.$router.push('/sign-in');
          } else {
            dataStore.commit('updateId', id);
            this.$router.push('/view');
          }
        },
        determineChipFormat(productCategory) {
          let icon, color;
          switch(productCategory) {
            case "software":
              icon = "computer";
              color = "indigo";
              break;
            case "media":
              icon = "movie";
              color = "cyan darken-2";
              break;
            case "games":
              icon = "games";
              color = "pink";
              break;
            case "e-books":
              icon = "book";
              color = "green";
              break;
            case "services":
              icon = "room_service";
              color = "orange";
              break;
            case "others":
              icon = "list_alt";
              color = "yellow";
              break;
          }
          let a = [icon, color];
          return a;
        },
        editData(cards) {
          for (let i=0; i<cards.length; i++) {
            let x = cards[i];
            let chip_data = this.determineChipFormat(x.productCategory);
            this.cards[i].icon = chip_data[0];
            this.cards[i].color = chip_data[1];
          }
        },
    },
    beforeMount() {
      this.prepData();
      this.editData(this.cards)
    }
}
</script>

<style scoped>
.market-place {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
.rounded-card{
  border-radius: 15px
}
</style>
