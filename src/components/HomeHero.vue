<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <v-layout justify-center align-center column pa-5>
            <div class="hidden-md-and-up display-3 font-weight-black blue--text text-xs-center">CrowdSale</div>
            <div class="hidden-sm-and-down display-4 font-weight-black blue--text text-xs-center">CrowdSale</div>
            <pre>
            </pre>
            <div class="display-2 white--text background-color:blue text-xs-center">Group buy in the modern age with cryptocurrencies.</div>
            <v-btn id="goto" @click="goto('toHere')" fab class="mt-5 blue darken-3">
            <v-icon large color="white">expand_more</v-icon>
            </v-btn>
        </v-layout>
        <div ref="toHere"></div>
    </v-container>
</template>

<script>
export default {
    name: 'HomeHero',
    methods: {
        goto(refName) {
            var element = this.$refs[refName];
            var top = element.offsetTop;
            window.scrollTo(0, top);
        }
    }
};
</script>

<style scoped>
.home-hero {
    background: url('https://cdn-images-1.medium.com/max/1600/1*DTkbYDqroiSzJ3k5c_x5Zg.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
