import React,{useState} from 'react'
import LoginComponent from './LoginComponent'
import { useNavigate } from 'react-router-dom'
import { userSignIn } from '../../services/authService'
import { useAuth } from '../../context/Auth'
import Register from '../register'
import './LoginComponent.css'

const LoginContainer = () => {
  
  const navigate = useNavigate();
  const {login} = useAuth();
  const[username,setUsername] = useState('')
  const[password,setPassword] = useState('')
  const[isInValid,setIsInValid] = useState(false)
  const[showLogin,setShowLogin] = useState(true)

  const handleChange = (e) => {
    
    const{name,value} = e.target;

    if(name === 'username')
      setUsername(value)   

    if(name === 'password')
        setPassword(value)
  }

  const handleSubmit = async(e) => {

        e.preventDefault();

        const {status,data} = await userSignIn(username,password)
        if(status){
          // console.log('data-in-login-comp',data.firstName)
          localStorage.setItem('userRole',data.role)
          login(data.firstName,data._id,data.code)
          if(data.role === 'Trader')
            navigate('/trader')
          if(data.role === 'Supplier')
            navigate('/trader')
        }
        else{
            setIsInValid(true)
            setUsername('')
            setPassword('')
        }
  }

  const toggleLogin = () => {
      setShowLogin(!showLogin)
  }

  return (
    <div className="container border">
      <div className="row">
        <div className="col-md-12 text-center">
          <img src="../assets/logo-green-2.png" alt="" width="100px" />
        </div>
      </div>
      {
        showLogin ? <LoginComponent
          handleChange={handleChange}
          username={username}
          password={password}
          handleSubmit={handleSubmit}
          isInValid={isInValid}
          toggleLogin={toggleLogin}
        />
        :
        <Register 
        toggleLogin={toggleLogin}
        />
      }
    </div>
  )
}

export default LoginContainer;
