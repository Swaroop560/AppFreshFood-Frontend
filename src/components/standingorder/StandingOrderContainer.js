import React,{useState,useEffect} from 'react'
import StandingOrderComponent from './StandingOrderComponent'
import { getStandingOrders,deleteStandingOrders} from '../../services/standingOrderService'
import { useAuth } from '../../context/Auth'

const StandingOrderContainer = () => {

    const{userId} = useAuth()

    const[sOrders,setSOrders] = useState([])

    const[qty,setQty] = useState(0)
    const[typ,setTyp] = useState('')

    const imgPath = '../assets/product-images/'

    useEffect(() =>{
        async function fetchStandingOrders(){
            const {status,data} = await getStandingOrders(userId)
            if(status)
                setSOrders([...data])
        }
        fetchStandingOrders()

        return() =>{

        }
    },[])

    const handleChange = (e) => {
        const{name,value} = e.target;
        if(name === 'quantity')
            setQty(value)
        if(name === 'type')
            setTyp(value)
    }

    const deleteStandingOrder = async(id,index) => {
        const {status} = await deleteStandingOrders(id);
        if(status){
          const newSOrderData = [...sOrders];
          newSOrderData.splice(index,1)
          setSOrders([...newSOrderData])
        }
        else{
          alert('Delete Operation Failed')
        }
    }
    const updateStandingOrder = () => {

    }

  return (
   <StandingOrderComponent 
    sorders={sOrders} 
    handleChange={handleChange}
    deleteStandingOrder={deleteStandingOrder}
    updateStandingOrder={updateStandingOrder}
    imgPath={imgPath}
    qty={qty}
    typ={typ}
    />
  )
}

export default StandingOrderContainer

