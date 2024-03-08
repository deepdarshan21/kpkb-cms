import React, {useEffect, useState} from 'react';
import './AddInvoice.css';
import {initialState} from './initialState';
import DeleteIcon from '@mui/icons-material/Delete';

const AddNewInvoice = () => {
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [incInvoiceID, setIncInvoiceID] = useState(false);
  const [totalChange, setTotalChange] = useState(false);
  
  const handleInputChange = async(event, index, fieldName) => {
    const { value } = event.target;
    const updatedItemList = [...invoiceData.itemList];
    updatedItemList[index] = {
      ...updatedItemList[index],
      [fieldName]: value,
    };
    if (fieldName === 'quantity' || fieldName === 'rate' || fieldName === 'gst') {
      const quantity = parseFloat(updatedItemList[index].quantity);
      const rate = parseFloat(updatedItemList[index].rate);
      const gst = parseFloat(updatedItemList[index].gst);
      const amount = (quantity * rate) + ((quantity * rate) * gst) / 100;
      updatedItemList[index].amount = amount;
    }
  
    setInvoiceData({
      ...invoiceData,
      itemList: updatedItemList
    });
    setTotalChange(true);
  };

  const handleInputChangeCust = async(event, fieldName) => {
    const { value } = event.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [fieldName] : value,
    }));
    setTotalChange(true);
  };

  useEffect(()=>{
    const arr = invoiceData.itemList;
    var subTotal = 0;
    for(var i=0; i<arr.length; i++){
      subTotal = subTotal + arr[i].amount;
    }
    invoiceData.totalAmount = subTotal - (subTotal*invoiceData.discount)/100;
    setTotalChange(false);
  }, [totalChange])

  const handleAddField = (e) => {
    e.preventDefault()
    setInvoiceData((prevState) => ({...prevState, itemList: [...prevState.itemList,  {itemName: '', quantity:0, rate:0, discount:0,gst:0, amount:0}]}))
  }

  const handleDeleteRow = (index) => {
    setInvoiceData((prevData) => {
      const updatedItemList = [...prevData.itemList];
      updatedItemList.splice(index, 1);
      return {
        itemList: updatedItemList,
      };
    });
  };

  const addInvoice = () => {
      fetch("http://localhost:5050/api/invoice/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      })
        .then((result) => {
          alert("Invoice ADDED");
          setInvoiceData(initialState);
        })
        .then(()=>{
          setIncInvoiceID(true);
        })
        .catch((err) => console.log(err));
    };

    const getInvoiceCount = async() =>{
      fetch(`http://localhost:5050/api/invoice/count/${invoiceData.userID}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(response => {
          if(!response.ok){
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.count);
          setInvoiceData({...invoiceData, invoiceID: data.count})
        })
        .catch(error => {
          console.log('There was a problem with the fetch operation:', error);
        })
    }
    useEffect(() => {
      // if(incInvoiceID){
        getInvoiceCount(invoiceData.userID)
        .then(() => setIncInvoiceID(false))
      // }
      
    },[incInvoiceID, invoiceData.userID]);

    return (
      <>
        <div className="customer-details">
          <table id="customerTable">
            <tbody>
              <tr>
                <td className="input-box"><input type="text" value={invoiceData.customerName} onChange={(e) => handleInputChangeCust(e, 'customerName')} placeholder='Customer Name' /></td>
                <td className="input-box">InvoiceID : {invoiceData.invoiceID}</td>
              </tr>
              <tr>
                <td className="input-box"><input type="text" value={invoiceData.customerEmail} onChange={(e) => handleInputChangeCust(e, 'customerEmail')} placeholder='Customer Email' /></td>
                <td className="input-box"><input type="text" value={invoiceData.phoneNo} onChange={(e) => handleInputChangeCust(e, 'phoneNo')} placeholder='Customer Phone No' /></td>
              </tr>
            </tbody>
          </table>
        </div>
      <div className="main-container">
      <div className='itemListContainer'>
    <table id="invoiceTable">
      <thead>
        <tr class="headers">
          <th>ITEM DETAILS</th>
          <th>QUANTITY</th>
          <th>RATE</th>
          <th>GST</th>
          <th>AMOUNT</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
      {invoiceData.itemList.map((item, index) => (
        <tr key={index}>
          <td><input type="text" value={item.itemName} onChange={(e) => handleInputChange(e, index, 'itemName')} placeholder='Item Name'/></td>
          <td><input type="number" value={item.quantity} onChange={(e) => handleInputChange(e, index, 'quantity')} placeholder='Quantity'/></td>
          <td><input type="number" value={item.rate} onChange={(e) => handleInputChange(e, index, 'rate')} placeholder='Price/unit'/></td>
          <td><input type="number" value={item.gst} onChange={(e) => handleInputChange(e, index, 'gst')} placeholder='GST (%)'/></td>
          <td><input type="false" value={(item.quantity * item.rate) + ((item.quantity * item.rate) * item.gst) / 100} onChange={(e) => handleInputChange(e, index, 'amount')} placeholder='Amount'/></td>

          <td>
              <DeleteIcon
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => handleDeleteRow(index)}
              />
            </td>
        </tr>
      ))}

      </tbody>
    </table>
      <button id="add-new-item" type = "button" onClick={handleAddField}> <strong> Add New Row </strong> </button>
      <button id="generate-bill-button" type = "button" onClick={addInvoice}> <strong> Generate Bill </strong> </button>
      <table className='totalAmt'>
        <tr>
          <td>Discount: <input type="number" value={invoiceData.discount} onChange={(e) => handleInputChangeCust(e, 'discount')} placeholder='Discount (%)'/></td>
          <td className="total-amt-box">Total Amount: {invoiceData.totalAmount}</td>
        </tr>
      </table>
    </div>
    </div>
    </>
    )
}

export default AddNewInvoice