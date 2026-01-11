import React, {  useContext, useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
// import { rows } from "../../utils/cost_explorer_row_mockup.js";
import axiosInstance from "../../utils/axiosInterceptor.js";
import { useDispatch, useSelector } from "react-redux";
import { storeChartData } from "../../redux/action/actions.js";
import { CostContextFilter } from "../../context/CostContext.jsx";

Charts(FusionCharts);
FusionTheme(FusionCharts);

function CostExplorerCharts({  chartType, negativeAllowed,filterSelectionAPI }) {
  ////////
  // a

  // const { groupBy, setGroupBy } = useContext(CostContext);

  const groupByValue = useSelector((state) => state.groupByValue);

  const generateMonths = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);

      months.push({
        monthName: date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        monthKey:
          date.toLocaleString("default", { month: "short" }).toLowerCase() +
          date.getFullYear(),
      });
    }
    return months;
  };

  const dynamicMonths = generateMonths();
  
  // const [data, setData] = useState({});
  const data = useSelector((state) => state.chartData);
  const dispatch = useDispatch();

  const [servicesNames, setservicesNames] = useState(new Set());
  const [availableMonths,setAvailableMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(filterSelectionAPI)

  // const { params } = useContext(CostContextFilter);
  // console.log(params.toString())

  useEffect(() => {
    const getSnowflakeData = async () => {

      
     


      console.log("Snowflake before");
      console.log("These are the filters selected ",filterSelectionAPI)
      // const res = await axiosInstance.get(`/get-cost?groupBy=${groupByValue}`);
      const res = await axiosInstance.get(`/get-cost?groupBy=${groupByValue}${filterSelectionAPI}`);
      console.log("Snowflake after");
      const responseData = res.data;

      const months = responseData.map(row => row.MONTH);
      const sortedMonths = [...new Set(months)].sort()
      setAvailableMonths(sortedMonths);

      const formattedData = {};
      const servicesSet = new Set();

      
      responseData.forEach((row) => {
        const service = row.TYPE;
        const cost = parseFloat(row.TOTAL_COST);
        const month = row.MONTH;

        servicesSet.add(service);

        if (!formattedData[service])
          //AWS,RDS agr nhi h to inirialize krdo
          formattedData[service] = {};

        //AWS me Jan,Feb ki cost add krte rho
          formattedData[service][month] =
            (formattedData[service][month] || 0) + cost;
      });

      // setData(formattedData);
      dispatch(storeChartData(formattedData));

      setservicesNames(servicesSet);
      setIsLoading(false);
    };
    getSnowflakeData();
  }, [groupByValue, dispatch, filterSelectionAPI]);

  const chartRows = Array.from(servicesNames).map((serviceKey) => ({
    seriesname: serviceKey,
    data: availableMonths.map((month) => {
      const val = (data[serviceKey] && data[serviceKey][month]) || 0;
      
      let correctValue = val;
      if (val < 0 && !negativeAllowed) correctValue = 0;

      return {
        value: correctValue,
      };
    }),
  }));

  const dataSource = {
    chart: {
      theme: "fusion",
      xAxisName: "Months",
      yAxisName: "Cost (in $)",
      numberPrefix: "$",
      plotFillAlpha: "80",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
    },
    categories: [
      {
        category : availableMonths.map((monthKey) => {
          const [year, month] = monthKey.split("-");
          const dateObj = new Date(year, parseInt(month)-1);
          const label = dateObj.toLocaleString("default", {
            month: "long",
            year: "numeric"
          });
          return { label: label}
        })
      },
    ],
    dataset: chartRows,
  };

  if(isLoading)
    return (
      <div>
        Loading....
      </div>
    )


  return (
    <div>
      <ReactFC
        type={chartType}
        width="100%"
        height="400"
        dataFormat="json"
        dataSource={dataSource}
      />
    </div>
  );
}

export default CostExplorerCharts;
