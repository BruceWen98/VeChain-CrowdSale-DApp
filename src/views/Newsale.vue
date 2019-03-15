<template>
    <v-container fluid fill-height class="Newsale">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>New Sale</v-toolbar-title>
                    </v-toolbar>
                    <v-toolbar>
                        <v-toolbar-title>Auction?</v-toolbar-title>
                        <pre> </pre>
                        <RockerSwitch 
                            size= medium
                            :value="currentValue"
                            @change="isOn => (currentValue = isOn)"
                            toggle
                        />
                    </v-toolbar>
                    <v-card-text v-if="currentValue==true">
                        <v-img src="https://previews.123rf.com/images/nomad_s0ul/nomad_s0ul1603/nomad_s0ul160300027/53405770-seamless-shopping-cart-pattern-background-texture.jpg" height="50px">
                        </v-img>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field prepend-icon="shopping_basket" name="product_name" label="Product Name"
                                required v-model='product_name' :rules="productNameRules">
                            </v-text-field>
                            <v-text-field prepend-icon="shopping_cart" name="number_of_products" label="Number of Products"
                                required v-model='number_of_products' :rules="shoppingCartRules">
                            </v-text-field>
                            <v-text-field prepend-icon="attach_money" name="minimum_bidding_price" label="Minimum Bidding Price"
                                required v-model='minimum_bidding_price' :rules="minPriceRules">
                            </v-text-field>
                            <v-text-field prepend-icon="attach_money" name="suggested_bidding_price" label="Suggested Bidding Price"
                                required v-model='suggested_bidding_price' :rules="suggestedPriceRules">
                            </v-text-field>
                            <v-text-field prepend-icon="description" name="product_description" label="Product Description"
                                required v-model='product_description' :rules="productDescriptionRules">
                            </v-text-field> 
                            <v-text-field prepend-icon="link" name="product_weblink" label="Product Weblink"
                                v-model='product_weblink' :rules="productWeblinkRules">
                            </v-text-field>                            
                        </v-form>
                        <v-select
                            prepend-icon="category"
                            :items="items"
                            box
                            chips
                            label="Product Category"
                            multiple
                            single-line=""
                        ></v-select>
                    </v-card-text>
                    <v-card-text v-if="currentValue==false">
                        <v-img src="https://thumbs.dreamstime.com/z/background-woman-shopping-items-seamless-pattern-vector-72626156.jpg" height="50px">
                        </v-img>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field prepend-icon="shopping_basket" name="product_name" label="Product Name"
                                required v-model='product_name' :rules="productNameRules">
                            </v-text-field>
                            <v-text-field prepend-icon="shopping_cart" name="number_of_products" label="Number of Products"
                                required v-model='number_of_products' :rules="shoppingCartRules">
                            </v-text-field>
                            <v-text-field prepend-icon="attach_money" name="price" label="Selling Price"
                                required v-model='price' :rules="priceRules">
                            </v-text-field>
                            <v-text-field prepend-icon="description" name="product_description" label="Product Description"
                                required v-model='product_description' :rules="productDescriptionRules">
                            </v-text-field> 
                            <v-text-field prepend-icon="link" name="product_weblink" label="Product Weblink"
                                v-model='product_weblink' :rules="productWeblinkRules">
                            </v-text-field>   
                        </v-form>
                        <v-select
                            prepend-icon="category"
                            :items="items"
                            box
                            chips
                            label="Product Category"
                            multiple
                            single-line=""
                        ></v-select>
                    </v-card-text>

                    <v-toolbar>
                        <pre><span class="inner-pre" style="font-size: 16px">Buyer(B)/Seller(S) pays TXN Fee? </span></pre>
                        <RockerSwitch 
                            size = medium
                            :value="ifBuyerPay"
                            @change="isOn => (ifBuyerPay=isOn)"
                            labelOn = "B"
                            labelOff = "S"
                        />
                    </v-toolbar>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!valid" @click="submit" data-cy="joinSubmitBtn">Create New Sale</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import RockerSwitch from "vue-rocker-switch";
import "vue-rocker-switch/dist/vue-rocker-switch.css";

//Change Rocker switch label name.
function changelabelName(onName, offName) {
    RockerSwitch.props.labelOn.default = onName;
    RockerSwitch.props.labelOff.default = offName;
    console.log(RockerSwitch)
}
changelabelName("Yes", "No");

//Change Rocker switch border color.
function setBorderColor(color) {
    RockerSwitch.props.borderColor.default = color;
}
setBorderColor('#DCDCDC');

export default {
    name: 'Newsale',
    components: {
        RockerSwitch
    },
    data() {
        return {
            currentValue: true,
            ifBuyerPay: true,

            valid: false,
            product_name: '',
            number_of_products: '',
            minimum_bidding_price: '',
            suggested_bidding_price: '',
            product_description: '',
            product_weblink: '',
            price: '',

            items: ['software', 'media', 'games', 'e-books', 'services', 'others'],

            productNameRules: [
                v => !!v || 'Product Name is required'
            ],
            shoppingCartRules: [
                v => !!v || 'Number of sales required',
                v=> /^\d+$/.test(v) || 'Must be whole number'
            ], 
            minPriceRules: [
                v => !!v || 'Minimum price required',
                v => /^[$]?[0-9]*(\.)?[0-9]?[0-9]?$/.test(v) || 'Must be Valid Price'
            ], 
            suggestedPriceRules: [
                v => !!v || 'Suggested price required',
                v => /^[$]?[0-9]*(\.)?[0-9]?[0-9]?$/.test(v) || 'Must be Valid Price'                
            ],
            productDescriptionRules: [
                v => !!v || 'Product Description is required'
            ],
            productWeblinkRules: [
                v => /^((http(s){0,1}\:\/\/){0,1}([a-z|A-Z|0-9|\.|\-|_]){4,255}(\:\d{1,5}){0,1}){0,1}((\/([a-z|A-Z|0-9|\.|\-|_]|\%[A-F|a-f|0-9]{2}){1,255}){1,255}\/{0,1}){0,1}(|\/{0,1}\?[a-z|A-Z|0-9|\.|\-|_]{1,255}\=([a-z|A-Z|0-9|\.|\-|_|\+|\:]|\%[A-F|a-f|0-9]{2}|\&[a-z|A-Z]{2,12}\;){0,255}){0,1}((\&[a-z|A-Z|0-9|\.|\-|_]{1,255}\=([a-z|A-Z|0-9|\.|\-|_|\+|\:]|\%[A-F|a-f|0-9]{2}|\&[a-z|A-Z]{2,12}\;){0,255}){0,255})(\/{0,1}|\#([a-z|A-Z|0-9|\.|\-|_|\+|\:]|\%[A-F|a-f|0-9]{2}|\&[a-z|A-Z]{2,12}\;){0,255})$/.test(v) || "Must be valid URL"
            ],
            priceRules: [
                v => !!v || 'Price required',
                v => /^[$]?[0-9]*(\.)?[0-9]?[0-9]?$/.test(v) || 'Must be Valid Price'
            ]
        }
    },
    computed: {
        userRecipes() {
            return this.$store.state.userRecipes;
        }
    },
    mounted() {
        this.getRecipes();
    },
    methods: {
        getRecipes() {
            this.$store.dispatch('getUserRecipes');
        },
        methodToRunOnSelect(payload) {
            this.object = payload;
        },
        on(value) {
            this.currentValue = value;
        },
        submit() {
            let obj={
                p: this.product_name
            }
            console.log(obj)
            //superagent.post()
        }
    }
};
</script>

<style scoped>
.Newsale {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
