import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterComponent from './RegisterComponent'
import { createUser } from '../../services/authService'
import {registrationForm } from '../configs/registerForm'

const RegisterContainer = ({toggleLogin}) => {

  const navigate = useNavigate();
  const[registrationFlag,setRegistrationFlag] = useState(false)

  const handleSubmit = async(e,data) => {
    e.preventDefault();
    console.log(data);
    const usercode = data.role.toLowerCase() === 'trader' ? 'TRAD'+data.contact.substring(0,6) : 'SUPP'+data.contact.substring(0,6)
    const newData = {...data,code:usercode}
    // Your form submission logic here
    const {status} = await createUser(newData)
    if(status){
      setRegistrationFlag(true)
      // navigate('/login')
      toggleLogin()
    }
      
    else
      navigate('/')
  };
  return (
   <RegisterComponent 
    toggleLogin={toggleLogin} 
    handleSubmit={handleSubmit}
    registrationFlag={registrationFlag}
    registrationForm={registrationForm} />
  )
}

export default RegisterContainer