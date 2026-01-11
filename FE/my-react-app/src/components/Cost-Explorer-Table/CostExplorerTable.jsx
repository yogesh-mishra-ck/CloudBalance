import { useSelector } from "react-redux";

export default function CostExplorerTable() {
  const storeData = useSelector((state) => state.chartData);

  const type = useSelector((state) => state.groupByValue);
  const rowType = type
    .split("_")
    .map((a) => a[0].toUpperCase() + a.toLowerCase().slice(1))
    .join(" ");
  console.log(rowType);

  console.log(storeData);

  const monthsSet = new Set(); //columns
  Object.values(storeData).forEach(monthCost => {
    Object.keys(monthCost).forEach(month => {
      monthsSet.add(month);
    })
  })
  
  const months = Array.from(monthsSet);
  const rows = Object.entries(storeData).map( ([serviceName, monthlyData]) => {
    let totalCost = 0;

    const monthCost = months.map(currentMonth => {
      const thisMonthCost = monthlyData[currentMonth] ? monthlyData[currentMonth] : 0; 
        totalCost+= thisMonthCost;
        return thisMonthCost;
    });

    return {
      serviceName,
      monthCost,
      totalCost
    }

  })
  // const monthsData = Array.from(months);
  console.log(months)


  return (
    <div className="overflow-auto h-[400px]">
      <table className="w-full  border border-gray-300 mt-2 text-sm">
        <thead className=" rounded border-amber-600 bg-gray-200 text-sm font-bold text-gray-600">
          <tr>
            <th className="px-4 py-1 border-r border-gray-400 text-left">{rowType}</th>

            {
              months.map(month => (
                <th className="px-3 py-1 border-r border-gray-400 ">{month}</th>
              ))
            }

            <th className="px-4 py-1 font-bold text-blue-600 border-r border-gray-400 text-right">
              Total
            </th>

          </tr>
        </thead>

        <tbody className="">
          {
            rows.map(row => (
              
              <tr className="border-b border-gray-400">
                <td className=" font-medium px-4 py-1 border-r border-gray-400  text-left">
                  {row.serviceName}
                </td>

                
                  {row.monthCost.map((cost)=>(
                    <td className=" px-3 py-1 border-r border-gray-400 text-center">
                      ${cost}
                    </td>
                  ))}
                

                <td className=" text-blue-600 font-semibold border-r border-gray-400  px-4 py-1 text-right">
                  ${row.totalCost}
                </td>
              </tr>
              
              
            ))
          }


          {
            <tr className="border-b border-gray-400 bg-blue-50 font-bold text-blue-600">
              <td className=" px-4 py-1 border-r border-gray-400  text-left">Total</td>

              {
                months.map((month,i) => {
                  const thisMonthAllExpenses = rows.reduce((acc, row) => acc+(row.monthCost[i] || 0), 0);
                  return (
                    <td className="px-3 py-1 border-r border-gray-400 text-center">
                      ${thisMonthAllExpenses}
                    </td>
                  )
                })
              }

              {
                <td className="text-blue-600 border-r border-gray-400  px-4 py-1 text-right">
                  ${
                    rows.reduce((acc, row) => acc+(row.totalCost || 0), 0)
                  }

                </td>
                
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
