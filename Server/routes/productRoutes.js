module.exports = function (app, validator) {

    var productController = require("../controller/productController");
    require("dotenv").config();
    var productControllerObject = new productController();
  
    app.post(  "/product", [
        
    ], function (request, response) {

        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, function (message) {
                response.send(message)
            })
        } else {
            productControllerObject.addProductController(request.body, function (message) {
                return response.send(message)
            })
        }
    })
  
  app.post('/getProduct', [
    
  ], function (request, response) {
    var error = validator.validation(request)
    if (error.array().length) {
        this.requestHandler(error.array(), true, function (message) {
            response.send(message)
        })
    } else {
        productControllerObject.getProductController(request.body, function (message) {
            return response.send(message)
        })
    }
  })
  };
  