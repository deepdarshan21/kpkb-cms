const mongoose = require("mongoose");
import validator from "validator";

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
        required: true,   
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
    }

});



module.exports = mongoose.model("Customer", customerSchema);