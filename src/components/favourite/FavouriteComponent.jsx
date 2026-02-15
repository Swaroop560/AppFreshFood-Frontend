import React from 'react'
import './FavouriteComponent.css'

const FavouriteComponent = ({favItem,index,delFavourite,id,toggleModal,handleOrder}) => {

    // console.log('fav comp',favList)
    const imgPath = '../assets/product-images/'
  return (
    <>
      <img key={index} src={`${imgPath+favItem.image}`} className="image-item" onClick={() => handleOrder(favItem)} />
      <i className='fa-solid fa-circle-minus text-danger delete-icon' onClick={() => delFavourite(favItem.productId,index)}></i>
      <p className='fav-tradercode text-danger'>{favItem.traderCode}</p>
    </>
  )
}

export default FavouriteComponent

// {
//     favList.length > 0 && favList.map((item,idx) =><img key={idx} src={item.image} className="image-item" />)
// }