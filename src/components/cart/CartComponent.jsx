import React,{useState} from 'react'
import CartItem from '../cartItem/index'
import './CartComponent.css'

const CartComponent = ({cartItem,index,removeItemFromCart,updateCartItems}) => {

    console.log('cart-item',cartItem)
    const{productID,productName,image,price,quantity,type} = cartItem;
    const imgPath = '../assets/product-images/'
    const[qty,setQty] = useState(quantity)
    const[typ,setTyp] = useState(type)
   
    const handleChange = (e) => {
        const{name,value} = e.target;
        if(name === 'quantity')
            setQty(value)
        if(name === 'type'){
            setTyp(value)
        }
           
    }

    return (
        // <div key={index} className="cart-item-wrapper">
        //     <div className="row">
        //         <div className="col-md-3 col-sm-12 text-center cart-item-img-container py-1">
        //             <img src={`${imgPath + image}`}  alt={productName} className="cart-item-img" />
        //             <p className="text-center cart-item-title fw-lighter">{productName}</p>
                   
        //         </div>
        //         <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-around">
        //             <div>
        //                 <span className="cart-item-title">Qty :-</span>
        //                 <input 
        //                 className="text-center" 
        //                 type="number" 
        //                 name="quantity" 
        //                 id="quantity" 
        //                 value={qty} 
        //                 onChange={e => setQty(e.target.value)}/>
        //             </div>
        //             <div>
        //                 <label htmlFor="type" className='cart-item-title'>Type :-</label>
        //                 <select name="type" id="type" className="text-center" value={typ} onChange={e =>setTyp(e.target.value)}>
        //                     <option  value="-1">Select</option>
        //                     <option value="kg">kg</option>
        //                     <option value="box">box</option>
        //                 </select>
        //             </div>
        //             <div>
        //                 <p className='cart-item-title'>Price - ${price * qty}</p>
        //             </div>
        //         </div>
        //         <div className="col-md-3 col-sm-12 d-flex justify-content-evenly my-3">
        //            <i className="fa-solid fa-trash" onClick={() => removeItemFromCart(index)}></i>
        //            <i className="fa-solid fa-pen" onClick={() => updateCartItems(productID,qty,typ)}></i>
        //         </div>
        //     </div>
        // </div>
        <CartItem 
            cartItem = {cartItem}
            removeItemFromCart = {removeItemFromCart}
            updateCartItems = {updateCartItems}
            imgPath = {imgPath}
            qty = {qty}
            typ = {typ}
            index={index}
            handleChange = {handleChange}

        />
    )
}

export default CartComponent