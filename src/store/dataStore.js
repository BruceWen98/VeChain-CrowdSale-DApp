import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const dataStore = new Vuex.Store({
    state: {
        staticCards: [
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
                successfulBidders: null,
                address: '0x2a56245745e0178764d2becc46dd46f4c11379ca'
            },
            {
                productId: 1,
                sellerId: 'IYPvwAIP69fTvdKUFyGlLCIq27S2',
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
                numberSold: 59,
                numberOfBids: null,
                averageBidPrice: null,
                auctionStatus: null,
                auctionEarnings: null,
                successfulBidders: null,
                address: '0x2a56245745e0178764d2becc46dd46f4c11379ca'
            },
            {
                productId: 2,
                sellerId: 'IYPvwAIP69fTvdKUFyGlLCIq27S2',
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
                successfulBidders: null,
                address: '0x2a56245745e0178764d2becc46dd46f4c11379ca'
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
                successfulBidders: null,
                address: '0x2a56245745e0178764d2becc46dd46f4c11379ca'
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
                successfulBidders: ['bidder@gmail.com'],
                address: '0x2a56245745e0178764d2becc46dd46f4c11379ca'
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
                ],
                address: '0x2a56245745e0178764d2becc46dd46f4c11379ca'
            }
        ],
        cards: [],
        id: 0,

        loginUser: {
            userEmail: ''
        },
        user: {
            userEmail: '',
            userId: '',
            walletId: '',
            authorisedSeller: false
        },
        buyHistoryForAProduct: [],
        bidHistoryForAProduct: [],
        finishSaleData: {
            signer: '',
            txId: ''
        },
        finishAuctionData: {
            signer: '',
            txId: ''
        }
    },
    mutations: {
        updateId(state, id) {
            state.id = id;
        },
        updateLoginUser(state, loginUser) {
            state.loginUser.userEmail = loginUser;
            state.user.userEmail = loginUser;
        },
        updateAuthorisedSeller(state, authorisedSeller) {
            state.user.authorisedSeller = authorisedSeller;
        },
        getProductList(state) {
            window.CSF.getListProducts(1).then(output => {
                // console.log("calling mutations to update products. ouput=", output.length);
                // console.log("calling mutations to update products", output);
                let currentProducts = [];
                for (let i=0; i<output.length; i++) {
                    let oneProduct = output[i];
                    let card = {};
                    card.productId = oneProduct.productId;
                    card.sellerId = oneProduct.sellerId;
                    card.productName = oneProduct.productName;
                    card.description = oneProduct.description;
                    card.productCategory = oneProduct.productCategory;
                    card.auction = oneProduct.auction;
                    card.productAmount = oneProduct.productAmount;
                    card.numberSold = oneProduct.numberSold;
                    card.address = oneProduct.address;
                    card.weblink = oneProduct.weblink;
                    card.transaction = oneProduct.transaction; //what is this for?
                    card.price = oneProduct.price / 1e+18;
                    card.minPrice = oneProduct.minPrice / 1e+18;
                    card.saleStatus = oneProduct.saleStatus;
                    card.auctionStatus = oneProduct.auctionStatus;
                    currentProducts.push(card);
                }
                //state.cards = [...state.cards, ...currentProducts];
                // let nonDuplicatedCards = [...new Set([...state.cards, ...currentProducts])]; //   => remove duplication
                Vue.set(state, 'cards', [...currentProducts, ...state.staticCards])
            });
        },
        updateBuyHistoryForAProduct(state, buyHistory) {
            state.buyHistoryForAProduct = buyHistory;
        },
        updateBidHistoryForAProduct(state, bidHistory) {
            state.bidHistoryForAProduct = bidHistory
        },
        updateFinishSale(state, payload) {
            state.finishSaleData.signer = payload[0];
            state.finishSaleData.txId = payload[1];
            payload[2].saleStatus = false; // payload[2] is a card
        },
        updateFinishAuction(state, payload) {
            state.finishAuctionData.signer = payload[0];
            state.finishAuctionData.txId = payload[1];
            payload[2].auctionStatus = false; // payload[2] is a card
        }
    },
    actions: {
        registerSeller(state, payload) {
            console.log(payload);

            let sellerName = payload.userEmail;
            let sellerId = payload.sellerId;
            let wallet = payload.walletId;
            let seller = payload.seller;
            // let sellerName = "Seller@gmail.com";
            // let sellerId = "SellerID";
            // let wallet = "0xc8367bab4d0e61a53fdf3d637c5e8d32c8ad9e7f";
            // let seller = "0xc8367bab4d0e61a53fdf3d637c5e8d32c8ad9e7f";
            // console.log("args=", sellerName, sellerId, wallet, seller)

            window.CSF.registerSeller(sellerName, sellerId, wallet, seller).then(output => {
                console.log(output);
            })
        },
        checkLoginUserIsAuthorisedSeller(context) {
            window.CSF.getListSellers().then(output => {
                let x = output;
                console.log(x);
                console.log(this.state.loginUser.userEmail);
                for (let i=0; i <x.length; i++) {
                    let tempObject = x[i];
                    if (tempObject.sellerName == this.state.loginUser.userEmail) {
                        context.commit('updateAuthorisedSeller', true);
                        console.log('updateuser success');
                        break;
                    }
                }
            });
        },
        createNewProduct({ state, commit} , payload) {
            console.log(payload);
            let _productId = payload.productId;
            let _sellerId = payload.sellerId;
            let _productName = payload.productName;
            let _description = payload.description;
            let _weblink = payload.weblink;
            let _productCategory = payload.productCategory;
            let _productAmount = payload.productAmount;
            let _price = Util.numberToWei(payload.price);

            let promise = window.CSF.createNewProduct(_productId, _sellerId,_productName,_description,_weblink,_productCategory,_productAmount,_price);
            
            promise.then((output) => {
                console.log(output);
                setTimeout(()=>commit('getProductList'),1000); //delay 1s to make sure getProductList returns output in time
            });
        },
        createAutionProduct({state, commit}, payload) {
            let _productId = payload.productId;
            let _sellerId = payload.sellerId;
            let _productName = payload.productName;
            let _description = payload.description;
            let _weblink = payload.weblink;
            let _productCategory = payload.productCategory;
            let _productAmount = payload.productAmount;
            let _minPrice = Util.numberToWei(payload.minPrice);

            let promise = window.CSF.createAuctionProduct(_productId, _sellerId,_productName,_description,
                _weblink,_productCategory,_productAmount,_minPrice);
            promise.then((output) => {
                console.log(output);
                setTimeout(()=>commit('getProductList'),5000); //delay 1s to make sure getProductList returns output in time
            });
        },
        getBuyHistory(state, payload) {
            let address = payload;
            let product = new Product(address);
            product.getBuyHistory().then(output => {
                console.log(output);
                dataStore.commit('updateBuyHistoryForAProduct', output)
            });
        },
        getBidHistory(state, payload) {
            let address = payload;
            let product = new AuctionProduct(address);
            product.getBidHistory().then(output => {
                console.log(output);
                dataStore.commit('updateBidHistoryForAProduct', output);
            });
        },
        finishSale(state, card){
            let address = card.address;
            let product = new Product(address);
            product.finishSale().then(output => {
                console.log(output);
                let signer = output.signer;
                let txId = output.txid; 
                dataStore.commit('updateFinishSale', [signer, txId, card]);
            });
        },
        finishAuctionSale(state, sendData) {
            //sendData = [this.card, this.auctionWinnerAddresses]
            console.log(sendData)
            let address = sendData[0].address;
            let auctionWinnerAddresses = sendData[1];
            let winers = auctionWinnerAddresses.split(",");    
            let product = new AuctionProduct(address);
            
            product.finishAuction(winers).then(output => {
                console.log(output);
                let signer = output.signer;
                let txId = output.txid;
                console.log([signer, txId])
                dataStore.commit('updateFinishAuction', [signer, txId, sendData[0]])
            });
        }

    },
    getters: {
        getCardById: state => id => {
            return state.cards.find(card => card.productId === id);
        },
        getCards(state) {
            return state.cards;
        },
        getBuyHistoryForAProduct(state) {
            return state.buyHistoryForAProduct;
        },
        getBidHistoryForAProduct(state) {
            return state.bidHistoryForAProduct;
        },
        getFinishSaleData(state) {
            return state.finishSaleData;
        },
        getFinishAuctionData(state) {
            return state.finishAuctionData;
        }
    }
});

window.dataStore = dataStore;

export default dataStore;
