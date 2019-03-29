<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-container fluid fill-height class="market-place">
        <v-container
          fluid
          grid-list-md
        >
            <form id="main" v-cloak>
              <div class="bar">
                  <!-- Create a binding between the searchString model and the text field -->
                  <input type="text" v-model="searchString" placeholder="Enter Product Name or Category" />
              </div>
            </form>
          <v-layout row wrap>
            <!-- TODO: DRY! -->
            <!-- <v-flex v-for="disp in displayMode" :key="disp.class">
                  <v-flex
                    v-for="card in filteredData"
                    :key="card.name"
                    :class="disp.class"
                    v-bind="{ [disp.cardSize]: true }"
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
                        <pre>  </pre>
                        <v-btn color="primary" @click="uponClick(card.productId)">View</v-btn>
                        <v-spacer></v-spacer>
                        <v-rating v-model="card.rating" half-increments></v-rating>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
            </v-flex> -->

            <!-- The DRY code -->
            <v-flex
              v-for="card in filteredData"
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
                  <!-- <v-list-tile v-if="card.auction==true">
                    <v-list-tile-content>Suggested Price:</v-list-tile-content>
                    <v-list-tile-content class="align-end">VET{{card.suggestedPrice}}</v-list-tile-content>
                  </v-list-tile> -->
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
                  <pre>  </pre>
                  <v-btn color="primary" @click="uponClick(card.productId)">View</v-btn>
                  <v-spacer></v-spacer>
                  <v-rating v-model="card.rating" half-increments></v-rating>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex
              v-for="card in filteredData"
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
                  <!-- <v-list-tile v-if="card.auction==true">
                    <v-list-tile-content>Suggested Price:</v-list-tile-content>
                    <v-list-tile-content class="align-end">VET{{card.suggestedPrice}}</v-list-tile-content>
                  </v-list-tile> -->
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
                  <pre>  </pre>
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
        // cards: null,
        testIcon: "computer",
        searchString: "",

        displayMode: [
          {
            class: "hidden-md-and-up",
            cardSize: "xs12"
          },
          {
            class: "hidden-sm-and-down",
            cardSize: "xs6"
          }
      ]

    }),
    computed: {
        isAuthenticated() {
          return this.$store.getters.isAuthenticated;
        },

        cards() {
          let cardsinStore = dataStore.getters.getCards;
          for (let i=0; i<cardsinStore.length; i++) {
            let x = cardsinStore[i];
            let chip_data = this.determineChipFormat(x.productCategory);
            cardsinStore[i].icon = chip_data[0];
            cardsinStore[i].color = chip_data[1];
          }
          return cardsinStore
        },

        filteredData: function () {
            var search_array = this.cards,
                searchString = this.searchString;

            if(!searchString){
                return search_array;
            }

            searchString = searchString.trim().toLowerCase();

            search_array = search_array.filter(item => {
                if(item.productName.toLowerCase().indexOf(searchString) !== -1 ||
                  item.productCategory.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })

            // Return an array with the filtered data.
            return search_array;
        }
    },
    methods: {
        selectColor() {
            let x = Math.floor((Math.random()*this.colors.length));
            this.color = this.colors[x];
            return this.color
        },
        uponClick(id) {
          if (!this.isAuthenticated) {
            console.log('Login to View')
            this.$router.push('/sign-in');
          } else {
            dataStore.commit('updateId', id);
            let card = dataStore.getters.getCardById(dataStore.state.id);
            let address = card.address;
            if (card.auction == false) {
              dataStore.dispatch('getBuyHistory', address)
            };
            if (card.auction ==true) {
              dataStore.dispatch('getBidHistory', address)
            }
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
    },
    // beforeMount() {
    // }
}
</script>

<style scoped>
/* .market-place {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
} */
.rounded-card{
  border-radius: 15px
}

/*Here on is Search Bar*/
/* Hide un-compiled mustache bindings
until the Vue instance is ready */
[v-cloak] {
  display: none;
}

*{
    margin:0;
    padding:0;
}

body{
    font:15px/1.3 'Open Sans', sans-serif;
    color: #5e5b64;
    text-align:center;
}

a, a:visited {
    outline:none;
    color:#389dc1;
}

a:hover{
    text-decoration:none;
}

section, footer, header, aside, nav{
    display: block;
}


/*-------------------------
    The search input
--------------------------*/

.bar{
    border-radius: 2px; 
    padding: 14px; 
    position:relative;
}

.bar input{
    background:#fff no-repeat 13px 13px;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5NEY0RTlFMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5NEY0RTlGMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTk0RjRFOUMxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTk0RjRFOUQxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DjA/RAAABK0lEQVR42pTSQUdEURjG8dOY0TqmPkGmRcqYD9CmzZAWJRHVRIa0iFYtM6uofYaiEW2SRJtEi9YxIklp07ZkWswu0v/wnByve7vm5ee8M+85zz1jbt9Os+WiGkYdYxjCOx5wgFeXUHmtBSzpcCGa+5BJTCjEP+0nKWAT8xqe4ArPGEEVC1hHEbs2oBwdXkM7mj/JLZrad437sCGHOfUtcziutuYu2v8XUFF/4f6vMK/YgAH1HxkBYV60AR31gxkBYd6xAeF3VzMCwvzOBpypX8V4yuFRzX2d2gD/l5yjH4fYQEnzkj4fae5rJulF2sMXVrAsaTWttRFu4Osb+1jEDT71/ZveyhouTch2fINQL9hKefKjuYFfuznXWzXMTabyrvfyIV3M4vhXgAEAUMs7K0J9UJAAAAAASUVORK5CYII=);

    border: none;
    width: 100%;
    line-height: 19px;
    padding: 11px 0;

    border-radius: 2px;
    box-shadow: 0 2px 8px #c4c4c4 inset;
    text-align: left;
    font-size: 14px;
    font-family: inherit;
    color: #738289;
    font-weight: bold;
    outline: none;
    text-indent: 40px;
}

ul{
    list-style: none;
    width: 428px;
    margin: 0 auto;
    text-align: left;
}

ul li{
    border-bottom: 1px solid #ddd;
    padding: 10px;
    overflow: hidden;
}

ul li img{
    width:60px;
    height:60px;
    float:left;
    border:none;
}

ul li p{
    margin-left: 75px;
    font-weight: bold;
    padding-top: 12px;
    color:#6e7a7f;
}

</style>
