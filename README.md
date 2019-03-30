# Deploy Process
Deploying Backend on local test node:
1. run thor solo mode with command `bin/thor solo --on-demand`
2. run web3-gear `web3-gear`
3. deploy smart contract on VeChain `truffle migrate` within <vechain-backend> folder
4. get CrowdSaleFactory contract address and change <const address> in the CrowdSaleFactory.js file (public>client>CrowdSaleFactory.js)

Deploying Frontend on local test node:
1. Go into <src> folder and run command `npm run serve` 


# TODO
- Why new product is not updated in view, must refresh?
- getproductlist return output is not truly async, to resolve the problem we setTimeout() to bypass

