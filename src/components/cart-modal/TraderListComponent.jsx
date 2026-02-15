import React,{useState} from 'react'
import { weekDays } from '../configs/data'
import CheckBoxButton from './CheckBoxButtonComponent'
import './CartModalComponent.css'

const TraderListComponent = ({type,traders=[],handleChange,deliveryDate}) => {


    let strArr = []
    let str = ''
    let strVal = ''
 
    let day = weekDays[new Date(deliveryDate).getDay()];
  

    const traderAvailability = (tradername,trader,traderType) => {

        str = "";
        if(traderType?.status){
            if(trader.seasonal.startDate.length > 0){
                if (new Date(trader.seasonal.startDate) <= new Date(deliveryDate) && new Date(trader.seasonal.endDate) >= new Date(deliveryDate)) {
                    str = tradername +'-'+'$'+ traderType.price;
                    return  str;
                }     
            }
            if(trader.weekly.includes(day)){
                str = tradername +'-'+'$'+ traderType.price;
                return str ;
            }
            if(trader.yearly)
            {
                str = tradername +'-'+'$'+ traderType.price;
                return str;
            }
        }
        return str;
    }
    const tradersArr = traders.filter(trader =>{
   
        switch(type){
            
            case 'box': 
                strVal = traderAvailability(trader.traderName,trader,trader.box)
                strArr.push({code:trader.traderCode,value:strVal});
            break;
            case 'tray': 
                strVal = traderAvailability(trader.traderName,trader,trader.tray)
                strArr.push({code:trader.traderCode,value:strVal});
            break;
            case 'kg': 
                strVal = traderAvailability(trader.traderName,trader,trader.kg)
                strArr.push({code:trader.traderCode,value:strVal});
            break;
            case 'number': 
                strVal = traderAvailability(trader.traderName,trader,trader.number)
                strArr.push({code:trader.traderCode,value:strVal}) 
            break;
            default:
                return;
        }
    })

  
  return ( 
    <>  
    {
        strArr.length > 0 ? strArr.map((item,index) => <CheckBoxButton key={index} item={item} handleChange={handleChange} /> ) : 'NA'
    }   
    </>
  )
}

export default TraderListComponent;

{/* 

 <span 
            key={index} 
            onClick={(e) => handleChange(e,item)} 
            name='pricetag' 
            value={item.value ?? ''} 
            className='border rounded p-1 mx-1 bg-primary trader-price-ribbon'>{item.value || 'NA'}</span>)
*/}
        