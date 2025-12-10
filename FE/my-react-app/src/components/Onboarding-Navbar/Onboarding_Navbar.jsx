import React from "react";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const roundCheckboxProps = (pageNumber, currentPage)=>{
  if(pageNumber < currentPage){
    return {
      checked: true,
      sx: {
        color: "#22c55e",       // green
        "&.Mui-checked": {
          color: "#22c55e",
        },
      },
    };
  }


  else if(pageNumber === currentPage){
    return {
      checked: true,
      sx: {
        color: "#16a34a",
        "&.Mui-checked": {
          color: "#16a34a",
        },
    }
  }
}
  
  return {
    checked: false
  }
}
const Onboarding_Navbar = ({ currentPage }) => {
  return (
    <div>
      <nav>
        <button className="mb-2 pl-2 mt-2 p-1 rounded bg-slate-100">
          Recommendations
        </button>

        <div className="flex gap-3">
          <span className= {`flex ${currentPage===1 ? "border-b-2 border-green-400" : ""}`}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />} 
              checkedIcon={<CheckCircleIcon />} 
              {...roundCheckboxProps(1, currentPage)}
            />

            <p className="pt-2">A. Create an IAM Role</p>
          </span>

          <span className="pt-2"> {">"} </span>

          <span className= {`flex ${currentPage===2 ? "border-b-2 border-green-400" : ""}`}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />} 
              checkedIcon={<CheckCircleIcon />} 
              {...roundCheckboxProps(2, currentPage)}
            />
            <p className="pt-2">B. Add Customer Managed Policies</p>
          </span>

          <span className="pt-2"> {">"} </span>

          <span className={`flex ${currentPage === 3 ? "border-b-2 border-green-400" : ""} `}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />} 
              checkedIcon={<CheckCircleIcon />} 
              {...roundCheckboxProps(3, currentPage)}
            />
            <p className="pt-2">C. Create CUR</p>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Onboarding_Navbar;
