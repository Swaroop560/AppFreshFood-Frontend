import React from 'react'

const CartItemComponent = ({cartItem,removeItemFromCart,updateCartItems,imgPath,handleChange,qty,typ,index}) => {

    const{_id,productId,productName,image,quantity,type,price} = cartItem;
    // let price = typ.split('$') ?? 0;
    // const{box,tray,number,kg} = productInfo;

  return (
      <div key={index} className="cart-item-wrapper my-3">
          <div className="row">
              <div className="col-md-3 col-sm-12 text-center cart-item-img-container py-1">
                  <img src={`${imgPath + image}`} alt={productName} className="cart-item-img" />
                  <p className="text-center cart-item-title fw-lighter">{productName}</p>
              </div>
              <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-around">
                  <div>
                      <span className="cart-item-title">Qty :-</span>
                      <input
                          className="text-center"
                          type="number"
                          name="quantity"
                          id="quantity"
                          value={qty}
                          onChange={e => handleChange(e)} />
                  </div>
                  <div>
                      <label htmlFor="type" className='cart-item-title'>Type :- {typ}</label>
                      
                      {/* <select name="type" id="type" className="text-center" value={type} onChange={e => handleChange(e)}>
                          <option value="-1">Select</option>
                          <option value="box">Box</option>
                          <option value="tray">Tray</option>
                          <option value="kg">Kg</option>
                          <option value="number">Number</option>
                      </select> */}
                  </div>
                  <div>
                      <p className='cart-item-title'>Price - ${price}</p> 
                     
                  </div>
              </div>
              <div className="col-md-3 col-sm-12 d-flex justify-content-evenly my-3">
                  <i className="fa-solid fa-trash" onClick={() => removeItemFromCart(_id,index)}></i>
                  <i className="fa-solid fa-pen" onClick={() => updateCartItems(productId,qty,typ,price)}></i>
              </div>
          </div>
      </div>
  )
}

export default CartItemComponent