import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { emailRegex, nameRegex } from "../../utils/regex";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInterceptor";
import ManageAccount from "../../components/ManageAccount/ManageAccount";
import { useDispatch, useSelector } from "react-redux";
import { storeUserTable } from "../../redux/action/actions";

function AddUser() {

  const location = useLocation();
  const dispatch = useDispatch();
  const { state } = location;
  const user = state?.user || {};
  const isEditMode = state?.isEditMode || false;

  const initialState = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailId: user?.emailId || "",
    role: user?.role || "",
    password: user?.password || ""
  };
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [selectedAccounts, setSelectedAccounts] = useState(new Map());
  const loggedInUser = useSelector((state) => state.loggedInUser);
  // const [selectedAccountsIds, setSelectedAccountsIds] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(()=>{
    //saare accounts associated with this user ki api call
    //set krdo vo accounts isse
    const getMyAccounts = async ()=>{
      const res = await axiosInstance.get(`/account/${user.id}`);
      const userAccounts = res.data;
      const accountsMap = new Map(userAccounts.map(account => [account.id, account]));
      setSelectedAccounts(accountsMap);
    }
    if(isEditMode)
      getMyAccounts();
  },[isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    const isValid = validateInputs();
    setIsFormSubmitted(true); 
    
    if (!isValid) {
      setIsFormSubmitted(true);
      return;
    }
    console.log("Hello")

    const selectedAccountIds =  Array.from(selectedAccounts.keys());


    try{
      if(isEditMode){
        // selectedAccounts
        //

        // if(loggedInUser.id === user.id)

        await axiosInstance.put(`/user/${user.id}`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData?.emailId || "",
          role: formData?.role || "",
          selectedAccounts: selectedAccountIds
        })
      }
      // else{
      //   await axiosInstance.post("/user", formData);
      // }
      // const createUserApiCall = async () => {
        // const res = 

        else{
          console.log("Before")
          await axiosInstance.post('/user', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.emailId,
            role: formData.role,
            password: formData.password,
  
            // accounts ids added in sending data 
            selectedAccounts: selectedAccountIds
          })
          console.log("After")
          setErrorMessage("");
        }

        const resp = await axiosInstance.get("/user");
        const updatedUsersData = resp.data;
        dispatch(storeUserTable(updatedUsersData));
        
        
    }catch(e){
      setErrorMessage(e.response?.data?.message || "Failed to create user");
      setIsFormSubmitted(true);
      // setFormData(initialState)
    }

  };

  const validateInputs = () => {
    if (!formData.firstName.trim()) {
      setErrorMessage("First name is required");
      return false;
    }
    if (!nameRegex.test(formData.firstName)) {
      setErrorMessage("First Name is invalid");
      return false;
    }
    if (!formData.lastName.trim()) {
      setErrorMessage("Last name is required");
      return false;
    }
    if (!nameRegex.test(formData.lastName)) {
      setErrorMessage("Last Name is invalid");
      return false;
    }
    if (!formData.emailId.trim()) {
      setErrorMessage("Email ID is required");
      return false;
    }
    if (!emailRegex.test(formData.emailId)) {
      setErrorMessage("Emaild ID is invalid");
      return false;
    }
    if (!formData.role.trim()) {
      setErrorMessage("Please select a role");
      return false;
    }

    return true;
  };

  return (
    <div>
      <h2 className="pl-4 py-2 px-4 font-bold text-3xl">{isEditMode ? "Edit User": "Add New User"}</h2>

      {/* <ManageAccount/> */}

      <form action="#" className="" onSubmit={handleSubmit}>
        <div className="flex flex-col pl-2">
          <div className="flex gap-12">
            <div className="flex flex-col pl-2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="rounded-sm p-2.5 border border-gray-300 focus:outline-0 focus:border-gray-300 focus:shadow-sm"
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
                className="rounded-sm p-2.5 border border-gray-300 focus:outline-0 focus:border-gray-300 focus:shadow-sm"
              />
            </div>

            {
              !isEditMode && (
              <div className="flex flex-col pl-2">
              <label htmlFor="lastName">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-sm p-2.5 border border-gray-300 focus:outline-0 focus:border-gray-300 focus:shadow-sm"
              />
            </div>
              )
            }


          </div>

          <div className="flex gap-12 mt-3.5">
            <div className="flex flex-col pl-2">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                placeholder="Enter Email ID"
                onChange={handleChange}
                disabled={loggedInUser.id === user.id}
                className="disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200
                rounded-sm p-2.5 border border-gray-300 focus:outline-0 focus:border-gray-300 focus:shadow-sm"
              />
            </div>

            <div className="flex flex-col pl-2">
              <label htmlFor="role">Select Roles</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loggedInUser.id === user.id}
                className="disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200
                border border-sm p-2.5 border-gray-300 w-56 rounded-sm"
              >
                <option value="">Select role</option>
                <option value="ADMIN">Admin</option>
                <option value="READ_ONLY">Read Only</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>
          </div>
        </div>
        <button
          className="border cursor-pointer mt-3 ml-3.5
          bg-blue-500 rounded-sm p-2 text-white 
            font-bold w-56
        "
        >
          {isEditMode ? "Update User" : "Add User"}
        </button>
      </form>
      
      <ManageAccount selectedAccounts={selectedAccounts} setSelectedAccounts={setSelectedAccounts} />

      <Snackbar
        open={isFormSubmitted}
        autoHideDuration={3000}
        onClose={() => setIsFormSubmitted(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={
          errorMessage || `User ${isEditMode ? 'updated' : 'created'} successfully`
        }
        sx={{
          "& .MuiSnackbarContent-root": {
            background: errorMessage ? "#F87171" : "#4ADE80",
            color: "black",
            fontWeight: 500,
          },
        }}
      />
    </div>
  );
}

export default AddUser;
