<template>
<v-btn @click="submit">hi</v-btn>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\
<script src="lib/bignumber.min.js"></script>
<script>
function registerSeller() {
    let sellerName = "Seller";
    let sellerID = "SellerID";
    let wallet = "0x733b7269443c70de16bbf9b0615307884bcc5636";
    let seller = "0x733b7269443c70de16bbf9b0615307884bcc5636";

    window.CSF.registerSeller(sellerName, sellerID, wallet, seller).then(output => {
        console.log(output);
        log(output);
    })
}

export default {
    data() {

    },
    methods: {
        submit() {
            registerSeller()
        }
    }
}
</script>

<style>

</style>
