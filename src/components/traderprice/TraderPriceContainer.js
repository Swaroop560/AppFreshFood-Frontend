import React,{useState,useEffect} from 'react'
import { useAuth } from '../../context/Auth'
import {getProductsWithTrader} from '../../services/newProductService'
import { createTraderInventory,getInventoryByTrader,deleteInventory} from '../../services/inventory'
import TraderPriceComponent from './TraderPriceComponent'

const TraderPriceContainer = () => {
  
    const{code} = useAuth();

      const columns = [
        { header: 'ITEM',mode:'item' },
        { header: 'KG_P', mode:'kg',accessor: ['status','price','qty','min','max'],index:1},
        { header: 'BOX_P', mode:'box',accessor: ['status','price','qty','min','max'],index:1 },
        { header: 'TRAY_P',mode:'tray', accessor: ['status','price','qty','min','max'],index:1 },
        { header: 'NUMBER_P', mode:'number',accessor: ['status','price','qty','min','max'],index:1 }
      ];

      const[tradProducts,setTradProducts] = useState([])

      useEffect(() =>{
        invokeTraderProducts()
      },[])

      const invokeTraderProducts = async() => {
        const {data,status} = await getProductsWithTrader()
        if(status)
        setTradProducts(data)
    }
  return (
   <TraderPriceComponent data={tradProducts} columns={columns} />
  )
}

export default TraderPriceContainer