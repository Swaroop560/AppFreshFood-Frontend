import React,{useEffect,useState} from 'react'
import FavouriteComponent from './FavouriteComponent'
import { getFavourites } from '../../services/FavService'
import { useAuth } from '../../context/Auth'
import './FavouriteComponent.css'


const FavouriteContainer = ({favourites,delFavourite,toggleModal,handleOrder}) => {
  
  const{userId}  = useAuth()
  const[favList,setFavList] = useState(favourites)

//   console.log('Fav-container',favourites)
  return (
      <div className="horizontal-scroll-container">
          {
              favourites && favourites.map((fav, idx) => 
              <FavouriteComponent 
              key={idx}
              index={idx} 
              toggleModal = {toggleModal} 
              handleOrder={handleOrder} 
              favItem={fav} 
              delFavourite={delFavourite} 
              id={fav._id} />)
          }
      </div>
    // <p>Favourite</p>
  )
}

export default FavouriteContainer