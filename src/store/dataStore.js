import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const dataStore = new Vuex.Store({
    state: {
        cards: [
            {
                productId: 0,
                sellerId: 'wen@morpheuslabs.io',
                sellerWallet: '13avwefhweiofh1123',
                productName: 'Eloquent Javascript, 3rd Edition',
                auction: true,
                productAmount: Math.floor(100 * Math.random()),
                minPrice: 10,
                suggestedPrice: 20,
                price: null,
                description: 'The best JS tutorial.',
                transaction: true,
                weblink: 'google.com',
                rating: 3.5,
                productCategory: 'e-books',
                numberSold: null,
                numberOfBids: 40,
                averageBidPrice: 20.5,
                auctionStatus: true,
                auctionEarnings: null,
                successfulBidders: null
            },
            {
                productId: 1,
                sellerId: 'bruce@morpheuslabs.io',
                sellerWallet: '13avwefhweiofh1123',
                productName: 'The Economist',
                auction: false,
                productAmount: Math.floor(100 * Math.random()),
                minPrice: null,
                suggestedPrice: null,
                price: 100,
                description: 'Most comprehensive current affairs.',
                transaction: false,
                weblink: 'google.com',
                rating: 4,
                productCategory: 'media',
                numberSold: 200,
                numberOfBids: null,
                averageBidPrice: null,
                auctionStatus: null,
                auctionEarnings: null,
                successfulBidders: null
            },
            {
                productId: 2,
                sellerId: 'sang@morpheuslabs.io',
                sellerWallet: '13avwefhweiofh1123',
                productName: 'Microsoft 365 1-year Subscription',
                auction: true,
                productAmount: 1000,
                minPrice: 50000,
                suggestedPrice: 100000,
                price: null,
                description: 'This product is Excellent!',
                transaction: true,
                weblink: 'google.com',
                rating: 5,
                productCategory: 'software',
                numberSold: null,
                numberOfBids: 2000,
                averageBidPrice: 80000,
                auctionStatus: true,
                auctionEarnings: null,
                successfulBidders: null
            },
            {
                productId: 3,
                sellerId: 'runescape@gmail.com',
                sellerWallet: '13avwefhweiofh1123',
                productName: '1 Month Runescape Membership',
                auction: false,
                productAmount: 1000,
                minPrice: null,
                suggestedPrice: null,
                price: 10000,
                description: "The world's greatest MMORPG",
                transaction: true,
                weblink: 'google.com',
                rating: 3,
                productCategory: 'games',
                numberSold: 1000,
                numberOfBids: null,
                averageBidPrice: null,
                auctionStatus: null,
                auctionEarnings: null,
                successfulBidders: null
            },
            {
                productId: 4,
                sellerId: 'vue@vue.io',
                sellerWallet: '13avwefhweiofh1123',
                productName: 'Front-end Freelancer',
                auction: true,
                productAmount: 15,
                minPrice: 1000000,
                suggestedPrice: 2000000,
                price: null,
                description: 'I am proficient with JS, Vue.JS, and more.',
                transaction: false,
                weblink: 'https://vuejs.org/',
                rating: 5,
                productCategory: 'services',
                numberSold: null,
                numberOfBids: 15,
                averageBidPrice: 1500000,
                auctionStatus: false,
                auctionEarnings: 2500000,
                successfulBidders: ['bidder@gmail.com']
            },
            {
                productId: 5,
                sellerId: 'others@email.com',
                sellerWallet: '13avwefhweiofh1123',
                productName: 'Cloud Protocol',
                auction: true,
                productAmount: 10,
                minPrice: 1000,
                suggestedPrice: 2000,
                price: null,
                description: 'Cloud Management done for you',
                transaction: false,
                weblink: 'https://cloud.org/',
                rating: 1.5,
                productCategory: 'others',
                numberSold: null,
                numberOfBids: 50,
                averageBidPrice: 3000,
                auctionStatus: false,
                auctionEarnings: 600000,
                successfulBidders: [
                    'bidder@gmail.com',
                    '1@gmail.com',
                    '2@gmail.com',
                    '3@gmail.com',
                    '4@gmail.com',
                    '5@gmail.com',
                    '6@gmail.com',
                    '7@gmail.com',
                    '8@gmail.com',
                    '9@gmail.com'
                ]
            }
        ],
        id: 0,

        user: {
            userEmail: 'testing@gmail.com',
            userId: 'test',
            walletId: 'test',
            authorisedSeller: false
        }
    },
    mutations: {
        updateId(state, id) {
            state.id = id;
        },
        updateAuthorisedSeller(state, authorisedSeller) {
            state.user.authorisedSeller = authorisedSeller;
        }
    },

    getters: {
        getCardById: state => id => {
            return state.cards.find(card => card.productId === id);
        }
    }
});

export default dataStore;
