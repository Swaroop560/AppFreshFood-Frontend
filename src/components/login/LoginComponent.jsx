import React from 'react'
import { Container,Row,Col,Card } from 'react-bootstrap'
import './LoginComponent.css'

const LoginComponent = ({handleChange,handleSubmit,username,password,isInValid,toggleLogin}) => {
  return (
    <div className="container my-3 login-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                {
                    isInValid ? <p className='text-center text-danger'>Invalid Creds</p> : ''
                }
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Enter email"
                      value={username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center">Login</button>
                  </div>
                </form>
                <div className="text-center my-2">
                  <a href="#" onClick={toggleLogin}>
                    Click to Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LoginComponent