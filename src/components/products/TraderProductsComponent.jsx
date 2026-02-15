import React from 'react'
import './ProductComponent.css'

const TraderProductsComponent = ({traderProducts,deleteInventoryProduct,handleAddTraderProduct}) => {

    const imgPath = '../assets/product-images/'
  return (
    <div className="d-flex">
        {
          traderProducts.length > 0 ?
            traderProducts && traderProducts.map((prod,idx) => <div key={idx} >
                <img src={`${imgPath+prod.image}`} className="image-prod-item" onClick={() => handleAddTraderProduct(prod)} />
                <i className='fa-solid fa-circle-minus text-danger delete-prod-icon' onClick={() => deleteInventoryProduct(prod._id,idx)}></i>
            </div>) : <span className='text-center'>No Trader Products Available</span>
        }
    </div>
  )
}

export default TraderProductsComponent