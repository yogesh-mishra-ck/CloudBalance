import React, { useState } from 'react'

function UserManagement() {
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
      <h2 className='pl-4 py-2 px-4 font-bold text-3xl'>Add New User</h2>

      <form className="h-[950px]">
        <div className='flex flex-col gap-6 pl-2'>
          
          <div className='flex gap-12'>
            <div className='flex flex-col'>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name='firstName'
                placeholder='Enter First Name'
                value={formData.firstName}
                onChange={handleChange}
                className='rounded-sm border border-gray-300 p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id='lastName'
                name='lastName'
                placeholder='Enter Last Name'
                value={formData.lastName}
                onChange={handleChange}
                className='rounded-sm border border-gray-300 p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
              />
            </div>
          </div>

          <div className='flex gap-12'>
            <div className='flex flex-col'>
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id='email'
                name='emailId'
                placeholder='Enter Email ID'
                value={formData.emailId}
                onChange={handleChange}
                className='rounded-sm border border-gray-300 p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="role">Select Roles</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className='rounded-sm border border-gray-300 p-2 w-52 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
              >
                <option value=''>Select role</option>
                <option value='admin'>Admin</option>
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

export default UserManagement
