import React, { useState } from "react";
import ckImage from "../../assets/ck.png";
import Footer from "../../components/Footer/Footer";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <section
        className="
          h-screen w-screen flex flex-col items-center justify-center
        "
      >
        {/* Logo */}
        <img
          src={ckImage}
          alt="CK Logo"
          className="box-border w-60 relative mx-auto"
        />

        {/* Form */}
        <form className="flex flex-col w-[600px] justify-center gap-5">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="
                rounded-[3px] p-2.5 border border-[#d7d7d7]
                focus:outline-none focus:border-[#4a90e2]
                focus:shadow-sm
                
              "
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="
                rounded-[3px] p-2.5 border border-[#d7d7d7]
                focus:outline-none focus:border-[#4a90e2]
                focus:shadow-sm
              "
            />
          </div>

          {/* Login Button */}
          <button
            className="
              bg-[#3584e4] rounded-sm p-[15px] text-white 
              font-bold mt-[15px] cursor-pointer
            "
          >
            LOGIN
          </button>
        </form>
      </section>
      <footer className="flex justify-between items-start border-2 px-5 bg-gray-100 text-shadow-lg absolute bottom-0 rounded-xs transition-all duration-300 ease-in-out">
        <div className="flex justify-between w-[1812px]">
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
    </div>
  );
}

export default Login;
