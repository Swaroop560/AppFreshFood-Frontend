import React from 'react'
import TraderListComponent from './TraderListComponent'
import './CartModalComponent.css'

const CartModalComponent = ({ addCart,type,handleChange,quantity,cartFlag,sorderFlag,prodInfo,deliveryDate,
    toggleModal,isChecked,handleCheckboxChange}) => {
    
    const imgPath = '../assets/product-images/'
    
    // console.log('Product Info',prodInfo)
    const{traders} = prodInfo;
    
   
     
  return (
      <div className='modal-overlay modal-dialog-centered'>
          <div className="modal-content">
              <div class="modal-header my-3">
                  <h5 class="modal-title" id="staticBackdropLabel">Place Order</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleModal}></button>
              </div>
              <div class="modal-body p-3">
                  <div className='row border p-2'>
                      <div className="col-md-8">
                          <form onSubmit={(e) => addCart(e, prodInfo, deliveryDate)}>
                              <table>
                                  <tbody>
                                      <tr>
                                          <td>
                                              <label htmlFor="type" className="text-center my-2">Type</label>
                                          </td>
                                          <td>
                                              <select
                                                  name="type"
                                                  className='select-type'
                                                  value={type}
                                                  onChange={handleChange}
                                                  id="type1"
                                              >
                                                  <option value="-1">Select</option>
                                                  <option value="box">Box</option>
                                                  <option value="tray">Tray</option>
                                                  <option value="kg">Kg</option>
                                                  <option value="number">Number</option>
                                              </select>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                              <label htmlFor="quantity" className="text-center my-2">Quantity</label>
                                          </td>
                                          <td>
                                              <input
                                                  type="number"
                                                  id="quantity1"
                                                  name="quantity"
                                                  value={quantity}
                                                  onChange={handleChange}
                                                  required
                                                  className="text-center my-2 inp-qty" min="0" max="100" />
                                          </td>
                                      </tr>
                                      <tr>
                                          <td colSpan={2} className='text-center my-1'>
                                              <input
                                                  type="checkbox"
                                                  name="standing"
                                                  checked={isChecked}
                                                  onChange={handleCheckboxChange}
                                                  id="standing" /><span className="mx-2 fs-6">Standing</span>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td colSpan={2} className='text-center my-2'>
                                              {
                                                  cartFlag ?
                                                      sorderFlag ? <p className='text-success'><i>Item Added To Cart & Standing</i></p> : <p className='text-success'><i>Item Added</i></p> :
                                                      <button className="btn btn-sm cart-btn">
                                                          <i className='fa fa-solid fa-cart-shopping my-3'></i>
                                                      </button>
                                              }
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </form>
                      </div>
                      <div className="col-md-4 text-center py-3">
                          <img src={`${imgPath + prodInfo.image}`} alt={prodInfo.productName} className='prod-image-modal' />
                          <p className='prod-name text-center'>{prodInfo.productName}</p>
                      </div>
                  </div>
                  <div className="row my-1">
                    <div className="col-md-12 col-sm-12">
                          <div className={type.length > 1 ? 'border rounded p-2 col-md-12' : 'col-md-12'}>
                              {
                                  type.length > 0 ? <TraderListComponent type={type} traders={traders} handleChange={handleChange} deliveryDate={deliveryDate} /> : ''
                              }
                          </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default CartModalComponent

//class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"