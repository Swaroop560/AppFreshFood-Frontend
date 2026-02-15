import React,{useState,useEffect} from 'react'
import CartItem from '../cartItem/index'

import './StandingOrderComponent.css'

const StandingOrderComponent = ({sorders,imgPath,deleteStandingOrder,updateStandingOrder,handleChange,qty,typ}) => {

  
  return (
    <>
        {
            sorders && sorders.map((sorder,index) => <CartItem 
                key ={index}
                cartItem ={sorder}
                removeItemFromCart={deleteStandingOrder}
                updateCartItems={updateStandingOrder}
                imgPath={imgPath}
                handleChange={handleChange}
                qty ={qty}
                typ={typ}
                index={index}
            />)
        }
    </>
    
  )
}

export default StandingOrderComponent