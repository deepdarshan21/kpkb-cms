// authController.js
const Canteen = require('../models/canteen.model'); // Assuming the User model is defined in this file
const bcrypt = require('bcrypt');
const fixedSalt = '$2b$10$abcdefghijklmnopqrstuv';
let userAuthCheck = null;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //console.log("hii")
  try {
    // Find the user by email
    const user = await Canteen.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      userAuthCheck = null;
      return res.status(401).json({ error: 'Invalid Credentials' });      
    }
    else{
      return res.status(200).json(user);
    }

    // Password is correct, you can proceed with authentication or generate a token
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


const getUserDetails = (req, res) => {
  res.send(userAuthCheck);
};

module.exports = {
  loginUser,
  getUserDetails,
};
