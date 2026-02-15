import React from 'react'

const CheckBoxComponent = ({type,handleChange,isChecked}) => {
  return (
    <>
          <label className="form-check-label" htmlFor={type}>{type}</label>
          <input
              type="checkbox"
              className="form-check-input"
              name={type}
              id={type}
              // value= {productInfo[`${type}`].status} //addProductsData.info.qty[`${type}`]
              checked={isChecked} //?productInfo[`${type}`].status 
              onChange={handleChange} />
    </>
  )
}

export default CheckBoxComponent