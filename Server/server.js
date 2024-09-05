const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app=express();
require('dotenv').config()
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({
    limit: '2mb',
    extended: true
}))

const mongoose = require('./config/dbConfig')
const { check, validationResult } = require('express-validator')
const validator = {}
validator.check = check
validator.validation = validationResult

require('./routes/authRoutes')(app,validator)
require('./routes/productRoutes')(app,validator)
require('./routes/uploadRoutes')(app,validator)




port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`listening in port ${port}`)
})