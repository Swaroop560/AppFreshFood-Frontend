import React,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import './HomeNavBarComponent.css'


const HomeNavBarComponent = () => {

    const navigate = useNavigate()
    const{userName,logout} = useAuth()

    const logOut = () => {
        // localStorage.removeItem('authData')
        logout()
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container nav-container">
                <Link className="navbar-brand" to="/">
                    <img src="../assets/logo-green-2.png" alt="logo" width="120px"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                           userName.length > 0 ? 
                                <>
                                    <Link to="/trader">
                                        <li className="nav-item mx-2">
                                            Home
                                        </li>
                                    </Link>
                                    {/* <Link to="/supplier">
                                        <li className="nav-item mx-2">
                                        Home
                                        </li>
                                    </Link>
                                    <Link  to="/orders">
                                        <li className="nav-item mx-2">
                                        Orders
                                        </li>
                                    </Link>
                                    <Link  to="/standingorders">
                                        <li className="nav-item mx-2">
                                        Standing
                                        </li>
                                    </Link>
                                    <Link  to="/payments">
                                        <li className="nav-item mx-2">
                                        Pay
                                        </li>
                                    </Link> */}
                                    <li className="nav-item mx-2">
                                        {/* <Link className="nav-link active" aria-current="page" to="/">Logout</Link> */}
                                        <span className="bg-warning p-1 rounded"><i>Hello</i> - {userName}</span>
                                    </li>
                                    <li className="nav-item" onClick={logOut}>
                                       Logout
                                    </li>
                                </>
                               
                                :
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                        }
                       
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBarComponent