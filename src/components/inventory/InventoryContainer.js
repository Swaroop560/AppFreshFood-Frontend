import React,{useEffect,useState} from 'react'
import { createTraderInventory,getInventoryByTrader,deleteInventory} from '../../services/inventory'
import {getProductsWithTrader} from '../../services/newProductService'
import { useAuth } from '../../context/Auth'
import InventoryComponent from './InventoryComponent';
import MinMaxInventory from './MinMaxInventory';

const InventoryContainer = () => {

    const{code} = useAuth();

    const columns = [
        { header: 'ITEM',mode:'item' },
        { header: 'KG', mode:'kg', accessor: ['status','price','qty','min','max'],index:2 },
        { header: 'BOX', mode:'box', accessor: ['status','price','qty','min','max'],index:2 },
        { header: 'TRAY',mode:'tray', accessor: ['status','price','qty','min','max'],index:2 },
        { header: 'NUMBER', mode:'number', accessor: ['status','price','qty','min','max'],index:2 }
      ];

      const columns1 = [
        { header: 'ITEM',mode:'item' },
        { header: 'KG_MIN', mode:'kg', accessor: ['status','price','qty','min','max'],index:3 },
        { header: 'KG_MAX', mode:'kg', accessor: ['status','price','qty','min','max'],index:4 },
        { header: 'BOX_MIN', mode:'box', accessor: ['status','price','qty','min','max'],index:3 },
        { header: 'BOX_MAX', mode:'box', accessor: ['status','price','qty','min','max'],index:4 },
        { header: 'TRAY_MIN',mode:'tray', accessor: ['status','price','qty','min','max'],index:3 },
        { header: 'TRAY_MAX', mode:'tray', accessor: ['status','price','qty','min','max'],index:4 },
        { header: 'NUM_MIN', mode:'number', accessor: ['status','price','qty','min','max'],index:3 },
        { header: 'NUM_MAX', mode:'number', accessor: ['status','price','qty','min','max'],index:4 }
      ];

      const[tradProducts,setTradProducts] = useState([])


      
      useEffect(() =>{
        invokeTraderProducts()
      },[])

      const invokeTraderProducts = async() => {
        // const {data} = await getInventoryByTrader(code)
        const {data,status} = await getProductsWithTrader()
        // const{productInfo} = data;
        //  console.log('Info',data)
        setTradProducts(data)
    }
  return (
    <div>
    <InventoryComponent  data={tradProducts} columns={columns}/>
    <MinMaxInventory data={tradProducts} columns={columns1}/>
    </div>
  )
}

export default InventoryContainer