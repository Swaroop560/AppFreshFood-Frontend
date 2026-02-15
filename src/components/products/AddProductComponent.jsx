import React from 'react'
import AvailabilityComponent from './AvailabilityComponent'
import './ProductComponent.css'
import TypeCheckBox from '../checkbox'


const AddProductComponent = ({handleChange,addProductInfo,handleSubmit,
    toggleAddProduct,type,availability,handleInfoChange,isQty,newProductTradersInfo,handleCheckBox,handleUpdateInventory}) => {
    const imgPath = '../assets/product-images/'
    const{image,productName,category} = addProductInfo
  return (
      <div className="container">
          <h1 className="my-4">Add Product</h1>
          <div className="row border p-2">
            <div className="col-4 text-center my-auto">
                <img src={`${imgPath + image}`} alt={productName} width="350" className="rounded"/>
                <p>{productName}</p>
            </div>
            <div className="col-8">
                  <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="available" className="form-label">Available</label>
                          <select
                              className="form-select"
                              id="available"
                              name="available"
                              value={availability}
                              onChange={handleChange}
                              required = {category !== null ? false : true}
                          >
                              <option value="">Select Availability</option>
                              <option value="week">Weekly</option>
                              <option value="season">Seasonal</option>
                              <option value="yearly">Yearly</option>
                          </select>
                      </div>
                      {
                        availability.length > 0 && availability !== 'yearly' ?  
                        <div className='border border-info rounded availability-strip'>
                            <AvailabilityComponent 
                                availability={availability} 
                                handleInfoChange={handleInfoChange} 
                                addProductInfo={addProductInfo}/>
                        </div> 
                        : ''
                      }
                     
                      <div className="mb-3">
                          <label htmlFor="category" className="form-label">Types</label>
                          <select
                              className="form-select"
                              id="types"
                              name="type"
                              value={type}
                              onChange={handleChange}
                              required = {category !== null ? false : true}
                          >
                              <option value="">Select Category</option>
                              <option value="kg">KG</option>
                              <option value="box">BOX</option>
                              <option value="tray">TRAY</option>
                              <option value="number">NUMBER</option>
                          </select>
                      </div>
                      {
                        type.length > 0 && type !== 'kg' && type !== 'number' ? <div  className="mb-1 form-check availability-strip">
                             <label className="form-check-label" htmlFor={type}>{type}</label>
                            <input 
                                type="number" 
                                name={type} 
                                id={type}  
                                value={addProductInfo.traders[0]?.[`${type}`]?.qty}
                                onChange={handleInfoChange} className="form-control"/>
                        </div> 
                        :
                        type.length > 0 ?
                        <div  className="mb-1 form-check availability-strip">
                            {
                                // console.log('checked',productInfo[`${type}`].status )
                                // console.log('checked -isqty',isQty[type])
                            }
                            <TypeCheckBox type={type} initialState={addProductInfo.traders[0]?.[`${type}`]?.status} handleCheckBox={handleCheckBox}/>
                        </div> 
                        : ''
                      }
                      {
                        category !== null ? 
                            <button type="submit" className="btn btn-info" onClick={() =>handleUpdateInventory()}>Update Product</button> 
                            :
                            <button type="submit" className="btn btn-primary">Add Product</button>
                      }
                      
                  </form>
            </div>
          </div>
          <div className="row">
              <div className="col-12">
                  <div className="text-end" onClick={() => toggleAddProduct()}>
                      <a href="#">Back to Products</a>
                  </div>
              </div>
          </div>
         
      </div>
  )
}

export default AddProductComponent