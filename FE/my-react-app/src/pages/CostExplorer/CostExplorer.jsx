import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { Paper, ToggleButton } from "@mui/material";
import CostExplorerTable from "../../components/Cost-Explorer-Table/CostExplorerTable";
import { useContext, useEffect, useState } from "react";
import CostExplorerCharts from "../../components/Cost-Explorer-Charts/CostExplorerCharts";
import GroupChartIcon from "../../assets/GroupChartIcon";
import LineChartIcon from "../../assets/LineChartIcon";
import StackedColumnChartIcon from "../../assets/StackedColumnChartIcon";
import TuneIcon from "@mui/icons-material/Tune";

import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import FilterSelection from "../../components/FilterSelection/FilterSelection";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";
import axiosInstance from "../../utils/axiosInterceptor";
// import { CostExplorerProvider } from "../../context/CostExplorerProvider";
import { useDispatch, useSelector } from "react-redux";
import { storeCostGroupBy } from "../../redux/action/actions";
import CheckBoxIcon from "@mui/icons-material/CheckBox";


const DatePickerTailwind = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="flex gap-4 mb-2">
      <div>
        <label className="block ">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-1 py-1 cursor-pointer w-36"
        />
      </div>

      <div>
        <label className="block ">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-1 py-1 cursor-pointer w-36"
        />
      </div>
    </div>
  );
};

