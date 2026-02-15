import React from 'react'
import { Link } from 'react-router-dom'
import TraderProductsComponent from './TraderProductsComponent'
import './ProductComponent.css'

const ProductComponent = ({products,handleSearch,searchQuery,handleAddProduct,traderProducts,deleteInventoryProduct}) => {
    const imgPath = '../assets/product-images/'

    const handleAddTraderProduct = (product) => {
        handleAddProduct(product)
    }

  return (
      <div className="container">
          <h1 className="my-4 text-center">Products</h1>
          <div>
            <Link to='/trader'>
                Trader DashBoard
            </Link>
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
                </div>
            </div>
            <div className="row border rounded w-75 p-3 mx-auto my-3">
                <p className='text-center'>Trader Added Products</p>
                <TraderProductsComponent 
                    traderProducts={traderProducts} 
                    handleAddTraderProduct={handleAddTraderProduct}
                    deleteInventoryProduct={deleteInventoryProduct}/>
            </div>
          <div className="row row-cols-1 row-cols-md-4 g-4">
              { products && products.filter(p => p.productName.toLowerCase().includes(searchQuery.toLowerCase())).map((product, index) => (
                  <div key={index} className="col">
                      <div className="card item-card" onClick={() =>handleAddProduct(product)}>
                          <div className="card-body text-center">
                              <img src={`${imgPath + product.image}`} className="card-img-top product-image" alt={product.name} />
                              <p className="text-center fs-6 my-2">{product.productName}</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  )
}

export default ProductComponent