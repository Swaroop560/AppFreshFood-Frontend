import React from 'react'

const InvoiceComponent = ({id,order,orderItems,userName,toggleInvoice}) => {
    const {grandTotal,orderedDate,deliveryDate} = order;
  return (
    <div className="container invoice text-center my-3 border rounded p-3">
      <h2>Invoice</h2>
      <div className="invoice-details my-3">
        <div>Order ID: {id}</div>
        <div>Order Date: {orderedDate}</div>
        <div>Delivery Date: {deliveryDate}</div>
        <div>Customer Name: {userName}</div>
      </div>
      <table className="table table-bordered container invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.qty}</td>
              <td>${item.unitPrice}</td>
              <td>${item.qty * item.unitPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="invoice-total">Total: ${grandTotal}</div>
      <div>
        <a href="#" onClick={toggleInvoice}>Back to Invoices</a>
      </div>
    </div>
  )
}

export default InvoiceComponent