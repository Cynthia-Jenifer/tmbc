module.exports = function () {
    var productService = require('../service/productServices')
    var productServiceObject = new productService()

    this.addProductController = async (req, callback) => {


        var response = {}
        var product = await productServiceObject.addProductService(req)
        if (product.error == true) {
            response.error = true
            response.status = product.status
            response.message = product.message
            response.token = product.token
            response.result = product.result
        } else {
            response.error = false
            response.status = product.status
            response.message = product.message
            response.token = product.token
        }
        callback(response)
    }
    this.getProductController = async (req, callback) => {
        var response = {}
        var product = await productServiceObject.getProductService(req)
        if (product.error == true) {
            response.error = true
            response.status = "failure"
            response.message = product.message
        } else {
            response.error = false
            response.status = "success"
            response.message = product.message
            response.data = product.data
            response.token = product.token
          }
        callback(response)
    }
}