# **“CrowdSale” DApp**

## About CrowdSale:
CrowdSale is a decentralized marketplace for users to make online purchases of non-physical products. Being decentralized, CrowdSale records all transaction history on the **VeChain** blockchain network. Cryptocurrency is used for transfer of funds, without the hassle of credit cards.

In a recent paper by MIT technology review, (https://www.technologyreview.com/s/613135/blockchain-powered-marketplaces-will-be-like-steroids-for-crowd-investing/?fbclid=IwAR2AVwY0c9M1o9gQuvYzlK_VB8fBGm1QATh8YBmMhe81d0vW1dEsCeEat0w) the strong potential of marketplaces and crowd concepts with blockchain applications were highlighted.

CrowdSale’s vision is to be the go-to marketplace for online assets. We plan to onboard products from many categories, including media, software keys, e-books, news, freelance services, and many more.

**Features of CrowdSale:**
CrowdSale is a beautifully designed marketplace that provides the option to sell and also to auction products. On CrowdSale, users can easily view all buy and bid history for each product recorded securely on blockchain and make trusted decisions.

In the near future, CrowdSale will take advantage of VeChain's multi-party-payment system to allow either buyer/seller to pay the transaction fees.

**CrowdSale’s Seller Traceability**
You can see a Seller’s history easily with the assurance that it has not been doctored. Furthermore, all sellers must first be approved by the CrowdSale Admin before they can begin selling their products. This adds an additional layer of confidence for the user.

**CrowdSale’s Auction Feature**
The auction seller puts up "x" number of his/her product for sale. Bidders bid for the particular product, and each bid is recorded on the blockchain. Take note that when submitting a bid, the bidder will need to pay the respective number of tokens. When the number of bids equals or exceeds the total number of products available, the seller has the option to finish the Auction. Upon the seller's finish auction confirmation, CrowdSale will send the blockchain tokens of the successful bidders over to the seller, and return the blockchain tokens of the failed bidders back to them.


# How CrowdSale Can Improve and Endorse the VeChain Ecosystem:

CrowdSale is a clear endorsement of the VeChain ecosystem in developing non-trivial decentralized applications. CrowdSale DApp has selected VeChain blockchain because of the many unique features the blockchain offers that is central to its required features. 

CrowdSale is a traiblazer for VeChain in that it has adopted **Connex** as the middle layer, rather than the common web3.js front-end standard.

The Front-End of CrowdSale is developed using *Vue.js* framework, the rising star of front-end frameworks. The highly dynamic Vuex store is used, allowing for asynchronous viewing of products upon making new sale and other data. While most implementation you find online regarding DApps are done with React.js, CrowdSale validates the compatibility of Vue.js framework with VeChain backend smart contracts. This will highly draw the ever-increasing pool of Vue.js frontend developers' interest in the Vechain environment and larger blockchain ecosystem.

The **Multi-party-payment feature** provided by VeChain shall be a key feature of CrowdSale. 

![](https://i.imgur.com/xS0uamv.png)

When making a new sale, the buyer/seller can determine who to pay the transaction fee. In the future this will be further expanded to allow the seller to determine specific percentages of the transaction fee to be paid by the buyer/seller. This helps buyers to make better decisions when making purchases of products.

CrowdSale has specifically selected the VeChain blockchain also because of the unique **transaction dependency/multi-task transactions** features that is available on VeChain.

The multi-task transaction feature is important to CrowdSale because in the auction contract logic. We have an intermediate wallet which is for the product. A bidder submitting a bid (where he has to make a transaction on VeChain) should be independent from the seller finishing the auction. Furthermore, in the logic of finish auction, it is important that the multiple tasks of closing the auction, sending the money to the seller, and returning the money to failed bidders are done in the correct order. The VeChain model helps us to achieve this.


# Technology Summary of CrowdSale:
This app is for crowd sale with both sale and auction functions leveraging VeChain blockchain.

The app consists of a Web App, APIs and Smart contracts. The Web App is implemented using Vue.JS framework, APIs are RESTful APIs using Node.js which integrates with smart contracts using VeChain APIs. The smart contracts are written using Solidity.

The Web App and APIs will be hosted on a trusted platform or a hosting platform, such as Morpheuslabs BPaaS, GoDaddy, and the smart contracts will be running on VeChain MainNet.

All Amount, price and bids referred in this App is based on the blockchain native token. (VET in this case)

### Core Technology Implementations

#### Vue.JS frontend
* Vue, Vuex, Vue Router
* Vuetify Material Component Framework
* Firebase web application development platform (User authentication and authorization)

#### Middle Client API
* Connex 

#### Backend Smart Contracts
* Solidity
* Truffle Framework v4.1.15
* Deployment on VeChain Blockchain
* Sync wallet for testing

### Technical Features of CrowdSale
(Sang)


# UI/UX Features and Walkthrough

CrowdSale web application UI is configured to work well in mobile, tablet and computer displays. Below are some examples showing different pages on different displays.


- Home Page, on 15” computer display.
![](https://i.imgur.com/5tWCmdu.jpg)

- Home Page, on iPhone X screen.
![](https://i.imgur.com/yoMw2up.png)

- Marketplace Page, on iPad Pro screen.
![](https://i.imgur.com/DiX3VKK.png)

## Join and Login
Users should begin exploring CrowdSale by joining with a simple set-up. 
![](https://i.imgur.com/BIPJAJg.png)


The login data is saved on Google’s Firebase web application development platform.
![](https://i.imgur.com/kZRgVfQ.png)

## Request for Sale Authorization
Upon the time of first login, you may need to request for sale authorization so that you can create new sales items in CrowdSale. 

![](https://i.imgur.com/gDIkHRM.png)

Click the REQUEST TO SELL button, fill in the pop-up,
![](https://i.imgur.com/8AmZHcN.png)

The Wallet ID is your Wallet address. Submit the request. The Administrator will sign and approve your request. You are then authorized to sell. Validate it by checking your profile.

![](https://i.imgur.com/NvoLJhq.png)

## Create a New Sale Item
Click the New Sale on the toobar. Toggle the switch to non-auction mode, and fill in the details.
![](https://i.imgur.com/vIEVbCO.png)
Click on "Create New Sale" to submit the sale to the marketplace.

## Create a New Auction Item
Click the New Sale on the toobar. Toggle the switch to auction mode, and fill in the details.
![](https://i.imgur.com/L9QFm8u.png)

Click on "Create New Sale" to submit the sale to the marketplace.

## Viewing Your Sell Items on Marketplace
![](https://i.imgur.com/IZ4DTki.png)

Your items have now been asynchronously added to the marketplace once you add a new sale item or a new auction item. 

A search bar is also implemented to help you to filter for your specific product.

## Purchasing a Non-Auction Product

On the market place page, for the specific item, click on the "View" button and go into the product details.

![](https://i.imgur.com/Qu8A06H.png)

You can key in the number of products you want to buy, and the "total cost" will be shown to you. Copy this total cost, and make a transfer from your wallet to the contract address of the product.
![](https://i.imgur.com/cZlPAWw.png)


## Finishing a Sale
The sale history can be viewed from the product page as below, in a tree-view format.
![](https://i.imgur.com/g9iVJiR.png)
In this case, only buyer *0xd3ae78222beadb038203be21ed5ce7c9b1bff602* has bought the product. The Sale Summary summarises all the transactions.

The seller and only the seller can click on *Finish Sale* to end the sale, preventing further purchases (transferring VET to the wallet) and also sending all the money to his wallet.

![](https://i.imgur.com/VtHPE7m.png)

Sign the authorization... (transfer to seller, which is *wallet 00* here)

![](https://i.imgur.com/aMXXXtG.png)
...And now *wallet 00* is 10,000 VET richer!

The sale is now closed, and the TxId as well as the Signer are displayed for verification purposes.

![](https://i.imgur.com/Eqmz8Eh.png)



## Bidding for an Auction Product
Click on the "View" button and go into the product view page.

![](https://i.imgur.com/gpsi9U0.png)

For auction products, you can only bid for 1 product at a time. Submit your bid to the contract address of the product. A bid will only be submitted if it is higher than the minimum price stated.

![](https://i.imgur.com/GvM9X32.png)


## Finishing an Auction
The auction history can be viewed from the product page as below, in a tree-view format.
![](https://i.imgur.com/jOVFKWQ.png)

In this case, 4 bidders have submitted their bids. An Auction Summary summarises all the transactions.

Now, the seller can determine the bidders that win the auction. He is to select a number of bidders equalling to the number of his products. In this demo case, he selects the first 3 bidders because they have the highest bids.
![](https://i.imgur.com/1uR1vbK.png)



The seller (and only the seller) can click on *Finish Auction* to end the auction, preventing further bids (transferring VET to the wallet) and also sending all the money to his wallet.
![](https://i.imgur.com/VtHPE7m.png)
Sign the authorization... (transfer to seller, which is *wallet 00* here)

The auction is now closed, and the TxId as well as the Signer are displayed for verification purposes.
![](https://i.imgur.com/XcPOTId.png)



# Deployment Procedure
## Deploying CrowdSale dApp on Local Test Node

Linux or Mac OS is recommened for the development setup.

### Prepare development environment
Install the following enablement technology
* Node.js
* Vue-cli (`npm install -g @vue/cli`)a
* python3 and pip3
* Golang
* Truffle v4.1.15 (not v5+ which is in beta)
* Web3-gear
* VeChain thor (https://github.com/vechain/thor#installation)
* VeChain Sync Browser

### Running Blockchain Locally
Run each of the following in a separate shell window.
1. Run thor in solo
    `bin/thor solo --on-demand`
2. Run web3-gear
 `web3-gear`
3. Deploy smart contract on VeChain (Compile is already done) 
    `truffle migrate`

4. Get CrowdSaleFactory contract address and update it in the CrowdSaleFactory.js file `public/client/CrowdSaleFactory.js`

### Launch the CrowSale dApp Locally
```
cd src
npm run serve
```

## Deploying CrowdSale dApp on VeChain MainNet
(Sang)


# Future Add-Ons:
The features below will be added in the near future:

