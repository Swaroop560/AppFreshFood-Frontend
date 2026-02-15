import React,{useEffect,useState} from 'react'
import { getOrders,getTraderOrders } from '../../services/orderService'
import { useAuth } from '../../context/Auth'
import InvoiceComponent from './InvoiceComponent'

const InvoiceContainer = () => {

    const role = localStorage.getItem('userRole');
    const{userId,code,userName} = useAuth();
    const[orders,setOrders] = useState([])
    const[orderObj,setOrderObj] = useState({})
    const[invoice,setInvoice] = useState([])
    const[showInvoice,setShowInvoice] = useState(false)
      useEffect(() =>{
        async function fetchOrders(){
           if(role === 'Trader'){
              const {status,data} = await getTraderOrders(code)
              if(status){
                const newTraderOrdersData = data.filter(order => order.orderAccepted === true)
                setOrders([...newTraderOrdersData])
              }
             
           }
           if(role === 'Supplier'){
              const {status,data} = await getOrders(userId)
              if(status){
                const newSupplierOrdersData = data.filter(order => order.orderAccepted === true)
                setOrders([...newSupplierOrdersData])
              }
             
           }
           
        }
        fetchOrders()

        return() =>{

        }
  },[])

  const invoiceComp = (order) => {
    return <InvoiceComponent order={orderObj} id={orderObj._id} orderItems = {orderObj.orderItems} userName={userName} toggleInvoice={toggleInvoice} />
  }
  const toggleInvoice =(order={}) => {
    setShowInvoice(!showInvoice)
    setOrderObj({...order})
  }
  return (
    <>
    <h3 className='text-center my-3'>Invoices</h3>
    {
        showInvoice ? invoiceComp()
        :
        <table className="table table-bordered container my-3">
        <thead>
            <tr>
                <th>S.No</th>
                <th>OrderID</th>
                <th>ViewInvoice</th>
            </tr>
        </thead>
      <tbody>
        {
            orders && orders.map((order,idx) => {
                return <tr>
                    <td>{idx + 1}</td>
                    <td>{order._id}</td>
                    <td>
                        <button className='btn btn-sm btn-primary mx-3' onClick={() =>toggleInvoice(order)}>Show Invoice</button>
                        <button className='btn btn-sm btn-primary'>
                        <span>Download as PDF</span><i className="fa fa-download mx-1" style={{cursor:'pointer'}}></i>
                        </button>
                        
                    </td>
                </tr>
            })
            // orders && orders.map((order,idx) => {
            //     return <InvoiceComponent order={order} id={order._id} orderItems = {order.orderItems} userName={userName} />
            // })
        }
        </tbody>
      </table>
    }
   
  </>
  )
}

export default InvoiceContainer