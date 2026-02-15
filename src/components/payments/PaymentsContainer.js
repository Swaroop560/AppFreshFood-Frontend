import React,{useEffect,useState} from 'react'
import { useAuth } from '../../context/Auth'
import { getOrders,getTraderOrders,updateOrderItem } from '../../services/orderService'
// import { getOrders,getTraderOrders,updateOrderItem,acceptOrder } from '../../services/orderService'
import PaymentsComponent from './PaymentsComponent'

const PaymentsContainer = () => {
    
    const{userId,code} = useAuth();
    const role = localStorage.getItem('userRole');
    const[orderid,setOrderId]=useState('')
    const[orderObj,setOrderObj] = useState({})
    const[payingAmount,setPayingAmount] = useState(0)
    const[orders,setOrders] = useState([])

    useEffect(() =>{
        async function fetchOrders(){
          if(role === 'Trader'){
            const {status,data} = await getTraderOrders(code)
            if(status){
              setOrders([...data])
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
    },[orders])

    const editPayment = (orderid,order) => {
      setOrderId(orderid)
      setOrderObj(order)
    }
    const handlePayments = async(e,id,order) => {
        e.preventDefault()
        orderObj.amountPaid = parseInt(orderObj.amountPaid) + parseInt(payingAmount);
        const{status,data} = await updateOrderItem(orderid,orderObj)
        if(status){
          alert('Payment Updated')
          const newOrders = [...orders]
          const newOrdersData = newOrders.map((order,idx) =>{
              if(order._id === id)  return orderObj
              return order;
          })
          setOrderId('')
          setPayingAmount(0)
          setOrders([...newOrdersData])
        }
         

    }

  return (
    <div className="container my-2">
     
      <PaymentsComponent orders={orders} handlePayments={handlePayments} editPayment={editPayment}/>
      {
        role === 'Trader' ? <div className='border p-3 rounded col-md-6'>
          <h6>Make payments</h6>
          <form onSubmit={handlePayments}>
          <div className="mb-3">
              <input type="text" className="form-control w-25" value={orderid} />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control w-25" value={payingAmount} onChange={e => setPayingAmount(parseInt(e.target.value))}/>
            </div>
            <div className="mb-3">
              <button className="btn btn-sm btn-primary">Submit</button>
            </div>
          </form>
        </div> : ''
      }
    </div>
   
  )
}

export default PaymentsContainer