module.exports = function () {
    var productModal = require("../modal/productModal");
  
    this.addProductDao = async (data) => {
        var response = {};
        return new Promise(function (resolve, reject) {
          const productModals = new productModal(data);
          productModals.save(function (error, result) {
            if (error) {
              response.error = true;
            } else {
              response.error = false;
              response.data = result;
            }
            resolve(response);
          });
        });
      };
 
  

  
      this.getProductDao = async (data) => {
        let response = {};
        return new Promise(function (resolve, reject) {
            let sortCriteria = {};
    
            // Set the sorting criteria dynamically
            if (data.sortBy === "price") {
                sortCriteria = { price: 1 }; // Sort by price in ascending order
            } else if (data.sortBy === "rating") {
                sortCriteria = { rating: -1 }; // Sort by rating in descending order
            } else {
                sortCriteria = { price: 1 }; // Default sorting criteria
            }
    
            productModal
                .find() // Retrieve all documents
                .sort(sortCriteria) // Apply the dynamic sorting criteria
                .exec(function (error, result) { // Execute the query and handle the callback
                    if (error) {
                        response.error = true;
                        response.message = "Error fetching and sorting products";
                        console.error("Error finding and sorting products:", error);
                    } else {
                        response.error = false;
                        response.data = result;
                    }
                    resolve(response);
                });
        });
    };
    
      
  };
  