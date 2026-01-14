import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import {  useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { CostContextFilter } from "../../context/CostContext";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const FilterSelection = ({
  filterName,
  setActiveFilter,
  setFilterSelectionAPI,
  onCheckedParentFilter,
  
  
  appliedFilters,
  onApply
}) => {
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  // const selectedFilters = new Set();

  let [firstPartFilter, secondPartFilter] = filterName.toUpperCase().split(" ");
  if (secondPartFilter != null && secondPartFilter != "")
    firstPartFilter = firstPartFilter + "_" + secondPartFilter;

  const filterType = firstPartFilter;
  console.log("Filter name is ", filterType);
  const { role, id } = useSelector(state => state.loggedInUser);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    const allFilters = async () => {
      try{
          // console.log("Filter types ", filterName," ", filterType);
        if(role === "CUSTOMER" && filterType==="ACCOUNT_ID"){
          const res = await axiosInstance.get(
            `/account/${id}`
          );
          const fetchedFilters = res.data;
          // console.log("Reached")
          // console.log(fetchedFilters)
          const accountIdsThisUser = fetchedFilters.map(userInfo => userInfo.accountId);
          // console.log(accountIdsThisUser)
          setOptions(accountIdsThisUser);
        }else{
          const res = await axiosInstance.get(
            `/getAllFilters?allFilterType=${filterType}`
          );
          const fetchedFilters = res.data;
          setOptions(fetchedFilters);
        }
      }catch(e){
        console.error(e);
        setOptions([])
        toast.error("Couldn't fetch filter options for ",filterType)
      }
    };
    allFilters();
  }, [filterName,filterType]);

  // useEffect(()=>{
  //   setSelectedFilters(new Set())
  // },[filterSelectionAPI])

  const FILTER_PARAM_MAP = {
    SERVICE: "service",
    INSTANCE_TYPE: "instanceType",
    REGION: "region",
    ACCOUNT_ID: "accountId",
    USAGE_TYPE: "usageType",
    PLATFORM: "platform",
    PURCHASE_OPTION: "purchaseOption",
    API_OPERATION: "apiOperation",
    AVAILIBILITY_ZONE: "availibilityZone",
    TENANCY: "tenancy",
    LEGAL_ENTITY: "legalEntity",
    BILLING_ENTITY: "billingEntity",
  };

  const handleSubmit = () => {
    console.log(selectedFilters);
    let filterAPIKey = "";
    selectedFilters.forEach((filterEach) => {
      filterAPIKey += "&" + FILTER_PARAM_MAP[filterType] + "=" + filterEach;
    });
    console.log(filterAPIKey);
    setFilterSelectionAPI(filterAPIKey);
    onApply(Array.from(selectedFilters))
    setActiveFilter("");
  };

 
  const isAllSelected =
    options.length > 0 && options.length === selectedFilters.size;
  const handleAllClick = () => {
    if (isAllSelected) {
      setSelectedFilters(new Set());
      onCheckedParentFilter(false);
    } else {
      setSelectedFilters(new Set(options));
      onCheckedParentFilter(true);
    }
    console.log(selectedFilters);
  };

  const [userInput, setUserInput] = useState("");

  const searchedFilters = options.filter((current) =>
    current.toLowerCase().includes(userInput.toLowerCase())
  );

  useEffect(()=>{
    setSelectedFilters(new Set(appliedFilters));
  },[appliedFilters])

  return (
    <div className=" z-4 mt-2 shadow-xl shadow-gray-200 rounded p-3.5">
      {selectedFilters.size === 0 && (
        <p className="text-blue-800 font-semibold">
          No filters currently selected
        </p>
      )}
      <input
        type="text"
        placeholder="Search"
        className="border rounded p-1 border-gray-300 mt-1 w-full mx-1.5"
        onChange={(e) => {
          console.log("Input taken");
          setUserInput(e.target.value);
        }}
      />

      <p className="font-semibold mt-2.5">Showing {options.length} results</p>

      <ul className=" h-100 overflow-y-auto">
        <li
          className="flex h-7 mb-2.5 gap-1.5 text-gray-700 cursor-pointer"
          onClick={handleAllClick}
        >
          {isAllSelected ? (
            <CheckBoxIcon className="text-blue-500" />
          ) : (
            <CheckBoxOutlineBlankSharpIcon />
          )}
          <p>Select All</p>
        </li>

        {(searchedFilters.length > 0 ? searchedFilters : options).map(
          (optionName) => (
            <li
              key={optionName}
              className="flex h-7 mb-2.5 gap-1.5 text-gray-700 cursor-pointer"
              onClick={() => {
                const newSet = new Set(selectedFilters);

                if (newSet.has(optionName)) newSet.delete(optionName);
                else newSet.add(optionName);

                setSelectedFilters(newSet);
                // console.log(selectedFilters)
                console.log(newSet);
              }}
            >
              {selectedFilters.has(optionName) ? (
                <CheckBoxIcon className="text-blue-500" />
              ) : (
                <CheckBoxOutlineBlankSharpIcon className="border-gray-500" />
              )}

              <p className="text-sm">{optionName}</p>
            </li>
          )
        )}
      </ul>

      <hr className="border-t w-full border-gray-300" />
      {/* <hr className='border-t -mx-3 border-gray-300'/> */}
      <div className="flex justify-end p-2 gap-5 mt-2.5">
        <button
          className="text-blue-900 bg-white font-bold border rounded px-5 py-0.5 cursor-pointer"
          onClick={() => setActiveFilter("")}
        >
          Close
        </button>
        <button
          className="text-white bg-blue-500 shadow font-bold shadow-gray-300 rounded-md px-5 py-0.5 cursor-pointer"
          onClick={handleSubmit}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
export default FilterSelection;
