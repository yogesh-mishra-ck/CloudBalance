import React, { useEffect, useState } from "react";
import ckImage from "../../assets/ck.png";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "../../utils/regex";
import { Snackbar } from "@mui/material";
import axios, { Axios } from "axios"

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    setErrorMessage('');

    const isValid = validateInputs();
    if (!isValid){
      setIsFormSubmitted(true);
      return;
    } 

    try{
       const loginAPIFunction = async () => {
        const res = await axios.post("http://localhost:8080/login", {
          email: formData.email,
          password: formData.password
        }, { withCredentials: true });

        console.log(res);
        if(res.status === 200){

          const token = { isAuthenticated: true };
          localStorage.setItem('token', JSON.stringify(token));

          navigate("/dashboard");
        }
    };
    loginAPIFunction();
    }catch(err){
      setErrorMessage("Inavlid email or password");
      setIsFormSubmitted(true);
    }

    // setIsFormSubmitted(true);

    // setTimeout(()=>{
    //   navigate('/dashboard')
    // },500)



    // setTimeout(()=>{
    //   navigate('/dashboard')
    // },500)
  }



  // useEffect(()=>{
  //   const storedToken = localStorage.getItem('token');
  //   if(storedToken){
  //     const token = JSON.parse(storedToken);
  //     if(token?.isAuthenticated)
  //       navigate('/dashboard')
  //   }
  // },[navigate])

   const validateInputs = () => {
      if (!formData.email.trim()) {
        setErrorMessage("Email is required");
        return false;
      }
      if (!emailRegex.test(formData.email)) {
        setErrorMessage("Email is invalid");
        return false;
      }
      if(!formData.password.trim()){
        setErrorMessage("Password is required");
        return false;
      }

      // if(!isPasswordValid(formData.password)){
      //   setErrorMessage("Make a stronger password with atleast 1 uppercase letter, 1 lowercase letter, 1 numeric value, 1 special-symbol and length atleast 6 and max 11")
      //   return false;
      // }
      return true;
    };
    
    const isPasswordValid = (password)=>{
      if(password.length<6 || password.length>11) return false;

      let hasUpper = false;
      let hasLower = false;
      let hasNumber = false;
      let hasSpecial = false;

      for(let i=0; i<password.length; i++){
        let curr = password[i];
        if(curr>='A' && curr<='Z') hasUpper=true;
        else if(curr>='a' && curr<='z') hasLower=true;
        else if(curr>='0' && curr<='9') hasNumber=true;
        else hasSpecial=true;
      }
      return hasUpper && hasLower &&  hasNumber && hasSpecial;
    }
  return (
    <div>
      <section
        className="
          h-screen w-screen flex flex-col items-center justify-center
        "
      >
        <img
          src={ckImage}
          alt="CK Logo"
          className="box-border w-60 relative mx-auto"
        />

        <form className="flex flex-col w-full max-w-2xl justify-center gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="
                rounded-sm p-2.5 border border-[#d7d7d7]
                focus:outline-none focus:border-[#4a90e2]
                focus:shadow-sm
                
              "
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="
                rounded-sm p-2.5 border border-[#d7d7d7]
                focus:outline-none focus:border-[#4a90e2]
                focus:shadow-sm
              "
            />
          </div>

          <button
            className="
              bg-blue-500 rounded-sm py-3 text-white 
              font-bold mt-3 cursor-pointer
            "
          >
            LOGIN
          </button>
        </form>
      </section>
      <footer className="flex justify-between items-start border-2 px-5 bg-gray-100 text-shadow-lg absolute bottom-0 rounded-xs transition-all duration-300 ease-in-out w-full">
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            <span>Have a Question</span>
            <span className="text-sky-700">Talk to our team</span>
          </div>

          <div className="flex gap-4">
            <span>Cloudkeeper 2025</span>
            <span className="text-lg relative bottom-1 text-slate-400 p-0.5">
              |
            </span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>

      <Snackbar
              open={isFormSubmitted}
              autoHideDuration={3000}
              onClose={() => setIsFormSubmitted(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              message={
                errorMessage || `Loggedin Successfully`
              }
              sx={{
                "& .MuiSnackbarContent-root": {
                  background: errorMessage ? "#F87171" : '#4ADE80',
                  color: "black",
                  fontWeight: 500,
                },
              }}
            />
    </div>
  );
}

export default Login;
