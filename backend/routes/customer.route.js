const express = require("express");
const app = express();
const updateCustomer = require("../controllers/updateCustomer.controller.js");
const authenticateCustomer = require("../controllers/authenticateCustomer.controller.js")

app.post("/add", updateCustomer.updateCustomerDetails);
app.post("/verify", authenticateCustomer.authenticateCustomer);

module.exports = app;
