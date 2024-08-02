
const Customer = require('../models/customer.model');

const updateCustomerDetails = async (res, req) => {
    try {
        const { 
            firstname,
            lastname,
            email,
            pin, 
            phonenumber,
            creditAmount,
            invoiceList,
            wellfareNo,
        } = req.body;

        // find customer if already exits
        const customer = await Customer.findOne({ wellfareNo });

        if (!customer) {
            customer = new Customer({
                firstname,
                lastname,
                email,
                pin,
                phonenumber,
                creditAmount,
                invoiceList,
                wellfareNo,
            })
        } else {
            customer.firstname = firstname;
            customer.lastname = lastname;
            customer.email = email;
            customer.phonenumber = phonenumber;
            customer.pin = pin;
            customer.creditAmount = creditAmount;
            customer.invoiceList = invoiceList;
            customer.wellfareNo = wellfareNo;
        }

        // Create or Update the customer to the database
        const result = await customer.save();

        return res.status(200).json(result);
    } catch(error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

module.exports = {updateCustomerDetails};