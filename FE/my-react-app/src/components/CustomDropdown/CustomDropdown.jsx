import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { useDispatch } from "react-redux";
import { storeChartData, storeCostGroupBy } from "../../redux/action/actions";
import { CostContextFilter } from "../../context/CostContext";

const CustomDropdown = () => {
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState("More");
  const dropdownRef = useRef();
  // const { setGroupBy } = useContext(CostContext);

  const dispatch = useDispatch();

  const items = [
    "Purchase Option",
    "Api Operation",
    "Resource",
    "Availability Zone",
    "Tenancy",
    "Legal Entity",
    "Billing Entity",
  ];

  // const { params } = useContext(CostContextFilter);
  // useEffect(()=>{
  //   console.log("Context is updating for params ", params);
  //   return null;
  // },[params]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        className="text-blue-900 p-1.5 font-semibold cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        More
        {open ? (
          <KeyboardArrowUpIcon fontSize="small" className="text-blue-800" />
        ) : (
          <KeyboardArrowDownIcon fontSize="small" className="text-blue-800" />
        )}
      </button>

      <div className="relative">
        {open && (
          <div className="bg-white shadow-lg shadow-slate-400 py-2.5 w-45 border rounded-md absolute left-0 mt-2 z-20">
            {items.map((currentItem) => (
              <button
                key={currentItem}
                onClick={() => {
                  setOpen(false);

                  let [choosenGroupFirst, choosenGroupSecond] = currentItem
                    .toUpperCase()
                    .split(" ");
                  if (choosenGroupSecond != null && choosenGroupSecond != "")
                    choosenGroupFirst =
                      choosenGroupFirst + "_" + choosenGroupSecond;

                      dispatch(storeCostGroupBy(choosenGroupFirst))
                      // setGroupBy(choosenGroupFirst);

                  // onSelect(choosenGroupFirst);
                  // setSelected(currentItem);
                }}
                className="text-gray-800 block w-full text-left py-1 px-4 text-sm cursor-pointer"
              >
                {currentItem}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
