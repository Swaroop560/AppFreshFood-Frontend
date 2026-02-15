import React, { useState } from 'react';
import './CartModalComponent.css'

const CheckBoxButtonComponent = ({ item,handleChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = (e,item) => {
    setIsChecked(!isChecked);
    handleChange(e,item)
  };

 const handleButtonClass = () => {
    let cls = "btn btn-sm"
    if(isChecked){
        cls+= "checked-button"
        return  cls;
    }
        
    else {
        cls+= "unchecked-button"
        return  cls;
    }

 }
  return (
    <>    {
        item && item.value.length > 0 ?  <button 
        className={ isChecked ? 'checked-button' : 'unchecked-button'} 
        name="btnPrice"
        id="btnPrice"
        disabled = {item?.value.length > 0 ? false : true }
        onClick={e => toggleCheckbox(e,item)}
      >
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={toggleCheckbox} 
          style={{ display: 'none' }} 
        />
        {item?.value.length > 0 ? item.value : 'NA'}
      </button> : ''
    }
   </>

  );
};

export default CheckBoxButtonComponent;
