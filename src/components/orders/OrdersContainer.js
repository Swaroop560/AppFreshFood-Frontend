import React,{useEffect,useState} from 'react'
import OrdersComponent from './OrdersComponent'
import Switch from '../switch'
import { useAuth } from '../../context/Auth'
import { getOrders,getTraderOrders,updateOrderItem,acceptOrder } from '../../services/orderService'
import './OrderComponent.css'

const OrdersContainer = () => {

  const{userId,code} = useAuth();
  const[orders,setOrders] = useState([])
  const[status,setStatus] = useState(false)
  const[isEditing,setIsEditing] = useState([])
  const[editedItem,setEditedItem] = useState(-1)

  const[orderUpdate,setOrderUpdate] = useState({})
  const role = localStorage.getItem('userRole');
  useEffect(() =>{
        async function fetchOrders(){
           if(role === 'Trader'){
              const {status,data} = await getTraderOrders(code)
              if(status){
                const newOrders = data.map((item,indx) =>{
                  const{orderItems} = item;

                  for(let orderItem in orderItems){
                    console.log('orderItem',orderItem)
                    let newOrderItem = {...orderItems[orderItem],editing:false}
                     orderItems[orderItem] = newOrderItem;
                  }
                  return {...item,orderItems}
                  
                })
                setOrders([...newOrders])
              }
             
           }
           if(role === 'Supplier'){
              const {status,data} = await getOrders(userId)
              if(status)
                  setOrders([...data])
           }
           
        }
        fetchOrders()

        return() =>{

        }
  },[status])

  const handleOrdersSwitch = (state) => {
      setStatus(state)
  }
  const handleOrderChange = (e,unitPrice) => {
    const{name,value} = e.target;
    if(name === 'quantity')
      setOrderUpdate({...orderUpdate,subtotal:(parseInt(value) * unitPrice),[name]:value})
    else
    setOrderUpdate({...orderUpdate,[name]:value})
  }
  const handleOrderUpdate = (index,unitPrice) => {
      // setEditedItem(index)
      setOrderUpdate({...orderUpdate,subtotal:(parseInt(orderUpdate.quantity) * unitPrice)})
      console.log('order object',orderUpdate)
  }

const handleOrderUpdateChange = (e, orderIndex, itemIndex, unitPrice) => {
  const { name, value } = e.target;
  setOrderUpdate(prevState => ({
      ...prevState,
      [orderIndex]: {
          ...prevState[orderIndex],
          [itemIndex]: {
              ...prevState[orderIndex]?.[itemIndex], // Ensure prevState[orderIndex] and prevState[orderIndex][itemIndex] exist
              [name]: name === "qty" ? parseInt(value) : value,
              subtotal: (name === "qty" ? parseInt(value) : value) * unitPrice
          }
      }
  }));
}

const handleToggleOrderUpdate = (orderIndex, itemIndex) => {
  setIsEditing(prevState => {
      const updatedState = [...prevState];
      if (!updatedState[orderIndex]) updatedState[orderIndex] = [];
      updatedState[orderIndex][itemIndex] = !updatedState[orderIndex][itemIndex];
      return updatedState;
  });
}
  const toggleOrderUpdate =(index,orderid) => {
    setIsEditing(!isEditing)
    setEditedItem(index)
    const editedOrders = [...orders]
    const updated_orders = editedOrders.map((order,ind) =>{
      if(!order.orderAccepted){
        const{orderItems} = order;
        for(let key in orderItems){
          if (parseInt(key) === index) {
            orderItems[key].editing = !orderItems[key].editing;
          }
        }
      }  
      return order;
    })
    setOrders([...updated_orders])
  }

  
  const updateOrderToBackend = async (orderIndex, itemIndex, unitPrice,orderid,itemtype) => {

    let newOrderItems = []
    const updatedOrder = orderUpdate[orderIndex];
    if (!updatedOrder ) return;

    const updatedOrderItem = updatedOrder[itemIndex];;
    if (!updatedOrderItem) return;
    
    const { qty, type } = updatedOrderItem;
    let new_type = type ?? itemtype;

     const orderItems = {
      qty:parseInt(qty),
      type:new_type,
      unitPrice,
      subtotal: qty * unitPrice
    };
    newOrderItems.push(orderItems)
    try {
        // Make your API call to update the order item here
        // For example:
        const{status} = await updateOrderItem(orderid,newOrderItems)
      if (status) {
        alert('Item Updated');
        // If the update is successful, toggle the editing status
        handleToggleOrderUpdate(orderIndex, itemIndex);
      }

      if (!status) {
            throw new Error('Failed to update order item');
      }
         
    } catch (error) {
        console.error('Error updating order item:', error);
    }
};
const handleGenerateInvoice = async(id,order) => {
    // console.log('Order Item',orderItem)
    order.orderAccepted = true;
    const{status} = await updateOrderItem(id,order)
    if(status)
      alert('Invoice Generated')
}
   
  return (
    <div className="container orders-wrapper my-2">
        <div className="row my-2">
          <div className='col-md-12 '>
            <Switch handleOrdersSwitch={handleOrdersSwitch}/>
          </div>
           
        </div>
        <div className='row'>
          <OrdersComponent 
            orders={orders} 
            status={status} 
            isEditing = {isEditing}
            orderUpdate={orderUpdate} 
            handleOrderUpdateChange1 ={handleOrderUpdateChange}
            handleOrderChange={handleOrderChange} 
            toggleOrderUpdate={toggleOrderUpdate}
            editedItem={editedItem}
            updateOrderToBackend={updateOrderToBackend}
            handleGenerateInvoice={handleGenerateInvoice}
            handleOrderUpdate={handleOrderUpdate}/>
        </div>
       
    </div>
   
  )
}

export default OrdersContainer