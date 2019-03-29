<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="blue" dark disable-resize-watcher>
            <v-list>
                <template>
                    <v-list-tile>
                        <v-btn flat to="/">Home</v-btn>
                    </v-list-tile>
                    <v-list-tile>
                        <v-btn flat to="/marketplace">Marketplace</v-btn>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                        <v-btn flat to="/Newsale">New Sale</v-btn>
                    </v-list-tile>
                    <!-- <v-divider></v-divider>
                    <v-list-tile>
                        <v-btn flat to="/History">Market History</v-btn>
                    </v-list-tile> -->
                    <v-divider></v-divider>
                    <v-list-tile>
                        <v-btn flat to="/Howitworks">The CrowdSale Model</v-btn>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile v-if="!isAuthenticated">
                        <v-btn flat to="/sign-in">Sign In</v-btn>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-list-tile v-if="!isAuthenticated">
                        <v-btn flat to="/Join">Join</v-btn>
                    </v-list-tile>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="blue darken-4" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title data-cy="titleBtn">{{appTitle}}</v-toolbar-title>
            </router-link>
            <v-btn flat class="hidden-sm-and-down nav-menu" to="/marketplace" data-cy="menuBtn">Marketplace</v-btn>
            <v-btn flat class="hidden-sm-and-down nav-menu" to="/newsale" data-cy="menuBtn">New Sale</v-btn>
            <!-- <v-btn flat class="hidden-sm-and-down nav-menu" to="/history" data-cy="menuBtn">Market History</v-btn> -->
            <v-btn flat class="hidden-sm-and-down nav-menu" to="/howitworks" data-cy="menuBtn">The CrowdSale Model</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <div v-if="!isAuthenticated" class="hidden-sm-and-down">
                <v-btn flat to="/sign-in" data-cy="signinBtn">SIGN IN</v-btn>
                <v-btn color="brown lighten-3" to="/join" class="nav-join" data-cy="joinBtn">JOIN</v-btn>
            </div>
            <div v-else>
                <v-btn flat to="/about">PROFILE</v-btn>
                <v-btn outline color="white" @click="logout" data-cy="logout">Logout</v-btn>
            </div>
        </v-toolbar>
    </span>
</template>

<script>
import dataStore from "../store/dataStore";
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'CrowdSale',
            drawer: false,
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('userSignOut');
        }
    },
    created() {
        dataStore.commit('getProductList');
    }
};
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}
</style>
