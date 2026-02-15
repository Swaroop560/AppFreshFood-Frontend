import React from 'react'
import CartItemComponent from './CartItemComponent'

const CartItemContainer = ({cartItem,removeItemFromCart,updateCartItems,imgPath,handleChange,qty,typ,index}) => {

    console.log('img path',imgPath)
    console.log('Cart Item',cartItem)
  return (
    <>
        <CartItemComponent
              cartItem={cartItem}
              removeItemFromCart={removeItemFromCart}
              updateCartItems={updateCartItems}
              imgPath={imgPath}
              handleChange={handleChange}
              qty ={qty}
              typ={typ}
              index={index}
        />
    </>
    
  )
}

export default CartItemContainer