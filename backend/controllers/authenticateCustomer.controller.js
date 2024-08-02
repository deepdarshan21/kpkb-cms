
const Customer = require("../models/customer.model");


const authenticateCustomer = async (req, res) => {
    const {wellfareNo, pin} = req.body;

    try {
        //  find customer by wellfareNo.
        const customer = await Customer.findOne({ wellfareNo });

        if(!customer) {
            return res.status(404).json({ error: 'User Not Exits' });
        }
        
        if(customer.pin == customer){
            return res.status(200).json("customer")
        } else {
            return res.status(401).json("Incorrect Pin")
        }
    } catch (error){
        console.log(error);
        return res.status(500).send(error.message);
    }

}

const getUserDetails = async (req, res) => {
    try{
        const {wellfareNo} = req.body;

        const customer = await Customer.findOne({ wellfareNo });

        if(!customer){
            return res.send(401).json({error: "User Not Exits"});
        }

        return res.send(200).json(customer);
        
    } catch(err){
        console.log(err);
        return res.status(500).send(err.message);
    }


}

module.exports = {
    authenticateCustomer,
    getUserDetails,
};