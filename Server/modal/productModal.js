const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    e_commerce_company: {
        type: String,
        required: true,
    },
    thumbnail_url: {
        type: String,
        required: true,
    },
    image_url: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: true,
    },
  

})

const productModal = mongoose.model('product', productSchema)
module.exports = productModal