module.exports = function () {
    var productDao = require('../dao/productDao.js')
    require("../utils/common.js")()
  
    require('dotenv').config()
    var productDaoObject = new productDao()
  
  
    this.addProductService = (userData) => {

        return new Promise(async function (resolve) {
          var response = {};
          try {
            
              var productData = await productDaoObject.addProductDao(userData);
              if (productData.error == false) {
                response.error = false;
                response.status = "success";
                response.message = "Product  Added Successfully ..!";
                resolve(response);
              } else {
                response.error = true;
                response.status = "failure";
                response.message = "Submission Failed";
                resolve(response);
              }
           
          } catch (error) {
            console.log(error);
            response.error = true;
            response.status = "failure";
            response.message = "OOPS Service Error";
            resolve(response);
          }
        });
    };
  
    this.getProductService = (queryParams) => {

        return new Promise(async function (resolve) {
          var response = {};
          try {
              var productData = await productDaoObject.getProductDao(queryParams);
              if (productData.error == false) {
                response.error = false;
                response.status = "success";
                response.data = productData.data
                resolve(response);
              } else {
                response.error = true;
                response.status = "failure";
                response.message = "Creation Failed";
                resolve(response);
              }
          } catch (error) {
            console.log(error);
            response.error = true;
            response.status = "failure";
            response.message = "OOPS Service Error";
            resolve(response);
          }
        });
    };
  }
  