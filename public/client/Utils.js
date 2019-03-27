"use strict"

const Util = {};
const DECIMALS = 18;
const BASE_DECIMALS = new BigNumber(10).exponentiatedBy(DECIMALS);

Util.applyFunction = function (obj, abi) {
    abi.forEach(method => {
        if(method.type == "function") {
            obj.namedABI.set(method.name, method);
            let f;
            let body = "if(arguments.callee.arg_length != Array.from(arguments).length) {";
                body += "let error = Util.sprintf('Incorrect input parameters expected {0}, actual {1} - {2}', arguments.callee.arg_length, Array.from(arguments).length,JSON.stringify(arguments.callee.args));";
                body += "throw Error(error);}";
            if(method.constant) {
                body += "return this.invoke(arguments.callee.displayName, arguments)";
                f = new Function(body);
            } else {
                body += "return this.signInvoke(arguments.callee.displayName, arguments)";
                f = new Function(body);
            }
            
            f.displayName= method.name; 
            f.arg_length = method.inputs.length;
            f.args = method.inputs;
            obj.__proto__[method.name] = f;
        }
    });
    // console.log(obj.constructor.name, "Exposed functions:");
    // console.log(obj.namedABI.forEach(method=>console.log(method.name)));
    // console.log("Detail",obj.namedABI);
}

// Inhertit to make relationship between to object
// A is child object
// B is super object
// A contain .superclass_ to access the function of B
//           .constructor to access to itself and implement the new function
Util.inherit = function (a, b) {
    function c() {}
    a || error("Inherit - child undefined!");
    b || error("Inherit - parent undefined!");
    var d = a.prototype;
    c.prototype = b.prototype;
    a.prototype = new c;
    for (var e = (Object.getOwnPropertyNames(d)), f = 0; f < e.length; f++) {
        if (d.hasOwnProperty(e[f])) {
	        var i = Object.getOwnPropertyDescriptor(d, e[f]);
	        Object.defineProperty(a.prototype, e[f], i);
    }
    }
    a.prototype.constructor = a;
    a.superclass_ = b.prototype;
};

// extend to make b extend c
// b will got all the properties and functions of c
Util.extend = function hb(b, c, d) {
    b || error("Extend - class undefined!");
    c || error("Extend - trait undefined!");
    var e = c,
        f = d ? b : b.prototype;
    c.prototype && hb(b, c.prototype, d);
    for (var i in e)(b = Object.getOwnPropertyDescriptor(e, i)) && Object.defineProperty(f, i, b)
};

Util.sprintf = function () {
    for (var a = arguments[0], b = 1; b < arguments.length; b++){
    	a = a.replaceAll("{" + (b - 1) + "}", arguments[b]);
    }
    return a
};
String.prototype.replaceAll = function(
	strTarget, // The substring you want to replace
	strSubString // The string you want to replace in.
	){
	var strText = this;
	var intIndexOfMatch = strText.indexOf( strTarget );
	 
	// Keep looping while an instance of the target string
	// still exists in the string.
	while (intIndexOfMatch != -1){
	// Relace out the current instance.
	strText = strText.replace( strTarget, strSubString )
	 
	// Get the index of any next matching substring.
	intIndexOfMatch = strText.indexOf( strTarget );
	}
	 
	// Return the updated string with ALL the target strings
	// replaced out with the new substring.
	return( strText );
}

Util.weiToNumber = function (wei, fixed = DECIMALS) {
    return new BigNumber(wei).dividedBy(BASE_DECIMALS).toFixed(fixed);
}
Util.numberToWei = function (number) {
    return BASE_DECIMALS.multipliedBy(number);
}

Util.convertProduct = function(onChain, offChain = {}) {
    // productId,
    // sellerId,
    // productName, 
    // description, 
    // productCategory,
    // auction,
    // productAmount,
    // numberSold
    offChain.productId = onChain[0];
    offChain.sellerId = onChain[1];
    offChain.productName = onChain[2];
    offChain.description = onChain[3];
    offChain.productCategory = onChain[4];
    offChain.auction = onChain[5];
    offChain.productAmount = onChain[6];
    offChain.numberSold = onChain[7];

    return offChain;
} 