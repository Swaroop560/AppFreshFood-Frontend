import React from 'react'
import './CartModalComponent'
import CartModalComponent from './CartModalComponent'

const CartModalContainer = ({
    addCart,type,handleChange,quantity,cartFlag,sorderFlag,prodInfo,toggleModal,handleCheckboxChange,deliveryDate}) => {

      console.log('product Info',prodInfo)
  return (
    <CartModalComponent
        addCart = {addCart} 
        type={type}
        handleChange = {handleChange}
        quantity = {quantity}
        cartFlag = {cartFlag}
        sorderFlag={sorderFlag}
        prodInfo = {prodInfo}
        toggleModal={toggleModal}
        handleCheckboxChange={handleCheckboxChange}
        deliveryDate={deliveryDate}
    />
  )
}

export default CartModalContainer