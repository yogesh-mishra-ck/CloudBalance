import React, { useState } from 'react'
import './styles.css'

function AddUser() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    role: ''
  })

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData(prevData => ({...prevData, 
        [name] : value  
    }))
  }

  return (
    <div>
      <h2>Add New User</h2>

      <form action="#">

        <div className='form-container'>
          <div className='form-same-row'>
              <div className='align-form-data inputFormDiv' >
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name='firstName' placeholder='Enter First Name' value={formData.firstName} onChange={handleChange} className='form-input' />
              </div>

              <div className='align-form-data inputFormDiv'>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' name='lastName' placeholder='Enter Last Name' value={formData.lastName} onChange={handleChange} className='form-input'/>
              </div>
          </div>

          <div className='form-same-row'>
            <div className='align-form-data inputFormDiv'>
              <label htmlFor="email">Email ID</label>
              <input type="email" id='email' name='email' value={formData.emailId} placeholder='Enter Email ID' onChange={handleChange} className='form-input' />
            </div>

            <div className='align-form-data inputFormDiv'>
              <label htmlFor="role">Select Roles</label>
              <select name="role" id="role" value={formData.role} onChange={handleChange} className='select-input'>
                <option value=''>Select role</option>
                <option value='admin' >Admin</option>
                <option value='read-only'>Read Only</option>
                <option value='customer'>Customer</option>
              </select>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default AddUser