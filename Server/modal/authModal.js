const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const authSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
  

})

const authModal = mongoose.model('role', authSchema)
module.exports = authModal