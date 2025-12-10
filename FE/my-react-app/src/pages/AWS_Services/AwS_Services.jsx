import React, { useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { asg_mock, ec2_mock, rds_mock } from "../../utils/aws_services_mock";
import HandleCopy from "../../components/HandleCopy/HandleCopy";
import ServicesFilter from "../../components/Services_Filter/ServicesFilter";
const AwS_Services = () => {
  const ec2Data = ec2_mock;
  const rdsData = rds_mock;
  const asgData = asg_mock;

  const [selectedServiceData, setSelectedServiceData] = useState(ec2Data);
  // useEffect(()=>{

  // },[selectedService]);

  return (
    <div>
      <div>navbar</div>
      <div className="flex mt-2 justify-center items-center">
        <div className="flex gap-2">
          <button className="border py-2 px-5.5 text-blue-800 border-blue-400 bg-blue-100 cursor-pointer" onClick={()=>setSelectedServiceData(ec2Data)}>
            EC2
          </button>
          <button className="border py-2 px-5.5 text-blue-800 border-blue-400 bg-blue-100 cursor-pointer" onClick={()=>setSelectedServiceData(rdsData)}>
            RDS
          </button>
          <button className="border py-2 px-5.5 text-blue-800 border-blue-400 bg-blue-100 cursor-pointer" onClick={()=>{setSelectedServiceData(asgData)}}>
            ASG
          </button>
        </div>
      </div>

      <main className="w-300 ml-30 mt-5">
        <table className="table-auto  w-full">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="border-r border-gray-300  w-65 px-2 py-1">
                <div className="flex justify-between font-medium">
                  <span>Resource ID</span>
                  <span>
                    <ServicesFilter/>
                  </span>
                </div>
              </th>
              <th className="border-r border-gray-300   w-65 px-2 py-1">
                <div className="flex justify-between font-medium">
                  <span>Resource Name</span>
                  <span>
                    <ServicesFilter/>
                  </span>
                </div>
              </th>
              <th className="border-r border-gray-300 w-65 px-2 py-1">
                <div className="flex justify-between font-medium">
                  <span>Region</span>
                  <span>
                    <ServicesFilter/>
                  </span>
                </div>
              </th>
              <th className="border-r border-gray-300   w-65 px-2 py-1">
                <div className="flex justify-between font-medium">
                  <span>Status</span>
                  <span>
                    <ServicesFilter/>
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="">

            {selectedServiceData.map((currentResourceData,index) => (
              <tr key={currentResourceData.resourceId}>
                <td className={` border-r border-gray-300 border-l w-65 text-blue-900  px-2 py-1 ${index === selectedServiceData.length-1 ? "border-b" : "" } ${index%2!==0 ? "bg-gray-200": ""}`}>
                  <div className="flex justify-between font-medium cursor-pointer" onClick={()=>HandleCopy(currentResourceData.resourceId)}>
                    <span>{currentResourceData.resourceId}</span>
                    <span>
                      <ContentCopyOutlinedIcon />
                    </span>
                  </div>
                </td>
              <td className={` border-r border-gray-300 border-l w-65  px-2 py-1 ${index === selectedServiceData.length-1 ? "border-b" : ""} ${index%2!==0 ? "bg-gray-200": ""}`}>
                <div className="flex justify-between font-medium">
                  <span>{currentResourceData.resourceName}</span>
                </div>
              </td>
              <td className={` border-r border-gray-300 border-l w-65  px-2 py-1 ${index === selectedServiceData.length-1 ? "border-b" : ""} ${index%2!==0 ? "bg-gray-200": ""}`}>
                <div className="flex justify-between font-medium">
                  <span>{currentResourceData.region}</span>
                </div>
              </td>
              <td className={` border-r border-gray-300 border-l w-65  px-2 py-1 ${index === selectedServiceData.length-1 ? "border-b" : ""} ${index%2!==0 ? "bg-gray-200": ""}`}>
                <div className="flex justify-between font-medium">
                  <span>{currentResourceData.status}</span>
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AwS_Services;
