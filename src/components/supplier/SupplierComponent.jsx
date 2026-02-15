import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import './SupplierComponent.css'
import { weekDays } from '../configs/data'
import Favourite from '../favourite'
import CartModal from '../cart-modal'

const SupplierComponent = ({searchQuery,products,isOpen,toggleModal,handleCheckboxChange,isChecked,deliveryDate,
  prodInfo,handleSearch,handleOrder,addCart,quantity,type,sorderFlag,addFavourite,favourites,delFavourite,
  handleChange,cartFlag,cartCount,handleDateChange,traderProductsList}) => {

  const imgPath = '../assets/product-images/'
  const day = weekDays[new Date(deliveryDate).getDay()];
  const current_date = new Date().toLocaleDateString('fr-CA')
  // console.log('supplier component',favourites)

  const filteredTraderProducts = traderProductsList?.filter(traderItem => new Date(traderItem?.seasonal?.startDate) > new Date(deliveryDate) &&  new Date(traderItem.seasonal.startDate) > new Date(deliveryDate) || traderItem?.weekly?.includes(day))
 
  return (
    <section>
      {/* 1. select along with a search bar */}
      {/* 2. List of all the Products. */}
      <div className="container">
            <div className="row my-3">
              <div className="col-md-12 col-sm-12 text-center">
                <input 
                  type="date" 
                  name="date" 
                  id="products-date" 
                  value={deliveryDate}
                  onChange={handleChange}
                  min={new Date().toLocaleDateString('fr-CA')}
                  className="form-control w-25 text-center" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Link to="/trader">
                  <a href="#">Back to Dashboard</a>
                </Link>
              </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12 search">
                    <div className="my-3">
                        <input 
                            type="search" 
                            name="search-products" 
                            id="search-products" 
                            placeholder='Search Products'
                            onChange = {handleSearch}
                            className="form-control searchbar text-center" />
                    </div>
                    <div className='cart-icon'>
                      <Link to='/cart'>
                        <i className="fa-solid fa-cart-shopping text-danger"></i>
                      </Link>
                      <span className='text-success cart-count'>{cartCount}</span>
                    </div>
                </div>
            </div>
           <div className="row">
            <div className="col-md-12 col-sm-12 fav-wrapper">  
            {
              favourites.length > 0 ?
                <div className="container border border-warning rounded p-2">
                  <Favourite favourites={favourites} delFavourite={delFavourite} toggleModal = {toggleModal} handleOrder={handleOrder}/>
                </div> : <p>No Favorites...</p>
            }    
            </div>
           </div>
            <div className="row">
                <div className="col-md-12 col-sm-12 prod-list my-4 rounded p-2">
                    {/* Individual product cards */}
                    {
                      deliveryDate === current_date ?
                        products && products.filter(p => p.productName.toLowerCase().includes(searchQuery.toLowerCase())).map((product, idx) => 
                        <div 
                            className="prod-card text-center" key={idx}  
                            onClick = {() => handleOrder(product)}>
                            <img src={`${imgPath + product.image}`} alt={product.productName} className='prod-image' />
                            <p className='prod-name text-center'>{product.productName}</p>
                            {
                              <div>
                                <i className='fa-solid fa-heart float-start card-icon' onClick={(e) => addFavourite(e,product.productId)}></i>
                                <i className='fa-solid fa-cart-shopping float-end card-icon'></i>
                              </div>
                            }
                        </div>)
                        :
                        traderProductsList && traderProductsList.filter(p => p.productName.toLowerCase().includes(searchQuery.toLowerCase())).map((product, idx) => 
                        <div 
                            className="prod-card text-center" key={idx}  
                            onClick = {() => handleOrder(product)}>
                            <img src={`${imgPath + product.image}`} alt={product.productName} className='prod-image' />
                            <p className='prod-name text-center'>{product.productName}</p>
                            {
                              <div>
                                <i className='fa-solid fa-heart float-start card-icon' onClick={(e) => addFavourite(e,product.productId)}></i>
                                <i className='fa-solid fa-cart-shopping float-end card-icon'></i>
                              </div>
                            }
                        </div>)
                    }
                </div>
            </div>
            {/* Repeat for other featured products */}
            {/* Modal  */}
            <div>
                {
                  isOpen && (
                      <CartModal
                      addCart = {addCart} 
                      type={type}
                      handleChange = {handleChange}
                      quantity = {quantity}
                      cartFlag = {cartFlag}
                      sorderFlag={sorderFlag}
                      toggleModal={toggleModal}
                      handleCheckboxChange={handleCheckboxChange}
                      isChecked={isChecked}
                      handleDateChange={handleDateChange}
                      deliveryDate = {deliveryDate}
                      prodInfo = {prodInfo}/>
                  )
                }
              </div>
        </div>
    </section>
  )
}

export default SupplierComponent
