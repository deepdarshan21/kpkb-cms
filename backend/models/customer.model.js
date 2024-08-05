const validator = require('validator');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the user model. */
const customerSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,   
    },
    pin: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 4,
        validator: [validator.isNumeric, "Only Numaric PINs are allowed"]
    },
    phonenumber : {
        type : String,
        required: true,
    },
    creditAmount: {
        type: Number,
        required: false,
    },
    
    invoiceList: {
        type: [ {type : mongoose.Schema.Types.ObjectId, ref: 'Invoice'} ],
        default: []
    },
    wellfareNo: {
        type: String,
        required: true,
    }

});



module.exports = mongoose.model("Customer", customerSchema);