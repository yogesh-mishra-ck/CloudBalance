import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { emailRegex, nameRegex } from "../../utils/regex";

function UserManagement() {
  const initialState = {
    firstName: "",
    lastName: "",
    emailId: "",
    role: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage('')
    if(!validateInputs()){
      setIsFormSubmitted(true);
      return;
    }
    setIsFormSubmitted(true);
    setSubmittedName(formData.firstName);
    setFormData(initialState);
  };

  const validateInputs = ()=>{

    if(!formData.firstName.trim()){
      setErrorMessage('First name is required');
      return false;
    }
    if(!nameRegex.test(formData.firstName)){
      setErrorMessage('First Name is invalid');
      return false;
    }
    if(!formData.lastName.trim()){
      setErrorMessage('Last name is required');
      return false;
    }
    if(!nameRegex.test(formData.lastName)){
      setErrorMessage('Last Name is invalid');
      return false;
    }
    if(!formData.emailId.trim()){
      setErrorMessage('Email ID is required');
      return false;
    }
    if(!emailRegex.test(formData.emailId)){
      setErrorMessage('Emaild ID is invalid');
      return false;
    }
    if(!formData.role.trim()){
      setErrorMessage('Please select a role');
      return false;
    }
    

    return true;
  }

  return (
    <div>
      <h2 className="pl-4 py-2 px-4 font-bold text-3xl">Add New User</h2>

      <form action="#" className="h-[950px]" onSubmit={handleSubmit}>
        <div className="flex flex-col pl-2">
          <div className="flex gap-[50px]">
            <div className="flex flex-col pl-2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="rounded-sm p-2.5 border border-gray-300 focus:outline-0 focus:border-gray-300 focus:shadow-[0_0_3px_rgba(74,144,226,0.4)]"
              />
            </div>

            <div className="flex flex-col pl-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="rounded-sm p-2.5 border border-gray-300 focus:outline-0 focus:border-gray-300 focus:shadow-[0_0_3px_rgba(74,144,226,0.4)]"
              />
            </div>
          </div>

          <div className="flex gap-[50px] mt-3.5">
            <div className="flex flex-col pl-2">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                placeholder="Enter Email ID"
                onChange={handleChange}
                className="rounded-sm p-2.5 border border-gray-300 focus:outline-0 focus:border-gray-300 focus:shadow-[0_0_3px_rgba(74,144,226,0.4)]"
              />
            </div>

            <div className="flex flex-col pl-2">
              <label htmlFor="role">Select Roles</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="border border-sm p-2.5 border-gray-300 w-[230px] rounded-sm"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="read-only">Read Only</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>
        </div>
         <button
          className="border cursor-pointer mt-3 ml-3.5
          bg-[#3584e4] rounded-sm p-[7px] text-white 
            font-bold w-[230px]
        "
        >
          Submit
        </button>
      </form>

      <Snackbar
        open={isFormSubmitted}
        autoHideDuration={3000}
        onClose={() => setIsFormSubmitted(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={ errorMessage || `User with name ${submittedName} created successfully`}
        ContentProps={{
          sx: {
            background: errorMessage ? "#F87171" : "#E5E7EB",
            color: "black",
            fontWeight: 500,
          },
        }}
      ></Snackbar>
    </div>
  );
}

export default UserManagement;
