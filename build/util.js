const obj = {

}
exports.setLoader = function (isProd, plugin) {
    if (isProd) {
        plugin && plugin()
    } else {

    }
}