function CostExplorer() {
  const navbarElements = [
    "Service",
    "Instance Type",
    "Account ID",
    "Usage Type",
    "Platform",
    "Region",
    "Usage Type Group",
  ];

  const filterNames = [
    "Service",
    "Instance Type",
    "Account ID",
    "Usage Type",
    "Platform",
    "Region",
    "Usage Type Group",
    "Purchase Option",
    "Api Operation",
    "Resource",
    "Availability Zone",
    "Tenancy",
    "Legal Entity",
    "Billing Entity",
  ];

  const [filterSelectionAPI, setFilterSelectionAPI] = useState([]);

  const [chartType, setChartType] = useState("mscolumn2d");
  const [negativeAllowed, setNegativeAllowed] = useState(false);
  const [filterCollapsed, setFilterCollapsed] = useState(false);

  // const [groupByData, setgroupByData] = useState("SERVICE");
  // const { setGroupBy } = useContext(CostContext);
  const groupByValue = useSelector((state) => state.groupByValue);
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState("");
  const [checkedParentFilter,setCheckedParentFilter] = useState({});


  // const [data, setData] = useState({});

  const handleFilterClick = () => {
    setFilterCollapsed(!filterCollapsed);
  };
  const handleGroupByCharts = (currentGroup) => {
    //filter(Boolean) because only truthy values(discards SERVICE but accepts Legal Entity) will be filtered and then only join will be performed
    // const choosenGroup = currentGroup.toUpperCase().split(" ").filter(Boolean).join("_");
    let [choosenGroupFirst, choosenGroupSecond] = currentGroup
      .toUpperCase()
      .split(" ");
    if (choosenGroupSecond != null && choosenGroupSecond != "")
      choosenGroupFirst = choosenGroupFirst + "_" + choosenGroupSecond;

    // setgroupByData(choosenGroupFirst);
    // setGroupBy(choosenGroupFirst);
    setFilterSelectionAPI("")
    dispatch(storeCostGroupBy(choosenGroupFirst))
  };

  const handleGetAllFilters = (filter) => {
    setActiveFilter((previousValue) =>
      previousValue === filter ? "" : filter
    );
  };

  // useEffect(()=>{
  //   console.log(filterCollapsed ? "Collapsed" : "Not collapsed")
  //   console.log("Hi")
  // },[filterCollapsed]);

  return (
      <div>
        <header className="border-b-2 border-gray-200">
          <h2 className="font-bold text-2xl">Cost Explorer</h2>
          <p className="text-gray-500">
            How to always be aware of cost changes and history.
          </p>
        </header>

        <section className="mt-2">
          <nav className="flex gap-2 border-2 border-stone-200 rounded p-3.5">
            {/* //////////////////////////////////////////////////////////////////////// */}
            <p className="font-bold p-1.5">Group By:</p>
            <main className="flex justify-between w-full">
              <div className="flex">
                <ul className="flex gap-3">
                  {navbarElements.map((currentGroup) => (
                    <li key={currentGroup}>
                      <button
                        className="text-blue-900 bg-white rounded  border-slate-200 border p-1.5 font-semibold cursor-pointer"
                        onClick={() => handleGroupByCharts(currentGroup)}
                      >
                        {currentGroup}
                      </button>
                    </li>
                  ))}
                </ul>
                {/* <CustomDropdown onSelect={(val) => setgroupByData(val)} /> */}
                <CustomDropdown  />
              </div>

              <button className="cursor-pointer" onClick={handleFilterClick}>
                <TuneIcon />
              </button>
            </main>
            {/* //////////////////////////////////////////////////////////////////////////////////// */}
          </nav>

          {/* left-charts and table
        right - filter */}
          <div className="flex">
            {/* left  */}
            <div className={`${filterCollapsed ? "w-[70%]" : "w-full"}`}>
              <main className=" bg-white">
                <div className="flex justify-between pt-2">
                  <div className="text-gray-400 pl-2">Cost ($)</div>

                  <div className="flex">
                    <DatePickerTailwind />
                    <div className="ml-8 mr-8 border border-gray-300 rounded h-9 z-10">
                      <button
                        className="border-r border-gray-300 p-2 cursor-pointer relative group"
                        onClick={() => setChartType("mscolumn2d")}
                      >
                        {/* Group Chart  */}
                        <GroupChartIcon />

                        <span
                          className="absolute hidden group-hover:block top-9 text-sm font-medium text-white bg-zinc-600 border rounded py-1 px-2 whitespace-nowrap left-1/2  -translate-x-1/2
        "
                        >
                          Group Chart
                        </span>
                      </button>

                      <button
                        className=" p-2 border-r border-gray-300 cursor-pointer relative group"
                        onClick={() => setChartType("msline")}
                      >
                        <LineChartIcon />

                        <span
                          className="absolute hidden group-hover:block top-9 text-sm font-medium text-white bg-zinc-600 border rounded py-1 px-2 whitespace-nowrap left-1/2 -translate-x-1/2
        "
                        >
                          Multi Line Chart
                        </span>
                      </button>

                      <button
                        className=" p-2 cursor-pointer relative group"
                        onClick={() => setChartType("stackedcolumn2d")}
                      >
                        <StackedColumnChartIcon />

                        <span
                          className="absolute hidden group-hover:block top-9 text-sm font-medium text-white bg-zinc-600 border rounded py-1 px-2 whitespace-nowrap left-1/2 -translate-x-1/2
        "
                        >
                          Stacked Column Chart
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex ml-auto mr-2">
                    <p className="">Include Negative Value</p>
                    <div className="pl-1">
                      <button
                        className="cursor-pointer"
                        onClick={() => setNegativeAllowed((prev) => !prev)}
                      >
                        {negativeAllowed ? (
                          <ToggleOnIcon className="text-blue-600" />
                        ) : (
                          <ToggleOffIcon className="" />
                        )}
                        {/* <ToggleOffIcon/> */}
                      </button>
                    </div>
                  </div>
                </div>

                <CostExplorerCharts
                  // groupByData={groupByData}
                  chartType={chartType}
                  negativeAllowed={negativeAllowed}
                  filterSelectionAPI={filterSelectionAPI}
                />
              </main>

              <div className="text-center bg-sky-100  text-blue-900 font-medium border rounded p-2">
                <p>We are showing up top 1000 records by cost.</p>
              </div>

              <div>
                <CostExplorerTable />
              </div>
            </div>

            {/* right  */}
            {filterCollapsed && (
              <div className="bg-white w-[30%] z-1 border border-gray-200 shadow-md  shadow-gray-700">
                <nav className="flex justify-between mt-3 px-3">
                  <p className="font-bold">Filters</p>
                  <div className="text-blue-800 flex" onClick={()=>{
                      setFilterSelectionAPI("");
                  }}>
                    <p className="text-shadow-blue-800 font-bold">Reset-All</p>
                    <RestartAltSharpIcon />
                  </div>
                </nav>

                <section className="">
                  <div className="m-3 bg-amber-800-">
                    <ul className="mx-auto w-full">
                      {filterNames.map((filter) => (
                        <div key={filter}>
                          <li className="flex justify-between w-full py-4 px-3">
                            <div className="flex gap-2">

                              {
                                checkedParentFilter[filter] ? <CheckBoxIcon className="text-blue-500"/> :
                                <CheckBoxOutlineBlankSharpIcon />

                              }

                              <p
                                className="cursor-pointer text-gray-800 font-bold"
                                onClick={() => {
                                  // e.stopPropagation();
                                  handleGetAllFilters(filter);
                                  // setActiveFilter(  (previousValue)=> previousValue === filter ? '' : filter   );
                                }}
                              >
                                {filter}
                              </p>
                            </div>

                            <p className="text-gray-400 font-light text-sm">
                              Include Only
                            </p>
                          </li>

                          <p className="bg-gray-300 w-full h-0.5"></p>
                          {activeFilter == filter && (
                            <FilterSelection
                              filterName={filter}
                              setActiveFilter={setActiveFilter}
                              filterSelectionAPI={filterSelectionAPI}
                              setFilterSelectionAPI={setFilterSelectionAPI}

                              onCheckedParentFilter={(isChecked)=>{
                                setCheckedParentFilter(prev => ({
                                  ...prev,
                                  [filter]: isChecked
                                }))
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>
            )}
          </div>
        </section>
      </div>
  );
}

export default CostExplorer;
