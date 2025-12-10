import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import { rows } from "../../utils/cost_explorer_row_mockup.js";

Charts(FusionCharts);
FusionTheme(FusionCharts);



function CostExplorerCharts({ chartType, negativeAllowed }) {
  
  const keysToSearch = new Set();
  keysToSearch.add("Amazon Elastic Compute Cloud ($)").add("Savings Plans for AWS Compute usage ($)").add("Amazon Relational Database Service ($)").add("AWS Marketplace ($)").add("CK Discounts ($)");
  
  const priceData = rows;
  const resultRows = [];
  rows.forEach((curentServiceData)=>{
      if(keysToSearch.has(curentServiceData.service)){
          resultRows[curentServiceData.service] = curentServiceData;
      }
  })
  console.log(resultRows);
  
  console.log(resultRows["Amazon Elastic Compute Cloud ($)"]["jun2025"]) ;
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
        category: [
          { label: "June 2025" },
          { label: "July 2025" },
          { label: "Aug 2025" },
          { label: "Sep 2025" },
          { label: "Oct 2025" },
          { label: "Nov 2025" },
        ],
      },
    ],
    dataset: [
       {
        seriesname: "Amazon Elastic Compute Cloud",
        data: [
          { value: resultRows["Amazon Elastic Compute Cloud ($)"]["jun2025"] < 0 && !negativeAllowed ? 0: resultRows["Amazon Elastic Compute Cloud ($)"]["jun2025"] },
          { value: resultRows["Amazon Elastic Compute Cloud ($)"]["jul2025"] < 0 && !negativeAllowed ? 0: resultRows["Amazon Elastic Compute Cloud ($)"]["jul2025"]},
          { value: resultRows["Amazon Elastic Compute Cloud ($)"]["aug2025"] < 0 && !negativeAllowed ? 0: resultRows["Amazon Elastic Compute Cloud ($)"]["aug2025"]},
          { value: resultRows["Amazon Elastic Compute Cloud ($)"]["sep2025"] < 0 && !negativeAllowed ? 0: resultRows["Amazon Elastic Compute Cloud ($)"]["sep2025"]},
          { value: resultRows["Amazon Elastic Compute Cloud ($)"]["oct2025"] < 0 && !negativeAllowed ? 0: resultRows["Amazon Elastic Compute Cloud ($)"]["oct2025"]},
          { value: resultRows["Amazon Elastic Compute Cloud ($)"]["nov2025"] < 0 && !negativeAllowed ? 0: resultRows["Amazon Elastic Compute Cloud ($)"]["nov2025"]},
        ],
      },
       {
        seriesname: "Savings Plan for AWS Compute Usage",
        data: [
          { value: resultRows["Savings Plans for AWS Compute usage ($)"]["jun2025"] < 0 && !negativeAllowed ? 0: resultRows["Savings Plans for AWS Compute usage ($)"]["jun2025"]},
          { value: resultRows["Savings Plans for AWS Compute usage ($)"]["jul2025"] < 0 && !negativeAllowed ? 0: resultRows["Savings Plans for AWS Compute usage ($)"]["jul2025"] },
          { value: resultRows["Savings Plans for AWS Compute usage ($)"]["aug2025"] < 0 && !negativeAllowed ? 0: resultRows["Savings Plans for AWS Compute usage ($)"]["aug2025"] },
          { value: resultRows["Savings Plans for AWS Compute usage ($)"]["sep2025"] < 0 && !negativeAllowed ? 0: resultRows["Savings Plans for AWS Compute usage ($)"]["sep2025"] },
          { value: resultRows["Savings Plans for AWS Compute usage ($)"]["oct2025"] < 0 && !negativeAllowed ? 0: resultRows["Savings Plans for AWS Compute usage ($)"]["oct2025"] },
          { value: resultRows["Savings Plans for AWS Compute usage ($)"]["nov2025"] < 0 && !negativeAllowed ? 0: resultRows["Savings Plans for AWS Compute usage ($)"]["nov2025"] },
        ],
      },
       {
        seriesname: "Amazon Relational Database Service",
        data: [
         { value: resultRows["Amazon Relational Database Service ($)"]["jun2025"] < 0 && !negativeAllowed ? 0 : resultRows["Amazon Relational Database Service ($)"]["jun2025"]},
          { value: resultRows["Amazon Relational Database Service ($)"]["jul2025"] < 0 && !negativeAllowed ? 0 : resultRows["Amazon Relational Database Service ($)"]["jul2025"]},
          { value: resultRows["Amazon Relational Database Service ($)"]["aug2025"] < 0 && !negativeAllowed ? 0 : resultRows["Amazon Relational Database Service ($)"]["aug2025"]},
          { value: resultRows["Amazon Relational Database Service ($)"]["sep2025"] < 0 && !negativeAllowed ? 0 : resultRows["Amazon Relational Database Service ($)"]["sep2025"]},
          { value: resultRows["Amazon Relational Database Service ($)"]["oct2025"] < 0 && !negativeAllowed ? 0 : resultRows["Amazon Relational Database Service ($)"]["oct2025"]},
          { value: resultRows["Amazon Relational Database Service ($)"]["nov2025"] < 0 && !negativeAllowed ? 0 : resultRows["Amazon Relational Database Service ($)"]["nov2025"]},
        ],
      },
       {
        seriesname: "AWS Marketplace",
        data: [
          { value: resultRows["AWS Marketplace ($)"]["jun2025"] < 0 && !negativeAllowed ? 0 : resultRows["AWS Marketplace ($)"]["jun2025"]},
          { value: resultRows["AWS Marketplace ($)"]["jul2025"] < 0 && !negativeAllowed ? 0 : resultRows["AWS Marketplace ($)"]["jul2025"]},
          { value: resultRows["AWS Marketplace ($)"]["aug2025"] < 0 && !negativeAllowed ? 0 : resultRows["AWS Marketplace ($)"]["aug2025"]},
          { value: resultRows["AWS Marketplace ($)"]["sep2025"] < 0 && !negativeAllowed ? 0 : resultRows["AWS Marketplace ($)"]["sep2025"]},
          { value: resultRows["AWS Marketplace ($)"]["oct2025"] < 0 && !negativeAllowed ? 0 : resultRows["AWS Marketplace ($)"]["oct2025"]},
          { value: resultRows["AWS Marketplace ($)"]["nov2025"] < 0 && !negativeAllowed ? 0 : resultRows["AWS Marketplace ($)"]["nov2025"]},
        ],
      },
      {
        seriesname: "CK Discounts",
        data: [
          { value: resultRows["CK Discounts ($)"]["jun2025"] < 0 && !negativeAllowed ? 0 : resultRows["CK Discounts ($)"]["jun2025"]},
          { value: resultRows["CK Discounts ($)"]["jul2025"] < 0 && !negativeAllowed ? 0 : resultRows["CK Discounts ($)"]["jul2025"]},
          { value: resultRows["CK Discounts ($)"]["aug2025"] < 0 && !negativeAllowed ? 0 : resultRows["CK Discounts ($)"]["aug2025"]},
          { value: resultRows["CK Discounts ($)"]["sep2025"] < 0 && !negativeAllowed ? 0 : resultRows["CK Discounts ($)"]["sep2025"]},
          { value: resultRows["CK Discounts ($)"]["oct2025"] < 0 && !negativeAllowed ? 0 : resultRows["CK Discounts ($)"]["aug2025"]},
          { value: resultRows["CK Discounts ($)"]["nov2025"] < 0 && !negativeAllowed ? 0 : resultRows["CK Discounts ($)"]["sep2025"]},
        ],
      },
       {
        seriesname: "Others",
        data: [
          { value: "51696.28" },
          { value: "29800" },
          { value: "21800" },
          { value: "26800" },
        ],
      },
    ],
  
  };
  

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
