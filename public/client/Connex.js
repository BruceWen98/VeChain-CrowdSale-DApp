"use strict"

const Connex = function () {
}

Connex.prototype.init = function () {
    if(!window.connex) {
        location.href = 'https://env.vechain.org/r/#' + encodeURIComponent(location.href)
    }
    
    this.signingService = connex.vendor.sign('tx');
}

Connex.prototype.sendRequest = function (clause) {
    return this.signingService.request([clause])
}
Connex.prototype.getMethod = function(name) {
    return connex.thor.account(this.address).method(this.namedABI.get(name));
}

Connex.prototype.invoke = function (methodName, args) {
    let method = this.getMethod(methodName);
    if(!method) throw new Error("method does not exist");

    return args?method.call.apply(method, Array.from(args)): method.call();
}

Connex.prototype.signInvoke = function (methodName, args) {
    let method = this.getMethod(methodName)
    if(!method) throw new Error("method does not exist");
    const clause = args?method.asClause.apply(method, Array.from(args)): method.asClause();
    return this.sendRequest(clause);
}