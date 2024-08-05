import React from 'react';
import './Invoice.css';
import AddNewInvoice from './components/Invoice/AddInvoice';
import AuthContext from "./AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Navbar from './Navbar';
import './CreateCard.css';

const CreateCard = () => {

    const [formData, setFormData] = React.useState({
        welfareId: '',
        firstName: '',
        lastName: '',
        payLevel: '',
        pin: '',
        phoneNumber: ''
    });
  
    const auth = useContext(AuthContext);
    // if (!auth.user) {
    //   return <Navigate to="/" replace />;
    // }

   

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        switch (name) {
            case 'firstName':
            case 'lastName':
                // Allow only alphabets
                if (!/^[a-zA-Z\s]*$/.test(value)) {
                    return; // Exit if the value is not valid
                }
                break;
            case 'payLevel':
                // Ensure the value is between 1 and 17
                if (value < 1 || value > 17) {
                    return; // Exit if the value is not valid
                }
                break;
            case 'pin':
                // Ensure the value is a 4-digit number
                if (!/^\d{0,4}$/.test(value)) {
                    return; // Exit if the value is not valid
                }
                break;
            case 'phoneNumber':
                // Ensure the value is a 10-digit number
                if (!/^\d{0,10}$/.test(value)) {
                    return; // Exit if the value is not valid
                }
                break;
            case 'welfareId':
                // Ensure the value is a 5-digit number
                if (!/^\d{0,5}$/.test(value)) {
                    return; // Exit if the value is not valid
                }
                break;
            default:
                break;
        }
    
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleNumberInputEvents = (e) => {
        if (e.target.type === 'number') {
            e.preventDefault();
        }
    };
    return (
    <div className="wrapper">
      <Navbar/>
      <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="welfareId">Welfare ID:</label>
                <input
                    type='text'
                    id="welfareId"
                    name="welfareId"
                    value={formData.welfareId}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="payLevel">Pay Level:</label>
                <input
                    type="text"
                    id="payLevel"
                    name="payLevel"
                    value={formData.payLevel}
                    onChange={handleChange}
                    max="16"
                    min="0"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="pin">PIN:</label>
                <input
                    type="text"
                    id="pin"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    maxLength="4"
                    minLength="4"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                />
            </div>

            <button type="submit" className="submit-button">Submit</button>
        </form>
    </div>
  );
}

export default CreateCard;
