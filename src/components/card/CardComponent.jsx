import React from 'react'
import './CardComponent.css'

const CardComponent = ({order,index,orderid}) => {

  const{productName,image,qty,type,unitPrice,subTotal} = order
  const imgPath = '../assets/product-images/'

  return (
    <>
    
           
      <div className="card-container d-grid gap-2">
          <div className="row">
              <div class="col text-center my-auto">
                <img src={`${imgPath + image}`} alt={productName} className="card-img " />
                <p className="card-title text-center">{productName}</p>
                <p className="card-title text-center text-info"><i>orderid-</i>{orderid}</p>
              </div>
              <div className="col-6">
                  <table border="1">
                      <tr>
                          <td colSpan={2} className="text-center ">
                                <label className='card-text'>Qty</label>
                                <input type="number" name="qty" id="quantity" value={qty} />
                          </td>
                      </tr>
                      <tr>
                        <td colspan={2} className='text-center'>
                        <label className='card-text'>Type</label>
                        <select id="type" name="qty" value={type}>
                                <option value="-1">Select</option>
                                <option value="kg">kg</option>
                                <option value="box">box</option>
                            </select>
                        </td>
                      </tr>
                      <tr>
                          <td colSpan={2} className='text-center'>
                          <label className='card-text'>Price:</label> 
                          <p className="card-text text-warning text-center"> ${unitPrice}</p>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan={2} className='text-center'>
                          SubTotal : <p className="card-text text-danger text-center">{subTotal}</p>
                          </td>
                      </tr>
                  </table>
              </div>
              <div className="col">
                  3 of 3
              </div>
          </div>
      </div>
      </>
  )
}

export default CardComponent

{/* 
    <div key={index} className="card">
    <img src={image} alt={productName} className="card-img-top" />
    <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text">Price: ${unitPrice}</p>
        <p className="card-text">Quantity: {quantity}</p>
        <p className="card-text">SubTotal : {subTotal}</p>
    </div>
    </div> 
*/}


