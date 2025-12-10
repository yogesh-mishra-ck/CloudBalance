import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { Paper, ToggleButton } from "@mui/material";
import CostExplorerTable from "../../components/Cost-Explorer-Table/CostExplorerTable";
import { useState } from "react";
import CostExplorerCharts from "../../components/Cost-Explorer-Charts/CostExplorerCharts";
import  GroupChartIcon  from "../../assets/GroupChartIcon";
import LineChartIcon from "../../assets/LineChartIcon";
import StackedColumnChartIcon from "../../assets/StackedColumnChartIcon";

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
    " Usage Type",
    " Platform",
    " Region",
    "Usage Type Group",
  ];

  const [chartType, setChartType] = useState("mscolumn2d");
  const [negativeAllowed, setNegativeAllowed] = useState(false);

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
          <p className="font-bold p-1.5">Group By:</p>
          <ul className="flex gap-3">
            {navbarElements.map((currentGroup) => (
              <li key={currentGroup}>
                <button className="text-blue-900 bg-white rounded  border-slate-200 border p-1.5 font-semibold">
                  {currentGroup}
                </button>
              </li>
            ))}
          </ul>

          <CustomDropdown />
        </nav>

        <main className=" bg-white">

          <div className="flex justify-between pt-2">
            <div className="text-gray-400 pl-2">Cost ($)</div>

            <div className="flex">
              <DatePickerTailwind/>
              <div className="ml-8 mr-8 border border-gray-300 rounded h-9 z-10">
                  <button className="border-r border-gray-300 p-2 cursor-pointer relative group" onClick={()=>setChartType("mscolumn2d")}>
                    {/* Group Chart  */}
                    <GroupChartIcon/>

                    <span className="absolute hidden group-hover:block top-9 text-sm font-medium text-white bg-zinc-600 border rounded py-1 px-2 whitespace-nowrap left-1/2  -translate-x-1/2
">
                      Group Chart
                    </span>
                  </button>

                  <button className=" p-2 border-r border-gray-300 cursor-pointer relative group" onClick={()=>setChartType("msline")}>
                    <LineChartIcon/>
                  
                  <span className="absolute hidden group-hover:block top-9 text-sm font-medium text-white bg-zinc-600 border rounded py-1 px-2 whitespace-nowrap left-1/2 -translate-x-1/2
">
                      Multi Line Chart
                    </span>
                  </button>

                  <button className=" p-2 cursor-pointer relative group" onClick={()=>setChartType("stackedcolumn2d")}>
                    <StackedColumnChartIcon/>

                    <span className="absolute hidden group-hover:block top-9 text-sm font-medium text-white bg-zinc-600 border rounded py-1 px-2 whitespace-nowrap left-1/2 -translate-x-1/2
">
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
                <button className="cursor-pointer" onClick={()=>setNegativeAllowed((prev)=>!prev)}>
                  {
                    negativeAllowed ? <ToggleOnIcon className="text-blue-600"/> : <ToggleOffIcon className=""/>
                  }
              {/* <ToggleOffIcon/> */}

                </button>
              </div>
            </div>
          </div>

          <CostExplorerCharts chartType={chartType} negativeAllowed={negativeAllowed}/>
        </main>
        <div className="text-center bg-sky-100  text-blue-900 font-medium border rounded p-2">
          <p>We are showing up top 1000 records by cost.</p>
        </div>

        <div>
          <CostExplorerTable />
        </div>
      </section>
    </div>
  );
}

export default CostExplorer;
