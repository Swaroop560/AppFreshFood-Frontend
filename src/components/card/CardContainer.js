import React from 'react'
import CardComponent from './CardComponent'
import { useCart } from '../../context/Cart'

const CardContainer = ({order,orderid}) => {

  const{orderItems} = order;
  return (
      <div className="container">
          {
              orderItems.length > 0 && orderItems.map((item, idx) => <CardComponent order ={item} orderid={orderid} index={idx} /> )
          }
      </div> 
  )
}

export default CardContainer