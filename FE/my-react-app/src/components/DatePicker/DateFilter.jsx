import { useState,useEffect } from "react";

const DatePickerTailwind = ({ setFilterSelectionAPI }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    let query = "";

    if (startDate) query += `&startDate=${startDate}`;
    if (endDate) query += `&endDate=${endDate}`;

    
    setFilterSelectionAPI(query)
  }, [startDate, endDate]);

  return (
    <div className="flex gap-4 mb-2">
      
      <div>

        <label className="block ">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-2 py-1 cursor-pointer w-36
          
          "
        />

      </div>

      <div>
        <label className="block ">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-2 py-1 cursor-pointer w-36"
        />
      </div>
      
    </div>
  );
};

export default DatePickerTailwind