import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom'
import CartComponent from './CartComponent'
import {useCart} from '../../context/Cart'
import { useAuth } from '../../context/Auth'
import { createSupplierOrder } from '../../services/orderService'
import './CartComponent.css'

const CartContainer = () => {

  const navigate = useNavigate()
  const {cartItems,removeFromCart,updateCart,clearCart} = useCart()
 // const{_id,productName,image,price,quantity,type} = cartItems
  const{userId} = useAuth()
  const[quantity,setQuantity] = useState(0)
  const[type,setType] = useState('')
  const[isChecked,setIsChecked] = useState(false)
  const[currentDate,setCurrentDate] = useState(new Date().toLocaleDateString('fr-CA'))
  const[deliveryDate,setdeliveryDate] = useState(new Date().toLocaleDateString('fr-CA'))

  const removeItemFromCart = (id,index) => {
    removeFromCart(index)
  }

  const handleCartChange = (e) => {
    const{name,value} = e.target;
    if(name === 'quantity'){
        let qty = value;
        setQuantity(value)
    }  
    if(name === type){
        let typ = value;
        setType(value) 
    }

  }

  const updateCartItems = (id,quantity,type,price) =>{
    if(quantity && type){
        const cart_edit_status =  updateCart(id,quantity,type,parseInt(price))
        if(cart_edit_status)
            alert('Cart updated Successfully')
    }
       
  }
  const handleDateChange = (e) => {
    console.log(e.target.value)
    setdeliveryDate(e.target.value)
  }
  const price =  cartItems.reduce((a,b) => a + b.total,0 )

  const goToProducts = () => {
        navigate('/supplier')
  }
  const placeOrder = async (cartItems) => {
    console.log('Cart Items', cartItems);
    let traderCodes = new Set();
    let deliveryDates = new Set();
    let grandTotal = 0;
  
    const groupedOrders = cartItems.reduce((acc, item) => {
      const { productId, productName, image, traderCode, quantity, type, price, delivery } = item;
      const unit_price = type.split('$');
  
      traderCodes.add(traderCode);
      deliveryDates.add(delivery);
  
      grandTotal = price * parseInt(quantity);
  
      if (!acc[traderCode]) {
        acc[traderCode] = {
          traderCode: traderCode,
          deliveryDate: delivery,
          orderItems: []
        };
      }
  
      acc[traderCode].orderItems.push({
        prodID: productId,
        productName: productName,
        image: image,
        qty: parseInt(quantity),
        type: type,
        unitPrice: price,
        subTotal: price * parseInt(quantity)
      });
  
      return acc;
    }, {});
  
    const supplierOrderArr = [];
  
    for (const traderCode in groupedOrders) {
      if (Object.hasOwnProperty.call(groupedOrders, traderCode)) {
        const order = groupedOrders[traderCode];
        supplierOrderArr.push({
          userID: userId,
          orderedDate: currentDate,
          deliveryDate: deliveryDates.has(order.deliveryDate) ? order.deliveryDate : null,
          grandTotal: grandTotal,
          amountPaid: 0,
          discount: 0,
          orderAccepted: false,
          traderCode: traderCode,
          orderItems: order.orderItems
        });
      }
    }
  
    for (const supplierOrderObj of supplierOrderArr) {
      const { status, data } = await createSupplierOrder(supplierOrderObj);
  
      if (status) {
        alert('Order Created Successfully');
        clearCart();
      }
    }
  }
  
  const placeOrder2 = async (cartItems) => {

    console.log('Cart Items', cartItems);
    let traderCodes = new Set();
    let deliveryDates = new Set();
    let grandTotal = 0;
  
    const groupedOrders = cartItems.reduce((acc, item) => {
      const { productId, productName, image, traderCode, quantity, type, price, delivery } = item;
      const unit_price = type.split('$');
  
      traderCodes.add(traderCode); 
      deliveryDates.add(delivery);
  
      grandTotal += price * parseInt(quantity);
  
      if (!acc[traderCode]) {
        acc[traderCode] = {
          traderCode: traderCode,
          deliveryDate: delivery,
          orderItems: []
        };
      }
  
      acc[traderCode].orderItems.push({
        prodID: productId,
        productName: productName,
        image: image,
        qty: parseInt(quantity),
        type: type,
        unitPrice: price,
        subTotal: price * parseInt(quantity)
      });
  
      return acc;
    }, {});
  
    const supplierOrderArr = [];
  
    for (const traderCode of traderCodes) {

      const traderInfo = traderCodes.get(traderCode)
      
      supplierOrderArr.push({
        userID: userId,
        orderedDate: currentDate,
        deliveryDate: deliveryDates.has(traderInfo.deliveryDate) ? traderInfo.deliveryDate : null,
        grandTotal: grandTotal,
        amountPaid: 0,
        discount: 0,
        orderAccepted: false,
        traderCode: traderCode,
        orderItems: groupedOrders[traderCode].orderItems
      });
    }
  
    for (const supplierOrderObj of supplierOrderArr) {
      const { status, data } = await createSupplierOrder(supplierOrderObj);
  
      if (status) {
        alert('Order Created Successfully');
        clearCart();
      }else{
        alert('Create Order Failed')
      }
    }
  }
  
  
  const placeOrder1 = async(cartItems) => {

    console.log('Cart Items', cartItems)
    let trader_code;
    let delivery_date;
    const orderItemsArr = cartItems.map((item) =>{
        const{productId,productName,image,traderCode,quantity,type,price,delivery} = item
        let unit_price = type.split('$')
      
        trader_code = traderCode;
        delivery_date = delivery;
        return {
              "prodID":productId,
              "productName":productName,
              "image":image,
              "qty":parseInt(quantity),
              "type":type,
              "unitPrice":price,
              // delivery,
              "subTotal":price * parseInt(quantity)
          }
    })

   const supplierOrderObj =  {
       "userID": userId,
       "orderedDate": currentDate,
       "deliveryDate": delivery_date,
       "grandTotal": price,
       "amountPaid": 0,
       "discount": 0,
       "orderAccepted": false,
       "traderCode": trader_code,
       "orderItems": orderItemsArr
    }

    const {status,data} = await createSupplierOrder(supplierOrderObj)

    if(status){
        alert('Order Created Successfully')
        clearCart()
    }else{
      alert('Create Order Failed')
    }
        
  }

  return (
      <>
          <div className='container-fluid my-3'>
            <div className='wrapper'>
              <div className='row'>
                  <div className='col-md-7 col-sm-12 d-grid gap-1'>
                          <div>
                              {
                                  cartItems.length > 0 && cartItems.map((item, idx) => <div className='cart-wrapper' key={idx}>
                                      <CartComponent 
                                        cartItem={item} 
                                        index={idx} 
                                        updateCartItems = {updateCartItems}
                                        removeItemFromCart={removeItemFromCart} 
                                        handleCartChange={handleCartChange}/>
                                  </div>)
                              }
                          </div>
                          <div className="text-center">
                              <button 
                                onClick={goToProducts}
                                className="btn btn-sm btn-info">ShopMore</button>
                          </div>

                  </div>
                  <div className='col-md-5 col-sm-12 cart-total border-start border-warning'>
                        <div className="row">
                            <div className="col-md-12">
                              <h6 className='text-center my-3'>Cart Total</h6>
                            </div>
                        </div>
                        <div className="row">
                              <div className="col-md-12">
                                  <div className='text-center my-2'>
                                  {
                                    cartItems.length > 0 && cartItems.map((i, idx) => <span key={idx}>{idx + 1}.{i.productName} <br /></span>)
                                  }
                                  </div>
                             </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                              <p className='text-center'>Total Bill - ${price}</p>
                            </div>
                        </div> 
                        {/* <div className="row my-2">
                             <div className="col-md-12 text-center">
                              <input
                                type="date"
                                name="calender"
                                id="calender"
                                min={new Date().toLocaleDateString('fr-CA')}
                                value={deliveryDate}
                                onChange={handleDateChange} />
                             </div>
                        </div> */}
                        <div className="text-center">
                            <button 
                                onClick={() => placeOrder(cartItems)}
                                className="btn btn-sm btn-success">CheckOut</button>   
                        </div>
                        
                  </div>
              </div>
              </div>
          </div>
      </>
  )
}

export default CartContainer