import React,{useState} from 'react'

const RegisterComponent = ({toggleLogin,handleSubmit,registrationForm,registrationFlag}) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    orgName: '',
    role: '',
    logo: '',
    postalCode: '',
    abnNumber: '',
    address: '',
    contact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <a href="#" onClick={toggleLogin}>Go to Login</a>
      <div className="container">
        <div>
          {
            registrationFlag ? <span className='text-center text-success'>Registration Successful</span> : ''
          }
        </div>
        <h1 className="mb-4 text-center">Registration Form</h1>
        <form onSubmit={e => handleSubmit(e,formData)} className="w-50 h-50 mx-auto">
          {
            registrationForm && registrationForm.map((field, idx) => <div className="row mb-3" key={idx}>
                <div className="col">
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'text' && (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      className="form-control"
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                    />
                  )}
                  {field.type === 'email' && (
                    <input
                      type="email"
                      name={field.name}
                      id={field.name}
                      className="form-control"
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                    />
                  )}
                  {field.type === 'password' && (
                    <input
                      type="password"
                      name={field.name}
                      id={field.name}
                      className="form-control"
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                    />
                  )}
                  {field.type === 'textarea' && (
                    <textarea
                      name={field.name}
                      id={field.name}
                      className="form-control"
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
            )
          }
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-75">Submit</button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default RegisterComponent