import React,{useEffect,useState} from 'react'
import { useAuth } from '../../context/Auth'
import { updateInventory } from '../../services/inventory'
import { updateTraderProduct } from '../../services/newProductService'
import EditTableComponent from './EditTableComponent'

const EditTableContainer = ({ data, columns }) => { 
    
   const{code} = useAuth();
   const[prodData,setProdData] = useState([])
  // 
  useEffect(() =>{
 
    const productsWithTraderCode = data
      .filter(product => product.traders.some(trader => trader.traderCode === code))
      .map(product => {
        const traders = product.traders
          .filter(trader => trader.traderCode === code)
          .map(trader => ({
            traderCode: trader.traderCode,
            traderName: trader.traderName,
            box: {
              status: trader.box.status,
              price: trader.box.price,
              qty: trader.box.qty,
              min: trader.box.min,
              max: trader.box.max
            },
            tray: {
              status: trader.tray.status,
              price: trader.tray.price,
              qty: trader.tray.qty,
              min: trader.tray.min,
              max: trader.tray.max
            },
            number: {
              status: trader.number.status,
              price: trader.number.price,
              qty: trader.number.qty,
              min: trader.number.min,
              max: trader.number.max
            },
            kg: {
              status: trader.kg.status,
              price: trader.kg.price,
              qty: trader.kg.qty,
              min: trader.kg.min,
              max: trader.kg.max
            },
            weekly: trader.weekly.map(day => day.charAt(0).toUpperCase() + day.slice(1)),
            yearly: trader.yearly,
            seasonal: {
              startDate: trader.seasonal.startDate,
              endDate: trader.seasonal.endDate
            }
          }));

        return {
          productId: product.productId,
          productName: product.productName,
          image: product.image,
          category: product.category,
          traders: traders
        };
  });
    setProdData(productsWithTraderCode)
  },[data])
 
  //  const productWithTrader = data.find(product => product.traders.some(trader => trader.traderCode === code)) ?? [];
    //const tIndex = data.traders && data.traders.indexOf(code)
    const handleUpdateInventory = async(id,rowData) => {
        const{status} = await updateTraderProduct(code,rowData)
        if(status)
            alert('row Updated')
    }
  return (
    <EditTableComponent data={prodData} columns={columns} handleUpdateInventory={handleUpdateInventory} />
  )
}

export default EditTableContainer