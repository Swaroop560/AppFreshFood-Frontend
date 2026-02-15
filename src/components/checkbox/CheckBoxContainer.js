import React,{useState,useEffect} from 'react';
import CheckBoxComponent from './CheckBoxComponent';

const CheckBoxContainer = ({type,initialState,handleCheckBox}) => {

  const[isChecked,setIsChecked] = useState(initialState)
  useEffect(() => {
    setIsChecked(initialState)
  },[initialState])

  const handleChange = (e) => {

    const{name,checked} = e.target;
    setIsChecked(!isChecked);
    handleCheckBox(name,checked)
  };
  return (
   <CheckBoxComponent 
   type={type}
   handleChange ={handleChange}
   isChecked={isChecked}
   />
  )
}

export default CheckBoxContainer